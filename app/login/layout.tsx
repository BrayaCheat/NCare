import FadeTransition from "@/components/transition/Fade";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-[75vh] grid place-items-center p-3">
      <FadeTransition>{children}</FadeTransition>
    </div>
  );
}
