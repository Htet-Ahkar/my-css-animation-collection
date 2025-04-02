"use client";
import TV from "@/../public/medias/performance/Tv_with_speaker.jpg";
import DOLBY_LOGO from "@/../public/medias/performance/logo_dolby_vision_large_2x.png";
import DOLBY_Dark_LOGO from "@/../public/medias/performance/logo_dolby_atmos_dark_large_2x.png";
import HDR_LOGO from "@/../public/medias/performance/logo_hdr_large_2x.png";
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
  const headerPositionY = useTransform(
    scrollYProgress,
    [1, 0],
    ["115vh", "100vh"],
  );
  const headerOpacity = useTransform(scrollYProgress, [0.2, 0.05], [1, 0]);
  const bottomTextOpacity = useTransform(scrollYProgress, [1, 0.95], [1, 0]);

  return (
    <div ref={container} className={styles.container}>
      {/* Header Container */}
      <motion.div
        className="flex-col-center absolute left-1/2 z-10 mx-5 w-4/5 -translate-x-1/2 text-center text-white"
        style={{
          y: headerPositionY,
          opacity: headerOpacity,
        }}
      >
        <h2 className="mb-3 text-2xl font-semibold">Cinematic experience</h2>

        <h3 className="mb-8.75 text-[80px] leading-21 font-semibold">
          True-to-life picture.
          <br />
          Unreal sound.
        </h3>

        <p className="mb-8 text-[21px] font-semibold text-gray-400">
          <strong className="mr-1 font-semibold text-white">4K picture.</strong>
          Eye-popping details leap out of the darkest shadows and
          <br />
          brightest highlights with advanced HDR formats like Dolby Vision —
          <br /> and HDR10+.
          <sup>
            <a href="">11</a>
          </sup>
          So everything you watch is worthy of your
          <br />
          biggest screen.
        </p>

        {/* Logos Container */}
        <div className="flex">
          <div>
            <Image
              className="object-cover"
              src={DOLBY_LOGO}
              alt="DOLBY_LOGO"
              quality={100}
              width={112}
            />
          </div>

          <div>
            <Image
              className="object-cover"
              src={HDR_LOGO}
              alt="HDR_LOGO"
              quality={100}
              width={136}
            />
          </div>
        </div>
      </motion.div>

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
              <div className="absolute top-[27.5vh] left-1/2 z-20 aspect-video w-[745px] -translate-x-1/2 -translate-y-1/2 transform">
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
          <motion.div
            className="absolute bottom-[2vh] z-10 mx-auto flex space-x-20 text-[21px] leading-6 font-semibold text-gray-400"
            style={{
              opacity: bottomTextOpacity,
            }}
          >
            {/* Left */}
            <div className="w-[450px]">
              <p>
                <strong className="mr-1 font-semibold text-black">
                  Spatial Audio
                </strong>
                immerses you in Dolby Atmos, 5.1, or 7.1 surround sound that
                feels like it's coming from every direction.
                <sup>
                  <a href="">12</a>
                </sup>
                Connect HomePod for three-dimensional audio that places you
                right in the middle of the action. Or connect AirPods for a
                personal theater experience with sound that automatically
                adjusts to stay centered on the TV even if you move around the
                room.
              </p>

              <div className="m-5">
                <Image
                  className="object-cover"
                  src={DOLBY_Dark_LOGO}
                  alt="DOLBY_Dark_LOGO"
                  quality={100}
                  width={125}
                />
              </div>
            </div>

            {/* Right */}
            <div className="w-[450px]">
              <p>
                <strong className="mr-1 font-semibold text-black">
                  Enhance Dialogue
                </strong>
                pulls spoken words forward, whether you listen through your
                built-in TV speakers, HomePod, or receivers.
                <sup>
                  <a href="">13</a>
                </sup>
                So even whispers are heard more clearly amid the music and
                background sounds of your favorite movies and shows — making a
                truly immersive experience sound even better. And subtitles
                automatically appear at just the right times to help you track
                every word.
                <sup>
                  <a href="">14</a>
                </sup>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
