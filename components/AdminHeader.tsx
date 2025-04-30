'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { ChevronLeft } from "lucide-react";
// import useUserStore from "@/app/store/user";

export default function AdminHeader(){
  const pathname = usePathname()
  const router = useRouter()
  // const {user} = useUserStore()

  const pathDisplay = useMemo(() => {
    return pathname?.split('/')[2]?.toUpperCase()
  }, [pathname])

  // const userDisplay = useMemo(() => {
  //   return user?.email?.split('-')[0]
  // }, [user])

  // const userId = useMemo(() => {
  //   return user?.id.split('-')[0]
  // }, [user])


  const isValidPath = useMemo(() => {
    return pathname === '/admin'
  }, [pathname])

  return (
    <div className="w-full bg-white border-b shadow-sm">
      <div className="p-3">
        {
            isValidPath ? (
            <Link href={'/admin/profile'} className="flex items-center gap-3">
              <Image
                src={'/images/logo.png'}
                width={50}
                height={50}
                alt="Logo"
                priority
              />
              <span className="text-2xl">NCare</span>
            </Link>
          )
          :
          (
            <div>
              <ChevronLeft className="absolute z-50 top-3 left-3 cursor-pointer" onClick={() => router.back()}/>
              <div className="flex-1 text-center">
                <h1 className="font-bold">{pathDisplay}</h1>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}