import styles from "./style.module.scss";
import { Room } from "@/components";

const rooms = [
  {
    name: "Apple Tv Plus",
    handle: "tv-plus",
    room: <TvPlus />,
  },
  {
    name: "Fitness Plus",
    handle: "fitness_plus",
    room: <FitnessPlus />,
  },
  {
    name: "Music",
    handle: "music",
    room: <Music />,
  },
  {
    name: "Arcade",
    handle: "arcade",
    room: <Arcade />,
  },
  {
    name: "Photo",
    handle: "photo",
    room: <Photo />,
  },
  {
    name: "Screensaver",
    handle: "screensaver",
    room: <Screensaver />,
  },
];

export default function Page() {
  return (
    <>
      {/* pre-section */}
      <section className="bg-base-300 h-[80vh]" />

      <section className="flex-center relative w-full flex-col">
        {rooms.map(({ handle, room }, i) => (
          <Room handle={handle} room={room} key={i} />
        ))}
      </section>

      {/* post-section */}
      <section className="bg-base-300 h-[80vh]" />
    </>
  );
}

function TvPlus() {
  return <div className="screen bg-white">TvPlus</div>;
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
