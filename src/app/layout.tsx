import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";


export const metadata: Metadata = {
  title: "Whizzy",
  description: "Personal website of Swaraj Bachu",
  twitter: {
    card: "summary_large_image",
  },
};

const myFont = localFont({ src: "./BorneyDemo.otf", variable: "--borney" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={myFont.className}>{children}</body>
    </html>
  );
}
