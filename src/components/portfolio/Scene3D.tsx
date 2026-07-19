import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Icosahedron, TorusKnot, Octahedron } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Noise } from "@react-three/postprocessing";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const count = 8000;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Constellation-like clustered sphere
      const r = 8 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
      ref.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f0ff"
        size={0.05}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  );
}

function FloatingShape({
  position,
  color,
  speed = 0.3,
  scale = 1,
  kind = "ico",
  wireframe = false,
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
  scale?: number;
  kind?: "ico" | "torus" | "octa";
  wireframe?: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * speed;
    ref.current.rotation.y += delta * speed * 0.7;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.6;
  });
  const material = (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={wireframe ? 1.2 : 0.4}
      wireframe={wireframe}
      metalness={0.6}
      roughness={0.2}
      transparent
      opacity={wireframe ? 0.9 : 0.75}
    />
  );
  const args = [scale, wireframe ? 1 : 0] as [number, number];
  if (kind === "torus")
    return (
      <TorusKnot ref={ref} position={position} args={[scale * 0.7, scale * 0.22, 128, 16]}>
        {material}
      </TorusKnot>
    );
  if (kind === "octa")
    return (
      <Octahedron ref={ref} position={position} args={[scale, 0]}>
        {material}
      </Octahedron>
    );
  return (
    <Icosahedron ref={ref} position={position} args={args}>
      {material}
    </Icosahedron>
  );
}

function OrbitingLight({ radius = 10, speed = 0.4, color = "#00f0ff", y = 4 }: { radius?: number; speed?: number; color?: string; y?: number }) {
  const ref = useRef<THREE.PointLight>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = y + Math.sin(t * 0.6) * 2;
  });
  return <pointLight ref={ref} color={color} intensity={3} distance={30} decay={1.6} />;
}

function CameraRig() {
  useFrame((state) => {
    const { camera, mouse } = state;
    // Subtle mouse-driven parallax + scroll-driven Y drift
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const targetX = mouse.x * 1.6;
    const targetY = mouse.y * 1.0 - scrollY * 0.0015;
    camera.position.x += (targetX - camera.position.x) * 0.03;
    camera.position.y += (targetY - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function NeonGrid() {
  return (
    <gridHelper
      args={[80, 40, "#ff00ff", "#00f0ff"]}
      position={[0, -6, 0]}
      // @ts-ignore drei prop passthrough
      material-opacity={0.35}
    />
  );
}

export function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#07060f"]} />
        <fog attach="fog" args={["#07060f", 12, 40]} />
        <ambientLight intensity={0.4} color="#5a3aff" />
        <Suspense fallback={null}>
          <OrbitingLight radius={10} speed={0.35} color="#00f0ff" y={3} />
          <OrbitingLight radius={12} speed={-0.28} color="#ff00ff" y={-2} />
          <OrbitingLight radius={8} speed={0.45} color="#00ff88" y={5} />
          <ParticleField />
          <FloatingShape position={[-6, 2, -4]} color="#00f0ff" kind="ico" scale={1.2} wireframe />
          <FloatingShape position={[6, -1, -5]} color="#ff00ff" kind="torus" scale={1.1} />
          <FloatingShape position={[3, 3, -3]} color="#00ff88" kind="octa" scale={0.9} wireframe />
          <FloatingShape position={[-5, -2, -6]} color="#0066ff" kind="ico" scale={1.4} />
          <FloatingShape position={[0, 4, -8]} color="#ff00ff" kind="octa" scale={1.6} wireframe />
          <FloatingShape position={[8, 2, -10]} color="#00f0ff" kind="torus" scale={1.3} wireframe />
          <NeonGrid />
          <CameraRig />
          <EffectComposer multisampling={0}>
            <Bloom intensity={1.1} luminanceThreshold={0.15} luminanceSmoothing={0.6} mipmapBlur />
            <ChromaticAberration offset={new THREE.Vector2(0.0009, 0.0012)} />
            <Noise opacity={0.035} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}