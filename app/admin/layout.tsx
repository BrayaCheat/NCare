import AdminHeader from "@/components/AdminHeader";
import FadeTransition from "@/components/transition/Fade";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSideBar";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <SidebarProvider className="flex flex-col">
        <AppSidebar />
        <div className="sticky top-0 z-10 flex">
          <AdminHeader />
          <SidebarTrigger className="absolute z-10 top-5 right-0"/>
        </div>
        <FadeTransition className="p-3">{children}</FadeTransition>
      </SidebarProvider>
    </div>
  );
}
