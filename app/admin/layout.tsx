'use client'

import AdminHeader from "@/components/AdminHeader";
import FadeTransition from "@/components/transition/Fade";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname()

  return (
    <div className="min-h-screen pb-10 bg-slate-100 sm:w-[530px] w-full mx-auto">
      {/* <SidebarProvider className="flex flex-col" open={false}>
        <AppSidebar/>
        <div className="sticky top-0 z-10 flex">
          <AdminHeader />
          <SidebarTrigger className="absolute z-10 top-5 right-0"/>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <FadeTransition key={pathname} className="p-3">
            {children}
          </FadeTransition>
        </AnimatePresence>
      </SidebarProvider> */}

      <div className="sticky top-0 z-10 flex">
          <AdminHeader />
      </div>
        <AnimatePresence mode="wait" initial={false}>
          <FadeTransition key={pathname} className="p-3">
            <Toaster/>
            {children}
          </FadeTransition>
        </AnimatePresence>
    </div>
  );
}
