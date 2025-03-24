"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import TvWithSahdow from "@/../public/medias/appleTv-rooms/tv_hardware_large.png";
import TvAppLogo from "@/../public/medias/appleTv-rooms/apple-tv-app/apple_tv_app_large_2x.png";
import TvPlusLogo from "@/../public/medias/appleTv-rooms/apple-tv-app/apple_tv_plus_logo_large_2x.png";
import FitnessPlusLogo from "@/../public/medias/appleTv-rooms/fitness-plus/apple_fitness_app_large_2x.png";
import MusicLogo from "@/../public/medias/appleTv-rooms/music/apple_music_app_large_2x.png";
import ArcadeLogo from "@/../public/medias/appleTv-rooms/arcade/apple_arcade_app_large_2x.png";
import PhotoLogo from "@/../public/medias/appleTv-rooms/photo/photos_app_large_2x.png";

import { ArrowUpRight, ChevronRight, PauseIcon, PlayIcon } from "@/components";
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
        <Room room={room} content={content} key={i}>
          {i === 3 ? null : (
            <TvControl isPlaying={isPlaying} onDataChange={handleDataChange} />
          )}
        </Room>
      ))}

      <ScreensaverRoom
        room={<Screensaver />}
        content={<VidoContent handle={"screensaver"} />}
      >
        <TvControl isPlaying={isPlaying} onDataChange={handleDataChange} />
      </ScreensaverRoom>
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
      <div className="absolute bottom-1/2 left-[43vw] z-1 translate-y-83">
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

function Room({ room, content, children }: any) {
  return (
    <>
      <div className="vignette-container relative">
        {/* tv */}
        <div className="fixed top-0 -right-1/4 left-1/2 z-1 aspect-video h-screen">
          {/* controls */}
          {children}

          {/* content */}
          <TvHardware>{content}</TvHardware>
        </div>

        {/* rooms */}
        <div>{room}</div>
      </div>
    </>
  );
}

function ScreensaverRoom({ room, content, children }: any) {
  const roomRef = useRef(null);
  const [lastRoomProgress, setLastRoomProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: roomRef,
    offset: ["start end", "end start"],
  });

  const calculateTvLocation = ({ lastRoomProgress }: any) => {
    let result = 0;

    if (lastRoomProgress > 50) {
      result = Math.min(0, -((Math.max(50, lastRoomProgress) - 50) * 2));
    }

    return result;
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setLastRoomProgress(latest * 100);
  });

  // Caption Hepler
  const [currentVidoFrame, setCurrentVidoFrame] = useState(0);
  const FPS = 30;

  const captions = [
    { frame: 0, caption: "Aerials" },
    { frame: 70, caption: "Snoopy" },
    { frame: 200, caption: "Portraits" },
  ];

  // Find the latest message based on timeMarker
  const currentCaption = captions.findLast(
    ({ frame }) => currentVidoFrame >= frame,
  );

  useEffect(() => {
    let animationFrameId: any;
    const videoElements =
      document.querySelectorAll<HTMLVideoElement>("#apple-tv-video");
    const lastElement =
      videoElements.length > 0 ? videoElements[videoElements.length - 1] : null;

    if (!lastElement) return;

    const updateFrame = () => {
      const currentFrame = Math.floor(lastElement.currentTime * FPS);
      if (currentFrame !== currentVidoFrame) {
        setCurrentVidoFrame(currentFrame);
      }

      animationFrameId = requestAnimationFrame(updateFrame);
    };

    updateFrame(); // Start tracking frames
    return () => cancelAnimationFrame(animationFrameId);
  }, [currentVidoFrame, FPS]);

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

          {/* Caption */}
          <span className="absolute bottom-1/2 translate-y-80 font-semibold text-gray-400">
            {currentCaption && currentCaption.caption}
          </span>

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
function RoomWrapper({ children }: any) {
  return (
    <div className="container-lg">
      <div className="w-xs">{children}</div>
    </div>
  );
}

