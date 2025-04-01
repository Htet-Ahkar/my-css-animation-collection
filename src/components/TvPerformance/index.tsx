"use client";
import TV from "@/../public/medias/performance/Tv_with_speaker.jpg";
import styles from "./style.module.scss";

import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "../SVGs";

export default function Index() {
  const container = useRef(null);

  const { scrollYProgress, scrollY } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const tvScale = useTransform(scrollYProgress, [1, 0.5], [1, 3.5]);
  const tvPositionY = useTransform(scrollYProgress, [1, 0], ["-5vh", "50vh"]);

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.sticky}>
        {/* tv set */}
        <motion.div
          style={{
            scale: tvScale,
            y: tvPositionY,
          }}
          className={styles.el}
        >
          {/* Tv Hardware */}
          <div className={`${styles.contentContainer}`}>
            {/* TV Container */}
            <div className="relative h-full w-full overflow-hidden">
              {/* TV Video */}
              <div className="absolute top-[27.5vh] left-1/2 z-20 aspect-video w-[58%] -translate-x-1/2 -translate-y-1/2 transform">
                <video
                  className="absolute top-0 left-1/2 size-full -translate-x-1/2 transform object-cover object-top transition-all duration-1000"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source
                    src="/medias/performance/large.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>

              {/* TV Hardware */}
              <div className="relative size-full">
                <Image
                  className="z-10 overflow-visible object-cover"
                  alt="TV"
                  src={TV}
                  placeholder="blur"
                  quality={100}
                  fill
                  sizes="100%"
                />
              </div>
            </div>
          </div>

          {/* Tv Bottom */}
        </motion.div>
      </div>
    </div>
  );
}
