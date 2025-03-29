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
            style={""}
            groupRef={small}
            controlRef={cameraControlSmall}
            setRotationState={setSmallRotation}
            OrbitControlsEnable={true}
            Lights={Lights}
          >
            <IPhone15 scale={[15, 15, 15]} item={model} size={size} />
          </ModelView>

          <ModelView
            index={2}
            name="large"
            style={"-right-full"}
            groupRef={large}
            controlRef={cameraControlLarge}
            setRotationState={setLargeRotation}
            OrbitControlsEnable={true}
            Lights={Lights}
          >
            <IPhone15 scale={[17, 17, 17]} item={model} size={size} />
          </ModelView>

          <Canvas
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

import { Environment, Lightformer } from "@react-three/drei";
const Lights = () => {
  return (
    // group different lights and lightformers. We can use group to organize lights, cameras, meshes, and other objects in the scene.
    <group name="lights">
      {/**
       * @description Environment is used to create a background environment for the scene
       * https://github.com/pmndrs/drei?tab=readme-ov-file#environment
       */}
      <Environment resolution={256}>
        <group>
          {/**
           * @description Lightformer used to create custom lights with various shapes and properties in a 3D scene.
           * https://github.com/pmndrs/drei?tab=readme-ov-file#lightformer
           */}
          <Lightformer
            form="rect"
            intensity={10}
            position={[-1, 0, -10]}
            scale={10}
            color={"#495057"}
          />
          <Lightformer
            form="rect"
            intensity={10}
            position={[-10, 2, 1]}
            scale={10}
            rotation-y={Math.PI / 2}
          />
          <Lightformer
            form="rect"
            intensity={10}
            position={[10, 0, 1]}
            scale={10}
            rotation-y={Math.PI / 2}
          />
        </group>
      </Environment>

      {/**
       * @description spotLight is used to create a light source positioned at a specific point
       * in the scene that emits light in a specific direction.
       * https://threejs.org/docs/#api/en/lights/SpotLight
       */}
      <spotLight
        position={[-2, 10, 5]}
        angle={0.15}
        penumbra={1} // the penumbra is the soft edge of a shadow cast by a point light
        decay={0} // the amount the light dims as it moves away from the source
        intensity={Math.PI * 0.2} // the light intensity
        color={"#f8f9fa"}
      />
      <spotLight
        position={[0, -25, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI * 0.2}
        color={"#f8f9fa"}
      />
      <spotLight
        position={[0, 15, 5]}
        angle={0.15}
        penumbra={1}
        decay={0.1}
        intensity={Math.PI * 3}
      />
    </group>
  );
};
