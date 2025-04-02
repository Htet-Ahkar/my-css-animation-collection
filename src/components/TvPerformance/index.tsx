"use client";
import TV from "@/../public/medias/performance/Tv_with_speaker.jpg";
import DOLBY_LOGO from "@/../public/medias/performance/logo_dolby_vision_large_2x.png";
import DOLBY_Dark_LOGO from "@/../public/medias/performance/logo_dolby_atmos_dark_large_2x.png";
import HDR_LOGO from "@/../public/medias/performance/logo_hdr_large_2x.png";
import styles from "./style.module.scss";

import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Index() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const tvMatrix = useTransform(
    scrollYProgress,
    [0.5, 1],
    ["matrix(1, 0, 0, 1, 0, 0)", "matrix(.5, 0, 0, .5, 0, 150)"],
  );
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
        <Header />
      </motion.div>

      <div className={styles.sticky}>
        {/* tv set */}
        <motion.div
          className={styles.el + " origin-top"}
          style={{
            transform: tvMatrix,
          }}
        >
          {/* Tv Hardware */}
          <TvHardWare>
            <motion.div
              className="absolute top-[175%] left-1/2 z-10 flex aspect-video w-[80%] -translate-x-1/2 -translate-y-2/6 scale-150 space-x-20 text-lg leading-relaxed font-semibold text-gray-400"
              style={{
                opacity: bottomTextOpacity,
              }}
            >
              <Credenza />
            </motion.div>
          </TvHardWare>
        </motion.div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <>
      <h2 className="mb-3 text-2xl font-semibold">Cinematic experience</h2>

      <h3 className="mb-8.75 text-[80px] leading-21 font-semibold">
        True-to-life picture.
        <br />
        Unreal sound.
      </h3>

      <p className="mb-8 text-[17px] font-semibold text-gray-400">
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
    </>
  );
}

function TvHardWare({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={`${styles.contentContainer}`}>
        {/* TV Video */}
        <div className="absolute left-1/2 z-10 aspect-video h-screen -translate-x-1/2">
          <video
            className="absolute top-0 left-1/2 z-10 size-full -translate-x-1/2 object-cover object-center"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/medias/performance/large.mp4" type="video/mp4" />
          </video>

          {/* TV Hardware */}
          <div className="absolute -top-[18%] left-1/2 aspect-video h-[200%] -translate-x-1/2">
            <Image
              className="z-10 object-cover"
              alt="TV"
              src={TV}
              placeholder="blur"
              quality={100}
              fill
              sizes="100%"
            />
          </div>

          {/* Tv Bottom */}
          {children}
        </div>
      </div>
    </>
  );
}

function Credenza() {
  return (
    <>
      {/* Left */}
      {
        <div>
          <p>
            <strong className="mr-1 font-semibold text-black">
              Spatial Audio
            </strong>
            immerses you in Dolby Atmos, 5.1, or 7.1 surround sound that feels
            like it's coming from every direction.
            <sup>
              <a href="">12</a>
            </sup>
            Connect HomePod for three-dimensional audio that places you right in
            the middle of the action. Or connect AirPods for a personal theater
            experience with sound that automatically adjusts to stay centered on
            the TV even if you move around the room.
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
      }
      {/* Right */}
      {
        <div>
          <p>
            <strong className="mr-1 font-semibold text-black">
              Enhance Dialogue
            </strong>
            pulls spoken words forward, whether you listen through your built-in
            TV speakers, HomePod, or receivers.
            <sup>
              <a href="">13</a>
            </sup>
            So even whispers are heard more clearly amid the music and
            background sounds of your favorite movies and shows — making a truly
            immersive experience sound even better. And subtitles automatically
            appear at just the right times to help you track every word.
            <sup>
              <a href="">14</a>
            </sup>
          </p>
        </div>
      }
    </>
  );
}
