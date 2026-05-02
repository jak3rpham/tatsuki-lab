import * as THREE from 'three';
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
camera.position.set(0, 0, 2.5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(2, 2, 64, 64);
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0.0 },
  },
  // wireframe: true,  ← comment hoặc xóa dòng này
});
const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = -Math.PI / 3;  // xoay plane ~60° để nhìn từ trên xuống
scene.add(mesh);

const startTime = performance.now();

function animate() {
  requestAnimationFrame(animate);
  // performance.now() trả về millisecond → chia 1000 ra giây
  material.uniforms.uTime.value = (performance.now() - startTime) / 1000;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});