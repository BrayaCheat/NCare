import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
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
      <body className="w-full">
        <FadeTransition>
          <Toaster />
          {children}
        </FadeTransition>
      </body>
    </html>
  );
}
