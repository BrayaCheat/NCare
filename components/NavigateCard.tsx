"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Settings } from "lucide-react";

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
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className=""><Settings/></span>
          <div className="flex flex-col">
            <span className="">{title}</span>
            <span className="text-xs text-muted-foreground">{description}</span>
          </div>
        </div>
        <span className="text-muted-foreground">
          <ChevronRight size={20} />
        </span>
      </div>
    </Link>
  );
}
