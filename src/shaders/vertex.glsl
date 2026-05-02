uniform float uTime;

varying vec2 vUv;

void main() {
  vUv = uv;
  
  // Lấy position gốc của vertex
  vec3 newPosition = position;
  
  // Displace Z theo sin wave 1D dọc theo X
  // sin(position.x * 5.0 + uTime) → wave di chuyển ngang theo time
  // * 0.2 → biên độ (vertex đẩy ra ±0.2 đơn vị theo Z)
  newPosition.z += sin(position.x * 5.0 + uTime) * 0.2;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}