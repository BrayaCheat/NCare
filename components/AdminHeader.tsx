import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const VALID_PATHS = ['/']

export default async function AdminHeader() {
  const pathname = await headers().get('x-pathname') || '';
  const isValidPath = VALID_PATHS.includes(pathname);
  const pathDisplay = pathname.split('/').pop() || '';

  return (
    <div className="w-full bg-white border-b shadow-sm">
      <div className="p-3 relative">
        {isValidPath ? (
          <Link href={'/profile'} className="flex items-center gap-3">
            <Image
              src={'/images/logo.png'}
              width={50}
              height={50}
              alt="Logo"
              priority
            />
            <span className="text-2xl">NCare</span>
          </Link>
        ) : (
          <div className="flex justify-center items-center">
            <form action={redirect('javascript:history.back()')} className="absolute left-3 top-1/2 -translate-y-1/2">
              <button type="submit">
                <ChevronLeft className="cursor-pointer" />
              </button>
            </form>
            <div className="flex-1 text-center">
              <h1 className="font-bold">{pathDisplay}</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}