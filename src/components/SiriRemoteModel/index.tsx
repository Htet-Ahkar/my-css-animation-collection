"use client";
import * as THREE from "three";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { ModelView, SiriRemote } from "..";
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
  const containerRef: any = useRef(null);
  const [containerProgress, setContainerProgress] = useState(0);
  const [isSiriSection, setIsSiriSection] = useState(false);

  useEffect(() => {
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        setContainerProgress(progress);

        const tl = gsap.timeline();

        const rotationY = calculateRotation({
          progress,
          start: 0.3,
          end: 0.4,
          from: 0,
          to: -0.5692,
        });

        setIsSiriSection(progress > 0.7);

        tl.to(modelRef.current.rotation, {
          y: rotationY,
          duration: 0.1,
          ease: "linear",
        });
      },
    });

    const scrollTriggerInstance1 = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: () => {
        const rect = containerRef.current?.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (!rect) return;

        const topPercentage = ((1 - rect.top / viewportHeight) * 100).toFixed(
          2,
        );
        const clampValue = 150;
        const clampedTopPercentage = Math.min(
          clampValue,
          Math.max(0, Number(topPercentage)),
        );

        const scaleValue = gsap.utils.mapRange(
          0,
          clampValue,
          1.2,
          1,
          clampedTopPercentage,
        );
        const positionYValue = gsap.utils.mapRange(
          0,
          clampValue,
          -0.3,
          0,
          clampedTopPercentage,
        );

        gsap.to(modelRef.current.scale, {
          x: scaleValue,
          y: scaleValue,
          z: scaleValue,
          duration: 0.1,
          ease: "linear",
          onUpdate: () => {
            modelRef.current.position.y = positionYValue;
          },
        });
      },
    });

    return () => {
      scrollTriggerInstance.kill();
      scrollTriggerInstance1.kill();
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="relative h-[350vh] max-w-screen">
        {/* Model */}
        <div
          className={`sticky top-[150px] h-screen w-1/2 transition-all ${isSiriSection ? "left-1/10" : "left-[25vw]"}`}
        >
          <ModelView
            index={1}
            name="tv-remote"
            style={"origin-top scale-190"}
            groupRef={modelRef}
            controlRef={cameraControlSmall}
            setRotationState={setRotation}
            OrbitControlsEnable={false}
            Lights={Lights}
          >
            <SiriRemote scale={[4.3, 4.3, 4.3]} item={model} size="normal" />
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

        {/* Text */}
        <Text containerProgress={containerProgress} />

        {/* Siri Text */}
        <SiriText />
      </div>
    </>
  );
}

// Components
const Text = ({ containerProgress }: any) => {
  return (
    <div
      className={`normal-transition absolute top-[100vh] left-1/2 w-[245px] translate-x-[100%] space-y-44 text-[21px] font-semibold text-gray-500 ${containerProgress > 0.2 ? "opacity-100" : "opacity-0"}`}
    >
      <p
        className={`normal-transition ${containerProgress > 0.4 ? "opacity-20" : "opacity-100"}`}
      >
        <span className="text-black">A touch-enabled clickpad.</span> Easily
        swipe through episodes, scenes, or frames with an intuitive circular
        movement. Turn your TV on or off, change the input to Apple TV 4K, and
        control the volume.
      </p>

      <p
        className={`normal-transition ${
          containerProgress > 0.6
            ? "opacity-20"
            : containerProgress > 0.4
              ? "opacity-100"
              : "opacity-0"
        }`}
      >
        <span className="text-black">
          A dedicated Siri button — just like iPhone.
        </span>
        Siri delivers quick and clear ways to interact with your requests right
        on the screen — and with voice recognition for up to six family members,
        Siri lets Apple TV 4K know who's talking and reply with recommendations
        tailored just for them.
        <sup className="align-super text-xs">
          <a href="">15</a>
        </sup>
      </p>
    </div>
  );
};

const SiriText = () => {
  const textData = [
    {
      utterance: ["What should", "I watch?"],
      description: [
        "Siri has personalized recommendations",
        "based on what you've watched.",
      ],
    },
    {
      utterance: ["What did she", "just say?"],
      description: [
        "Rewind the scene 10 seconds, turn on",
        "subtitles, and more.",
      ],
    },
    {
      utterance: ["How high is", "Mount Whitney?"],
      description: [
        "Ask questions and get answers for just",
        "about anything.",
      ],
    },
    {
      utterance: ["Show me the", "babies' room"],
      description: [
        "Keep track of all your connected smart",
        "home accessories in Control Center",
      ],
    },
  ];

  const ref: any = useRef(null);
  const textRefs = useRef<HTMLDivElement[]>([]);
  const triggerPoints = [53, 70, 88, 100];
  const endPoints = [59, 75, 95, 120];

  useEffect(() => {
    if (!ref.current) return;

    const viewportHeight = window.innerHeight;
    const OPACITY_FADE_RANGE = 30;
    const MAX_CLAMP_VALUE = 150;
    const VERTICAL_MOVEMENT_THRESHOLD = 90;
    const ANIMATION_DURATION = 0.1;

    const calculateViewportPercentage = (rect: any) => {
      if (!rect) return 0;
      return Math.min(
        MAX_CLAMP_VALUE,
        Math.max(0, (1 - rect.top / viewportHeight) * 100),
      );
    };

    const calculateOpacity = (
      percentage: number,
      startPoint: number,
      endPoint: number,
    ) => {
      if (percentage >= startPoint && percentage < endPoint) {
        return gsap.utils.mapRange(startPoint, endPoint, 0, 1, percentage);
      } else if (percentage >= endPoint) {
        return gsap.utils.mapRange(
          endPoint,
          endPoint + OPACITY_FADE_RANGE,
          1,
          0.5,
          percentage,
        );
      }
      return 0;
    };

    const calculateVerticalPosition = (percentage: number) => {
      if (percentage <= VERTICAL_MOVEMENT_THRESHOLD) return 0;
      return gsap.utils.mapRange(
        VERTICAL_MOVEMENT_THRESHOLD,
        MAX_CLAMP_VALUE,
        0,
        -100,
        percentage,
      );
    };

    const scrollTrigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: () => {
        const rect = ref.current?.getBoundingClientRect();
        const percentage = calculateViewportPercentage(rect);

        textRefs.current.forEach((el, index) => {
          const startProgress = triggerPoints[index];
          const endProgress = endPoints[index];

          const opacity = calculateOpacity(
            percentage,
            startProgress,
            endProgress,
          );
          const yPosition = calculateVerticalPosition(percentage);

          gsap.to(el, {
            opacity,
            y: yPosition,
            duration: ANIMATION_DURATION,
            ease: "linear",
          });
        });
      },
    });

    return () => scrollTrigger.kill(); // Cleanup
  }, []); // Empty dependency array to run once on mount

  return (
    <div
      ref={ref}
      className="absolute top-[250vh] left-1/2 h-[665px] space-y-5"
    >
      {textData.map((data, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) textRefs.current[index] = el;
          }}
          className="space-y-2 opacity-0"
        >
          <p className="typography-siri-utterance whitespace-pre-line">
            {data.utterance[0]}
            <br />
            {data.utterance[1]}
          </p>
          <p className="text-[21px] font-semibold text-gray-500">
            {data.description[0]}
            <br />
            {data.description[1]}
          </p>
        </div>
      ))}
    </div>
  );
};

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
            scale={5}
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
