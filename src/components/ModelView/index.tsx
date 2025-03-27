"use client";
import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  View,
} from "@react-three/drei";

import * as THREE from "three";
import { Suspense } from "react";

type PropsType = {
  children: any;
  index: number;
  position: number;
  name: string;
  groupRef: any;
  controlRef: any;
  setRotationState: any;
  OrbitControlsEnable: boolean;
};

export default function Index({
  children,
  index,
  position,
  name,
  groupRef,
  controlRef,
  setRotationState,
  OrbitControlsEnable,
}: PropsType) {
  return (
    <View
      index={index}
      id={name}
      className={`absolute h-full w-full right-[${position}%] `}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      {OrbitControlsEnable && (
        <OrbitControls
          makeDefault
          ref={controlRef}
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.4}
          target={new THREE.Vector3(0, 0, 0)}
          onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
        />
      )}

      <group ref={groupRef} name={name} position={[0, 0, 0]}>
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </group>
    </View>
  );
}

// Loader
const Loader = () => {
  return (
    <Html>
      <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
        <div className="h-[10vw] w-[10vw] rounded-full">Loading...</div>
      </div>
    </Html>
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
