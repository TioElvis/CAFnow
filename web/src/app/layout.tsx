import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { QueryProvider } from "@/provider/query-provider";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CAFnow",
  description: "Manage your CAFS easily with CAFnow",
  authors: [{ name: "Elvis", url: "https://github.com/TioElvis" }],
  creator: "TioElvis",
};

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Readonly<Props>) {
  return (
    <html lang="it">
      <body className={roboto.className}>
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
