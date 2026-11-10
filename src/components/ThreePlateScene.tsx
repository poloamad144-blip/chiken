import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreePlateSceneProps {
  onHeroMoment: () => void;
  onImpact: (intensity: number) => void;
  isTransitioning: boolean;
}

interface ChickenPieceState {
  mesh: THREE.Group;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  rot: THREE.Euler;
  rotVel: THREE.Vector3;
  targetScale: number;
  radius: number;
  dropped: boolean;
  dropTime: number;
  impactCount: number;
  settled: boolean;
  type: 'drumstick' | 'thigh' | 'wing';
}

interface CrumbParticle {
  mesh: THREE.Mesh;
  vel: THREE.Vector3;
  rotVel: THREE.Vector3;
  life: number;
  maxLife: number;
  active: boolean;
}

export const ThreePlateScene: React.FC<ThreePlateSceneProps> = ({
  onHeroMoment,
  onImpact,
  isTransitioning,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animFrameId = 0;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060404);
    scene.fog = new THREE.FogExp2(0x080505, 0.038);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 2.8, 6.0); // Start close to the plate
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. Studio Lighting Setup
    // Ambient / Fill
    const ambientLight = new THREE.AmbientLight(0x221111, 1.2);
    scene.add(ambientLight);

    // Warm Golden Key Light (Directional with shadow)
    const keyLight = new THREE.DirectionalLight(0xffdf99, 4.5);
    keyLight.position.set(5, 12, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.camera.left = -6;
    keyLight.shadow.camera.right = 6;
    keyLight.shadow.camera.top = 6;
    keyLight.shadow.camera.bottom = -6;
    keyLight.shadow.bias = -0.0006;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    // Intense Crimson Red Backlight / Rim Light
    const rimLight = new THREE.DirectionalLight(0xc8102e, 6.5);
    rimLight.position.set(-7, 8, -6);
    scene.add(rimLight);

    // Secondary Warm Golden Hearth Light
    const hearthLight = new THREE.PointLight(0xf5b82e, 3.0, 16);
    hearthLight.position.set(0, 6, -2);
    scene.add(hearthLight);

    // Hero Spotlight (ignites on hero moment)
    const heroSpotlight = new THREE.SpotLight(0xffe28a, 0, 25, Math.PI / 4, 0.4, 1.2);
    heroSpotlight.position.set(0, 10, 0);
    heroSpotlight.target.position.set(0, 0, 0);
    scene.add(heroSpotlight);
    scene.add(heroSpotlight.target);

    // 3. Studio Ground / Table Surface
    const groundGeo = new THREE.PlaneGeometry(40, 40);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x090606,
      roughness: 0.85,
      metalness: 0.1,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.42;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // 4. Procedural Textures for Stoneware Plate & Crispy Fried Chicken
    const createStonewareTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#141010';
        ctx.fillRect(0, 0, 512, 512);
        // Concentric throwing rings
        for (let i = 0; i < 512; i += 4) {
          ctx.strokeStyle = `rgba(255,255,255,${0.015 + Math.random() * 0.03})`;
          ctx.beginPath();
          ctx.arc(256, 256, i / 2, 0, Math.PI * 2);
          ctx.stroke();
        }
        // Micro speckles
        for (let i = 0; i < 4000; i++) {
          const x = Math.random() * 512;
          const y = Math.random() * 512;
          const brightness = Math.random() > 0.8 ? 200 : 40;
          ctx.fillStyle = `rgba(${brightness},${brightness * 0.8},${brightness * 0.7},0.08)`;
          ctx.fillRect(x, y, 1.5, 1.5);
        }
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      return tex;
    };

    const createCrunchTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Deep golden fried chicken base
        const grad = ctx.createLinearGradient(0, 0, 512, 512);
        grad.addColorStop(0, '#be6c14');
        grad.addColorStop(0.5, '#dc8a24');
        grad.addColorStop(1, '#9e520d');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);

        // Flaky acoustic batter ridges
        for (let i = 0; i < 3500; i++) {
          const x = Math.random() * 512;
          const y = Math.random() * 512;
          const r = 2 + Math.random() * 5;
          ctx.fillStyle = Math.random() > 0.4 ? 'rgba(245, 184, 46, 0.45)' : 'rgba(110, 48, 8, 0.5)';
          ctx.beginPath();
          ctx.ellipse(x, y, r, r * 0.6, Math.random() * Math.PI, 0, Math.PI * 2);
          ctx.fill();
        }
        // Cracked black peppercorn seasoning specks
        ctx.fillStyle = 'rgba(20, 15, 15, 0.85)';
        for (let i = 0; i < 800; i++) {
          ctx.fillRect(Math.random() * 512, Math.random() * 512, 1.5, 1.5);
        }
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    const stonewareBumpTex = createStonewareTexture();
    const crunchColorTex = createCrunchTexture();

    // 5. Massive 3D Black Serving Platter
    // High-precision curved profile using LatheGeometry
    const platePoints: THREE.Vector2[] = [];
    platePoints.push(new THREE.Vector2(0, -0.22));
    platePoints.push(new THREE.Vector2(2.4, -0.22));
    platePoints.push(new THREE.Vector2(2.6, -0.28)); // Foot rim
    platePoints.push(new THREE.Vector2(2.8, -0.22));
    platePoints.push(new THREE.Vector2(3.6, -0.12));
    platePoints.push(new THREE.Vector2(4.1, 0.08));  // Bowl curve
    platePoints.push(new THREE.Vector2(4.4, 0.38));  // Rim rise
    platePoints.push(new THREE.Vector2(4.55, 0.44)); // Enameled outer bevel
    platePoints.push(new THREE.Vector2(4.65, 0.38));
    platePoints.push(new THREE.Vector2(4.6, 0.18));  // Outer underside
    platePoints.push(new THREE.Vector2(4.3, -0.05));
    platePoints.push(new THREE.Vector2(3.6, -0.22));
    platePoints.push(new THREE.Vector2(0, -0.22));

    const plateGeo = new THREE.LatheGeometry(platePoints, 64);
    plateGeo.computeVertexNormals();

    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x110d0d,
      roughness: 0.38,
      metalness: 0.18,
      bumpMap: stonewareBumpTex,
      bumpScale: 0.02,
    });

    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    plateMesh.receiveShadow = true;
    plateMesh.castShadow = true;

    // Red Enameled Rim Accent Ring
    const rimRingGeo = new THREE.TorusGeometry(4.5, 0.07, 16, 64);
    const rimRingMat = new THREE.MeshStandardMaterial({
      color: 0xc8102e,
      roughness: 0.22,
      metalness: 0.45,
    });
    const rimRingMesh = new THREE.Mesh(rimRingGeo, rimRingMat);
    rimRingMesh.rotation.x = Math.PI / 2;
    rimRingMesh.position.y = 0.42;

    const plateGroup = new THREE.Group();
    plateGroup.add(plateMesh);
    plateGroup.add(rimRingMesh);
    plateGroup.position.set(0, -0.15, 0);
    scene.add(plateGroup);

    // Contact Shadow Plane directly beneath plate
    const contactShadowGeo = new THREE.PlaneGeometry(10, 10);
    const contactCanvas = document.createElement('canvas');
    contactCanvas.width = 256;
    contactCanvas.height = 256;
    const cctx = contactCanvas.getContext('2d');
    if (cctx) {
      const g = cctx.createRadialGradient(128, 128, 20, 128, 128, 128);
      g.addColorStop(0, 'rgba(0,0,0,0.85)');
      g.addColorStop(0.6, 'rgba(0,0,0,0.4)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      cctx.fillStyle = g;
      cctx.fillRect(0, 0, 256, 256);
    }
    const contactTex = new THREE.CanvasTexture(contactCanvas);
    const contactMat = new THREE.MeshBasicMaterial({
      map: contactTex,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });
    const contactMesh = new THREE.Mesh(contactShadowGeo, contactMat);
    contactMesh.rotation.x = -Math.PI / 2;
    contactMesh.position.y = -0.4;
    scene.add(contactMesh);

    // 6. 3D Procedural Chicken Piece Generators
    const chickenMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: crunchColorTex,
      roughness: 0.65,
      metalness: 0.05,
      bumpMap: crunchColorTex,
      bumpScale: 0.05,
    });

    const boneMat = new THREE.MeshStandardMaterial({
      color: 0xeadbc8,
      roughness: 0.4,
      metalness: 0.1,
    });

    // Generator 1: Drumstick
    const createDrumstickGroup = (): THREE.Group => {
      const group = new THREE.Group();
      
      // Meat head (distorted bulbous sphere)
      const headGeo = new THREE.SphereGeometry(0.75, 24, 20);
      const posAttr = headGeo.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const vx = posAttr.getX(i);
        const vy = posAttr.getY(i);
        const vz = posAttr.getZ(i);
        // Add organic crunchy bumpy displacement
        const noise = (Math.sin(vx * 7) * Math.cos(vy * 6) + Math.sin(vz * 8)) * 0.08;
        posAttr.setXYZ(i, vx * (1 + noise), vy * 1.25 * (1 + noise), vz * (1 + noise));
      }
      headGeo.computeVertexNormals();
      const headMesh = new THREE.Mesh(headGeo, chickenMat);
      headMesh.position.set(0, 0.4, 0);
      headMesh.castShadow = true;
      headMesh.receiveShadow = true;
      group.add(headMesh);

      // Flaky crunch clusters attached to meat
      for (let c = 0; c < 12; c++) {
        const flakeGeo = new THREE.DodecahedronGeometry(0.18 + Math.random() * 0.12, 0);
        const flakeMesh = new THREE.Mesh(flakeGeo, chickenMat);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const rad = 0.72;
        flakeMesh.position.set(
          Math.sin(phi) * Math.cos(theta) * rad,
          0.4 + Math.cos(phi) * rad * 1.1,
          Math.sin(phi) * Math.sin(theta) * rad
        );
        flakeMesh.rotation.set(Math.random(), Math.random(), Math.random());
        flakeMesh.castShadow = true;
        group.add(flakeMesh);
      }

      // Bone Stem
      const boneStemGeo = new THREE.CylinderGeometry(0.12, 0.16, 0.9, 12);
      const boneStem = new THREE.Mesh(boneStemGeo, boneMat);
      boneStem.position.set(0, -0.45, 0);
      boneStem.castShadow = true;
      group.add(boneStem);

      // Bone End Joint Knobs
      const knob1 = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 10), boneMat);
      knob1.position.set(0.1, -0.88, 0);
      const knob2 = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 10), boneMat);
      knob2.position.set(-0.1, -0.88, 0);
      group.add(knob1);
      group.add(knob2);

      return group;
    };

    // Generator 2: Chunky Thigh Piece
    const createThighGroup = (): THREE.Group => {
      const group = new THREE.Group();
      const mainGeo = new THREE.SphereGeometry(0.95, 24, 20);
      const posAttr = mainGeo.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        let vx = posAttr.getX(i);
        let vy = posAttr.getY(i) * 0.7; // Flattened irregular thigh shape
        let vz = posAttr.getZ(i) * 1.25;
        const noise = (Math.sin(vx * 6) + Math.cos(vz * 6)) * 0.12;
        posAttr.setXYZ(i, vx + noise, vy + noise * 0.6, vz + noise);
      }
      mainGeo.computeVertexNormals();
      const mainMesh = new THREE.Mesh(mainGeo, chickenMat);
      mainMesh.castShadow = true;
      mainMesh.receiveShadow = true;
      group.add(mainMesh);

      // Additional jagged crunchy clusters
      for (let c = 0; c < 16; c++) {
        const flakeGeo = new THREE.DodecahedronGeometry(0.22 + Math.random() * 0.15, 0);
        const flakeMesh = new THREE.Mesh(flakeGeo, chickenMat);
        flakeMesh.position.set(
          (Math.random() - 0.5) * 1.4,
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 1.5
        );
        flakeMesh.rotation.set(Math.random(), Math.random(), Math.random());
        flakeMesh.castShadow = true;
        group.add(flakeMesh);
      }

      return group;
    };

    // Generator 3: Crispy Wing Joint
    const createWingGroup = (): THREE.Group => {
      const group = new THREE.Group();
      
      // Flat segment
      const flatGeo = new THREE.CapsuleGeometry(0.45, 0.9, 14, 16);
      const flatMesh = new THREE.Mesh(flatGeo, chickenMat);
      flatMesh.rotation.z = 0.5;
      flatMesh.castShadow = true;
      group.add(flatMesh);

      // Drumette segment at angle
      const drumGeo = new THREE.CapsuleGeometry(0.48, 0.8, 14, 16);
      const drumMesh = new THREE.Mesh(drumGeo, chickenMat);
      drumMesh.position.set(0.65, 0.45, 0.1);
      drumMesh.rotation.z = -0.7;
      drumMesh.castShadow = true;
      group.add(drumMesh);

      // Flakes
      for (let c = 0; c < 10; c++) {
        const flakeGeo = new THREE.DodecahedronGeometry(0.18 + Math.random() * 0.12, 0);
        const flakeMesh = new THREE.Mesh(flakeGeo, chickenMat);
        flakeMesh.position.set(
          (Math.random() - 0.5) * 1.2,
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.8
        );
        flakeMesh.castShadow = true;
        group.add(flakeMesh);
      }

      return group;
    };

    // 7. Instantiate 7 Distinct Physical Chicken Pieces
    const piecesData: {
      type: 'drumstick' | 'thigh' | 'wing';
      spawnX: number;
      spawnZ: number;
      dropTime: number;
      rotSpeed: THREE.Vector3;
      radius: number;
    }[] = [
      { type: 'thigh', spawnX: 0.1, spawnZ: -0.1, dropTime: 1.6, rotSpeed: new THREE.Vector3(2.5, 1.8, 0.8), radius: 0.85 },
      { type: 'drumstick', spawnX: -1.3, spawnZ: -0.5, dropTime: 2.2, rotSpeed: new THREE.Vector3(3.2, -2.1, 1.5), radius: 0.75 },
      { type: 'wing', spawnX: 1.2, spawnZ: 0.4, dropTime: 2.8, rotSpeed: new THREE.Vector3(-2.8, 3.0, -1.2), radius: 0.75 },
      { type: 'drumstick', spawnX: 0.6, spawnZ: -1.2, dropTime: 3.4, rotSpeed: new THREE.Vector3(1.8, -2.8, 2.2), radius: 0.75 },
      { type: 'thigh', spawnX: -0.8, spawnZ: 0.8, dropTime: 3.9, rotSpeed: new THREE.Vector3(-1.9, 2.2, -2.4), radius: 0.85 },
      { type: 'wing', spawnX: -0.3, spawnZ: -0.9, dropTime: 4.4, rotSpeed: new THREE.Vector3(2.2, 1.9, 3.1), radius: 0.75 },
      { type: 'thigh', spawnX: 0.05, spawnZ: 0.1, dropTime: 5.0, rotSpeed: new THREE.Vector3(1.2, 0.9, -1.1), radius: 0.9 }, // Supreme Apex Crown
    ];

    const chickenPieces: ChickenPieceState[] = piecesData.map((data) => {
      let group: THREE.Group;
      if (data.type === 'drumstick') group = createDrumstickGroup();
      else if (data.type === 'thigh') group = createThighGroup();
      else group = createWingGroup();

      group.position.set(data.spawnX, 15, data.spawnZ); // Start way above screen
      group.visible = false;
      scene.add(group);

      return {
        mesh: group,
        pos: new THREE.Vector3(data.spawnX, 15, data.spawnZ),
        vel: new THREE.Vector3(0, 0, 0),
        rot: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
        rotVel: data.rotSpeed,
        targetScale: 1.0,
        radius: data.radius,
        dropped: false,
        dropTime: data.dropTime,
        impactCount: 0,
        settled: false,
        type: data.type,
      };
    });

    // 8. 3D Golden Crumb Particle Pool
    const MAX_CRUMBS = 180;
    const crumbGeo = new THREE.DodecahedronGeometry(0.06, 0);
    const crumbMat = new THREE.MeshStandardMaterial({
      color: 0xf5b82e,
      roughness: 0.4,
      metalness: 0.2,
      emissive: 0x6e3808,
      emissiveIntensity: 0.3,
    });

    const crumbPool: CrumbParticle[] = [];
    for (let i = 0; i < MAX_CRUMBS; i++) {
      const cmesh = new THREE.Mesh(crumbGeo, crumbMat);
      cmesh.visible = false;
      cmesh.castShadow = true;
      scene.add(cmesh);
      crumbPool.push({
        mesh: cmesh,
        vel: new THREE.Vector3(),
        rotVel: new THREE.Vector3(),
        life: 0,
        maxLife: 1.5,
        active: false,
      });
    }

    const spawnCrumbBurst = (origin: THREE.Vector3, count: number) => {
      let spawned = 0;
      for (const p of crumbPool) {
        if (!p.active) {
          p.active = true;
          p.mesh.visible = true;
          p.mesh.position.copy(origin);
          // Random outward and upward explosion velocity
          const angle = Math.random() * Math.PI * 2;
          const speed = 2.5 + Math.random() * 4.5;
          p.vel.set(
            Math.cos(angle) * speed,
            4.0 + Math.random() * 5.0,
            Math.sin(angle) * speed
          );
          p.rotVel.set(Math.random() * 10, Math.random() * 10, Math.random() * 10);
          p.life = 0;
          p.maxLife = 1.0 + Math.random() * 0.8;
          spawned++;
          if (spawned >= count) break;
        }
      }
    };

    // 9. Camera Shake / Impulse State
    let cameraShake = 0;
    const triggerCameraShake = (intensity: number) => {
      cameraShake = Math.max(cameraShake, intensity);
      onImpact(intensity);
    };

    // 10. Animation Loop Variables
    let startTime = performance.now();
    let heroTriggered = false;

    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.05); // cap delta to prevent physics explosion
      const elapsed = (performance.now() - startTime) / 1000;

      // =====================================================================
      // CAMERA CHOREOGRAPHY
      // =====================================================================
      let targetCamX = 0;
      let targetCamY = 6.2;
      let targetCamZ = 9.2;
      let targetLookAtY = 0.6;

      if (elapsed < 1.6) {
        // Scene 1: Start low & intimate, pull back to reveal massive plate
        const progress = elapsed / 1.6;
        const ease = 1 - Math.pow(1 - progress, 3);
        targetCamY = THREE.MathUtils.lerp(2.2, 6.2, ease);
        targetCamZ = THREE.MathUtils.lerp(5.2, 9.2, ease);
        targetLookAtY = THREE.MathUtils.lerp(0.2, 0.6, ease);
        // Plate dramatic entrance: scale and slight rotation
        plateGroup.position.y = THREE.MathUtils.lerp(-3.0, -0.15, ease);
        plateGroup.rotation.y = (1 - ease) * -0.6;
      } else if (elapsed < 5.6) {
        // Scene 2: Falling chicken tracking, subtle breathing
        targetCamY = 6.2 + Math.sin(elapsed * 1.5) * 0.15;
        targetCamZ = 9.2;
        targetLookAtY = 0.6;
      } else if (elapsed < 7.8) {
        // Scene 3: The Hero Moment - Slow cinematic push toward the golden pile
        const heroProgress = (elapsed - 5.6) / 2.2;
        const ease = 1 - Math.pow(1 - heroProgress, 2);
        targetCamY = THREE.MathUtils.lerp(6.2, 4.4, ease);
        targetCamZ = THREE.MathUtils.lerp(9.2, 6.8, ease);
        targetLookAtY = THREE.MathUtils.lerp(0.6, 1.1, ease);

        // Ignite hero spotlight and golden hearth flare
        heroSpotlight.intensity = THREE.MathUtils.lerp(0, 8.5, ease);
        hearthLight.intensity = THREE.MathUtils.lerp(3.0, 7.0, ease);

        if (!heroTriggered) {
          heroTriggered = true;
          onHeroMoment();
        }
      }

      if (isTransitioning) {
        // Scene 4: Fast rush push-in directly toward the chicken
        targetCamZ = 2.0;
        targetCamY = 1.0;
        targetLookAtY = 0.8;
      }

      // Smooth camera interpolation with exponential damping
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 4, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 4, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 4, delta);

      // Apply camera impact shake
      if (cameraShake > 0) {
        camera.position.x += (Math.random() - 0.5) * cameraShake;
        camera.position.y += (Math.random() - 0.5) * cameraShake;
        cameraShake = Math.max(0, cameraShake - delta * 3.5);
      }

      camera.lookAt(0, targetLookAtY, 0);

      // =====================================================================
      // CHICKEN PHYSICS SIMULATION (Gravity, Restitution, Tumbling, Collisions)
      // =====================================================================
      const gravity = -24; // m/s^2

      chickenPieces.forEach((p, idx) => {
        // Check drop trigger time
        if (!p.dropped && elapsed >= p.dropTime) {
          p.dropped = true;
          p.mesh.visible = true;
          p.pos.set(p.mesh.position.x, 11 + Math.random() * 2, p.mesh.position.z);
          p.vel.set((Math.random() - 0.5) * 0.8, -1.5, (Math.random() - 0.5) * 0.8);
        }

        if (!p.dropped || p.settled) return;

        // Apply gravity
        p.vel.y += gravity * delta;

        // Integrate position
        p.pos.x += p.vel.x * delta;
        p.pos.y += p.vel.y * delta;
        p.pos.z += p.vel.z * delta;

        // Rotate
        p.rot.x += p.rotVel.x * delta;
        p.rot.y += p.rotVel.y * delta;
        p.rot.z += p.rotVel.z * delta;

        // -------------------------------------------------------------
        // COLLISION 1: WITH BOWL SURFACE OF THE MASSIVE SERVING PLATE
        // -------------------------------------------------------------
        const distFromCenter = Math.sqrt(p.pos.x * p.pos.x + p.pos.z * p.pos.z);
        // Plate bowl contour equation:
        const plateFloorY = -0.1 + Math.pow(Math.min(distFromCenter, 4.2) / 4.2, 2) * 0.45;

        if (p.pos.y - p.radius <= plateFloorY) {
          p.pos.y = plateFloorY + p.radius;

          if (Math.abs(p.vel.y) > 0.6) {
            // Rebound bounce with restitution
            p.vel.y = -p.vel.y * 0.28;
            p.vel.x *= 0.6;
            p.vel.z *= 0.6;
            p.rotVel.multiplyScalar(0.65);
            p.impactCount++;

            // Trigger impact feedback and golden crumb burst
            triggerCameraShake(Math.min(0.25, Math.abs(p.vel.y) * 0.04));
            spawnCrumbBurst(p.pos.clone(), 18);
          } else {
            // Settle on plate
            p.vel.set(0, 0, 0);
            p.rotVel.set(0, 0, 0);
            p.settled = true;
          }
        }

        // -------------------------------------------------------------
        // COLLISION 2: WITH PREVIOUSLY LANDED CHICKEN PIECES (Stacking!)
        // -------------------------------------------------------------
        for (let j = 0; j < idx; j++) {
          const other = chickenPieces[j];
          if (other.dropped) {
            const diff = p.pos.clone().sub(other.pos);
            const dist = diff.length();
            const minDist = (p.radius + other.radius) * 0.92;

            if (dist < minDist && dist > 0.001) {
              diff.normalize();
              // Push out
              p.pos.add(diff.clone().multiplyScalar(minDist - dist));
              // Deflect velocity upward/outward
              p.vel.add(diff.clone().multiplyScalar(2.0));
              p.vel.y *= 0.35;
              p.rotVel.multiplyScalar(0.7);

              triggerCameraShake(0.12);
              spawnCrumbBurst(p.pos.clone(), 12);
            }
          }
        }

        // Apply state to 3D mesh
        p.mesh.position.copy(p.pos);
        p.mesh.rotation.copy(p.rot);
      });

      // =====================================================================
      // 3D CRUMB PARTICLES SIMULATION
      // =====================================================================
      crumbPool.forEach((cp) => {
        if (!cp.active) return;
        cp.life += delta;
        if (cp.life >= cp.maxLife) {
          cp.active = false;
          cp.mesh.visible = false;
          return;
        }

        cp.vel.y += -18 * delta; // crumb gravity
        cp.mesh.position.x += cp.vel.x * delta;
        cp.mesh.position.y += cp.vel.y * delta;
        cp.mesh.position.z += cp.vel.z * delta;

        cp.mesh.rotation.x += cp.rotVel.x * delta;
        cp.mesh.rotation.y += cp.rotVel.y * delta;

        // Bounce on plate floor
        if (cp.mesh.position.y <= -0.15) {
          cp.mesh.position.y = -0.15;
          cp.vel.y = -cp.vel.y * 0.3;
          cp.vel.x *= 0.5;
          cp.vel.z *= 0.5;
        }

        // Fade out scale toward end of life
        const scale = (1 - cp.life / cp.maxLife) * 1.0;
        cp.mesh.scale.set(scale, scale, scale);
      });

      // Subtle plate rotation
      plateGroup.rotation.y += delta * 0.04;

      renderer.render(scene, camera);
    };

    animFrameId = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      plateGeo.dispose();
      plateMat.dispose();
      rimRingGeo.dispose();
      rimRingMat.dispose();
      stonewareBumpTex.dispose();
      crunchColorTex.dispose();
      groundGeo.dispose();
      groundMat.dispose();
      crumbGeo.dispose();
      crumbMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onHeroMoment, onImpact, isTransitioning]);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
};
