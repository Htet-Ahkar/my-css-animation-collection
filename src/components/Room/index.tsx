"use client";

import TvWithSahdow from "@/../public/medias/appleTv-rooms/tv_hardware_large.png";
import { useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "../SVGs";

export default function Index({
  handle,
  room,
  content,
}: {
  handle: string;
  room: any;
  content: any;
}) {
  const roomRef = useRef(null);
  const [firstRoomProgress, setFirstRoomProgress] = useState(0);
  const [lastRoomProgress, setLastRoomProgress] = useState(0);

  const firstRoom = "apple-tv-app";
  const lastRoom = "screensaver";

  const { scrollYProgress } = useScroll({
    target: roomRef,
    offset: ["start end", "end start"],
  });

  const calculateTvLocation = ({
    firstRoomProgress,
    lastRoomProgress,
  }: any) => {
    let result = 0;

    if (handle === lastRoom || handle === firstRoom) {
      if (firstRoomProgress > 0 && firstRoomProgress <= 50) {
        result = Math.max(0, 100 - firstRoomProgress * 2);
      }

      if (lastRoomProgress > 50 && firstRoomProgress <= 100) {
        result = Math.min(0, -((Math.max(50, lastRoomProgress) - 50) * 2));
      }
    }

    return result;
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // if (handle === firstRoom) {
    //   setFirstRoomProgress(latest * 100);
    // }

    if (handle === lastRoom) {
      setLastRoomProgress(latest * 100);
    }
  });

  // Video control
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const handleCheckboxChange = () => {
    if (!videoRef.current) return;
    if (!isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div className="vignette-container relative">
        {/* tv */}

        <div
          className="fixed top-0 -right-1/4 left-1/2 z-1 aspect-video h-screen"
          style={{
            transform: `translate(0, ${calculateTvLocation({ firstRoomProgress, lastRoomProgress })}vh)`,
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
            <div className="absolute z-10 size-full p-3">
              {/* Content */}
              {content}
            </div>

            {/* Tv Hardware */}
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
        </div>

        {/* rooms */}
        <div ref={roomRef}>{room}</div>
      </div>
    </>
  );
}
