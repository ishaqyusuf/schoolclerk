"use client";

import { TRPCReactProvider } from "@/trpc/client";
import { ReactNode } from "react";

type ProviderProps = {
  //   locale: string;
  children: ReactNode;
};

export function Providers({ children }: ProviderProps) {
  return (
    <TRPCReactProvider>
      {/* <I18nProviderClient locale={locale}> */}
      {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
      {children}
      {/* </ThemeProvider> */}
      {/* </I18nProviderClient> */}
    </TRPCReactProvider>
  );
}
