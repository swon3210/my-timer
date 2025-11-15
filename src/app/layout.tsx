import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/lib/providers";
import { Toaster } from "sonner";
import OverlayProvider from "./_providers/OverlayProvider";
import LoginGuard from "./_guard/LoginGuard";

export const metadata: Metadata = {
  title: "My Timer",
  description: "나만의 타이머 어플리케이션",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-kr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased">
        <QueryProvider>
          <Toaster />
          <OverlayProvider>
            <LoginGuard>{children}</LoginGuard>
          </OverlayProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
