import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";

import "@school-clerk/ui/globals.css";
import "@/styles/globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TailwindIndicator } from "@/components/tailwind-indicator";

import { cn } from "@school-clerk/ui/cn";
import { Toaster } from "@school-clerk/ui/toaster";
import { Providers } from "./providers";
import { ExampleTaskRunner } from "@/components/example-task-runner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
}); // Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../styles/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      {/*<Suspense>*/}
      {/*  <PostHogPageview />*/}
      {/*</Suspense>*/}
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-black antialiased",
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        <NuqsAdapter>
          <Providers>
            <TailwindIndicator />
            <Toaster />
            {children}
            <ExampleTaskRunner />
          </Providers>
        </NuqsAdapter>
      </body>
    </html>
  );
}
