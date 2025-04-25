import AdminHeader from "@/components/AdminHeader";
import FadeTransition from "@/components/transition/Fade";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return(
  <div>
    <AdminHeader/>
    <FadeTransition className="p-3">
      {children}
    </FadeTransition>
  </div>
  )
}
