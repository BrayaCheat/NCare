"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Label } from "./ui/label";

export default function NavigateCard({
  href,
  title,
  description,
  color,
}: {
  href: string;
  title: string;
  description?: string;
  color?: string;
}) {
  return (
    <Link href={href} className="group !cursor-default">
      <div className="flex items-center justify-between">
        <div className="flex items-stretch gap-3">
          <span className={`${color} p-0.5`} />
          <div>
            <Label>{title}</Label>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <ChevronRight
          size={20}
          className="text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-transform duration-300"
        />
      </div>
    </Link>
  );
}
