"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import HeaderDashboard from "../../../../ui/molecules/headerDashboard";
import styles from "../tasks.module.scss";
import { Canvas } from "@react-three/fiber";
import { XR, ARButton, stopSession } from "@react-three/xr";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { WassenC1 } from "../../../../ui/molecules/WassenC1";
import { WassenC2 } from "../../../../ui/molecules/WassenC2";

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (user === null) router.push("/");
  }, [user]);

  const character = "C1";
  const [isPlaying, setIsPlaying] = useState(false);

  const onStart = () => {
    setIsPlaying(true);
  };

  return (
    <>
      <HeaderDashboard></HeaderDashboard>
      <main className={styles.main}>
        <button
          className={`${styles.header_back} ${styles.prev}`}
          onClick={onStart}
        >
          Start
        </button>
        <div className={styles.countdown}>
          <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={15}
            colors={["#005a96", "#960a00"]}
            colorsTime={[15, 0]}
            onComplete={() => {
              stopSession();
              router.back();
            }}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </div>
        <div id="canvas-container" className={styles.canvas}>
          {character === "C1" ? (
            <Canvas
              camera={{
                position: [0, 2, 1.6],
                fov: 50,
                rotation: [-0.4, 0, 0],
              }}
              style={{ width: "100%", height: "100%" }}
            >
              <XR referenceSpace="local-floor">
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 10, -1]} intensity={2} />
                <WassenC1 position={[0, 0, -1.5]} />
              </XR>
            </Canvas>
          ) : (
            ""
          )}
          {character === "C2" ? (
            <Canvas
              camera={{
                position: [0, 2, 1.6],
                fov: 50,
                rotation: [-0.4, 0, 0],
              }}
              style={{ width: "100%", height: "100%" }}
            >
              <XR referenceSpace="local-floor">
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 10, -1]} intensity={2} />
                <WassenC2 position={[0, 0, -1.5]} />
              </XR>
            </Canvas>
          ) : (
            ""
          )}
          <ARButton />
        </div>
      </main>
    </>
  );
}

export default Page;
