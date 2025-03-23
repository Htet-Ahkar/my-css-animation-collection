"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import TvWithSahdow from "@/../public/medias/appleTv-rooms/tv_hardware_large.png";

import { PauseIcon, PlayIcon, Room } from "@/components";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
  motion,
} from "framer-motion";

const rooms = [
  // {
  //   name: "Apple Tv App",
  //   handle: "apple-tv-app",
  //   room: <TvPlusApp />,
  //   content: <ImageContent handle={"apple-tv-app"} />,
  // },
  // {
  //   name: "Apple Tv Plus",
  //   handle: "tv-plus",
  //   room: <TvPlus />,
  //   content: <VidoContent handle={"tv-plus"} />,
  // },
  // {
  //   name: "Apple Tv Insight",
  //   handle: "apple-tv-insight",
  //   room: <TvPlusInsight />,
  //   content: <ImageContent handle={"apple-tv-insight"} />,
  // },
  {
    name: "Fitness Plus",
    handle: "fitness-plus",
    room: <FitnessPlus />,
    content: <VidoContent handle={"fitness-plus"} />,
  },
  {
    name: "Music",
    handle: "music",
    room: <Music />,
    content: <VidoContent handle={"music"} />,
  },
  {
    name: "Arcade",
    handle: "arcade",
    room: <Arcade />,
    content: <VidoContent handle={"arcade"} />,
  },
  {
    name: "Photo",
    handle: "photo",
    room: <Photo />,
    content: <ImageContent handle={"photo"} />,
  },
  {
    name: "Screensaver",
    handle: "screensaver",
    room: <Screensaver />,
    content: <VidoContent handle={"screensaver"} />,
  },
];

export default function Page() {
  return (
    <>
      {/* pre-section */}
      <section className="bg-base-300 h-[80vh]" />

      <section className="flex-center relative w-full flex-col">
        <AppleTvPlus />
        {rooms.map(({ handle, room, content }, i) => (
          <Room handle={handle} room={room} content={content} key={i} />
        ))}
      </section>

      {/* post-section */}
      <section className="bg-base-300 h-[80vh]" />
    </>
  );
}

// rooms
function TvPlusApp() {
  return <div className="screen h-screen bg-white">TvPlusApp</div>;
}
function TvPlus() {
  return <div className="screen h-screen bg-white">TvPlus</div>;
}
function TvPlusInsight() {
  return <div className="screen h-screen bg-white">TvPlusInsight</div>;
}
function FitnessPlus() {
  return <div className={styles.fitnessPlus}>FitnessPlus</div>;
}
function Music() {
  return <div className={styles.music}>Music</div>;
}
function Arcade() {
  return <div className={styles.arcade}>Arcade</div>;
}
function Photo() {
  return <div className={styles.photo}>Photo</div>;
}
function Screensaver() {
  return <div className="screen bg-white">Screensaver</div>;
}

// content
function VidoContent({ handle }: { handle: string }) {
  const videoUrl = `/medias/appleTv-rooms/${handle}/large.mp4`;

  return (
    <div className="size-full bg-white">
      <video
        className={`size-full object-cover`}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
}

function ImageContent({ handle }: { handle: string }) {
  const imageUrl = `/medias/appleTv-rooms/${handle}/large.jpg`;

  return (
    <Image
      className="!relative object-cover"
      alt="StaticFrame"
      src={imageUrl}
      // placeholder="blur"
      quality={100}
      fill
      sizes="100%"
    />
  );
}

function AppleTvPlus() {
  const secondRoomRef = useRef(null);
  const firstRoomRef = useRef(null);
  const [firstRoomProgress, setFirstRoomProgress] = useState(0);
  const [secondRoomProgress, setSecondRoomProgress] = useState(0);

  const { scrollYProgress: firstRoomScrollY } = useScroll({
    target: firstRoomRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: secondRoomScrollY } = useScroll({
    target: secondRoomRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(firstRoomScrollY, "change", (latest) => {
    setFirstRoomProgress(latest * 100);
  });

  useMotionValueEvent(secondRoomScrollY, "change", (latest) => {
    setSecondRoomProgress(latest * 100);
  });

  const calculateTvLocation = ({ firstRoomProgress }: any) => {
    let result = 0;

    if (firstRoomProgress > 0 && firstRoomProgress <= 50) {
      result = Math.max(0, 100 - firstRoomProgress * 2);
    }

    return result;
  };

  const CurrentContent = ({ firstRoomProgress, secondRoomProgress }: any) => {
    if (secondRoomProgress >= 60) {
      return (
        <motion.div
          className="absolute z-10 size-full p-3"
          key="video"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Content */}
          <ImageContent handle={"apple-tv-Insight"} />
        </motion.div>
      );
    }

    if (firstRoomProgress >= 60) {
      return (
        <motion.div
          className="absolute z-10 size-full p-3"
          key="video"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Content */}
          <VidoContent handle={"tv-plus"} />
        </motion.div>
      );
    }

    return (
      <motion.div
        className="absolute z-10 size-full p-3"
        key="image"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ImageContent handle={"apple-tv-app"} />
      </motion.div>
    );
  };

  return (
    <>
      <div className="vignette-container relative">
        {/* tv */}

        <div
          className="fixed top-0 -right-1/4 z-1 aspect-video h-screen translate-x-[50%]"
          style={{
            transform: `translate(0, ${calculateTvLocation({ firstRoomProgress })}vh)`,
            transition: "transform ease-in-out", // Smooth transition
          }}
        >
          {/* controls */}
          <div className="absolute bottom-[12.5rem] left-[33rem] z-1">
            <label className="swap swap-rotate cursor-pointer rounded-full bg-gray-400 p-0.5 opacity-55">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                // checked={isPlaying}
                // onChange={handleCheckboxChange}
              />
              {/* pause icon */}
              <PauseIcon />

              {/* play icon */}
              <PlayIcon />
            </label>
          </div>

          <div className="absolute top-[50vh] aspect-video h-[32rem] -translate-y-1/2">
            {/* Content Container */}

            <AnimatePresence mode="wait">
              {CurrentContent({ firstRoomProgress, secondRoomProgress })}
            </AnimatePresence>

            {/* Tv Hardware */}
            <div className="w-fulll relative h-[115%]">
              <Image
                className="overflow-visible object-fill"
                alt="TvWithSahdow"
                src={TvWithSahdow}
                placeholder="blur"
                quality={100}
                fill
                sizes="100%"
              />
            </div>
          </div>
        </div>

        {/* rooms */}
        <div ref={firstRoomRef}>
          <TvPlus />
          {/* <TvPlusApp /> */}
        </div>
        <div ref={secondRoomRef}>
          <TvPlus />
        </div>
        <div>
          <TvPlusInsight />
        </div>
      </div>
    </>
  );
}
