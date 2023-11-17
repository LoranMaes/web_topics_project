"use client";
import React from "react";
import * as THREE from "three";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import HeaderDashboard from "../../../../ui/molecules/headerDashboard";
import styles from "../../../../dressingroom.module.scss";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Text3D } from "@react-three/drei";
import { A11y, useA11y, A11yAnnouncer } from "@react-three/a11y";

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  console.log(user);

  React.useEffect(() => {
    if (user === null) router.push("/");
  }, [user]);

  const [activity, setActivity] = useState("");
  const character = "C1";

  // const onDeo = () => {
  //   router.push("/deo");
  // };

  // const onHands = () => {
  //   router.push("/wassen");
  // };

  // const onTeeth = () => {
  //   router.push("/poetsen");
  // };

  return (
    <>
      <HeaderDashboard></HeaderDashboard>
      <main className={styles.main}>
        {/* <button
          className={`${styles.header_back} ${styles.prev}`}
          onClick={onDeo}
        >
          Put on Deodorant
        </button>
        <button
          className={`${styles.header_back} ${styles.next}`}
          onClick={onHands}
        >
          Wash Hands
        </button>
        <button
          className={`${styles.header_back} ${styles.select}`}
          onClick={onTeeth}
        >
          Brush Teeth
        </button> */}
        <div id="canvas-container" className={styles.canvas}>
          <Canvas
            camera={{
              position: [0, 2, 1.6],
              fov: 50,
              rotation: [-0.4, 0, 0],
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <BackdropView character="C1" />
          </Canvas>
          <A11yAnnouncer />
        </div>
      </main>
    </>
  );
}

export default Page;

useGLTF.preload("/backdrop.gltf");
useGLTF.preload("/brush.gltf");
useGLTF.preload("/deo.gltf");
useGLTF.preload("/soap.gltf");

const BackdropView = (props) => {
  const gltfBackdrop = useGLTF("/backdrop.gltf");
  const router = useRouter();

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, -1]} intensity={2} />
      <directionalLight position={[-4, 10, 10]} intensity={0.8} />
      <primitive scale={0.4} position={[0, 0, 0]} object={gltfBackdrop.scene} />
      <A11y
        role="link"
        href="/soap"
        actionCall={() => {
          router.push(`/soap`);
        }}
      >
        <SoapButton />
      </A11y>
      <A11y
        role="link"
        href="/poetsen"
        actionCall={() => {
          router.push(`/poetsen`);
        }}
      >
        <BrushButton />
      </A11y>
      <A11y
        role="link"
        href="/deo"
        actionCall={() => {
          router.push(`/deo`);
        }}
      >
        <DeoButton />
      </A11y>

      {/* <primitive scale={1} position={[0, 0, -1]} object={gltf.scene} /> */}
    </>
  );
};

function BrushButton(props) {
  const a11y = useA11y();
  let brush = useGLTF(`/brush.gltf`);
  const hoverMaterial = new THREE.MeshStandardMaterial({
    color: 0xf9f200,
    emissive: 0xff8080,
    roughness: 0.2,
    metalness: 0.5,
  });
  const normalMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xceb0b1,
    roughness: 0.2,
    metalness: 0.5,
  });

  useFrame((state) => {
    a11y.hover || a11y.focus
      ? state.camera.position.lerp({ x: 0, y: 2, z: 1.6 }, 0.05)
      : state.camera.position.lerp({ x: 0, y: 2, z: 1.6 }, 0.05);
  });

  return (
    <>
      <Text3D
        material={a11y.hover || a11y.focus ? hoverMaterial : normalMaterial}
        position={[-0.54, 1.5, -0.2]}
        scale={0.1}
        font="/poppins.json"
      >
        Tanden Poetsen
      </Text3D>
      <primitive
        scale={a11y.hover || a11y.focus ? 6 : 5}
        position={[0, 0, -0.6]}
        rotation={[0, 1.2, 0]}
        object={brush.scene}
      />
    </>
  );
}

function DeoButton(props) {
  const a11y = useA11y();
  let brush = useGLTF(`/deo.gltf`);
  // let lookAtPos = 0;
  const hoverMaterial = new THREE.MeshStandardMaterial({
    color: 0xf9f200,
    emissive: 0xff8080,
    roughness: 0.2,
    metalness: 0.5,
  });
  const normalMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xceb0b1,
    roughness: 0.2,
    metalness: 0.5,
  });

  useFrame((state) => {
    // if (a11y.hover || a11y.focus) {
    //   lookAtPos < 0.08 ? (lookAtPos += 0.004) : "";
    // }
    // state.camera.lookAt(lookAtPos, 1, 0);
    // console.log(lookAtPos);
    a11y.hover || a11y.focus
      ? state.camera.position.lerp({ x: 0.3, y: 2, z: 1.6 }, 0.05)
      : state.camera.position.lerp({ x: 0, y: 2, z: 1.6 }, 0.05);
  });

  return (
    <>
      <Text3D
        rotation={[0, -0.1, 0]}
        position={[0.35, 1.3, -0.2]}
        scale={0.1}
        material={a11y.hover || a11y.focus ? hoverMaterial : normalMaterial}
        font="/poppins.json"
      >
        Deo Op Doen
      </Text3D>
      <primitive
        scale={a11y.hover || a11y.focus ? 8 : 5}
        // scale={a11y.hover || a11y.focus ? scaleBrush : scaleBrush}
        position={[1, 0, -0.5]}
        rotation={[0, 0, 0]}
        object={brush.scene}
      />
    </>
  );
}

function SoapButton(props) {
  const a11y = useA11y();
  let brush = useGLTF(`/soap.gltf`);
  // let lookAtPos = 0;
  const hoverMaterial = new THREE.MeshStandardMaterial({
    color: 0xf9f200,
    emissive: 0xff8080,
    roughness: 0.2,
    metalness: 0.5,
  });
  const normalMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xceb0b1,
    roughness: 0.2,
    metalness: 0.5,
  });

  useFrame((state) => {
    // if (a11y.hover || a11y.focus) {
    //   lookAtPos > -0.08 ? (lookAtPos -= 0.004) : "";
    // }
    // state.camera.lookAt(lookAtPos, 1, 0);
    // console.log(lookAtPos);
    a11y.hover || a11y.focus
      ? state.camera.position.lerp({ x: -0.3, y: 2, z: 1.6 }, 0.05)
      : state.camera.position.lerp({ x: 0, y: 2, z: 1.6 }, 0.05);
  });

  return (
    <>
      <Text3D
        position={[-1.39, 1.3, -0.2]}
        rotation={[0, 0.1, 0]}
        scale={0.1}
        material={a11y.hover || a11y.focus ? hoverMaterial : normalMaterial}
        font="/poppins.json"
      >
        Handen Wassen
      </Text3D>
      <primitive
        scale={a11y.hover || a11y.focus ? 1.35 : 1}
        // scale={a11y.hover || a11y.focus ? scaleBrush : scaleBrush}
        position={[-1, 0, -0.5]}
        rotation={[0, 0, 0]}
        object={brush.scene}
      />
    </>
  );
}
