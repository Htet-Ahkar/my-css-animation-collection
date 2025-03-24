"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import TvWithSahdow from "@/../public/medias/appleTv-rooms/tv_hardware_large.png";

import { PauseIcon, PlayIcon } from "@/components";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
  motion,
} from "framer-motion";

const rooms = [
  {
    name: "Fitness Plus",
    room: <FitnessPlus />,
    content: <VidoContent handle={"fitness-plus"} />,
  },
  {
    name: "Music",
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
    room: <Photo />,
    content: <ImageContent handle={"photo"} />,
  },
  {
    name: "Screensaver",
    room: <Screensaver />,
    content: <VidoContent handle={"screensaver"} />,
  },
];

export default function Index() {
  const [isPlaying, setIsPlaying] = useState(true);

  const handleDataChange = (value: boolean) => {
    setIsPlaying(value);
  };

  return (
    <>
      <AppleTvPlusRooms>
        <TvControl isPlaying={isPlaying} onDataChange={handleDataChange} />
      </AppleTvPlusRooms>
      {rooms.map(({ room, content }, i) => (
        <Room
          room={room}
          content={content}
          key={i}
          last={rooms.length - 1 === i}
        >
          {i === 3 ? null : (
            <TvControl isPlaying={isPlaying} onDataChange={handleDataChange} />
          )}
        </Room>
      ))}
    </>
  );
}

// content
function TvHardware({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute top-[50vh] aspect-video h-[32rem] -translate-y-1/2">
      {/* Content Container */}
      <div className="absolute z-10 size-full p-3">
        {/* Content */}
        {children}
      </div>

      {/* Tv Hardware Container */}
      <div className="w-fulll room-tv-hardware-size relative">
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
  );
}
function TvControl({
  onDataChange,
  isPlaying,
}: {
  onDataChange: (value: boolean) => void;
  isPlaying: boolean;
}) {
  const handleCheckboxChange = () => {
    onDataChange(!isPlaying);
  };

  useEffect(() => {
    const videoElements =
      document.querySelectorAll<HTMLVideoElement>("#apple-tv-video");

    videoElements.forEach((video) => {
      if (isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    });
  }, [isPlaying]);

  return (
    <>
      <div className="absolute bottom-[12.5rem] left-[33rem] z-1">
        <label className="swap swap-rotate cursor-pointer rounded-full bg-gray-400 p-0.5 opacity-55">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            checked={isPlaying}
            onChange={handleCheckboxChange}
          />
          {/* pause icon */}
          <PauseIcon />

          {/* play icon */}
          <PlayIcon />
        </label>
      </div>
    </>
  );
}

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
        id="apple-tv-video"
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

// Components
function AppleTvPlusRooms({ children }: any) {
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
          key="image2"
          className="size-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ImageContent handle={"apple-tv-Insight"} />
        </motion.div>
      );
    }

    if (firstRoomProgress >= 60) {
      return (
        <motion.div
          key="video"
          className="size-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VidoContent handle={"tv-plus"} />
        </motion.div>
      );
    }

    return (
      <motion.div
        key="image"
        className="size-full"
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
          className="fixed top-0 -right-1/4 left-1/2 z-1 aspect-video h-screen"
          style={{
            transform: `translate(0, ${calculateTvLocation({ firstRoomProgress })}vh)`,
            transition: "transform ease-in-out", // Smooth transition
          }}
        >
          {/* controls */}

          {firstRoomProgress >= 60 && secondRoomProgress <= 60
            ? children
            : null}

          {/* content */}
          <TvHardware>
            <AnimatePresence mode="wait">
              {CurrentContent({ firstRoomProgress, secondRoomProgress })}
            </AnimatePresence>
          </TvHardware>
        </div>

        {/* rooms */}
        <div ref={firstRoomRef}>
          <TvPlusApp />
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

function Room({ room, content, last, children }: any) {
  const roomRef = useRef(null);
  const [lastRoomProgress, setLastRoomProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: roomRef,
    offset: ["start end", "end start"],
  });

  const calculateTvLocation = ({ lastRoomProgress }: any) => {
    let result = 0;

    if (last) {
      if (lastRoomProgress > 50) {
        result = Math.min(0, -((Math.max(50, lastRoomProgress) - 50) * 2));
      }
    }

    return result;
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (last) {
      setLastRoomProgress(latest * 100);
    }
  });

  return (
    <>
      <div className="vignette-container relative">
        {/* tv */}
        <div
          className="fixed top-0 -right-1/4 left-1/2 z-1 aspect-video h-screen"
          style={{
            transform: `translate(0, ${calculateTvLocation({ lastRoomProgress })}vh)`,
            transition: "transform ease-in-out", // Smooth transition
          }}
        >
          {/* controls */}
          {children}

          {/* content */}
          <TvHardware>{content}</TvHardware>
        </div>

        {/* rooms */}
        <div ref={roomRef}>{room}</div>
      </div>
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
