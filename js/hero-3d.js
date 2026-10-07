/**
 * HERO 3D STRUCTURAL & BIM WIREFRAME VISUALIZER
 * Yuvraj Singh Rathore - Civil Engineering Portfolio
 * High-precision interactive 3D structural building frame with glowing joint nodes,
 * column-beam members, foundation footings, and robust WebGL/2D fallback.
 */

(function () {
  'use strict';

  const container = document.getElementById('canvas-container');
  if (!container) return;

  // HUD telemetry elements
  const hudRotX = document.getElementById('hud-rot-x');
  const hudRotY = document.getElementById('hud-rot-y');
  const hudNodes = document.getElementById('hud-nodes');
  const hudMembers = document.getElementById('hud-members');

  // Control buttons
  const btnToggleRotate = document.getElementById('btn-toggle-rotate');
  const btnToggleWire = document.getElementById('btn-toggle-wire');
  const btnToggleGrid = document.getElementById('btn-toggle-grid');
  const btnResetView = document.getElementById('btn-reset-view');

  let autoRotate = true;
  let isWireframe = false;
  let showGrid = true;

  function getContainerSize() {
    const rect = container.getBoundingClientRect();
    const w = Math.max(rect.width || container.clientWidth || 520, 280);
    const h = Math.max(rect.height || container.clientHeight || 420, 320);
    return { w, h };
  }

  // Check if THREE is available
  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded, starting 3D isometric canvas engine');
    initInteractiveCanvas3D();
    return;
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
  } catch (e) {
    console.warn('WebGL init failed, falling back to 2D Canvas engine', e);
    initInteractiveCanvas3D();
    return;
  }

  const { w: initialW, h: initialH } = getContainerSize();
  renderer.setSize(initialW, initialH);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.domElement.id = 'hero-canvas';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // --- Three.js Scene Setup ---
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(38, initialW / initialH, 0.1, 1000);
  camera.position.set(20, 16, 24);
  camera.lookAt(0, 5.0, 0);

  // Lighting - Comprehensive illumination
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1e293b, 1.2);
  scene.add(hemiLight);

  const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 1.4);
  dirLight1.position.set(20, 35, 20);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.0);
  dirLight2.position.set(-20, 20, -20);
  scene.add(dirLight2);

  const centerPointLight = new THREE.PointLight(0x00f0ff, 1.2, 35);
  centerPointLight.position.set(0, 5.4, 0);
  scene.add(centerPointLight);

  // Group for the entire structural building model
  const buildingGroup = new THREE.Group();
  buildingGroup.position.set(0, 0, 0);
  scene.add(buildingGroup);

  // Structural Dimensions
  const baysX = 3;       // 3 bays along X
  const baysZ = 2;       // 2 bays along Z
  const stories = 3;     // 3 stories
  const bayWidthX = 4.2;
  const bayWidthZ = 4.2;
  const storyHeight = 3.4;

  const totalWidthX = baysX * bayWidthX;
  const totalWidthZ = baysZ * bayWidthZ;
  const totalHeight = stories * storyHeight;

  // Center the building
  const offsetX = -totalWidthX / 2;
  const offsetZ = -totalWidthZ / 2;

  const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';

  function getMaterials() {
    const dark = isDark();
    return {
      column: new THREE.MeshStandardMaterial({
        color: dark ? 0x0284c7 : 0x0369a1,
        emissive: dark ? 0x0369a1 : 0x0284c7,
        emissiveIntensity: dark ? 0.35 : 0.15,
        roughness: 0.35,
        metalness: 0.15,
        wireframe: isWireframe
      }),
      beam: new THREE.MeshStandardMaterial({
        color: dark ? 0x2563eb : 0x1d4ed8,
        emissive: dark ? 0x1e3a8a : 0x1e40af,
        emissiveIntensity: dark ? 0.4 : 0.15,
        roughness: 0.4,
        metalness: 0.15,
        wireframe: isWireframe
      }),
      edgeLine: new THREE.LineBasicMaterial({
        color: dark ? 0x00f0ff : 0x0284c7,
        linewidth: 1.5
      }),
      bracing: new THREE.MeshStandardMaterial({
        color: dark ? 0x00f0ff : 0x0284c7,
        emissive: dark ? 0x00f0ff : 0x0284c7,
        emissiveIntensity: dark ? 0.5 : 0.2,
        roughness: 0.2,
        metalness: 0.2,
        wireframe: isWireframe
      }),
      slab: new THREE.MeshStandardMaterial({
        color: dark ? 0x0f172a : 0xe2e8f0,
        transparent: true,
        opacity: dark ? 0.45 : 0.55,
        roughness: 0.7,
        wireframe: isWireframe
      }),
      node: new THREE.MeshStandardMaterial({
        color: 0x00f0ff,
        emissive: 0x00f0ff,
        emissiveIntensity: dark ? 0.95 : 0.6,
        roughness: 0.1
      }),
      foundation: new THREE.MeshStandardMaterial({
        color: dark ? 0x1e293b : 0x94a3b8,
        emissive: dark ? 0x0f172a : 0x64748b,
        emissiveIntensity: 0.2,
        roughness: 0.8,
        wireframe: isWireframe
      })
    };
  }

  let materials = getMaterials();

  // Column geometry
  const colGeo = new THREE.BoxGeometry(0.32, storyHeight, 0.32);
  const colEdges = new THREE.EdgesGeometry(colGeo);

  // Beam geometries
  const beamXGeo = new THREE.BoxGeometry(bayWidthX, 0.28, 0.22);
  const beamXEdges = new THREE.EdgesGeometry(beamXGeo);

  const beamZGeo = new THREE.BoxGeometry(0.22, 0.28, bayWidthZ);
  const beamZEdges = new THREE.EdgesGeometry(beamZGeo);

  // Joint node geometry
  const nodeGeo = new THREE.SphereGeometry(0.24, 16, 16);

  // Slab geometry
  const slabGeo = new THREE.BoxGeometry(totalWidthX + 0.3, 0.1, totalWidthZ + 0.3);
  const slabEdges = new THREE.EdgesGeometry(slabGeo);

  // Footing geometry
  const footingGeo = new THREE.BoxGeometry(0.9, 0.4, 0.9);
  const footingEdges = new THREE.EdgesGeometry(footingGeo);

  let nodeCount = 0;
  let memberCount = 0;

  function constructBuilding() {
    while (buildingGroup.children.length > 0) {
      buildingGroup.remove(buildingGroup.children[0]);
    }
    nodeCount = 0;
    memberCount = 0;
    materials = getMaterials();

    // 1. Foundation Slab
    const groundSlab = new THREE.Mesh(slabGeo, materials.slab);
    groundSlab.position.set(0, 0, 0);
    buildingGroup.add(groundSlab);

    if (!isWireframe) {
      const slabLine = new THREE.LineSegments(slabEdges, materials.edgeLine);
      slabLine.position.set(0, 0, 0);
      buildingGroup.add(slabLine);
    }

    // 2. Stories loop
    for (let s = 0; s <= stories; s++) {
      const currentY = s * storyHeight;

      // Floor Slabs on upper levels
      if (s > 0) {
        const floorSlab = new THREE.Mesh(slabGeo, materials.slab);
        floorSlab.position.set(0, currentY, 0);
        buildingGroup.add(floorSlab);

        if (!isWireframe) {
          const flLine = new THREE.LineSegments(slabEdges, materials.edgeLine);
          flLine.position.set(0, currentY, 0);
          buildingGroup.add(flLine);
        }
      }

      // Nodes & Beams at level s
      for (let ix = 0; ix <= baysX; ix++) {
        for (let iz = 0; iz <= baysZ; iz++) {
          const posX = offsetX + ix * bayWidthX;
          const posZ = offsetZ + iz * bayWidthZ;

          // Joint Node
          const node = new THREE.Mesh(nodeGeo, materials.node);
          node.position.set(posX, currentY, posZ);
          buildingGroup.add(node);
          nodeCount++;

          // Vertical Column below this level (if s > 0)
          if (s > 0) {
            const col = new THREE.Mesh(colGeo, materials.column);
            col.position.set(posX, currentY - storyHeight / 2, posZ);
            buildingGroup.add(col);

            if (!isWireframe) {
              const colLine = new THREE.LineSegments(colEdges, materials.edgeLine);
              colLine.position.copy(col.position);
              buildingGroup.add(colLine);
            }
            memberCount++;
          }

          // Horizontal Beams along X
          if (ix < baysX) {
            const beamX = new THREE.Mesh(beamXGeo, materials.beam);
            beamX.position.set(posX + bayWidthX / 2, currentY, posZ);
            buildingGroup.add(beamX);

            if (!isWireframe) {
              const bLine = new THREE.LineSegments(beamXEdges, materials.edgeLine);
              bLine.position.copy(beamX.position);
              buildingGroup.add(bLine);
            }
            memberCount++;
          }

          // Horizontal Beams along Z
          if (iz < baysZ) {
            const beamZ = new THREE.Mesh(beamZGeo, materials.beam);
            beamZ.position.set(posX, currentY, posZ + bayWidthZ / 2);
            buildingGroup.add(beamZ);

            if (!isWireframe) {
              const bLine = new THREE.LineSegments(beamZEdges, materials.edgeLine);
              bLine.position.copy(beamZ.position);
              buildingGroup.add(bLine);
            }
            memberCount++;
          }
        }
      }

      // Cross Bracing Trusses on front bay for structural stiffness
      if (s > 0) {
        const braceLen = Math.sqrt(bayWidthX * bayWidthX + storyHeight * storyHeight);
        const braceGeo = new THREE.CylinderGeometry(0.06, 0.06, braceLen, 8);
        const braceAngle = Math.atan2(storyHeight, bayWidthX);

        const b1 = new THREE.Mesh(braceGeo, materials.bracing);
        b1.position.set(offsetX + bayWidthX * 1.5, currentY - storyHeight / 2, offsetZ);
        b1.rotation.z = -braceAngle;
        buildingGroup.add(b1);
        memberCount++;

        const b2 = new THREE.Mesh(braceGeo, materials.bracing);
        b2.position.set(offsetX + bayWidthX * 1.5, currentY - storyHeight / 2, offsetZ);
        b2.rotation.z = braceAngle;
        buildingGroup.add(b2);
        memberCount++;
      }
    }

    // Footing Pedestals at ground base
    for (let ix = 0; ix <= baysX; ix++) {
      for (let iz = 0; iz <= baysZ; iz++) {
        const posX = offsetX + ix * bayWidthX;
        const posZ = offsetZ + iz * bayWidthZ;
        const footing = new THREE.Mesh(footingGeo, materials.foundation);
        footing.position.set(posX, -0.2, posZ);
        buildingGroup.add(footing);

        if (!isWireframe) {
          const fLine = new THREE.LineSegments(footingEdges, materials.edgeLine);
          fLine.position.copy(footing.position);
          buildingGroup.add(fLine);
        }
      }
    }

    // Telemetry updates
    if (hudNodes) hudNodes.textContent = nodeCount;
    if (hudMembers) hudMembers.textContent = memberCount;
  }

  constructBuilding();

  // Coordinate Base Grid
  const gridHelper = new THREE.GridHelper(26, 20, 0x00f0ff, 0x1e3a8a);
  gridHelper.position.y = -0.4;
  scene.add(gridHelper);

  // --- Interaction & Orbit Dragging ---
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let targetRotationY = 0.55;
  let targetRotationX = 0.22;

  buildingGroup.rotation.y = targetRotationY;
  buildingGroup.rotation.x = targetRotationX;

  const onPointerDown = (e) => {
    isDragging = true;
    prevMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    prevMouseY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const deltaX = clientX - prevMouseX;
    const deltaY = clientY - prevMouseY;

    targetRotationY += deltaX * 0.007;
    targetRotationX += deltaY * 0.007;

    // Clamp vertical tilt
    targetRotationX = Math.max(-0.35, Math.min(0.75, targetRotationX));

    prevMouseX = clientX;
    prevMouseY = clientY;
  };

  const onPointerUp = () => {
    isDragging = false;
  };

  container.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  container.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  // Resize handler
  function handleResize() {
    if (!container || !renderer) return;
    const { w, h } = getContainerSize();
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  window.addEventListener('resize', handleResize);
  setTimeout(handleResize, 100);
  setTimeout(handleResize, 500);

  // Theme observer
  const observer = new MutationObserver(() => {
    constructBuilding();
    const dark = isDark();
    gridHelper.material.color.setHex(dark ? 0x00f0ff : 0x0284c7);
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // UI HUD Controls
  if (btnToggleRotate) {
    btnToggleRotate.addEventListener('click', () => {
      autoRotate = !autoRotate;
      btnToggleRotate.classList.toggle('active', autoRotate);
    });
  }

  if (btnToggleWire) {
    btnToggleWire.addEventListener('click', () => {
      isWireframe = !isWireframe;
      btnToggleWire.classList.toggle('active', isWireframe);
      constructBuilding();
    });
  }

  if (btnToggleGrid) {
    btnToggleGrid.addEventListener('click', () => {
      showGrid = !showGrid;
      gridHelper.visible = showGrid;
      btnToggleGrid.classList.toggle('active', showGrid);
    });
  }

  if (btnResetView) {
    btnResetView.addEventListener('click', () => {
      targetRotationY = 0.55;
      targetRotationX = 0.22;
      camera.position.set(20, 16, 24);
      camera.lookAt(0, 5.0, 0);
    });
  }

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    if (autoRotate && !isDragging) {
      targetRotationY += 0.003;
    }

    buildingGroup.rotation.y += (targetRotationY - buildingGroup.rotation.y) * 0.08;
    buildingGroup.rotation.x += (targetRotationX - buildingGroup.rotation.x) * 0.08;

    if (hudRotX) {
      const degX = Math.round((buildingGroup.rotation.x * 180) / Math.PI);
      hudRotX.textContent = `${degX}°`;
    }
    if (hudRotY) {
      const degY = Math.round(((buildingGroup.rotation.y * 180) / Math.PI) % 360);
      hudRotY.textContent = `${degY < 0 ? degY + 360 : degY}°`;
    }

    renderer.render(scene, camera);
  }

  animate();

  // =========================================================================
  // FULL 3D ISOMETRIC ENGINE (CANVAS 2D FALLBACK)
  // Guarantees an interactive, rotating structural frame even without WebGL!
  // =========================================================================
  function initInteractiveCanvas3D() {
    container.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.id = 'hero-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rotY = 0.6;
    let rotX = 0.25;
    let fallbackAutoRotate = true;
    let isFallbackDragging = false;
    let fallbackPrevX = 0;
    let fallbackPrevY = 0;

    function resizeFallback() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      const w = Math.max(rect.width || 500, 280);
      const h = Math.max(rect.height || 420, 320);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.resetTransform && ctx.resetTransform();
      ctx.scale(dpr, dpr);
    }
    resizeFallback();
    window.addEventListener('resize', resizeFallback);

    // Build 3D structural vertices
    const fNodes = [];
    const fEdges = [];

    const fStories = 3;
    const fBayX = 3;
    const fBayZ = 2;
    const fBayW = 60;
    const fStoryH = 50;

    const fOffX = -(fBayX * fBayW) / 2;
    const fOffZ = -(fBayZ * fBayW) / 2;

    for (let s = 0; s <= fStories; s++) {
      const y = s * fStoryH;
      for (let ix = 0; ix <= fBayX; ix++) {
        for (let iz = 0; iz <= fBayZ; iz++) {
          const x = fOffX + ix * fBayW;
          const z = fOffZ + iz * fBayW;
          const nodeIndex = fNodes.length;
          fNodes.push({ x, y, z, level: s });

          // Columns
          if (s > 0) {
            const belowIndex = nodeIndex - (fBayX + 1) * (fBayZ + 1);
            fEdges.push([belowIndex, nodeIndex, 'column']);
          }
          // Beams X
          if (ix > 0) {
            const leftIndex = nodeIndex - (fBayZ + 1);
            fEdges.push([leftIndex, nodeIndex, 'beam']);
          }
          // Beams Z
          if (iz > 0) {
            const backIndex = nodeIndex - 1;
            fEdges.push([backIndex, nodeIndex, 'beam']);
          }
        }
      }
    }

    if (hudNodes) hudNodes.textContent = fNodes.length;
    if (hudMembers) hudMembers.textContent = fEdges.length;

    // Pointer events for Canvas fallback
    container.addEventListener('mousedown', (e) => {
      isFallbackDragging = true;
      fallbackPrevX = e.clientX;
      fallbackPrevY = e.clientY;
    });
    window.addEventListener('mousemove', (e) => {
      if (!isFallbackDragging) return;
      const dx = e.clientX - fallbackPrevX;
      const dy = e.clientY - fallbackPrevY;
      rotY += dx * 0.008;
      rotX += dy * 0.008;
      rotX = Math.max(-0.4, Math.min(0.7, rotX));
      fallbackPrevX = e.clientX;
      fallbackPrevY = e.clientY;
    });
    window.addEventListener('mouseup', () => { isFallbackDragging = false; });

    // Touch events
    container.addEventListener('touchstart', (e) => {
      if (!e.touches[0]) return;
      isFallbackDragging = true;
      fallbackPrevX = e.touches[0].clientX;
      fallbackPrevY = e.touches[0].clientY;
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (!isFallbackDragging || !e.touches[0]) return;
      const dx = e.touches[0].clientX - fallbackPrevX;
      const dy = e.touches[0].clientY - fallbackPrevY;
      rotY += dx * 0.008;
      rotX += dy * 0.008;
      rotX = Math.max(-0.4, Math.min(0.7, rotX));
      fallbackPrevX = e.touches[0].clientX;
      fallbackPrevY = e.touches[0].clientY;
    }, { passive: true });
    window.addEventListener('touchend', () => { isFallbackDragging = false; });

    if (btnToggleRotate) {
      btnToggleRotate.addEventListener('click', () => {
        fallbackAutoRotate = !fallbackAutoRotate;
        btnToggleRotate.classList.toggle('active', fallbackAutoRotate);
      });
    }

    function render3DCanvas() {
      requestAnimationFrame(render3DCanvas);

      if (fallbackAutoRotate && !isFallbackDragging) {
        rotY += 0.0035;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2 + 50;

      // 3D Rotation Projection
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      function project(p) {
        // Rotate Y
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        // Rotate X
        const y2 = -p.y * cosX - z1 * sinX;
        const z2 = -p.y * sinX + z1 * cosX;

        // Isometric perspective scale
        const scale = 380 / (380 + z2);
        return {
          sx: cx + x1 * scale,
          sy: cy + y2 * scale,
          depth: z2
        };
      }

      // Draw base grid
      ctx.strokeStyle = 'rgba(0, 210, 255, 0.12)';
      ctx.lineWidth = 1;
      for (let g = -120; g <= 120; g += 30) {
        const p1 = project({ x: g, y: -5, z: -120 });
        const p2 = project({ x: g, y: -5, z: 120 });
        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.stroke();

        const p3 = project({ x: -120, y: -5, z: g });
        const p4 = project({ x: 120, y: -5, z: g });
        ctx.beginPath();
        ctx.moveTo(p3.sx, p3.sy);
        ctx.lineTo(p4.sx, p4.sy);
        ctx.stroke();
      }

      const projNodes = fNodes.map(project);

      // Draw Members (Edges)
      fEdges.forEach(edge => {
        const pA = projNodes[edge[0]];
        const pB = projNodes[edge[1]];
        if (!pA || !pB) return;

        ctx.beginPath();
        ctx.moveTo(pA.sx, pA.sy);
        ctx.lineTo(pB.sx, pB.sy);

        if (edge[2] === 'column') {
          ctx.strokeStyle = '#00f0ff';
          ctx.lineWidth = 2.5;
        } else {
          ctx.strokeStyle = '#2563eb';
          ctx.lineWidth = 2.0;
        }
        ctx.stroke();
      });

      // Draw Joint Nodes
      projNodes.forEach(pn => {
        ctx.beginPath();
        ctx.arc(pn.sx, pn.sy, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#00f0ff';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Level indicators
      ctx.fillStyle = 'rgba(0, 210, 255, 0.7)';
      ctx.font = '10px monospace';
      const roofNode = projNodes[projNodes.length - 1];
      if (roofNode) {
        ctx.fillText('ROOF EL +10.80M', roofNode.sx + 8, roofNode.sy);
      }

      if (hudRotX) hudRotX.textContent = `${Math.round((rotX * 180) / Math.PI)}°`;
      if (hudRotY) hudRotY.textContent = `${Math.round(((rotY * 180) / Math.PI) % 360)}°`;
    }

    render3DCanvas();
  }
})();
