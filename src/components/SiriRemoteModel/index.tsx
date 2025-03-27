"use client";
import * as THREE from "three";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { IPhone15, ModelView, SiriRemote } from "..";
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
    ? from
    : progress > end
      ? to
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
          to: -0.5692,
        });

        gsap.to(modelRef.current.rotation, {
          y: rotationY,
          duration: 0.2, // Smooth updates
          ease: "linear",
        });
      },
    });

    // Cleanup function to kill ScrollTrigger instance on unmount
    return () => {
      scrollTriggerInstance.kill();
    };
  }, []);

  // useEffect(() => {
  //   console.log(rotation);
  // }, [rotation]);

  return (
    <>
      <div
        ref={containerRef}
        className="screen-max-width relative h-[300vh] p-10"
      >
        <div className="fixed-center h-screen w-1/2 -translate-y-0">
          <ModelView
            index={1}
            name="small"
            position={""}
            groupRef={modelRef}
            controlRef={cameraControlSmall}
            setRotationState={setRotation}
            OrbitControlsEnable={false}
            Lights={Lights}
          >
            {/* <IPhone15 scale={[15, 15, 15]} item={model} size="small" /> */}
            <SiriRemote scale={[4, 4, 4]} item={model} size="normal" />
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
      </div>
    </>
  );
}

// Lights
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
            intensity={1}
            position={[-1, 0, -10]}
            scale={10}
            color={"#495057"}
          />
          <Lightformer
            form="rect"
            intensity={2}
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
