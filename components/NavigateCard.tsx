"use client";

import React from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import Link from "next/link";
import Image from "next/image";

export default function NavigateCard({
  url,
  image,
  title,
  description,
  icon,
}: {
  url: string;
  image?: string;
  title: string;
  description?: string;
  icon?: React.ReactElement;
}) {
  return (
    <Link href={url}>
      <Image src={image || ''} alt='' />
      <Card className="gap-0">
        <div className="flex flex-row items-center justify-between">
          <Label>{title}</Label>
          <span className="text-muted-foreground">{icon}</span>
        </div>
        <span className="text-xs text-muted-foreground">{description}</span>
      </Card>
    </Link>
  );
}
