import AdminHeader from "@/components/AdminHeader";
import FadeTransition from "@/components/transition/Fade";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import { headers } from "next/headers";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers()
  console.log('Header list: ', headersList)
  return (
    <html lang="en">
      <body className="min-h-screen pb-10 bg-slate-100 sm:w-[530px] w-full mx-auto">
        <div className="sticky top-0 z-10 flex">
          <AdminHeader />
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <FadeTransition key={1} className="p-3">
            <Toaster />
            {children}
          </FadeTransition>
        </AnimatePresence>
      </body>
    </html>
  );
}
