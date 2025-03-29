"use client";

import Picture1 from "@/../public/medias/text-parallax/1.jpg";
import Picture2 from "@/../public/medias/text-parallax/2.jpg";
import Picture3 from "@/../public/medias/text-parallax/3.jpg";
import styles from "./style.module.scss";

import Image from "next/image";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Index() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  return (
    <>
      <div className="h-[100vh]" />

      <div className="w-screen" ref={container}>
        <Slide
          src={Picture1}
          direction={"left"}
          left={"-40%"}
          progress={scrollYProgress}
        />

        <Slide
          src={Picture2}
          direction={"right"}
          left={"-25%"}
          progress={scrollYProgress}
        />

        <Slide
          src={Picture3}
          direction={"left"}
          left={"-75%"}
          progress={scrollYProgress}
        />
      </div>

      <div className="h-[100vh]" />
    </>
  );
}

const Slide = (props: any) => {
  const direction = props.direction == "left" ? -1 : 1;
  const translateX = useTransform(
    props.progress,
    [0, 1],
    [150 * direction, -150 * direction],
  );

  return (
    <motion.div
      style={{ x: translateX, left: props.left }}
      className="relative flex whitespace-nowrap"
    >
      <Phrase src={props.src} />
      <Phrase src={props.src} />
      <Phrase src={props.src} />
    </motion.div>
  );
};

const Phrase = ({ src }: any) => {
  return (
    <div className={"flex items-center gap-5 px-5"}>
      <p className="text-[7.5vw]">Front End Developer</p>

      <span className="relative aspect-[4/2] h-[7.5vw] overflow-hidden rounded-full">
        <Image style={{ objectFit: "cover" }} src={src} alt="image" fill />
      </span>
    </div>
  );
};
