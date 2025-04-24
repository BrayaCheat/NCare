import Image from "next/image";

export default function AdminHeader(){
  return (
    <nav className="sticky top-0 z-10 w-full backdrop-blur-3xl">
      <div className="p-2 border-b shadow-sm">
        <Image
          src={'/images/logo.png'}
          width={50}
          height={50}
          alt="Logo"
        />
      </div>
    </nav>
  )
}