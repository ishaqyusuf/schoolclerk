import { exists, mkdir, readdir, unlink } from "node:fs/promises";
import path from "node:path";
async function logPrismaEngineFiles(dirPath: string) {
  try {
    const entries = await readdir(dirPath);
    const engineFiles = entries.filter(
      (name) => name.includes("_engine") && name.endsWith(".node")
    );

    if (engineFiles.length === 0) {
      console.log(`🚫 No Prisma engine files found in: ${dirPath}`);
    } else {
      console.log(`✅ Prisma engine files in ${dirPath}:`);
      engineFiles.forEach((file) => {
        console.log(`  - ${file}`);
      });
    }
  } catch (err) {
    console.error(`❌ Error reading ${dirPath}: ${err.message}`);
  }
}

// Example usage
await logPrismaEngineFiles(
  "../../../../packages/db/node_modules/@prisma/client"
);

// Ex. ./src/main.ts
const mainModulePath = process.argv[2];

// Ensure file exists
if ((await exists(mainModulePath)) !== true) {
  throw new Error(`module not found: ${mainModulePath}`);
}

// Get current architecture for build
const arch = process.arch === "arm64" ? "arm64" : "x86_64";

// Bootstrap source should be in same directory as main
const bootstrapSourcePath = mainModulePath.replace(
  /\.(ts|js|cjs|mjs)$/,
  ".bootstrap.ts"
);

// Read in bootstrap source
const bootstrapSource = await Bun.file("./bootstrap.ts")
  .text()
  .catch(() => Bun.file("./bun-vercel/bootstrap.ts").text());

// Write boostrap source to bootstrap file
await Bun.write(
  bootstrapSourcePath,
  bootstrapSource.replace(
    'import main from "./example/main"',
    `import main from "./${mainModulePath.split("/").pop()}"`
  )
);

// Create output directory
await mkdir("./.vercel/output/functions/App.func", {
  recursive: true,
});

// Create function config file
await Bun.write(
  "./.vercel/output/functions/App.func/.vc-config.json",
  JSON.stringify(
    {
      architecture: arch,
      handler: "bootstrap",
      maxDuration: 10,
      memory: 1024,
      runtime: "provided.al2",
      supportsWrapper: false,
    },
    null,
    2
  )
);

// Create routing config file
await Bun.write(
  "./.vercel/output/config.json",
  JSON.stringify(
    {
      framework: {
        version: Bun.version,
      },
      overrides: {},
      routes: [
        {
          headers: {
            Location: "/$1",
          },
          src: "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$",
          status: 308,
        },
        {
          handle: "filesystem",
        },
        {
          check: true,
          dest: "App",
          src: "^.*$",
        },
      ],
      version: 3,
    },
    null,
    2
  )
);

// Compile to a single bun executable
if (await exists("/etc/system-release")) {
  await Bun.spawnSync({
    cmd: [
      "bun",
      "build",
      bootstrapSourcePath,
      "--compile",
      "--minify",
      "--outfile",
      ".vercel/output/functions/App.func/bootstrap",
    ],
    stdout: "pipe",
  });
} else {
  await Bun.spawnSync({
    cmd: [
      "docker",
      "run",
      "--platform",
      `linux/${arch}`,
      "--rm",
      "-v",
      `${process.cwd()}:/app`,
      "-w",
      "/app",
      "oven/bun",
      "bash",
      "-cl",
      `bun build ${bootstrapSourcePath} --compile --minify --outfile .vercel/output/functions/App.func/bootstrap`,
    ],
    stdout: "pipe",
  });
}

// Cleanup bootstrap file
await unlink(bootstrapSourcePath);
