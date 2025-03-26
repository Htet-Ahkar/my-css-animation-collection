"use client";
import TvPlusLogo from "@/../public/medias/appleTv-4k/logo_apple_tvplus_large.svg";
import Image from "next/image";
import { imageUrls } from "./constants";
import { ArrowUpRight, ChevronRight } from "../SVGs";
import { RiverCarousel } from "@/components";

const FAST_RIVER_DURATION = 110;
const SLOW_RIVER_DURATION = 125;
const HOVER_DURATION = 700;

export default function Index() {
  const urls = [...imageUrls];
  const mid = Math.floor(urls.length / 2);
  const [slowRiver, fastRiver] = [urls.slice(mid), urls.slice(0, mid)];

  return (
    <>
      <div className="flex-center mx-5 w-7xl flex-col overflow-hidden bg-black pt-16 text-white">
        {/* Content */}
        <div className="flex-center flex-col space-y-5">
          {/* Logo */}
          <div>
            <Image
              className="object-contain"
              alt="TvPlusLogo"
              src={TvPlusLogo}
              width={82}
              quality={100}
              sizes="100%"
            />
          </div>

          {/* Text */}
          <h3 className="text-[32px] leading-9 font-semibold tracking-wide">
            Get 3 months of Apple TV+ free
            <br />
            when you buy an Apple TV 4K.
            <sup className="align-super text-sm">
              <a href="">21</a>
            </sup>
          </h3>

          {/* Link */}
          <div className="flex space-x-3">
            <a
              href=""
              className="flex items-center -space-x-1 text-xl font-semibold text-blue-400 transition-all hover:underline"
            >
              Try it free
              <sup className="align-super text-xs">
                <span>22</span>
              </sup>
              <span>
                <ArrowUpRight />
              </span>
            </a>

            <a
              href=""
              className="flex items-center -space-x-1 text-xl font-semibold text-blue-400 transition-all hover:underline"
            >
              Learn More
              <sup />
              <span>
                <ChevronRight />
              </span>
            </a>
          </div>
        </div>

        {/* River */}
        <div className="w-full space-y-3 pt-12.5 pb-3">
          <div className="relative aspect-video h-34">
            <RiverCarousel
              FAST_DURATION={FAST_RIVER_DURATION}
              SLOW_DURATION={HOVER_DURATION}
            >
              {[...fastRiver, ...fastRiver].map((item, idx) => (
                <Card image={`${item}`} key={idx} />
              ))}
            </RiverCarousel>
          </div>

          <div className="relative aspect-video h-34">
            <RiverCarousel
              FAST_DURATION={SLOW_RIVER_DURATION}
              SLOW_DURATION={HOVER_DURATION}
            >
              {[...slowRiver, ...slowRiver].map((item, idx) => (
                <Card image={`${item}`} key={idx} />
              ))}
            </RiverCarousel>
          </div>
        </div>
      </div>
    </>
  );
}

// Card
import Arrow from "@/../public/medias/infinite-carousel/arrow.svg";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Card = ({ image }: any) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <motion.li
      className="relative flex aspect-video h-full items-center justify-center overflow-hidden rounded-xl bg-slate-400"
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
              <span className="text-black">Explore Now</span>
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
      <Image
        className="object-cover"
        src={image}
        alt={image}
        fill
        quality={100}
        sizes="100%"
      />
    </motion.li>
  );
};
