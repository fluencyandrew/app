import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FluencyFrames - Precision Language Training",
  description: "Executive Language Fluency Training Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}