function TvPlusApp() {
  return (
    <div className="screen flex bg-white">
      <RoomWrapper>
        {/* logo */}
        <div className="mt-12 mb-7">
          <Image
            className="object-contain"
            alt="TvWithSahdow"
            src={TvAppLogo}
            width={120}
            placeholder="blur"
            quality={100}
            sizes="100%"
          />
        </div>
        {/* p1 */}

        <p className={styles.roomTypography}>
          <span>Apple TV app.</span>
          Watch, rent, or buy your favorite shows and movies all in one expertly
          curated app. Enjoy critically acclaimed Apple Originals series and
          films from Apple TV+ as they were meant to be seen. Subscribe to just
          the channels you want. And there are no new apps, accounts, or
          passwords needed for up to six family members.
        </p>

        {/* p2 */}

        <p className={styles.roomTypography + " mt-20"}>
          <span>Live TV.</span>
          Apple TV 4K is all you need to stream live TV from the world's biggest
          and best networks, broadcasters, and pay TV providers. Watch sports
          from ESPN and MLB. Catch up with news from ABC, CNN, and Bloomberg.
          And kick back with shows on Hulu, YouTube TV, and Sling TV.
          <sup className="text-xs">
            <a href="">3</a>
          </sup>
        </p>
      </RoomWrapper>
    </div>
  );
}

function TvPlus() {
  return (
    <div className="screen flex bg-white">
      <RoomWrapper>
        {/* logo */}
        <div className="mt-12 mb-7">
          <Image
            className="object-contain"
            alt="TvPlusLogo"
            src={TvPlusLogo}
            width={120}
            placeholder="blur"
            quality={100}
            sizes="100%"
          />
        </div>

        {/* p1 */}
        <p className={styles.roomTypography}>
          <span>Apple TV+.</span>
          Watch series, feature films, kids' entertainment, and more from the
          most creative minds in TV and movies — with new Apple Originals added
          every month.
          <sup className="text-xs">
            <a href="">4</a>
          </sup>
        </p>

        {/* Link */}
        <a
          href=""
          className="mt-3 flex items-center text-xl font-semibold text-blue-600 transition-all hover:underline"
        >
          Learn More
          <span>
            <ChevronRight />
          </span>
        </a>
      </RoomWrapper>
    </div>
  );
}

function TvPlusInsight() {
  return (
    <div className="screen flex bg-white">
      <RoomWrapper>
        {/* p1 */}
        <p className={styles.roomTypography}>
          <span>InSight.</span>
          Get information about Apple Originals series and films as you watch
          them. Just bring up the media player controls to learn more about the
          actors on the screen and the music that's playing. The details
          automatically update as the scene changes. And when you use iPhone as
          the Apple TV remote, InSight information appears in the palm of your
          hand.
          <sup className="text-xs">
            <a href="">5</a>
          </sup>
        </p>

        {/* Link */}
        <a
          href=""
          className="relative mt-3 flex w-7/8 items-center text-sm font-semibold text-gray-400 transition-all hover:underline"
        >
          <span>
            {"Stream "} <em>Severance</em>
            {" on the Apple TV app with a subscription"}
          </span>
          <span className="absolute bottom-[-12px] left-[65px] scale-75">
            <ChevronRight />
          </span>
        </a>
      </RoomWrapper>
    </div>
  );
}

function FitnessPlus() {
  return (
    <div className={styles.fitnessPlus + " screen flex"}>
      <RoomWrapper>
        {/* logo */}
        <div className="mt-12 mb-7">
          <Image
            className="object-contain"
            alt="FitnessPlusLogo"
            src={FitnessPlusLogo}
            width={120}
            placeholder="blur"
            quality={100}
            sizes="100%"
          />
        </div>
        {/* p1 */}

        <p className={styles.roomTypography + " !text-gray-300"}>
          <span className="!text-white">Apple Fitness+.</span>
          Tap into the world's largest library of 4K UHD fitness and wellness
          content.4 Sign up and get 12 workout types, from HIIT to Yoga, plus
          Meditation. Stay motivated with personalized recommendations tailored
          to you, Custom Plans, and new sessions added every week. Track your
          progress with real-time in-session metrics and get deeper insights
          into your workouts.
        </p>

        {/* Link */}
        <div className="flex">
          <a
            href=""
            className="mt-3 flex items-center text-xl font-semibold text-white transition-all hover:underline"
          >
            Learn More
            <span>
              <ChevronRight />
            </span>
          </a>

          <a
            href=""
            className="mt-3 flex items-center text-xl font-semibold text-white transition-all hover:underline"
          >
            Try it free
            <span>
              <ArrowUpRight />
            </span>
          </a>
        </div>
      </RoomWrapper>
    </div>
  );
}

