import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Signal | Ship the future",
  description: "A developer platform for teams who build ambitious products.",
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
