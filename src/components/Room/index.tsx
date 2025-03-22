"use client";

import TvWithSahdow from "@/../public/medias/appleTv-rooms/tv_hardware_large.png";
import { useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

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
  const [firstRoomProgress, setFirstRoomProgress] = useState(0); // if greater than 0 it is first
  const [lastRoomProgress, setLastRoomProgress] = useState(0); // if greater than 0 it is last

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
    if (handle === firstRoom) {
      setFirstRoomProgress(latest * 100);
    }

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
      <div className={`vignette-container relative`}>
        {/* tv */}

        <div
          className="fixed top-0 -right-1/4 z-1 aspect-video h-screen translate-x-[50%]"
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

          <div className="absolute top-[50vh] aspect-video h-[32rem] -translate-y-1/2">
            {/* Content Container */}
            <div className="absolute z-10 size-full p-3">
              {/* Content */}
              {content}
              {/* {(() => {
                if (handle === "tv-plus" || handle === "apple-tv-app") {
                  if (handle === "tv-plus") {
                    return (
                      <TvPlusContent
                        handle={handle}
                        scrollYProgress={scrollYProgress}
                      />
                    );
                  }

                  if (handle === "apple-tv-app") {
                    return (
                      <TvPlusAppContent
                        handle={handle}
                        scrollYProgress={scrollYProgress}
                      />
                    );
                  }

                  return null;
                }

                return content;
              })()} */}
            </div>

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
        <div ref={roomRef}>{room}</div>
      </div>
    </>
  );
}

function TvPlusContent({
  handle,
  scrollYProgress,
}: {
  handle: string;
  scrollYProgress: any;
}) {
  const videoUrl = `/medias/appleTv-rooms/${handle}/large.mp4`;

  const [isStatic, setIsStatic] = useState(true);
  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    setIsStatic(latest > 0.6);
    console.log(isStatic);
  });

  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   console.log(latest);
  // });

  return (
    <>
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

      <Image
        className={`!relative !-top-full object-cover transition-all duration-1000 ${isStatic ? "opacity-100" : "opacity-0"}`}
        alt="StaticFrame"
        src="/medias/appleTv-rooms/apple-tv-insight/large.jpg"
        quality={100}
        fill
        sizes="100%"
      />
    </>
  );
}

function TvPlusAppContent({
  handle,
  scrollYProgress,
}: {
  handle: string;
  scrollYProgress: any;
}) {
  const [isStatic, setIsStatic] = useState(true);
  const imageUrl = `/medias/appleTv-rooms/${handle}/large.jpg`;

  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    setIsStatic(latest > 0.6);
    console.log(isStatic);
  });

  return (
    <>
      <Image
        className="!relative object-cover"
        alt="StaticFrame"
        src={imageUrl}
        // placeholder="blur"
        quality={100}
        fill
        sizes="100%"
      />

      {/* <div className="size-full bg-white">
        <video
          className={`size-full object-cover`}
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="/medias/appleTv-rooms/tv-plus/large.mp4"
            type="video/mp4"
          />
        </video>
      </div> */}
    </>
  );
}
