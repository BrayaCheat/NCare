import type { Metadata } from "next";
import "./globals.css";
import FadeTransition from "@/components/transition/Fade";

export const metadata: Metadata = {
  title: "NCare",
  description: "Dev process",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/Euclid Circular A Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Euclid Circular A Medium.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Euclid Circular A Bold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body className="w-full">
        <FadeTransition>
          {children}
        </FadeTransition>
      </body>
    </html>
  );
}
