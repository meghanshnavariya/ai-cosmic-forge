import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Dust({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const blue = new THREE.Color("#6aa9ff");
    const purple = new THREE.Color("#9b7bff");
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 34;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
      const c = blue.clone().lerp(purple, Math.random());
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.4;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.055}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Nebula() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (a.current) {
      a.current.rotation.z = t * 0.03;
      a.current.scale.setScalar(1 + Math.sin(t * 0.2) * 0.05);
    }
    if (b.current) {
      b.current.rotation.z = -t * 0.025;
      b.current.scale.setScalar(1 + Math.cos(t * 0.18) * 0.06);
    }
  });

  return (
    <group position={[0, 0, -8]}>
      <mesh ref={a} position={[-6, 2, 0]}>
        <circleGeometry args={[7, 48]} />
        <meshBasicMaterial color="#2b4fd6" transparent opacity={0.12} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={b} position={[7, -3, -2]}>
        <circleGeometry args={[8, 48]} />
        <meshBasicMaterial color="#6b3fd6" transparent opacity={0.11} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function ParallaxRig() {
  useFrame((state, delta) => {
    const { camera, pointer } = state;
    camera.position.x += (pointer.x * 1.2 - camera.position.x) * Math.min(delta * 2, 1);
    camera.position.y += (pointer.y * 0.7 - camera.position.y) * Math.min(delta * 2, 1);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function SpaceBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#0a0a16", 14, 30]} />
        <ambientLight intensity={0.6} />
        <Nebula />
        <Dust />
        <ParallaxRig />
      </Canvas>
    </div>
  );
}
