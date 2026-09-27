// The autospinner case study's 3D object: three stacked plates for READ, SOLVE and SPIN.
// Ported from the approved prototype; the numbers are the ones Den signed off.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const MODEL = '/portfolio/autospinner/object-plate.glb';
const ACCENT = new THREE.Color('#4B47FF');
const COLS = 6, ROWS = 5, CELL = 0.92;          // board grid in world units

// Resolves once the first frame is on the canvas; rejects if WebGL or the model fails.
export function mount(stage) {
  return new Promise((resolve, reject) => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- renderer / scene ----------
    const renderer = new THREE.WebGLRenderer({ antialias: true }); // throws without WebGL
    renderer.setPixelRatio(Math.min(2, devicePixelRatio));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#222227'); // ACES tone mapping darkens the clear colour; this renders as the page's #101014
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.35;

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    const key = new THREE.DirectionalLight('#ffffff', 1.4); key.position.set(-4, 10, 6); scene.add(key);
    const rim = new THREE.DirectionalLight('#8A87FF', 0.8); rim.position.set(6, 3, -8); scene.add(rim);

    // multisampled target: EffectComposer's default target has no MSAA, which made the small highlights jagged
    const rt = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 });
    const composer = new EffectComposer(renderer, rt);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.75, 0.6, 0.95);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    const rig = new THREE.Group();   // tilt / sway
    scene.add(rig);
    const layers = [new THREE.Group(), new THREE.Group(), new THREE.Group()]; // READ, SOLVE, SPIN
    layers.forEach(l => rig.add(l));

    let camDist = 16.5;
    function aimCamera(open) {
      // rise with the stack so the top plate never leaves the frame
      const cy = 1.4 + open * 1.25;
      camera.position.set(camDist * 0.55, camDist * 0.52 + cy, camDist * 0.66);
      camera.lookAt(0, cy, 0);
    }
    function resize() {
      const w = stage.clientWidth, h = stage.clientHeight;
      renderer.setSize(w, h, false); composer.setSize(w, h); bloom.setSize(w, h);
      camera.aspect = w / h;
      // frame the object: closer on wide screens, further on narrow
      camDist = w / h > 1.2 ? 16.5 : 21;
      camera.updateProjectionMatrix();
    }

    // ---------- materials ----------
    // satin, not mirror: sharp highlights were tripping the bloom and sparkling
    const orbMat = new THREE.MeshPhysicalMaterial({ color: '#1d1d26', roughness: 0.34, metalness: 0.05, clearcoat: 0.35, clearcoatRoughness: 0.4, envMapIntensity: 0.45 });
    // soft glow from emission; a broad satin highlight instead of a pin-point sparkle
    const blueMat = new THREE.MeshPhysicalMaterial({ color: ACCENT, emissive: ACCENT, emissiveIntensity: 1.4, roughness: 0.38, clearcoat: 0.3, clearcoatRoughness: 0.45, envMapIntensity: 0.4 });
    const lineMat = new THREE.MeshBasicMaterial({ color: ACCENT.clone().multiplyScalar(2.2), toneMapped: false });
    const gridMat = new THREE.LineBasicMaterial({ color: new THREE.Color('#5a57ff').multiplyScalar(1.4), transparent: true, opacity: 0.75, toneMapped: false });

    const cellPos = (c, r, y = 0) => new THREE.Vector3((c - (COLS - 1) / 2) * CELL, y, (r - (ROWS - 1) / 2) * CELL);
    let TOP = 0.2;  // y of a plate's top surface (set after the model loads)

    // ---------- load the Higgsfield plate ----------
    const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
    loader.load(MODEL, gltf => {
      const base = gltf.scene;
      base.rotation.y = Math.PI / 2;                       // long side along x
      const box = new THREE.Box3().setFromObject(base);
      const size = box.getSize(new THREE.Vector3());
      const s = (COLS * CELL + 0.75) / size.x;             // board width + border
      base.scale.set(s, s * 0.38, s);                      // thinner plates
      const b2 = new THREE.Box3().setFromObject(base);
      base.position.y -= b2.min.y;                         // sit on y=0
      base.position.x -= (b2.min.x + b2.max.x) / 2;
      base.position.z -= (b2.min.z + b2.max.z) / 2;
      TOP = new THREE.Box3().setFromObject(base).max.y - 0.03;
      // Tripo's metal/roughness map made it mirror-chrome; force a satin anodised finish
      base.traverse(o => { if (o.isMesh) { const m = o.material; m.metalnessMap = null; m.roughnessMap = null; m.metalness = 0.55; m.roughness = 0.48; m.envMapIntensity = 0.7; m.needsUpdate = true; } });
      layers.forEach(l => l.add(base.clone()));
      buildRead(); buildSolve(); buildSpin(); planRoute(true);
      start();
    }, undefined, err => { renderer.dispose(); reject(err); });

    // ---------- READ: 30 orbs, one blue ----------
    const orbGeo = new THREE.SphereGeometry(CELL * 0.38, 48, 32);
    const board = [];                     // board[c][r] = mesh
    let blue = { c: 2, r: 2, mesh: null };
    function buildRead() {
      for (let c = 0; c < COLS; c++) { board[c] = [];
        for (let r = 0; r < ROWS; r++) {
          const isBlue = c === blue.c && r === blue.r;
          const m = new THREE.Mesh(orbGeo, isBlue ? blueMat : orbMat);
          m.position.copy(cellPos(c, r, TOP + CELL * 0.3));
          layers[0].add(m); board[c][r] = m;
          if (isBlue) blue.mesh = m;
        } }
      const glow = new THREE.PointLight(ACCENT, 2.5, 3.2, 2); glow.position.y = 0.2; blue.mesh.add(glow);
    }

    // ---------- SOLVE: grid of cell outlines + cell highlights ----------
    const cellHi = [];
    function buildSolve() {
      const pts = [], y = TOP + 0.01, hw = COLS * CELL / 2, hd = ROWS * CELL / 2;
      for (let c = 0; c <= COLS; c++) { const x = -hw + c * CELL; pts.push(x, y, -hd, x, y, hd); }
      for (let r = 0; r <= ROWS; r++) { const z = -hd + r * CELL; pts.push(-hw, y, z, hw, y, z); }
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      layers[1].add(new THREE.LineSegments(g, gridMat));
      const hiGeo = new THREE.PlaneGeometry(CELL * 0.9, CELL * 0.9).rotateX(-Math.PI / 2);
      for (let c = 0; c < COLS; c++) { cellHi[c] = [];
        for (let r = 0; r < ROWS; r++) {
          const m = new THREE.Mesh(hiGeo, new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0, toneMapped: false }));
          m.position.copy(cellPos(c, r, TOP + 0.012)); layers[1].add(m); cellHi[c][r] = m;
        } }
    }

    // ---------- SPIN: the route as a glowing tube + a head orb ----------
    let routeMesh = null, head = null;
    function buildSpin() {
      head = new THREE.Mesh(new THREE.SphereGeometry(CELL * 0.2, 48, 32), blueMat);
      layers[2].add(head);
    }
    function setRouteMesh(cells) {
      if (routeMesh) { layers[2].remove(routeMesh); routeMesh.geometry.dispose(); }
      const path = new THREE.CurvePath();
      const p = cells.map(([c, r]) => cellPos(c, r, TOP + 0.05));
      for (let i = 0; i < p.length - 1; i++) path.add(new THREE.LineCurve3(p[i], p[i + 1]));
      const geo = new THREE.TubeGeometry(path, (p.length - 1) * 8, 0.045, 8, false);
      routeMesh = new THREE.Mesh(geo, lineMat);
      routeMesh.userData.total = geo.index.count;
      layers[2].add(routeMesh);
      routeMesh.userData.path = path;
    }

    // random self-avoiding route of 7-10 steps from the blue orb
    function randomRoute() {
      for (let tries = 0; tries < 200; tries++) {
        const len = 7 + Math.floor(Math.random() * 4), cells = [[blue.c, blue.r]], seen = new Set([blue.c + ',' + blue.r]);
        while (cells.length <= len) {
          const [c, r] = cells[cells.length - 1];
          const opts = [[1,0],[-1,0],[0,1],[0,-1]].map(([dc,dr]) => [c+dc, r+dr])
            .filter(([x,y]) => x >= 0 && y >= 0 && x < COLS && y < ROWS && !seen.has(x+','+y));
          if (!opts.length) break;
          const n = opts[Math.floor(Math.random() * opts.length)];
          cells.push(n); seen.add(n.join(','));
        }
        if (cells.length > len) return cells;
      }
      return [[blue.c, blue.r]];
    }

    // ---------- animation state ----------
    let route = [], phase = 'idle', t0 = 0;
    const STEP = 170, SOLVE_MS = 500;
    function planRoute(first) {
      route = randomRoute(); setRouteMesh(route);
      routeMesh.geometry.setDrawRange(0, first ? routeMesh.userData.total : 0);
      head.position.copy(first ? cellPos(...route[route.length - 1], TOP + 0.2) : cellPos(blue.c, blue.r, TOP + 0.2));
    }
    function play() {
      if (phase !== 'idle' || !routeMesh) return;
      planRoute(false); phase = 'solve'; t0 = performance.now();
    }
    stage.addEventListener('click', play);
    stage.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); } });

    // hover / tilt
    let open = 0, openTarget = reduce ? 1 : 0, px = 0, py = 0;
    stage.addEventListener('pointerenter', () => { openTarget = 1; stage.classList.add('open'); });
    stage.addEventListener('pointerleave', e => {
      if (e.pointerType === 'touch') return; // a finger "leaves" on every lift; the stack stays open after the first tap
      if (!reduce) openTarget = 0; stage.classList.remove('open'); px = py = 0;
    });
    stage.addEventListener('pointermove', e => { const b = stage.getBoundingClientRect(); px = (e.clientX - b.left) / b.width - .5; py = (e.clientY - b.top) / b.height - .5; });
    stage.addEventListener('touchstart', () => { openTarget = 1; stage.classList.add('open'); }, { passive: true });
    if (reduce) stage.classList.add('open');

    // swap bookkeeping for one step of the drag
    function doStep(i) {
      const [c, r] = route[i], other = board[c][r];
      const from = cellPos(blue.c, blue.r, TOP + CELL * 0.3), to = cellPos(c, r, TOP + CELL * 0.3);
      other.userData.tw = { a: other.position.clone(), b: from, t: performance.now() };
      blue.mesh.userData.tw = { a: blue.mesh.position.clone(), b: to, t: performance.now(), lift: true };
      board[blue.c][blue.r] = other; board[c][r] = blue.mesh; blue.c = c; blue.r = r;
    }

    // ---------- labels follow the plates ----------
    const labelEls = [...stage.querySelectorAll('[data-l]')];
    const v = new THREE.Vector3();
    function placeLabels() {
      labelEls.forEach(el => {
        const l = layers[+el.dataset.l];
        v.set(COLS * CELL / 2 + 0.6, TOP, -ROWS * CELL / 2).applyMatrix4(l.matrixWorld).project(camera);
        el.style.left = ((v.x + 1) / 2 * 100) + '%'; el.style.top = ((1 - v.y) / 2 * 100) + '%';
      });
    }

    // ---------- loop ----------
    // paused while the stage is off-screen or the tab is hidden
    let inView = true, raf = 0, stepIdx = 1, last = performance.now(), started = false;
    const running = () => started && inView && !document.hidden;
    const wake = () => { if (running() && !raf) { last = performance.now(); raf = requestAnimationFrame(loop); } };
    new IntersectionObserver(([e]) => { inView = e.isIntersecting; wake(); }).observe(stage);
    document.addEventListener('visibilitychange', wake);
    function start() {
      resize(); new ResizeObserver(resize).observe(stage);
      stage.prepend(renderer.domElement);
      started = true; raf = requestAnimationFrame(loop);
    }
    const ease = x => 1 - Math.pow(1 - x, 3);

    function loop(now) {
      raf = 0; if (!running()) return;
      const dt = Math.min(50, now - last); last = now;

      // open / close the stack
      open += (openTarget - open) * Math.min(1, dt / 160);
      const gap = 1.05 + open * 1.25;
      layers[0].position.y = 0; layers[1].position.y = gap; layers[2].position.y = gap * 2;
      aimCamera(open);

      // idle sway + pointer tilt
      const sway = reduce ? 0 : Math.sin(now / 2600) * 0.12;
      rig.rotation.y += ((sway + px * 0.35) - rig.rotation.y) * Math.min(1, dt / 200);
      rig.rotation.x += ((py * 0.12) - rig.rotation.x) * Math.min(1, dt / 200);

      // sequence: solve (cells light up) -> drag (route draws, orb swaps) -> idle
      if (phase === 'solve') {
        const k = (now - t0) / SOLVE_MS;
        route.forEach(([c, r], i) => { cellHi[c][r].material.opacity = Math.max(0, Math.min(0.35, (k * route.length - i) * 0.35)); });
        if (k >= 1) { phase = 'drag'; t0 = now; stepIdx = 1; }
      } else if (phase === 'drag') {
        const k = (now - t0) / STEP;
        while (stepIdx < route.length && k >= stepIdx - 1) { doStep(stepIdx); stepIdx++; }
        const prog = Math.min(1, k / (route.length - 1));
        const n = Math.floor(routeMesh.userData.total * prog / 3) * 3;
        routeMesh.geometry.setDrawRange(0, n);
        head.position.copy(routeMesh.userData.path.getPointAt(Math.min(0.999, prog))); head.position.y += 0.15;
        if (prog >= 1 && k > route.length) { phase = 'fade'; t0 = now; }
      } else if (phase === 'fade') {
        const k = (now - t0) / 900;
        route.forEach(([c, r]) => { cellHi[c][r].material.opacity = 0.35 * (1 - Math.min(1, k)); });
        if (k >= 1) phase = 'idle';
      }

      // orb tweens
      for (let c = 0; c < COLS; c++) for (let r = 0; r < ROWS; r++) {
        const m = board[c] && board[c][r]; if (!m || !m.userData.tw) continue;
        const tw = m.userData.tw, k = Math.min(1, (now - tw.t) / (STEP * 0.9)), e = ease(k);
        m.position.lerpVectors(tw.a, tw.b, e);
        if (tw.lift) m.position.y += Math.sin(Math.PI * k) * 0.25 + (phase === 'drag' ? 0.12 : 0);
        if (k >= 1) { m.position.copy(tw.b); delete m.userData.tw; }
      }
      if (phase !== 'drag' && blue.mesh && !blue.mesh.userData.tw) blue.mesh.position.y += (TOP + CELL * 0.3 - blue.mesh.position.y) * 0.2;

      rig.updateMatrixWorld(); placeLabels();
      composer.render();
      resolve(); // first frame is drawn; later calls are no-ops
      raf = requestAnimationFrame(loop);
    }
  });
}
