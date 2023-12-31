/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 wassenC3.gltf 
*/

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function WassenC3(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/wassenC3.gltf");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions["wassen"].play();
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={nodes.mixamorigHips} />
          <group name="Fitness_Grandma_BodyGeo">
            <skinnedMesh
              name="Fitness_Grandma_BodyGeo_1"
              geometry={nodes.Fitness_Grandma_BodyGeo_1.geometry}
              material={materials.Grandma_MAT}
              skeleton={nodes.Fitness_Grandma_BodyGeo_1.skeleton}
            />
            <skinnedMesh
              name="Fitness_Grandma_BodyGeo_2"
              geometry={nodes.Fitness_Grandma_BodyGeo_2.geometry}
              material={materials.Lens_MAT}
              skeleton={nodes.Fitness_Grandma_BodyGeo_2.skeleton}
            />
          </group>
          <skinnedMesh
            name="Fitness_Grandma_BrowsAnimGeo"
            geometry={nodes.Fitness_Grandma_BrowsAnimGeo.geometry}
            material={materials.FitGrandma_Brows_MAT1}
            skeleton={nodes.Fitness_Grandma_BrowsAnimGeo.skeleton}
          />
          <skinnedMesh
            name="Fitness_Grandma_EyesAnimGeo"
            geometry={nodes.Fitness_Grandma_EyesAnimGeo.geometry}
            material={materials.FitGrandma_Eyes_MAT1}
            skeleton={nodes.Fitness_Grandma_EyesAnimGeo.skeleton}
          />
          <skinnedMesh
            name="Fitness_Grandma_MouthAnimGeo"
            geometry={nodes.Fitness_Grandma_MouthAnimGeo.geometry}
            material={materials.FitGrandma_Mouth_MAT1}
            skeleton={nodes.Fitness_Grandma_MouthAnimGeo.skeleton}
          />
        </group>
        <group
          name="Rokoko_Video_Character"
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        >
          <group name="Root">
            <primitive object={nodes.Hips} />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/wassenC3.gltf");
