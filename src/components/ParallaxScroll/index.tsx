"use client";
import styles from "./style.module.scss";
import Picture1 from "@/../public/medias/scroll-parallax/1.jpg";
import Picture2 from "@/../public/medias/scroll-parallax/2.jpg";
import Picture3 from "@/../public/medias/scroll-parallax/3.jpg";
import Image from "next/image";
import { RefObject, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const word = "with gsap";
const images = [Picture1, Picture2, Picture3];

export default function Index() {
  const container: RefObject<any> = useRef(null);
  const title1: RefObject<any> = useRef(null);
  const title2: RefObject<any> = useRef(null);
  const lettersRef: RefObject<any[]> = useRef([]);
  const imagesRef: RefObject<any[]> = useRef([]);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(title1.current, { y: -25 }, 0)
        // .to(title2.current, { y: -25 }, 0)
        .to(imagesRef.current[1], { y: -150 }, 0)
        .to(imagesRef.current[2], { y: -255 }, 0);

      lettersRef.current.forEach((letter, i) => {
        tl.fromTo(
          letter,
          { top: Math.floor(Math.random() * -75) - 25 },
          { top: 0 },
          0,
        );
      });
    });

    return () => context.revert();
  }, []);

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.body}>
        <h1 ref={title1}>Parallax</h1>
        <h1 ref={title2}>Scroll</h1>

        <div className={styles.word}>
          <p>
            {word.split("").map((letter, i) => {
              return (
                <span
                  key={`l_${i}`}
                  ref={(el) => {
                    if (el) lettersRef.current[i] = el;
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </p>
        </div>
      </div>

      <div className={styles.images}>
        {images.map((image, i) => {
          return (
            <div
              key={`i_${i}`}
              ref={(el) => {
                if (el) imagesRef.current[i] = el;
              }}
              className={styles.imageContainer}
            >
              <Image src={image} placeholder="blur" alt="image" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
