import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PROJECT NEXUS — A universe of games",
    template: "%s | PROJECT NEXUS",
  },
  description:
    "Discover new worlds, play independent games, and follow the creators building them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
