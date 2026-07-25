import * as THREE from "three";

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

function baseSetup(canvas: HTMLCanvasElement) {
  if (!hasWebGL()) return null;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);

  function resize() {
    const parent = canvas.parentElement;
    const w = canvas.clientWidth || parent?.clientWidth || 300;
    const h = canvas.clientHeight || parent?.clientHeight || 300;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas.parentElement || canvas);

  const reducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scenes keep an rAF loop running indefinitely once started — without this,
  // that loop (and its per-frame WebGL draw calls) keeps running full-speed
  // even when the canvas is scrolled off-screen or the tab is backgrounded,
  // which is wasted main-thread/GPU work that can contend with scrolling on
  // weaker mobile GPUs.
  let intersecting = true;
  const io = new IntersectionObserver(
    ([entry]) => {
      intersecting = entry.isIntersecting;
    },
    { rootMargin: "200px" },
  );
  io.observe(canvas);
  const isActive = () => intersecting && !document.hidden;

  return { renderer, scene, camera, ro, io, reducedMotion, isActive };
}

const NOOP_HANDLE = { dispose() {} };

function addLights(scene: THREE.Scene, colorHex: number) {
  scene.add(new THREE.AmbientLight(0x50544a, 0.7));
  const key = new THREE.DirectionalLight(0xffffff, 0.35);
  key.position.set(3, 5, 4);
  scene.add(key);
  const rim = new THREE.PointLight(colorHex, 1.4, 40);
  rim.position.set(-3, 2, 3);
  scene.add(rim);
}

export function initLatticeScene(
  canvas: HTMLCanvasElement,
  { colorHex = 0xb4ff39, count = 42, spread = 4.2 } = {},
) {
  const setup = baseSetup(canvas);
  if (!setup) return NOOP_HANDLE;
  const { renderer, scene, camera, ro, io, reducedMotion, isActive } = setup;
  camera.position.set(0, 0, 6.5);
  addLights(scene, colorHex);

  const group = new THREE.Group();
  scene.add(group);

  const positions: number[] = [];
  for (let i = 0; i < count; i++) {
    positions.push(
      (Math.random() - 0.5) * spread * 2,
      (Math.random() - 0.5) * spread,
      (Math.random() - 0.5) * spread,
    );
  }
  const posArr = new Float32Array(positions);
  const nodeGeo = new THREE.BufferGeometry();
  nodeGeo.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
  const nodeMat = new THREE.PointsMaterial({
    color: colorHex,
    size: 0.06,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
  });
  group.add(new THREE.Points(nodeGeo, nodeMat));

  const edgePositions: number[] = [];
  const maxDist = spread * 0.65;
  for (let i = 0; i < count; i++) {
    const ax = positions[i * 3];
    const ay = positions[i * 3 + 1];
    const az = positions[i * 3 + 2];
    for (let j = i + 1; j < count; j++) {
      const bx = positions[j * 3];
      const by = positions[j * 3 + 1];
      const bz = positions[j * 3 + 2];
      const d = Math.hypot(ax - bx, ay - by, az - bz);
      if (d < maxDist) edgePositions.push(ax, ay, az, bx, by, bz);
    }
  }
  const edgeGeo = new THREE.BufferGeometry();
  edgeGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(edgePositions), 3));
  const edgeMat = new THREE.LineBasicMaterial({ color: colorHex, transparent: true, opacity: 0.15 });
  group.add(new THREE.LineSegments(edgeGeo, edgeMat));

  let raf = 0;
  function tick() {
    if (isActive()) {
      group.rotation.y += 0.0016;
      group.rotation.x += 0.0004;
      renderer.render(scene, camera);
    }
    if (!reducedMotion) raf = requestAnimationFrame(tick);
  }
  tick();

  return {
    dispose() {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      nodeGeo.dispose();
      nodeMat.dispose();
      edgeGeo.dispose();
      edgeMat.dispose();
      renderer.dispose();
    },
  };
}

