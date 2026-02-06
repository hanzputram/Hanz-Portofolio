<template>
  <div ref="canvasContainer" class="canvas-container"></div>
</template>

<script setup>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import gsap from "gsap";

const canvasContainer = ref(null);
const loading = ref(true);
let scene, camera, renderer, model, auroraMesh, animationId;

// Uniforms for Aurora
const uniforms = {
  uTime: { value: 0 },
  uMouse: { value: new THREE.Vector2(0, 0) },
  uResolution: { value: new THREE.Vector2(1, 1) }, // Default values, updated in init
};

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    
    // More elegant, flowy movement
    float time = uTime * 0.2;
    
    // Create a wave that moves diagonally
    float wave = sin(st.x * 2.0 + time) + sin(st.y * 3.0 + time * 0.5);
    
    // Add noise for the "aurora" texture
    float noise = snoise(vec2(st.x * 1.5 + time, st.y * 0.5 - time));
    
    // Mouse Interaction: localized brightness/distortion
    float dist = distance(st, uMouse);
    float mouseEffect = smoothstep(0.4, 0.0, dist);
    
    // Combine for a "curtain" effect
    float brightness = 0.02 / abs(st.y - 0.5 + wave * 0.2 + noise * 0.1);
    
    // Focus the aurora in the center/bottom, fading out
    brightness *= smoothstep(0.0, 0.4, st.y) * smoothstep(1.0, 0.6, st.y);
    
    // Cyan Neon Color Palette
    vec3 cyan = vec3(0.0, 1.0, 0.9);
    vec3 deepBlue = vec3(0.0, 0.1, 0.3);
    
    vec3 finalColor = mix(deepBlue, cyan, brightness * 2.0);
    
    // Add mouse glow
    finalColor += cyan * mouseEffect * 0.3;

    // Transparency
    float alpha = brightness * 1.5 + (mouseEffect * 0.2);
    
    gl_FragColor = vec4(finalColor, clamp(alpha, 0.0, 0.8));
  }
`;

const init = () => {
  scene = new THREE.Scene();
  // Keeping fog? Maybe reduce it for aurora visibility
  scene.fog = new THREE.FogExp2(0x030303, 0.02);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 5;
  camera.position.y = 1;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  canvasContainer.value.appendChild(renderer.domElement);

  // Set initial resolution usage
  uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(2, 5, 5);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0x7000ff, 5, 50);
  pointLight.position.set(-2, 3, 2);
  scene.add(pointLight);

  // Aurora Background Plane
  // Placed behind the model
  const planeGeometry = new THREE.PlaneGeometry(100, 100);
  const planeMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    depthWrite: false, // Don't block other objects
  });
  auroraMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  auroraMesh.position.z = -5;
  scene.add(auroraMesh);

  // Load Model w/ Fallback
  const loader = new GLTFLoader();
  const config = useRuntimeConfig();
  const modelPath = config.app.baseURL + "human.glb";

  loader.load(
    modelPath,
    (gltf) => {
      model = gltf.scene;
      model.scale.set(2, 2, 2);
      model.position.y = -2;

      model.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xeeeeee,
            roughness: 0.2,
            metalness: 0.8,
          });
        }
      });
      scene.add(model);
      loading.value = false;
    },
    undefined,
    (error) => {
      createFallbackStatue();
      loading.value = false;
    },
  );
};

const isLoaded = useState("isLoaded");
const route = useRoute();

watch(isLoaded, (val) => {
  if (val) {
    // Cinematic Reveal
    gsap.to(camera.position, { z: 4, duration: 2, ease: "power2.out" });
    gsap.to(scene.fog, { density: 0.01, duration: 2, ease: "power2.out" });

    // Animate Lights
    const lights = scene.children.filter((c) => c.isLight);
    lights.forEach((light) => {
      const targetIntensity = light.intensity;
      light.intensity = 0;
      gsap.to(light, {
        intensity: targetIntensity,
        duration: 2,
        ease: "power2.in",
      });
    });
  }
});

watch(
  () => route.path,
  (newPath) => {
    if (!model) return;

    if (newPath === "/about") {
      gsap.to(model.rotation, {
        x: 0.5,
        y: Math.PI,
        z: 0.2,
        duration: 1.5,
        ease: "power2.inOut",
      });
      gsap.to(camera.position, { x: -2, z: 6, duration: 2 });
    } else if (newPath === "/work") {
      gsap.to(model.rotation, {
        x: 0,
        y: Math.PI * 0.5,
        z: 0,
        duration: 1.5,
        ease: "power2.inOut",
      });
      gsap.to(camera.position, { x: 2, z: 5, duration: 2 });
    } else if (newPath === "/contact") {
      gsap.to(model.rotation, {
        x: -0.3,
        y: 0,
        z: -0.3,
        duration: 1.5,
        ease: "power2.inOut",
      });
      gsap.to(camera.position, { x: 0, z: 8, duration: 2 });
    } else {
      gsap.to(model.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.5,
        ease: "power2.inOut",
      });
      gsap.to(camera.position, { x: 0, z: 4, duration: 2 });
    }
  },
);

const createFallbackStatue = () => {
  const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
  const material = new THREE.MeshStandardMaterial({
    color: 0x00f0ff,
    roughness: 0.1,
    metalness: 0.9,
  });
  model = new THREE.Mesh(geometry, material);
  scene.add(model);
};

const animate = () => {
  animationId = requestAnimationFrame(animate);

  // Update Uniforms
  uniforms.uTime.value += 0.01;

  // Handle Scroll for Model
  const scrollY = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollFraction = Math.max(0, scrollY / maxScroll);

  if (model) {
    model.rotation.y = scrollFraction * Math.PI * 2;
    model.position.y = Math.sin(Date.now() * 0.001) * 0.1 - scrollY * 0.001;
  }

  renderer.render(scene, camera);
};

// Mouse Event Listener
const onMouseMove = (event) => {
  // Normalize mouse coordinates to 0.0 - 1.0 (bottom-left to top-right typically for UVs, but here screen space)
  // For Shader: (0,0) bottom-left, (1,1) top-right
  const x = event.clientX / window.innerWidth;
  const y = 1.0 - event.clientY / window.innerHeight; // Invert Y for shader UV coords if needed

  uniforms.uMouse.value.set(x, y);
};

const onWindowResize = () => {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
  }
};

onMounted(() => {
  init();
  animate();
  window.addEventListener("resize", onWindowResize);
  window.addEventListener("mousemove", onMouseMove);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", onWindowResize);
  window.removeEventListener("mousemove", onMouseMove);
  if (renderer) {
    renderer.dispose();
  }
});
</script>

<style scoped>
.canvas-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  pointer-events: none;
}

.loading-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-family: "Outfit", sans-serif;
  z-index: -1;
}
</style>
