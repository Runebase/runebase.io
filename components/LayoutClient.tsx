// components/ui/LayoutClient.tsx
"use client"

import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "react-tooltip";



import type { ReactNode } from "react";
import { ThemeProvider } from "./ui/theme-provider";

const LayoutClient = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NextTopLoader color="" showSpinner={false} />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />

      <Tooltip
        id="tooltip"
        className="z-[60] !opacity-100 max-w-sm shadow-lg"
      />
    </>
  );
};

export default LayoutClient;