function Music() {
  return (
    <div className={styles.music + " screen flex"}>
      <RoomWrapper>
        {/* logo */}
        <div className="mt-12 mb-7">
          <Image
            className="object-contain"
            alt="MusicLogo"
            src={MusicLogo}
            width={120}
            placeholder="blur"
            quality={100}
            sizes="100%"
          />
        </div>
        {/* p1 */}

        <p className={styles.roomTypography + " !text-gray-300"}>
          <span className="!text-white">Apple Music.</span>
          Listen to over 100 million songs, 30,000 playlists, and live radio on
          the big screen. You can even be your own video star with Apple Music
          Sing6 — sing top songs with real-time lyrics and adjustable vocals
          that let you take the lead, duet with the artist, or belt out backup
          harmonies.
          <sup className="text-xs">
            <a href="">4</a>
          </sup>
        </p>

        {/* Link */}
        <div className="flex">
          <a
            href=""
            className="mt-3 flex items-center text-xl font-semibold text-white transition-all hover:underline"
          >
            Learn More
            <span>
              <ChevronRight />
            </span>
          </a>
        </div>
      </RoomWrapper>
    </div>
  );
}

function Arcade() {
  return (
    <div className={styles.arcade + " screen flex"}>
      <RoomWrapper>
        {/* logo */}
        <div className="mt-12 mb-7">
          <Image
            className="object-contain"
            alt="ArcadeLogo"
            src={ArcadeLogo}
            width={120}
            placeholder="blur"
            quality={100}
            sizes="100%"
          />
        </div>
        {/* p1 */}

        <p className={styles.roomTypography + " !text-gray-300"}>
          <span className="!text-white">Apple Arcade.</span>
          Playing Apple Arcade games is even more immersive on your big screen.4
          Multiuser support helps players keep track of their individual game
          levels, leaderboards, and invitations — and switch between players at
          any time. And you can connect more of your favorite controllers to
          Apple TV 4K, including PlayStation and Xbox Wireless controllers.
          <sup className="text-xs">
            <a href="">7</a>
          </sup>
        </p>

        {/* Link */}
        <div className="flex">
          <a
            href=""
            className="mt-3 flex items-center text-xl font-semibold text-white transition-all hover:underline"
          >
            Learn More
            <span>
              <ChevronRight />
            </span>
          </a>
        </div>
      </RoomWrapper>
    </div>
  );
}

function Photo() {
  return (
    <div className={styles.photo + " screen flex"}>
      <RoomWrapper>
        {/* logo */}
        <div className="mt-12 mb-7">
          <Image
            className="object-contain"
            alt="PhotoLogo"
            src={PhotoLogo}
            width={120}
            placeholder="blur"
            quality={100}
            sizes="100%"
          />
        </div>
        {/* p1 */}

        <p className={styles.roomTypography}>
          <span>Photos.</span>
          iCloud Shared Photo Library makes it easier than ever for the whole
          family to enjoy each other’s photos, and you can see them all right on
          your TV. And you can choose Memories as your screen saver and watch
          your special moments come alive on the big screen.
        </p>

        {/* Link */}
        <div className="flex">
          <a
            href=""
            className="mt-3 flex items-center text-xl font-semibold text-blue-600 transition-all hover:underline"
          >
            Learn more about iCloud Photos
            <span>
              <ChevronRight />
            </span>
          </a>
        </div>
      </RoomWrapper>
    </div>
  );
}

function Screensaver() {
  return (
    <div className="screen flex bg-white">
      <RoomWrapper>
        {/* p1 */}

        <p className={styles.roomTypography}>
          <span>Screen savers..</span>
          Screen savers. Mesmerizing visuals take you to the most stunning
          locations on the earth and beyond. They can also showcase photos of
          your cherished moments and loved ones, and Snoopy and Woodstock join
          the fun with playful animations for the whole family.
          <sup className="text-xs">
            <a href="">8</a>
          </sup>
        </p>
      </RoomWrapper>
    </div>
  );
}
