import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

function Orb() {
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh>
        <icosahedronGeometry args={[1.2, 1]} />
        <MeshDistortMaterial color="#7c3aed" emissive="#3b82f6" emissiveIntensity={0.25} roughness={0.2} metalness={0.6} distort={0.35} speed={1.5} />
      </mesh>
    </Float>
  );
}

function Ring() {
  return (
    <Float speed={1} rotationIntensity={1} floatIntensity={0.6}>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2, 0.02, 16, 120]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.6} />
      </mesh>
    </Float>
  );
}

export default function ThreeDScene() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[-5, -3, 2]} intensity={1} color="#a855f7" />
      <Orb />
      <Ring />
    </Canvas>
  );
}
