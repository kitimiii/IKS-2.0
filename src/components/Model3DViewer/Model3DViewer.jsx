import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, Environment } from '@react-three/drei';
import * as THREE from 'three';
import './Model3DViewer.css';

// 3D Model Component
function Model({
    modelPath,
    baseRotation = [0, 0, 0],
    autoRotateSpeed = 0.35,
    isInteracting,
    modelScale = 1
}) {
    const groupRef = useRef();
    const { scene } = useGLTF(modelPath);

    // Clone the scene to avoid issues with reusing the same model
    const clonedScene = scene.clone();

    useFrame((state, delta) => {
        if (groupRef.current && !isInteracting.current) {
            // Auto-rotation when not interacting
            groupRef.current.rotation.y += delta * autoRotateSpeed;
        }
    });

    return (
        <group ref={groupRef} rotation={baseRotation}>
            <Center>
                <primitive object={clonedScene} scale={modelScale} />
            </Center>
        </group>
    );
}

// Loading Fallback
function LoadingFallback() {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#61554B" wireframe />
        </mesh>
    );
}

export const Model3DViewer = ({
    modelPath = '/models/Stift_platzhalter/scene.gltf',
    // Container dimensions - customizable
    containerWidth = 400,
    containerHeight = 400,
    // Base rotation [x, y, z] in radians - customizable
    baseRotation = [0, 0, 0],
    // Auto-rotation speed - customizable
    autoRotateSpeed = 0.35,
    // Camera settings
    cameraPosition = [0, 0, 5],
    // Background color (transparent by default)
    backgroundColor = 'transparent',
    // Model scale - customizable
    modelScale = 1,
    className = ''
}) => {
    const isInteracting = useRef(false);

    const containerStyle = {
        width: typeof containerWidth === 'number' ? `${containerWidth}px` : containerWidth,
        height: typeof containerHeight === 'number' ? `${containerHeight}px` : containerHeight,
    };

    return (
        <div
            className={`model3d-container ${className}`}
            style={containerStyle}
        >
            <Canvas
                camera={{ position: cameraPosition, fov: 50 }}
                style={{ background: backgroundColor }}
                gl={{ alpha: true, antialias: true }}
            >
                {/* Lighting */}
                <ambientLight intensity={2.5} />
                <directionalLight position={[10, 10, 5]} intensity={4.0} />
                <directionalLight position={[-10, -10, -5]} intensity={2.0} />

                {/* Model */}
                <Suspense fallback={<LoadingFallback />}>
                    <Model
                        modelPath={modelPath}
                        baseRotation={baseRotation}
                        autoRotateSpeed={autoRotateSpeed}
                        isInteracting={isInteracting}
                        modelScale={modelScale}
                    />
                </Suspense>

                {/* Controls - enables drag rotation with touch/mouse */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    onStart={() => {
                        isInteracting.current = true;
                    }}
                    onEnd={() => {
                        // Small delay before re-enabling auto-rotate
                        setTimeout(() => {
                            isInteracting.current = false;
                        }, 500);
                    }}
                    // Touch settings for mobile
                    touches={{
                        ONE: THREE.TOUCH.ROTATE,
                        TWO: THREE.TOUCH.DOLLY_PAN
                    }}
                />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
};

export default Model3DViewer;
