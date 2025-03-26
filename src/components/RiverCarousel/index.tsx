"use client";
import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";

type PropsType = {
  children: any;
  FAST_DURATION: number;
  SLOW_DURATION: number;
};

export default function RiverCarousel({
  children,
  FAST_DURATION,
  SLOW_DURATION,
}: PropsType) {
  const [duration, setDuration] = useState(FAST_DURATION);
  let [containerRef, { width }] = useMeasure();

  const xTranslation = useMotionValue(0);

  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false); // Actually I don't think we need this. We can track mustFinish dependency.

  useEffect(() => {
    let controls;
    let finalPosition = -width / 2 - 8;

    if (mustFinish) {
      controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
        ease: "linear",
        duration: duration * (1 - xTranslation.get() / finalPosition),
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [0, finalPosition], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    return controls?.stop;
  }, [rerender, xTranslation, duration, width]);

  return (
    <motion.ul
      className="absolute left-0 flex h-full gap-4"
      style={{ x: xTranslation }}
      ref={containerRef}
      onHoverStart={() => {
        setMustFinish(true);
        setDuration(SLOW_DURATION);
      }}
      onHoverEnd={() => {
        setMustFinish(true);
        setDuration(FAST_DURATION);
      }}
    >
      {children}
    </motion.ul>
  );
}
