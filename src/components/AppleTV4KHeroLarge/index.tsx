"use client";

import HeroLogo from "@/../public/medias/appleTv-4k/apple_tv_4k_logo_medium_2x.png";
import StaticFrame from "@/../public/medias/appleTv-4k/hero_staticframe__large_2x.jpg";
import AppleTv from "@/../public/medias/appleTv-4k/hero_tv_remote_large.png";
import TV from "@/../public/medias/appleTv-4k/hero_tv_hw_large_2x.jpg";
import TVShadow from "@/../public/medias/appleTv-4k/hero_tv_shadow_color_large.png";
import styles from "@/styles/appletv-4k.module.scss";
import Music from "@/../public/medias/appleTv-4k/logo_apple_music_large.svg";
import Fitness from "@/../public/medias/appleTv-4k/logo_apple_fitnessplus_large.svg";
import TvPlus from "@/../public/medias/appleTv-4k/logo_apple_tvplus_large.svg";
import Arcade from "@/../public/medias/appleTv-4k/logo_apple_arcade_large.svg";

import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Index() {
  const container = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTvStatic, setIsTvStatic] = useState(false);
  const [isControlHidden, setIsControlHidden] = useState(false);
  const [isTvShadowVisible, setIsTvShadowVisible] = useState(false);
  const [currentVidoFrame, setCurrentVidoFrame] = useState(0);
  const FPS = 30;

  const { scrollYProgress, scrollY } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const tvScale = useTransform(scrollYProgress, [1, 0], [1, 1.5]);
  const appleTvscale = useTransform(scrollYProgress, [1, 0], [1, 2]);
  const heroOpacity = useTransform(scrollYProgress, [0.01, 0], [0, 1]);
  const tvShadowOpacity = useTransform(scrollYProgress, [0.6, 0.2], [1, 0]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsControlHidden(latest > 80);
    setIsTvStatic(latest > 150);
    setIsTvShadowVisible(latest > 850);
  });

  const handleCheckboxChange = () => {
    if (!videoRef.current) return;
    if (!isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let animationFrameId: any;
    const video = videoRef.current;
    if (!video) return;

    const updateFrame = () => {
      const currentFrame = Math.floor(video.currentTime * FPS);
      if (currentFrame !== currentVidoFrame) {
        setCurrentVidoFrame(currentFrame);
      }

      animationFrameId = requestAnimationFrame(updateFrame);
    };

    updateFrame(); // Start tracking frames
    return () => cancelAnimationFrame(animationFrameId);
  }, [currentVidoFrame, FPS]);

  // Define your sequential messages
  const messages = [
    { frame: 0, component: <LootTitle /> },
    { frame: 85, component: <TedTitle /> },
    { frame: 110, component: <KungFuPandaTitle /> },
    { frame: 155, component: <ApesTitle /> },
    { frame: 190, component: <HelloKittyTitle /> },
    { frame: 230, component: <MusicTitle /> },
    { frame: 265, component: <FittnessTitle /> },
  ];

  // Find the latest message based on timeMarker
  const currentMessage = messages.findLast(
    ({ frame }) => currentVidoFrame >= frame,
  );

  return (
    <div ref={container} className={styles.container}>
      {/* play/pause btn */}
      <div
        className={`fixed top-[90vh] z-50 flex w-full justify-end px-10 transition-all duration-500 ${isControlHidden ? "hidden opacity-0" : "block opacity-100"}`}
      >
        <label className="swap swap-rotate cursor-pointer rounded-full bg-gray-400 p-2 opacity-55">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            checked={isPlaying}
            onChange={handleCheckboxChange}
          />

          {/* pause icon */}

          <svg
            className="swap-on h-10 w-10 fill-current p-2.5"
            viewBox="0 0 256 256"
          >
            <path d="M216,48V208a16.01833,16.01833,0,0,1-16,16H164a16.01833,16.01833,0,0,1-16-16V48a16.01833,16.01833,0,0,1,16-16h36A16.01833,16.01833,0,0,1,216,48ZM92,32H56A16.01833,16.01833,0,0,0,40,48V208a16.01833,16.01833,0,0,0,16,16H92a16.01833,16.01833,0,0,0,16-16V48A16.01833,16.01833,0,0,0,92,32Z"></path>
          </svg>

          {/* play icon */}

          <svg
            className="swap-off h-10 w-10 fill-current p-2.5"
            viewBox="-5 0 28 28"
          >
            <g
              id="Icon-Set-Filled"
              transform="translate(-419.000000, -571.000000)"
              fill="#000000"
            >
              <path d="M440.415,583.554 L421.418,571.311 C420.291,570.704 419,570.767 419,572.946 L419,597.054 C419,599.046 420.385,599.36 421.418,598.689 L440.415,586.446 C441.197,585.647 441.197,584.353 440.415,583.554"></path>
            </g>
          </svg>
        </label>
      </div>

      <div className={styles.sticky}>
        {/* tv set */}
        <motion.div
          style={{
            scale: tvScale,
          }}
          className={styles.el}
        >
          <div className={`${styles.contentContainer} !aspect-video`}>
            {/* Hero Container */}
            <motion.div
              className="flex-center absolute bottom-0 left-0 z-30 h-1/2 w-full flex-col"
              style={{
                opacity: heroOpacity,
              }}
            >
              {/* Hero logo */}
              <div className="relative h-1/9 w-1/9">
                <Image
                  className="object-contain"
                  alt="HeroLogo"
                  src={HeroLogo}
                  placeholder="blur"
                  quality={100}
                  fill
                  sizes="100%"
                />
              </div>
              {/* Hero text */}
              <div>
                <h1 className="text-center text-6xl leading-14 font-semibold text-white">
                  The Apple experience. <br />
                  Cienematic in every sense.
                </h1>
              </div>

              {/* TODO */}
              {/* vido title */}
              <div className="mt-[6vh] text-white">
                {currentMessage && currentMessage.component}
              </div>
            </motion.div>

            {/* TV Container */}
            <div className="bg-base-200 relative h-full w-full overflow-hidden">
              {/* TV Video */}
              <div className="relative top-1/2 left-1/2 z-20 h-[96%] w-[98%] -translate-x-1/2 -translate-y-1/2 transform bg-white">
                <video
                  ref={videoRef}
                  className={`absolute top-0 left-1/2 h-full w-full -translate-x-1/2 transform object-cover object-top transition-all duration-1000 ${isTvStatic ? "opacity-0" : "opacity-100"} `}
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source
                    src="/medias/appleTv-4k/tvVideo.mp4"
                    type="video/mp4"
                  />
                </video>

                {/* static image */}
                <Image
                  className={`absolute object-fill transition-all duration-1000 ${isTvStatic ? "opacity-100" : "opacity-0"}`}
                  alt="StaticFrame"
                  src={StaticFrame}
                  placeholder="blur"
                  quality={100}
                  fill
                  sizes="100%"
                />
              </div>

              {/* TV Static */}
              <Image
                className="absolute z-10 overflow-visible"
                alt="TV"
                src={TV}
                placeholder="blur"
                quality={100}
                fill
                sizes="100%"
                style={{ objectFit: "fill" }}
              />
            </div>

            {/* TV Shadow */}
            <motion.div
              className={`absolute left-[-15vh] h-[10vh] w-[155vh]`}
              style={{
                opacity: tvShadowOpacity,
              }}
            >
              <Image
                className="object-fill"
                alt="TvShadow"
                src={TVShadow}
                placeholder="blur"
                quality={100}
                fill
                sizes="100%"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* apple tv */}
        <motion.div style={{ scale: appleTvscale }} className={styles.el}>
          <div className={`${styles.contentContainer}`}>
            {/* Apple tv  */}
            <div className="absolute top-[2vh] left-1/2 z-10 !h-[20%] !w-[20%] -translate-x-1/2">
              <Image
                className="overflow-visible object-cover"
                alt="AppleTv"
                src={AppleTv}
                placeholder="blur"
                quality={100}
                fill
                sizes="100%"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function LootTitle() {
  return (
    <div className="flex-center space-x-4">
      {/* logo */}
      <div className="relative h-[4vh] w-[4vw]">
        <Image
          className="object-contain"
          alt="TvPlus"
          src={TvPlus}
          quality={100}
          fill
          sizes="100%"
        />
      </div>

      {/* divider */}
      <div className="h-[3vh] border border-white" />

      {/* Title */}
      <div className="text-lg">
        <a href="#">Loot</a>
      </div>
    </div>
  );
}

