"use client";

import {
  animate,
  motion,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import Image from "next/image";

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
  const [duration, setDuration] = useState(FAST_DURATION);
  let [containerRef, { width }] = useMeasure();

  const xTranslation = useMotionValue(0);

  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false); // Actually I don't think we need this. We can track mustFinish dependency.

  useEffect(() => {
    let controls;
    let finalPosition = -width / 2 - 8;

    if (mustFinish) {
      controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
        ease: "linear",
        duration: duration * (1 - xTranslation.get() / finalPosition),
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [0, finalPosition], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    return controls?.stop;
  }, [rerender, xTranslation, duration, width]);

  return (
    <main className="py-8">
      <motion.ul
        className="absolute left-0 flex gap-4"
        style={{ x: xTranslation }}
        ref={containerRef}
        onHoverStart={() => {
          setMustFinish(true);
          setDuration(SLOW_DURATION);
        }}
        onHoverEnd={() => {
          setMustFinish(true);
          setDuration(FAST_DURATION);
        }}
      >
        {[...images, ...images].map((item, idx) => (
          <Card image={`${item}`} key={idx} />
        ))}
      </motion.ul>
    </main>
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
