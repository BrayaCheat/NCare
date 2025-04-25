"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

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
      // plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images &&
          images.map((file, idx) => (
            <CarouselItem key={idx} className="basis-1/3 relative h-[200px]">
              <AnimatePresence>
                <motion.div
                  key={file.name + idx} // make sure key is unique
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <XIcon
                    width={25}
                    height={25}
                    onClick={() => removeImage(idx)}
                    className="p-1 bg-destructive text-secondary rounded-full absolute z-10 top-0 right-0"
                  />
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`upload-preview-${idx}`}
                    className="object-cover rounded-2xl border"
                    width={100}
                    height={100}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
}
