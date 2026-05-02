import * as THREE from 'three';
import { Text } from 'troika-three-text';
import './style.css';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Tạo Text object
const text = new Text();
text.text = '樹';
text.font = '/fonts/NotoSansJP-Bold.ttf'; // path từ public folder
text.fontSize = 1.5;
text.anchorX = 'center';
text.anchorY = 'middle';
text.color = 0xffffff; // sẽ bị override bởi material

// Apply ShaderMaterial — đây là chỗ noise displacement gặp Kanji
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0.0 },
  },
});
text.material = material;

scene.add(text);

// Sync — troika cần explicit sync để generate geometry sau khi font load
text.sync(() => {
  console.log('Text geometry ready');
});

const startTime = performance.now();

function animate() {
  requestAnimationFrame(animate);
  material.uniforms.uTime.value = (performance.now() - startTime) / 1000;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});