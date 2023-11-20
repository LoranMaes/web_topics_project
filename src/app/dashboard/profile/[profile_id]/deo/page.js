"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "../../../../tasks.module.scss";
import { Canvas } from "@react-three/fiber";
import { XR, ARButton, stopSession } from "@react-three/xr";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { getClient } from "@/firebase/firestore/getData";
import { editClientField } from "@/firebase/firestore/addData";
import HeaderDashboard from "@/ui/molecules/headerDashboard";
import { DeoC1 } from "@/ui/molecules/DeoC1";
import { DeoC2 } from "@/ui/molecules/DeoC2";
import { DeoC3 } from "@/ui/molecules/DeoC3";

function Page({ params }) {
  const { user } = useAuthContext();
  const router = useRouter();
  const [clientInfo, setClientInfo] = useState(null);
  const [character, setCharacter] = useState(null);

  const handleClient = async () => {
    const { result, error } = await getClient(
      "users",
      user.uid,
      params.profile_id
    );
    setClientInfo(result);
    return result;
  };

  useEffect(() => {
    if (user === null) router.push("/");
    const f = async () => {
      let client = await handleClient();
      setCharacter(client.character_id);
    };
    f();
  }, [user]);

  const [isPlaying, setIsPlaying] = useState(false);

  const onStart = () => {
    setIsPlaying(true);
  };

  return (
    <>
      <HeaderDashboard></HeaderDashboard>
      {clientInfo ? (
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
                editClientField(
                  "users",
                  user.uid,
                  "clients",
                  params.profile_id,
                  {
                    progress: clientInfo.progress + 1,
                  }
                )
                  .then(() => {
                    stopSession();
                  })
                  .finally(() => {
                    router.back();
                  });
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
                  <DeoC1 position={[0, 0, -1.5]} />
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
                  <DeoC2 position={[0, 0, -1.5]} />
                </XR>
              </Canvas>
            ) : (
              ""
            )}
            {character === "C3" ? (
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
                  <DeoC3 position={[0, 0, -1.5]} />
                </XR>
              </Canvas>
            ) : (
              ""
            )}
            <ARButton />
          </div>
        </main>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Page;
