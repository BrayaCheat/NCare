"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function NavigateCard({
  url,
  title,
  description,
  icon,
}: {
  url: string;
  title: string;
  description?: string;
  icon?: React.ReactElement;
}) {
  return (
    <Link href={url}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-1 rounded-xl bg-primary text-white">{icon}</span>
            <span className="text-muted-foreground">{title}</span>
          </div>
          <span className="text-muted-foreground"><ChevronRight size={20}/></span>
        </div>
        <span className="text-xs text-muted-foreground">{description}</span>
    </Link>
  );
}
