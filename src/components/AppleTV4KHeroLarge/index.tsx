"use client";

import StaticFrame from "@/../public/medias/appleTv-4k/hero_staticframe__large_2x.jpg";
import AppleTv from "@/../public/medias/appleTv-4k/hero_tv_remote_large.png";
import TV from "@/../public/medias/appleTv-4k/hero_tv_hw_large_2x.jpg";
import TVShadow from "@/../public/medias/appleTv-4k/hero_tv_shadow_color_large.png";
import styles from "@/styles/appletv-4k.module.scss";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Index() {
  const container = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTvStatic, setIsTvStatic] = useState(false);
  const [isControlHidden, setIsControlHidden] = useState(false);
  const [isTvShadowVisible, setIsTvShadowVisible] = useState(false);

  const { scrollYProgress, scrollY } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [1, 0], [1, 1.38]);
  const scale1 = useTransform(scrollYProgress, [1, 0], [1, 2]);

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

  return (
    <div ref={container} className={styles.container}>
      {/* play/pause btn */}
      <div
        className={`fixed top-[90vh] z-50 flex w-full justify-end px-10 transition-all duration-500 ${isControlHidden ? "hidden opacity-0" : "block opacity-100"}`}
      >
        <label className="swap swap-rotate cursor-pointer rounded-full bg-gray-400 p-3 opacity-55">
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
        <motion.div style={{ scale }} className={styles.el}>
          <div className={`${styles.contentContainer} `}>
            <div className="bg-base-200 relative h-full w-full overflow-hidden">
              {/* TV Container */}
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

              {/* TV  */}
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
            <div
              className={`absolute left-[-17vh] h-[10vh] w-[170vh] transition-all duration-1000 ${isTvShadowVisible ? "opacity-100" : "opacity-0"}`}
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
            </div>
          </div>
        </motion.div>

        {/* apple tv */}
        <motion.div style={{ scale: scale1 }} className={styles.el}>
          <div className={`${styles.contentContainer}`}>
            {/* Apple tv  */}
            <div className="absolute top-[2vh] left-1/2 z-10 !h-[20%] !w-[20%] -translate-x-1/2">
              <Image
                className="object-cover"
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
