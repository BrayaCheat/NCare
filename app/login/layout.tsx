export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-[75vh] grid place-items-center p-3">{children}</body>
    </html>
  );
}