function TedTitle() {
  return (
    <div className="flex-center space-x-4">
      {/* logo */}
      <div className="relative h-[4vh] w-[4vw]">
        <Image
          className="object-contain"
          alt="TvPlus"
          src={TvPlus}
          quality={100}
          fill
          sizes="100%"
        />
      </div>

      {/* divider */}
      <div className="h-[3vh] border border-white" />

      {/* Title */}
      <div className="text-lg">
        <a href="#">Ted Lasso</a>
      </div>
    </div>
  );
}

function KungFuPandaTitle() {
  return (
    <div className="flex-center space-x-2">
      {/* logo */}
      <div className="text-lg italic">
        <a href="#">Kung Fu Panda 4</a>
      </div>

      {/* Title */}
      <div className="text-lg">
        <p>is available to buy or rent on the Apple TV app.</p>
      </div>
    </div>
  );
}

function ApesTitle() {
  return (
    <div className="flex-center space-x-2">
      {/* logo */}
      <div className="text-lg italic">
        <a href="#"> Kingdom of the Planet of the Apes</a>
      </div>

      {/* Title */}
      <div className="text-lg">
        <p>is available to buy or rent on the Apple TV app.</p>
      </div>
    </div>
  );
}

function HelloKittyTitle() {
  return (
    <div className="flex-center space-x-4">
      {/* logo */}
      <div className="relative h-[5vh] w-[5vw]">
        <Image
          className="object-contain"
          alt="Arcade"
          src={Arcade}
          quality={100}
          fill
          sizes="100%"
        />
      </div>

      {/* divider */}
      <div className="h-[3vh] border border-white" />

      {/* Title */}
      <div className="text-lg">
        <a href="#">Hello Kitty Island Adventure</a>
      </div>
    </div>
  );
}

function MusicTitle() {
  return (
    <div className="flex-center space-x-4">
      {/* logo */}
      <div className="relative h-[6vh] w-[6vw]">
        <Image
          className="object-contain"
          alt="Music"
          src={Music}
          quality={100}
          fill
          sizes="100%"
        />
      </div>

      {/* divider */}
      <div className="h-[3vh] border border-white" />

      {/* Title */}
      <div className="text-lg">
        <a href="#">Peggy Gou</a>
      </div>
    </div>
  );
}

function FittnessTitle() {
  return (
    <div className="flex-center space-x-4">
      {/* logo */}
      <div className="relative h-[6vh] w-[6vw]">
        <Image
          className="object-contain"
          alt="Fitness"
          src={Fitness}
          quality={100}
          fill
          sizes="100%"
        />
      </div>

      {/* divider */}
      <div className="h-[3vh] border border-white" />

      {/* Title */}
      <div className="text-lg">
        <a href="#">HIIT with Bakari</a>
      </div>
    </div>
  );
}
