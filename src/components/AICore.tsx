import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Icosahedron, Torus } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function CoreBody() {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const energy = Math.min(Math.hypot(state.pointer.x, state.pointer.y), 1.4);
    if (group.current) {
      group.current.rotation.y += delta * (0.18 + energy * 0.35);
      group.current.rotation.x = Math.sin(t * 0.3) * 0.14 + state.pointer.y * 0.18;
    }
    if (shell.current) {
      shell.current.scale.setScalar(1 + Math.sin(t * 1.4) * 0.02 + energy * 0.04);
    }
    if (inner.current) {
      const mat = inner.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.6 + Math.sin(t * 2.2) * 0.5 + energy * 1.4;
      inner.current.rotation.z -= delta * (0.4 + energy);
    }
  });

  return (
    <group ref={group}>
      <Icosahedron ref={shell} args={[1.45, 2]}>
        <meshStandardMaterial
          color="#7fb0ff"
          wireframe
          transparent
          opacity={0.5}
          emissive="#4d8bff"
          emissiveIntensity={0.7}
        />
      </Icosahedron>

      <Icosahedron args={[1.15, 3]}>
        <meshPhysicalMaterial
          color="#1b2a5c"
          roughness={0.15}
          metalness={0.6}
          transparent
          opacity={0.55}
          transmission={0.6}
          thickness={1.2}
        />
      </Icosahedron>

      <Icosahedron ref={inner} args={[0.62, 2]}>
        <meshStandardMaterial color="#cfe4ff" emissive="#68a4ff" emissiveIntensity={2} roughness={0.2} />
      </Icosahedron>

      <Torus args={[2, 0.012, 8, 120]} rotation={[Math.PI / 2.4, 0, 0]}>
        <meshBasicMaterial color="#7aa6ff" transparent opacity={0.55} />
      </Torus>
      <Torus args={[2.35, 0.01, 8, 120]} rotation={[Math.PI / 1.7, 0.4, 0]}>
        <meshBasicMaterial color="#a98bff" transparent opacity={0.45} />
      </Torus>
    </group>
  );
}

function CoreParticles({ count = 320 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.7 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.65;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const energy = Math.min(Math.hypot(state.pointer.x, state.pointer.y), 1.4);
    ref.current.rotation.y -= delta * (0.12 + energy * 0.4);
    ref.current.rotation.x += delta * 0.05;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.035}
        color="#9ec6ff"
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function AICore() {
  return (
    <Canvas dpr={[1, 1.8]} camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[4, 3, 5]} intensity={40} color="#7fb0ff" />
      <pointLight position={[-4, -2, 3]} intensity={26} color="#a17bff" />
      <Environment>
        <Lightformer intensity={2} position={[0, 5, 2]} scale={[8, 8, 1]} color="#dce9ff" />
        <Lightformer
          intensity={1.2}
          color="#8b7bff"
          position={[-5, 0, -2]}
          rotation-y={Math.PI / 2}
          scale={[14, 2, 1]}
        />
      </Environment>
      <CoreBody />
      <CoreParticles />
    </Canvas>
  );
}
