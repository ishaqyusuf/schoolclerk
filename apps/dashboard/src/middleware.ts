import { NextResponse, type NextRequest } from "next/server";

import { env } from "./env";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default function middleware(req: NextRequest) {
  const hostName = env.APP_ROOT_DOMAIN;
  const url = req.nextUrl;
  if (!hostName) {
    throw new Error("APP_ROOT_DOMAIN is not defined in environment variables");
  }

  const host = req.headers.get("host") ?? "";
  const subdomain = host.replace(`.${hostName}`, "");

  if (subdomain && subdomain !== host) {
    if (subdomain === "app") {
      return NextResponse.rewrite(new URL(`/app/`, req.url));
    } else {
      const searchParams = req.nextUrl.searchParams.toString();
      // Get the pathname of the request (e.g. /, /about, /blog/first-post)
      const path = `${url.pathname}${
        searchParams.length > 0 ? `?${searchParams}` : ""
      }`;

      // const isProd = env.NODE_ENV == "production";
      const _url = `/dashboard/${
        // isProd ? "daarul-hadith" :
        host
      }${path}`;

      return NextResponse.rewrite(new URL(_url, req.url));
      // return NextResponse.rewrite(new URL(`/dashboard/${subdomain}/`, req.url));
    }
  }

  // Proceed with normal response
  return NextResponse.next();
}
