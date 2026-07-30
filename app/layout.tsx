import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mỹ Nguyễn | Marketing Portfolio",
  description:
    "Portfolio of Mỹ Nguyễn, a joyful, proactive and energetic Marketing Explorer working across research, campaign planning, content and production.",
  applicationName: "Mỹ Nguyễn Portfolio",
  authors: [{ name: "Mỹ Nguyễn" }],
  keywords: [
    "Mỹ Nguyễn",
    "marketing portfolio",
    "IMC",
    "content planning",
    "advertising production",
  ],
  icons: null,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fdfdf5",
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
