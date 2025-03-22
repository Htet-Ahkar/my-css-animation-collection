"use client";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";

const index = ({ handle, room }: { handle: string; room: any }) => {
  const roomRef = useRef(null);
  const [firstRoomProgress, setFirstRoomProgress] = useState(0); // if greater than 0 it is first
  const [lastRoomProgress, setLastRoomProgress] = useState(0); // if greater than 0 it is last

  const firstRoom = "tv-plus";
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
          <div className="absolute top-[50vh] aspect-video h-[32rem] -translate-y-1/2 bg-blue-400">
            <span className="absolute top-0">{handle}</span>
            <span className="absolute bottom-0">{handle}</span>
          </div>
        </div>

        {/* rooms */}
        <div ref={roomRef}>{room}</div>
      </div>
    </>
  );
};

export default index;
