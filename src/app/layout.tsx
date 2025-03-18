import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components";

export const metadata: Metadata = {
  title: "my css animation collection",
  description: "next",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {/* Nav */}
        <Navbar />
        {children}

        {/* Footer */}
      </body>
    </html>
  );
}
