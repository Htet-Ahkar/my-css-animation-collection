"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { RiverCarousel } from "@/components";

const images = [
  "/medias/infinite-carousel/image-1.jpg",
  "/medias/infinite-carousel/image-2.jpg",
  "/medias/infinite-carousel/image-3.jpg",
  "/medias/infinite-carousel/image-4.jpg",
  "/medias/infinite-carousel/image-5.jpg",
  "/medias/infinite-carousel/image-6.jpg",
  "/medias/infinite-carousel/image-7.jpg",
  "/medias/infinite-carousel/image-8.jpg",
];
const FAST_DURATION = 25;
const SLOW_DURATION = 250;

export default function Index() {
  return (
    <RiverCarousel
      FAST_DURATION={FAST_DURATION}
      SLOW_DURATION={SLOW_DURATION}
      isPaused={false}
    >
      {[...images, ...images].map((item, idx) => (
        <Card image={`${item}`} key={idx} />
      ))}
    </RiverCarousel>
  );
}

// Card
import Arrow from "@/../public/medias/infinite-carousel/arrow.svg";

const Card = ({ image }: any) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <motion.li
      className="relative flex h-[200px] min-w-[200px] items-center justify-center overflow-hidden rounded-xl bg-slate-400"
      key={image}
      onHoverStart={() => setShowOverlay(true)}
      onHoverEnd={() => setShowOverlay(false)}
    >
      {/* Hover overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="absolute top-0 right-0 bottom-0 left-0 z-10 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="pointer-events-none absolute h-full w-full bg-black opacity-50" />
            <motion.h1
              className="z-10 flex cursor-pointer items-center gap-[0.5ch] rounded-full bg-white px-3 py-2 text-sm font-semibold hover:opacity-75"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              exit={{ y: 10 }}
            >
              <span>Explore Now</span>
              {/* <Arrow className="h-4 w-4" /> */}
              <div className="relative">
                <Image
                  className="object-contain"
                  src={Arrow}
                  alt="Arrow"
                  quality={100}
                  width={16}
                />
              </div>
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
      <Image src={image} alt={image} fill style={{ objectFit: "cover" }} />
    </motion.li>
  );
};
