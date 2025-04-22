import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToastProvider } from "@/providers/toast-provider";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CAFnow",
  creator: "TioElvis",
  description: "Gestisci il tuo CAF facilmente con CAFnow",
  authors: [{ name: "Elvis", url: "https://github.com/TioElvis" }],
};

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Readonly<Props>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <ToastProvider>
            <QueryProvider>{children}</QueryProvider>
          </ToastProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
