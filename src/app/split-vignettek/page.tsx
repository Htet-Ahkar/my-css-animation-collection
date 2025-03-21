"use client";
import { Description, Gallery } from "@/components";
import { useSpring } from "framer-motion";

const projects = [
  {
    name: "Dyal Thak",
    handle: "dyal_thak",
  },
  {
    name: "Leidinger Matthias",
    handle: "leidinger_matthias",
  },
  {
    name: "Mark Rammers",
    handle: "mark_rammers",
  },
  {
    name: "Landon Speers",
    handle: "landon_speers",
  },
];

const spring = {
  stiffness: 150,
  damping: 15,
  mass: 0.1,
};

export default function Page() {
  const mousePosition = {
    x: useSpring(0, spring),
    y: useSpring(0, spring),
  };
  const descriptionMousePosition = {
    x: useSpring(0, spring),
    y: useSpring(0, spring),
  };

  const mouseMove = (e: any) => {
    const { clientX, clientY } = e;
    const targetX = clientX - (window.innerWidth / 2) * 1.75;
    const targetY = clientY - (window.innerWidth / 2) * 0.85;

    mousePosition.x.set(targetX);
    mousePosition.y.set(targetY);

    descriptionMousePosition.x.set(clientX - (window.innerWidth / 2) * 0.27);
    descriptionMousePosition.y.set(clientY - (window.innerWidth / 2) * 0.3);
  };

  return (
    <>
      <section onMouseMove={mouseMove} className="w-full">
        {projects.map(({ handle }, i) => {
          return (
            <Gallery mousePosition={mousePosition} handle={handle} key={i} />
          );
        })}

        <Description
          mousePosition={descriptionMousePosition}
          projects={projects}
        />
      </section>
    </>
  );
}
