import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";

import "@/styles/globals.css";
import "@school-clerk/ui/globals.css";

import { cn } from "@school-clerk/ui/cn";

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
      {/* LOREM */}
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        {children}
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <NextDevtoolsProvider>{children}</NextDevtoolsProvider>
          <Analytics />
          <SpeedInsights />
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider> */}
      </body>
    </html>
  );
}
