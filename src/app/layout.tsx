import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/Providers";
import { Toaster } from "@/components/ui/sonner";
import { MainLayout } from "../components/Layouts/MainLayout";
import { handleGetUser } from "../lib/server/auth";

const nunito = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WebChat",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await handleGetUser()

  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${nunito.className} text-black dark:text-white`}
      >
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MainLayout user={user}>
            {children}
          </MainLayout>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
