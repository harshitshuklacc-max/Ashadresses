import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Wind, Sun, Maximize2, RefreshCw, ShoppingBag, MessageSquare, Check, Eye } from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface ThreeDStudioProps {
  initialGarment?: 'lehenga' | 'saree' | 'anarkali' | 'sherwani';
  initialColor?: string;
  initialTexture?: 'velvet' | 'silk' | 'georgette' | 'brocade';
  compact?: boolean;
  onAddToCart?: (customItem: {
    title: string;
    garmentType: string;
    color: string;
    fabric: string;
    price: number;
  }) => void;
}

export const ThreeDStudio: React.FC<ThreeDStudioProps> = ({
  initialGarment = 'lehenga',
  initialColor = '#991B1B',
  initialTexture = 'velvet',
  compact = false,
  onAddToCart
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [garmentType, setGarmentType] = useState<'lehenga' | 'saree' | 'anarkali' | 'sherwani'>(initialGarment);
  const [colorHex, setColorHex] = useState<string>(initialColor);
  const [textureType, setTextureType] = useState<'velvet' | 'silk' | 'georgette' | 'brocade'>(initialTexture);
  const [goldZari, setGoldZari] = useState<boolean>(true);
  const [windActive, setWindActive] = useState<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [lightingMode, setLightingMode] = useState<'runway' | 'golden' | 'studio'>('runway');
  const [addedToast, setAddedToast] = useState<boolean>(false);

  // References to keep Three.js scene instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const clothMeshRef = useRef<THREE.Mesh | null>(null);
  const dupattaMeshRef = useRef<THREE.Mesh | null>(null);
  const zariMeshRef = useRef<THREE.Mesh | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);

  // Mouse interaction state
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationVelocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());

  // Garment calculation
  const garmentNames: Record<string, string> = {
    lehenga: 'Royal Crimson Kalidar Bridal Lehenga',
    saree: 'Heritage Pre-Draped Banarasi Silk Saree',
    anarkali: 'Flared Floor-Sweeping Anarkali Gown',
    sherwani: 'Imperial Asymmetric Festive Sherwani'
  };

  const garmentPrices: Record<string, number> = {
    lehenga: 48500,
    saree: 18900,
    anarkali: 12499,
    sherwani: 24999
  };

  const currentPrice = garmentPrices[garmentType] + (goldZari ? 2500 : 0);

  // Initialize Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
    camera.position.set(0, 1.2, compact ? 4.8 : 4.4);
    camera.lookAt(0, 0.8, 0);
    cameraRef.current = camera;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting (Three-Point Studio Rig)
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 0.9);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const keyLight = new THREE.DirectionalLight(0xfff1e6, 2.4);
    keyLight.position.set(3, 4, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const fillLight = new THREE.DirectionalLight(0xffe4e6, 1.2);
    fillLight.position.set(-3, 2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffd700, 2.0);
    rimLight.position.set(0, 3, -3.5);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    // Showroom Circular Marble Pedestal
    const pedestalGroup = new THREE.Group();
    const pedestalGeo = new THREE.CylinderGeometry(1.6, 1.7, 0.12, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0xfdfbf7,
      roughness: 0.25,
      metalness: 0.1,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -0.06;
    pedestal.receiveShadow = true;
    pedestalGroup.add(pedestal);

    // Gold Trim Ring around Pedestal
    const ringGeo = new THREE.TorusGeometry(1.64, 0.02, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.2,
    });
    const goldRing = new THREE.Mesh(ringGeo, ringMat);
    goldRing.rotation.x = Math.PI / 2;
    goldRing.position.y = 0.005;
    pedestalGroup.add(goldRing);

    scene.add(pedestalGroup);

    // Root model group for rotation
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Mannequin Core Anatomy
    const mannequinMat = new THREE.MeshStandardMaterial({
      color: 0xf4eee7,
      roughness: 0.4,
      metalness: 0.05
    });

    // Neck & Head abstract finial
    const headFinialGeo = new THREE.SphereGeometry(0.16, 24, 24);
    const headFinial = new THREE.Mesh(headFinialGeo, ringMat);
    headFinial.position.y = 2.05;
    headFinial.castShadow = true;
    modelGroup.add(headFinial);

    const neckGeo = new THREE.CylinderGeometry(0.08, 0.09, 0.25, 24);
    const neck = new THREE.Mesh(neckGeo, mannequinMat);
    neck.position.y = 1.85;
    modelGroup.add(neck);

    // Mannequin Tailor Stand & Stem
    const stemGeo = new THREE.CylinderGeometry(0.035, 0.035, 1.8, 16);
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, metalness: 0.8, roughness: 0.2 });
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.y = 0.9;
    modelGroup.add(stem);

    // Pointer event listeners for 360 rotation & interaction
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !modelGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      modelGroupRef.current.rotation.y += deltaX * 0.01;
      rotationVelocityRef.current = { x: deltaX * 0.005, y: deltaY * 0.005 };
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch support for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !modelGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      modelGroupRef.current.rotation.y += deltaX * 0.012;
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      if (!cameraRef.current) return;
      e.preventDefault();
      const newZ = cameraRef.current.position.z + e.deltaY * 0.002;
      cameraRef.current.position.z = Math.max(2.8, Math.min(6.5, newZ));
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    domElement.addEventListener('wheel', handleWheel, { passive: false });

    // Window resize handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop with cloth waving physics
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const elapsedTime = clockRef.current.getElapsedTime();

      // Gentle auto-rotation when user is not manually dragging
      if (modelGroupRef.current && autoRotate && !isDraggingRef.current) {
        modelGroupRef.current.rotation.y += 0.006;
      }

      // Dynamic Cloth Sway & Wind Wave Simulation
      if (clothMeshRef.current && windActive) {
        const geom = clothMeshRef.current.geometry;
        const position = geom.attributes.position;
        if (position) {
          const count = position.count;
          for (let i = 0; i < count; i++) {
            const y = position.getY(i);
            const originalX = position.getX(i);
            // Lower bottom flared edges sway more dynamically
            if (y < 1.0) {
              const swayFactor = (1.1 - y) * 0.035;
              const wave = Math.sin(elapsedTime * 2.2 + y * 4 + originalX * 3) * swayFactor;
              position.setZ(i, (geom.userData.initialZ?.[i] || 0) + wave);
            }
          }
          position.needsUpdate = true;
        }
      }

      // Floating Dupatta Cascade Wave
      if (dupattaMeshRef.current && windActive) {
        const dGeom = dupattaMeshRef.current.geometry;
        const dPos = dGeom.attributes.position;
        if (dPos) {
          for (let i = 0; i < dPos.count; i++) {
            const dy = dPos.getY(i);
            const wave = Math.sin(elapsedTime * 3.0 + dy * 5) * 0.025;
            dPos.setX(i, (dGeom.userData.initialX?.[i] || 0) + wave);
          }
          dPos.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      domElement.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      if (container && domElement && container.contains(domElement)) {
        container.removeChild(domElement);
      }
      renderer.dispose();
    };
  }, [compact]);

  // Update 3D Geometry and Dress Mesh when Garment Type changes
  useEffect(() => {
    const modelGroup = modelGroupRef.current;
    if (!modelGroup) return;

    // Remove existing garment parts
    if (clothMeshRef.current) {
      modelGroup.remove(clothMeshRef.current);
      clothMeshRef.current.geometry.dispose();
      clothMeshRef.current = null;
    }
    if (dupattaMeshRef.current) {
      modelGroup.remove(dupattaMeshRef.current);
      dupattaMeshRef.current.geometry.dispose();
      dupattaMeshRef.current = null;
    }
    if (zariMeshRef.current) {
      modelGroup.remove(zariMeshRef.current);
      zariMeshRef.current.geometry.dispose();
      zariMeshRef.current = null;
    }

    // Material properties based on texture type
    let roughness = 0.5;
    let metalness = 0.1;
    let opacity = 1.0;
    let transparent = false;

    if (textureType === 'velvet') {
      roughness = 0.88;
      metalness = 0.08;
    } else if (textureType === 'silk') {
      roughness = 0.32;
      metalness = 0.28;
    } else if (textureType === 'georgette') {
      roughness = 0.65;
      opacity = 0.94;
      transparent = true;
    } else if (textureType === 'brocade') {
      roughness = 0.4;
      metalness = 0.42;
    }

    const garmentMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colorHex),
      roughness,
      metalness,
      opacity,
      transparent,
      side: THREE.DoubleSide
    });

    const zariMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.22,
      side: THREE.DoubleSide
    });

    const bodiceMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colorHex),
      roughness: Math.max(0.2, roughness - 0.1),
      metalness: metalness + 0.1
    });

    // Construct tailored bodice/choli for all women garments, or full coat for sherwani
    if (garmentType === 'sherwani') {
      // Menswear tailored royal coat
      const coatGeo = new THREE.CylinderGeometry(0.32, 0.45, 1.25, 32, 16);
      const coat = new THREE.Mesh(coatGeo, garmentMaterial);
      coat.position.y = 1.25;
      coat.castShadow = true;
      modelGroup.add(coat);
      clothMeshRef.current = coat;

      // Mandarin collar
      const collarGeo = new THREE.TorusGeometry(0.18, 0.04, 16, 32);
      const collar = new THREE.Mesh(collarGeo, zariMaterial);
      collar.rotation.x = Math.PI / 2;
      collar.position.y = 1.82;
      modelGroup.add(collar);

      // Gold buttons strip
      if (goldZari) {
        const buttonStripGroup = new THREE.Group();
        for (let i = 0; i < 7; i++) {
          const btnGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.015, 16);
          const btn = new THREE.Mesh(btnGeo, zariMaterial);
          btn.rotation.x = Math.PI / 2;
          btn.position.set(0, 1.7 - i * 0.12, 0.35 - i * 0.012);
          buttonStripGroup.add(btn);
        }
        modelGroup.add(buttonStripGroup);
        zariMeshRef.current = buttonStripGroup as any;
      }
    } else {
      // Women's Royal Ethnic Couture
      // 1. Choli / Blouse
      const choliGeo = new THREE.CylinderGeometry(0.25, 0.28, 0.45, 32);
      const choli = new THREE.Mesh(choliGeo, bodiceMaterial);
      choli.position.y = 1.55;
      choli.castShadow = true;
      modelGroup.add(choli);

      // 2. Skirt / Flare / Drape Geometry
      let skirtGeo: THREE.BufferGeometry;
      if (garmentType === 'lehenga') {
        // Voluminous 16-Kali Kalidar Flared Bridal Skirt
        skirtGeo = new THREE.CylinderGeometry(0.28, 1.15, 1.35, 48, 24, true);
      } else if (garmentType === 'anarkali') {
        // Floor-sweeping flared Anarkali gown
        skirtGeo = new THREE.CylinderGeometry(0.28, 0.95, 1.45, 48, 24, true);
      } else {
        // Banarasi Pre-Draped Saree Silhouette with front pleats
        skirtGeo = new THREE.CylinderGeometry(0.28, 0.65, 1.35, 40, 24, true);
      }

      // Store initial Z positions for vertex shader wave physics
      const pos = skirtGeo.attributes.position;
      const initialZ: number[] = [];
      for (let i = 0; i < pos.count; i++) {
        initialZ.push(pos.getZ(i));
      }
      skirtGeo.userData = { initialZ };

      const skirt = new THREE.Mesh(skirtGeo, garmentMaterial);
      skirt.position.y = 0.72;
      skirt.castShadow = true;
      modelGroup.add(skirt);
      clothMeshRef.current = skirt;

      // 3. Ornate Gold Zari Border Hem
      if (goldZari) {
        const borderRadius = garmentType === 'lehenga' ? 1.15 : garmentType === 'anarkali' ? 0.95 : 0.65;
        const borderGeo = new THREE.CylinderGeometry(borderRadius * 0.98, borderRadius * 1.02, 0.12, 48, 1, true);
        const borderMesh = new THREE.Mesh(borderGeo, zariMaterial);
        borderMesh.position.y = 0.1;
        modelGroup.add(borderMesh);
        zariMeshRef.current = borderMesh;
      }

      // 4. Regal Dupatta / Pallu Drape
      const dupattaGeo = new THREE.PlaneGeometry(0.35, 1.6, 12, 32);
      const dPos = dupattaGeo.attributes.position;
      const initialX: number[] = [];
      for (let i = 0; i < dPos.count; i++) {
        initialX.push(dPos.getX(i));
      }
      dupattaGeo.userData = { initialX };

      const dupattaMat = new THREE.MeshStandardMaterial({
        color: garmentType === 'saree' ? new THREE.Color(colorHex) : 0xfffdf7,
        roughness: 0.3,
        metalness: 0.25,
        opacity: garmentType === 'saree' ? 1.0 : 0.88,
        transparent: true,
        side: THREE.DoubleSide
      });

      const dupatta = new THREE.Mesh(dupattaGeo, dupattaMat);
      // Drape over left shoulder to waist
      dupatta.position.set(-0.25, 1.1, 0.22);
      dupatta.rotation.z = -0.3;
      dupatta.rotation.y = 0.4;
      dupatta.castShadow = true;
      modelGroup.add(dupatta);
      dupattaMeshRef.current = dupatta;
    }
  }, [garmentType, colorHex, textureType, goldZari]);

  // Adjust Lighting Preset
  useEffect(() => {
    if (!keyLightRef.current || !rimLightRef.current || !ambientLightRef.current) return;

    if (lightingMode === 'runway') {
      keyLightRef.current.color.setHex(0xfff1e6);
      keyLightRef.current.intensity = 2.5;
      rimLightRef.current.color.setHex(0xd4af37);
      rimLightRef.current.intensity = 2.4;
      ambientLightRef.current.intensity = 0.9;
    } else if (lightingMode === 'golden') {
      keyLightRef.current.color.setHex(0xffb74d);
      keyLightRef.current.intensity = 3.0;
      rimLightRef.current.color.setHex(0xff9800);
      rimLightRef.current.intensity = 2.8;
      ambientLightRef.current.intensity = 0.7;
    } else {
      // Clean Studio White
      keyLightRef.current.color.setHex(0xffffff);
      keyLightRef.current.intensity = 2.2;
      rimLightRef.current.color.setHex(0xffffff);
      rimLightRef.current.intensity = 1.2;
      ambientLightRef.current.intensity = 1.3;
    }
  }, [lightingMode]);

  const resetCamera = () => {
    if (cameraRef.current && modelGroupRef.current) {
      cameraRef.current.position.set(0, 1.2, compact ? 4.8 : 4.4);
      modelGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  const handleOrderCustomDesign = () => {
    if (onAddToCart) {
      onAddToCart({
        title: `${garmentNames[garmentType]} (Custom 3D Atelier)`,
        garmentType,
        color: colorHex,
        fabric: textureType,
        price: currentPrice
      });
      setAddedToast(true);
      setTimeout(() => setAddedToast(false), 3000);
    }
  };

  const colors = [
    { name: 'Imperial Crimson', hex: '#991B1B' },
    { name: 'Royal Ruby', hex: '#B91C1C' },
    { name: 'Heritage Wine Maroon', hex: '#7F1D1D' },
    { name: 'Vermilion Flame', hex: '#DC2626' },
    { name: 'Ivory Pearl Contrast', hex: '#FFF8F0' },
  ];

  const fabrics = [
    { id: 'velvet', label: 'Micro Velvet', desc: 'Deep luster & royal weight' },
    { id: 'silk', label: 'Pure Katan Silk', desc: 'Fluid drape & natural sheen' },
    { id: 'georgette', label: 'Feather Georgette', desc: 'Voluminous tiered flutter' },
    { id: 'brocade', label: 'Banarasi Brocade', desc: 'Woven antique gold threads' },
  ];

  return (
    <div className={`relative bg-gradient-to-b from-[#FCFCFA] via-white to-[#FDF8F6] border border-red-100/70 rounded-2xl overflow-hidden shadow-xl ${compact ? 'p-3' : 'p-6 lg:p-8'}`}>
      {/* 3D Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-red-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-red-800 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Mannequin Atelier</span>
            <span aria-hidden="true">·</span>
            <span>Real-Time Cloth Physics</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-serif font-bold text-slate-900 mt-1">
            {garmentNames[garmentType]}
          </h2>
        </div>

        {/* Price & Primary 3D Buy Trigger */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="block text-xs text-slate-500">Atelier Configured Price</span>
            <span className="text-xl lg:text-2xl font-bold text-red-900 font-mono tabular-nums">
              ₹{currentPrice.toLocaleString('en-IN')}
            </span>
          </div>
          <button
            onClick={handleOrderCustomDesign}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-800 hover:bg-red-900 text-white text-sm font-medium rounded-xl shadow-md shadow-red-900/10 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer"
          >
            {addedToast ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add 3D Design to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main 3D Viewport & Control Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
        {/* 3D WebGL Canvas Container */}
        <div className="lg:col-span-8 relative">
          <div
            ref={mountRef}
            className="w-full h-[400px] sm:h-[460px] lg:h-[540px] rounded-xl bg-gradient-to-b from-[#FBF9F6] to-[#F5ECE8] relative cursor-grab active:cursor-grabbing overflow-hidden border border-red-50"
            title="Drag to rotate 360°, scroll to zoom"
          >
            {/* HUD Overlay - Top Left: 360 Inspection Hint */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md text-white rounded-lg text-xs font-medium">
              <Eye className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>360° Drag & Zoom to Inspect Fabric</span>
            </div>

            {/* HUD Overlay - Top Right: Quick Action Buttons */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`p-2 rounded-lg text-xs transition-colors backdrop-blur-md cursor-pointer ${
                  autoRotate ? 'bg-red-800 text-white' : 'bg-white/80 text-slate-700 hover:bg-white'
                }`}
                title="Toggle Auto Rotation"
              >
                <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
              </button>
              <button
                onClick={() => setWindActive(!windActive)}
                className={`p-2 rounded-lg text-xs transition-colors backdrop-blur-md cursor-pointer ${
                  windActive ? 'bg-red-800 text-white' : 'bg-white/80 text-slate-700 hover:bg-white'
                }`}
                title="Toggle Fabric Sway Motion"
              >
                <Wind className="w-4 h-4" />
              </button>
              <button
                onClick={resetCamera}
                className="p-2 rounded-lg text-xs bg-white/80 hover:bg-white text-slate-700 transition-colors backdrop-blur-md cursor-pointer"
                title="Reset Camera Angle"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* HUD Overlay - Bottom Bar: Real-time Lighting Switcher */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 p-1 bg-black/60 backdrop-blur-md rounded-xl text-xs text-white">
              <span className="px-2 text-slate-300 text-[11px]">Lighting:</span>
              <button
                onClick={() => setLightingMode('runway')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  lightingMode === 'runway' ? 'bg-red-700 text-white font-medium' : 'text-slate-300 hover:text-white'
                }`}
              >
                Runway Key
              </button>
              <button
                onClick={() => setLightingMode('golden')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  lightingMode === 'golden' ? 'bg-red-700 text-white font-medium' : 'text-slate-300 hover:text-white'
                }`}
              >
                Golden Hour
              </button>
              <button
                onClick={() => setLightingMode('studio')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  lightingMode === 'studio' ? 'bg-red-700 text-white font-medium' : 'text-slate-300 hover:text-white'
                }`}
              >
                Studio White
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 mt-2 px-1">
            <span>Pedestal: White Italian Marble with 24K Gold Inlay</span>
            <span>Handmade at Asha Dresses nx Bilaspur Studio</span>
          </div>
        </div>

        {/* Right Configuration Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. Garment Silhouette Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wide mb-2.5">
              1. Select Silhouette
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['lehenga', 'saree', 'anarkali', 'sherwani'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setGarmentType(type)}
                  className={`p-3 text-left rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    garmentType === type
                      ? 'border-red-700 bg-red-50/70 text-red-900 shadow-sm ring-1 ring-red-700'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="font-semibold capitalize text-sm">{type}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">₹{garmentPrices[type].toLocaleString('en-IN')}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Color Palette */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wide mb-2.5">
              2. Haute Red & Ivory Palette
            </label>
            <div className="flex items-center gap-3">
              {colors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setColorHex(c.hex)}
                  className={`relative w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                    colorHex === c.hex ? 'scale-110 border-slate-900 shadow-md ring-2 ring-red-300' : 'border-slate-200 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {colorHex === c.hex && (
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-bold drop-shadow">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="text-xs text-slate-600 mt-1.5">
              Selected: <span className="font-medium text-slate-900">{colors.find((c) => c.hex === colorHex)?.name}</span>
            </div>
          </div>

          {/* 3. Pure Fabric Texture */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wide mb-2.5">
              3. Fabric & Texture Weave
            </label>
            <div className="space-y-1.5">
              {fabrics.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setTextureType(f.id as any)}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    textureType === f.id
                      ? 'border-red-700 bg-red-50/60 text-red-950 font-medium'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <span className="font-semibold text-slate-900">{f.label}</span>
                    <span className="text-[11px] text-slate-500 block">{f.desc}</span>
                  </div>
                  {textureType === f.id && <span className="text-red-700 font-bold text-xs">Active</span>}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Ornate Gold Zari Border Option */}
          <div className="p-3.5 bg-amber-50/60 border border-amber-200/80 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Heavy Tested Gold Zari Trim
                </span>
                <span className="text-[11px] text-amber-800 block mt-0.5">
                  Hand-embroidered gold bullion thread borders (+₹2,500)
                </span>
              </div>
              <input
                type="checkbox"
                checked={goldZari}
                onChange={(e) => setGoldZari(e.target.checked)}
                className="w-4 h-4 accent-red-800 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Direct WhatsApp Consultation */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(
                `Namaste Asha Dresses nx! I designed a custom 3D ${garmentNames[garmentType]} in ${colors.find(c => c.hex === colorHex)?.name} with ${textureType} fabric on your website. Please share tailoring details and availability at your Bilaspur Civil Lines showroom.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-red-800 text-red-900 hover:bg-red-50 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Discuss via WhatsApp Stylist</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
