import Image from "next/image";
import Link from "next/link";

export default function AdminHeader(){
  return (
    <nav className="w-full bg-primary-foreground dark:bg-primary backdrop-blur-3xl">
      <div className="p-2 border-b shadow-sm">
        <Link href={'/admin'}>
        <Image
          src={'/images/logo.png'}
          width={50}
          height={50}
          alt="Logo"
          priority
        /></Link>
      </div>
    </nav>
  )
}