"use client";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import HeaderDashboard from "../../../../ui/molecules/headerDashboard";
import styles from "../../../../dressingroom.module.scss";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { editClientField } from "@/firebase/firestore/addData";
import { getClient } from "@/firebase/firestore/getData";

function Page({ params }) {
  const { user } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (user === null) router.push("/");
  }, [user]);

  const [cameraX, setCameraX] = useState(0);

  const onPrev = () => {
    cameraX !== -3.5 ? setCameraX(cameraX - 3.5) : setCameraX(3.5);
  };

  const onNext = () => {
    cameraX !== 3.5 ? setCameraX(cameraX + 3.5) : setCameraX(-3.5);
  };

  const onSelect = async () => {
    let character = "";
    switch (cameraX) {
      case -3.5:
        character = "C3";
        break;
      case 0:
        character = "C1";
        break;
      case 3.5:
        character = "C2";
        break;
    }
    let edit = await editClientField(
      "users",
      user.uid,
      "clients",
      params.profile_id,
      {
        character_id: character,
      }
    );
    console.log(edit);
    router.push("./tasks");
  };

  const fullScreenMain = React.useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const goFullscreen = () => {
    fullScreenMain.current.requestFullscreen()
    setIsFullScreen(true)
  }

  const exitFullscreen = () => {
    document.exitFullscreen()
    setIsFullScreen(false)
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);


  return (
    <>
      <HeaderDashboard></HeaderDashboard>
      <main ref={fullScreenMain} className={styles.main}>
        <button onClick={isFullScreen ? exitFullscreen : goFullscreen} style={{ width: 'fit-content', position: 'absolute', right: '2.4rem', top: '2.4rem', border: 'none', backgroundColor: '#FAFAFA', color: '#2A2A2A', zIndex: 5, padding: '.6rem 2.4rem', fontFamily: 'Poppins', fontWeight: '600' }}>{isFullScreen ? "Exit fullscreen" : "Go fullscreen"}</button>
        <div style={{ position: "absolute", bottom: 0, left: 0, display: 'flex', width: '100%', padding: '4.8rem 10rem', boxSizing: 'border-box' }}>
          <button
            className={`${styles.header_back} ${styles.prev}`}
            onClick={onPrev}
            style={{cursor: "pointer"}}
          >
            &larr;
          </button>
          
          <button
            className={`${styles.header_back} ${styles.select}`}
            onClick={onSelect}
            style={{width: 'fit-content', cursor: 'pointer'}}
          >
            Select
          </button>
          
          <button
            className={`${styles.header_back} ${styles.next}`}
            onClick={onNext}
            style={{cursor: "pointer"}}
          >
            &rarr;
          </button>
        </div>
        <div id="canvas-container" className={styles.canvas}>
          <Canvas
            camera={{
              position: [0, 5, 1.6],
              fov: 50,
              rotation: [-0.4, 0, 0],
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <BackdropView cameraX={cameraX} />
          </Canvas>
        </div>
      </main>
    </>
  );
}

export default Page;

useGLTF.preload("/backdrop.gltf");
useGLTF.preload("/C1Pose.gltf");
useGLTF.preload("/C2Pose.gltf");
useGLTF.preload("/C3Pose.gltf");

const BackdropView = (props) => {
  const gltfBackdrop = useGLTF("/backdrop.gltf");
  const gltfc1 = useGLTF("/C1Pose.gltf");
  const gltfc2 = useGLTF("/C2Pose.gltf");
  const gltfc3 = useGLTF("/C3Pose.gltf");

  useFrame((state) => {
    state.camera.position.lerp({ x: props.cameraX, y: 2, z: 1.6 }, 0.05);
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, -1]} intensity={2} />
      <primitive scale={0.4} position={[0, 0, 0]} object={gltfBackdrop.scene} />
      <primitive scale={1} position={[-3.5, 0, -1]} object={gltfc3.scene} />
      <primitive scale={1} position={[0, 0, -1]} object={gltfc1.scene} />
      <primitive scale={1} position={[3.5, 0, -1]} object={gltfc2.scene} />
    </>
  );
};
