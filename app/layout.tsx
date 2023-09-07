import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Github Repository Explorer",
  description: "Quickly track people's repository",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/lion.png" sizes="any" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
