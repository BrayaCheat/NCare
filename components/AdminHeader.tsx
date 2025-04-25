'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

export default function AdminHeader(){
  const pathname = usePathname()
  const router = useRouter()

  const pathDisplay = useMemo(() => {
    return pathname?.split('/')[2]?.toUpperCase()
  }, [pathname])


  const isValidPath = useMemo(() => {
    return pathname === '/admin'
  }, [pathname])

  return (
    <div className="w-full backdrop-blur-3xl">
      <div className="p-2">
        {
            isValidPath ? (
            <Link href={'/admin'}>
            <Image
              src={'/images/logo.png'}
              width={50}
              height={50}
              alt="Logo"
              priority
            />
            </Link>
          )
          :
          (
            <div className="flex items-center">
              <Button variant={'ghost'} onClick={() => router.back()} size={'icon'}>
                <ChevronLeft/>
              </Button>
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