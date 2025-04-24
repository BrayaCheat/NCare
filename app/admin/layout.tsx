import AdminHeader from "@/components/AdminHeader";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div><AdminHeader/>
  <div className="p-3">
  {children}
  </div>
  </div>;
}
