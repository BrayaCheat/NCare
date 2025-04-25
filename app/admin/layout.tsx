'use client'

import AdminHeader from "@/components/AdminHeader";
import FadeTransition from "@/components/transition/Fade";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSideBar";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname()

  return (
    <div className="bg-gray-50">
      <SidebarProvider className="flex flex-col" open={false}>
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
      </SidebarProvider>
    </div>
  );
}
