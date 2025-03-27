"use client";
import gsap from "gsap";
import { IPhone15, ModelView } from "@/components";
import { yellowImg } from "@/utils";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "@/constants";
import { animateWithGsapTimeline } from "@/utils/animations";
import { useEffect, useRef, useState } from "react";

export default function Index() {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });

  // camera control for the model view
  const cameraControlSmall = useRef(null);
  const cameraControlLarge = useRef(null);

  // model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = gsap.timeline();

  useEffect(() => {
    if (size === "large") {
      animateWithGsapTimeline(tl, small, smallRotation, "#small", "#large", {
        transform: "translateX(-100%)",
        duration: 2,
      });
    }

    if (size === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, "#large", "#small", {
        transform: "translateX(0)",
        duration: 2,
      });
    }
  }, [size]);

  // Because Next.js uses server-side rendering (SSR) by default. You need to ensure this code runs only on the client-side.
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setEventSource(document.getElementById("root"));
  }, []);

  return (
    <div className="screen-max-width p-10">
      <div className="flex-col-center">
        <div className="relative h-[75vh] w-full overflow-hidden md:h-[90vh]">
          <ModelView
            index={1}
            name="small"
            position={0}
            groupRef={small}
            controlRef={cameraControlSmall}
            setRotationState={setSmallRotation}
            OrbitControlsEnable={true}
          >
            <IPhone15 scale={[15, 15, 15]} item={model} size={size} />
          </ModelView>

          <ModelView
            index={2}
            name="large"
            position={-100}
            groupRef={large}
            controlRef={cameraControlLarge}
            setRotationState={setLargeRotation}
            OrbitControlsEnable={true}
          >
            <IPhone15 scale={[17, 17, 17]} item={model} size={size} />
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

        {/* Controls */}
        <div className="mx-auto w-full">
          <p className="mb-5 text-center text-sm font-light">{model.title}</p>

          <div className="flex-center">
            <ul className="color-container">
              {models.map((item, i) => (
                <li
                  key={i}
                  className="mx-2 h-6 w-6 cursor-pointer rounded-full"
                  style={{ backgroundColor: item.color[0] }}
                  onClick={() => setModel(item)}
                />
              ))}
            </ul>

            <button className="size-btn-container">
              {sizes.map(({ label, value }) => (
                <span
                  key={label}
                  className="size-btn"
                  style={{
                    backgroundColor: size === value ? "white" : "transparent",
                    color: size === value ? "black" : "white",
                  }}
                  onClick={() => setSize(value)}
                >
                  {label}
                </span>
              ))}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
