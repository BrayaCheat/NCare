import Link from "next/link"
import { Label } from "./ui/label"
import React from "react"

export default function QuickCTA({
  label,
  icon,
  href,
  color
}: {
  label: string,
  icon: React.ReactElement,
  href: string,
  color: string
}){
  return (
    <Link href={href} className="group">
      <div className="flex flex-col items-center gap-3 group-hover:scale-95 duration-300">
        {icon}
        <Label>{label}</Label>
      </div>
    </Link>
  )
}