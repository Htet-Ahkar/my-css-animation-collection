"use client";
import styles from "./style.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";

export default function index({
  handle,
  mousePosition,
}: {
  handle: string;
  mousePosition: any;
}) {
  const { x, y } = mousePosition;

  return (
    <div className={styles.gallery}>
      <div className={styles.imageContainer}>
        <Image
          src={`/medias/split-vignettek/${handle}/background.jpg`}
          alt={handle}
          fill
        />
      </div>

      {/* This is static. I want to use in apple scroll */}
      {/* <div className={styles.vignette}>
        <Image
          src={`/medias/split-vignettek/${handle}/1.jpg`}
          alt={handle}
          fill
        />
      </div> */}

      <motion.div className={styles.vignette} style={{ x, y }}>
        <Image
          src={`/medias/split-vignettek/${handle}/1.jpg`}
          alt={handle}
          fill
        />
      </motion.div>
    </div>
  );
}
