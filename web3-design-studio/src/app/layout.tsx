import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web3 Design Studio",
  description: "Visual playground for building animated Web3 interfaces",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
