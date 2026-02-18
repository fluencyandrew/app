import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Precision Language Training",
  description: "Stage 1 Exercise - Lexical Fluency",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
