"use client";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import HeaderDashboard from "../ui/molecules/headerDashboard";
import styles from "../dressingroom.module.scss";
import { Canvas } from "@react-three/fiber";
import { XR, ARButton, Interactive } from "@react-three/xr";

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  console.log(user);

  React.useEffect(() => {
    if (user === null) router.push("/");
  }, [user]);

  const [height, setHeight] = useState(0);
  const [width, setwidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setHeight(ref.current.clientHeight);
    setwidth(ref.current.clientWidth);
    console.log(width + " / " + height);
    console.log(ref);
  }, []);

  return (
    <>
      <HeaderDashboard></HeaderDashboard>

      <main className={styles.main}>
        <div ref={ref} id="canvas-container" className={styles.canvas}>
          <ARButton />
          <Canvas
            onCreated={({ gl }) => {
              // Set the pixel ratio based on the device's pixel ratio
              gl.setPixelRatio(window.devicePixelRatio);
            }}
            style={{ width: "100%", height: "100%" }}
          >
            {" "}
            <XR referenceSpace="local-floor">
              {/* <Interactive onHover={() => console.log("hover")}>
                <ambientLight color="yellow" intensity={0.5} />
                <directionalLight position={[10, 10, 5]} />
                <directionalLight position={[1, 10, 10]} intensity={0.1} />
                <Model />
              </Interactive> */}
            </XR>
          </Canvas>
        </div>
      </main>
    </>
  );
}

export default Page;
