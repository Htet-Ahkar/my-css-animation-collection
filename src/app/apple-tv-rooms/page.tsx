import Image from "next/image";
import styles from "./style.module.scss";
import { Room } from "@/components";

const rooms = [
  {
    name: "Apple Tv App",
    handle: "apple-tv-app",
    room: <TvPlusApp />,
    content: <ImageContent handle={"apple-tv-app"} />,
  },
  {
    name: "Apple Tv Plus",
    handle: "tv-plus",
    room: <TvPlus />,
    content: <VidoContent handle={"tv-plus"} />,
  },
  {
    name: "Apple Tv Insight",
    handle: "apple-tv-insight",
    room: <TvPlusInsight />,
    content: <ImageContent handle={"apple-tv-insight"} />,
  },
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
