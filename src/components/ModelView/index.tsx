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
  style: string;
  name: string;
  groupRef: any;
  controlRef: any;
  setRotationState: any;
  OrbitControlsEnable: boolean;
  Lights: React.ComponentType;
};

export default function Index({
  children,
  index,
  style,
  name,
  groupRef,
  controlRef,
  setRotationState,
  OrbitControlsEnable,
  Lights,
}: PropsType) {
  return (
    <View index={index} id={name} className={`absolute size-full ${style}`}>
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
