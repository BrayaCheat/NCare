"use client";

import Image from "next/image";
import Logout from "@/components/Logout";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center">
        <Image
          src="/images/logo.png"
          alt="logo.png"
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
      <Logout />
    </div>
  );
}
