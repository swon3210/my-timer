import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { QueryProvider } from "@/lib/providers";
import { Toaster } from "sonner";
import FirebaseProvider from "@/app/providers/FirebaseProvider";
import OverlayProvider from "./providers/OverlayProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <Toaster />
          <FirebaseProvider>
            <OverlayProvider>{children}</OverlayProvider>
          </FirebaseProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
