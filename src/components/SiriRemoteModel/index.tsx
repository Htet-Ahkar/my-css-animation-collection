"use client";
import * as THREE from "three";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { IPhone15, ModelView } from "..";
import { View } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { yellowImg } from "@/utils";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

type calculateRotationType = {
  progress: number;
  start: number;
  end: number;
  from: number;
  to: number;
};

// Helper function
const calculateRotation = ({
  progress,
  start,
  end,
  from,
  to,
}: calculateRotationType) => {
  return progress < start
    ? 0
    : progress > end
      ? -0.7
      : gsap.utils.mapRange(start, end, from, to, progress);
};

export default function Index() {
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });
  const cameraControlSmall = useRef(null);
  const modelRef = useRef(new THREE.Group());

  // Because Next.js uses server-side rendering (SSR) by default. You need to ensure this code runs only on the client-side.
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setEventSource(document.getElementById("root"));
  }, []);

  // Track Progress
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;

        // Map progress from range [0.4, 0.6] to [0, -0.7]
        const rotationY = calculateRotation({
          progress,
          start: 0.45,
          end: 0.55,
          from: 0,
          to: -0.7,
        });

        gsap.to(modelRef.current.rotation, {
          y: rotationY,
          duration: 0.1, // Smooth updates
          ease: "linear",
        });
      },
    });

    // Cleanup function to kill ScrollTrigger instance on unmount
    return () => {
      scrollTriggerInstance.kill();
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="screen-max-width h-[300vh] p-10">
        <div className="flex-col-center">
          <div className="fixed-center h-[85vh] w-full overflow-hidden">
            <ModelView
              index={1}
              name="small"
              position={0}
              groupRef={modelRef}
              controlRef={cameraControlSmall}
              setRotationState={setRotation}
              OrbitControlsEnable={true}
            >
              <IPhone15 scale={[15, 15, 15]} item={model} size="small" />
            </ModelView>

            <Canvas
              className="h-full w-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={eventSource!}
            >
              <View.Port />
            </Canvas>
          </div>
        </div>
      </div>
    </>
  );
}