export function initBarChartScene(
  canvas: HTMLCanvasElement,
  {
    values = [] as number[],
    colorHex = 0xb4ff39,
    onHover,
  }: { values?: number[]; colorHex?: number; onHover?: (index: number | null) => void } = {},
) {
  const setup = baseSetup(canvas);
  if (!setup) return NOOP_HANDLE;
  const { renderer, scene, camera, ro, io, reducedMotion, isActive } = setup;
  camera.position.set(4.6, 3.4, 6.2);
  camera.lookAt(0, 0.4, 0);
  addLights(scene, colorHex);

  const fillLight = new THREE.PointLight(colorHex, 1.1, 30);
  fillLight.position.set(2, 4, -2);
  scene.add(fillLight);

  const group = new THREE.Group();
  scene.add(group);

  const max = Math.max(...values, 1);
  const n = values.length;
  const barW = 0.55;
  const gap = 0.85;
  const totalWidth = (n - 1) * gap;

  const grid = new THREE.GridHelper(totalWidth + 3, 12, 0x3a4230, 0x1a1d18);
  grid.position.y = -0.01;
  group.add(grid);

  const barMeshes: { mesh: THREE.Mesh; geo: THREE.BoxGeometry; mat: THREE.MeshStandardMaterial }[] = [];
  values.forEach((v, i) => {
    const h = (v / max) * 2.6 + 0.15;
    const geo = new THREE.BoxGeometry(barW, h, barW);
    const mat = new THREE.MeshStandardMaterial({
      color: colorHex,
      emissive: colorHex,
      emissiveIntensity: 0.4,
      roughness: 0.3,
      metalness: 0.25,
      transparent: true,
      opacity: 0.92,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(i * gap - totalWidth / 2, h / 2, 0);
    mesh.userData.index = i;
    group.add(mesh);
    barMeshes.push({ mesh, geo, mat });
    mesh.scale.y = 0.001;
  });

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(-10, -10);
  let hoveredIndex: number | null = null;

  function onPointerMove(event: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }
  function onPointerLeave() {
    pointer.set(-10, -10);
  }
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerleave", onPointerLeave);

  let raf = 0;
  let frame = 0;
  function tick() {
    if (isActive()) {
      frame++;
      barMeshes.forEach((b, i) => {
        const delay = i * 4;
        if (frame > delay) b.mesh.scale.y = Math.min(1, b.mesh.scale.y + 0.06);
      });
      group.rotation.y = Math.sin(frame * 0.0025) * 0.25;

      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(barMeshes.map((b) => b.mesh))[0];
      const nextIndex = hit ? (hit.object.userData.index as number) : null;
      if (nextIndex !== hoveredIndex) {
        barMeshes.forEach((b, i) => {
          b.mat.emissiveIntensity = i === nextIndex ? 1.1 : 0.4;
        });
        hoveredIndex = nextIndex;
        onHover?.(nextIndex);
      }

      renderer.render(scene, camera);
    }
    if (!reducedMotion || frame < 140) raf = requestAnimationFrame(tick);
  }
  tick();

  return {
    dispose() {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      grid.geometry.dispose();
      (grid.material as THREE.Material).dispose();
      barMeshes.forEach((b) => {
        b.geo.dispose();
        b.mat.dispose();
      });
      renderer.dispose();
    },
  };
}

export function initOrbScene(canvas: HTMLCanvasElement, { colorHex = 0xb4ff39 } = {}) {
  const setup = baseSetup(canvas);
  if (!setup) return NOOP_HANDLE;
  const { renderer, scene, camera, ro, io, reducedMotion, isActive } = setup;
  camera.position.set(0, 0, 4.2);
  addLights(scene, colorHex);

  const group = new THREE.Group();
  scene.add(group);

  const icoGeo = new THREE.IcosahedronGeometry(1.35, 1);
  const edges = new THREE.EdgesGeometry(icoGeo);
  const wire = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: colorHex, transparent: true, opacity: 0.55 }),
  );
  group.add(wire);

  const coreGeo = new THREE.IcosahedronGeometry(0.55, 1);
  const coreMat = new THREE.MeshStandardMaterial({
    color: colorHex,
    emissive: colorHex,
    emissiveIntensity: 0.6,
    roughness: 0.4,
    metalness: 0.1,
    transparent: true,
    opacity: 0.5,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  group.add(core);

  let hovering = false;
  function onEnter() {
    hovering = true;
  }
  function onLeave() {
    hovering = false;
  }
  canvas.addEventListener("pointerenter", onEnter);
  canvas.addEventListener("pointerleave", onLeave);

  let raf = 0;
  let t = 0;
  function tick() {
    if (isActive()) {
      t += 0.01;
      group.rotation.y += hovering ? 0.007 : 0.0022;
      group.rotation.x = Math.sin(t * 0.3) * 0.15;
      core.scale.setScalar(1 + Math.sin(t * 1.4) * 0.06);
      coreMat.emissiveIntensity = hovering ? 1.0 : 0.6;
      renderer.render(scene, camera);
    }
    if (!reducedMotion) raf = requestAnimationFrame(tick);
  }
  tick();

  return {
    dispose() {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerenter", onEnter);
      canvas.removeEventListener("pointerleave", onLeave);
      icoGeo.dispose();
      edges.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      renderer.dispose();
    },
  };
}

export function initGlobeScene(canvas: HTMLCanvasElement, { colorHex = 0xb4ff39 } = {}) {
  const setup = baseSetup(canvas);
  if (!setup) return NOOP_HANDLE;
  const { renderer, scene, camera, ro, io, reducedMotion, isActive } = setup;
  camera.position.set(0, 0, 4.6);
  addLights(scene, colorHex);

  const group = new THREE.Group();
  scene.add(group);

  const sphereGeo = new THREE.IcosahedronGeometry(1.5, 2);
  const edges = new THREE.EdgesGeometry(sphereGeo);
  const wire = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: colorHex, transparent: true, opacity: 0.28 }),
  );
  group.add(wire);

  function pinAt(lat: number, lon: number) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const r = 1.55;
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta),
    );
  }
  const austin = pinAt(30.3, -97.7);
  const lisbon = pinAt(38.7, -9.1);
  const pinGeo = new THREE.SphereGeometry(0.06, 12, 12);
  const pinMat = new THREE.MeshStandardMaterial({ color: colorHex, emissive: colorHex, emissiveIntensity: 1 });
  const p1 = new THREE.Mesh(pinGeo, pinMat);
  p1.position.copy(austin);
  group.add(p1);
  const p2 = new THREE.Mesh(pinGeo, pinMat);
  p2.position.copy(lisbon);
  group.add(p2);

  const mid = austin.clone().add(lisbon).multiplyScalar(0.5).normalize().multiplyScalar(2.1);
  const curve = new THREE.QuadraticBezierCurve3(austin, mid, lisbon);
  const arcGeo = new THREE.TubeGeometry(curve, 32, 0.012, 6, false);
  const arcMat = new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.8 });
  group.add(new THREE.Mesh(arcGeo, arcMat));

  let hovering = false;
  function onEnter() {
    hovering = true;
  }
  function onLeave() {
    hovering = false;
  }
  canvas.addEventListener("pointerenter", onEnter);
  canvas.addEventListener("pointerleave", onLeave);

  let raf = 0;
  let t = 0;
  function tick() {
    if (isActive()) {
      t += 0.01;
      group.rotation.y += hovering ? 0.006 : 0.0018;
      const pulse = 1 + Math.sin(t * 2) * 0.25;
      p1.scale.setScalar(pulse);
      p2.scale.setScalar(pulse);
      (wire.material as THREE.LineBasicMaterial).opacity = hovering ? 0.5 : 0.28;
      renderer.render(scene, camera);
    }
    if (!reducedMotion) raf = requestAnimationFrame(tick);
  }
  tick();

  return {
    dispose() {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerenter", onEnter);
      canvas.removeEventListener("pointerleave", onLeave);
      sphereGeo.dispose();
      edges.dispose();
      pinGeo.dispose();
      pinMat.dispose();
      arcGeo.dispose();
      arcMat.dispose();
      renderer.dispose();
    },
  };
}
