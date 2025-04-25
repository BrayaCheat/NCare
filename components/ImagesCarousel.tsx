"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { XIcon } from "lucide-react";

export default function AdminCarousel({
  images,
  removeImage,
}: {
  images: File[];
  removeImage: (idx: number) => void;
}) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images && images.map((file, idx) => (
          <CarouselItem key={idx} className="basis-1/3">
              <Card>
                  <XIcon
                    width={20}
                    height={20}
                    onClick={() => removeImage(idx)}
                  />
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`upload-preview-${idx}`}
                    className="object-cover"
                    width={100}
                    height={50}
                    style={{
                      width: 'auto',
                      height: 'auto'
                    }}
                  />
              </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
