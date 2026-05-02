varying vec2 vUv;

void main() {
  vec3 brown = vec3(0.42, 0.26, 0.15);
  vec3 white = vec3(1.0, 1.0, 1.0);
  
  vec3 color = mix(brown, white, vUv.x);
  
  gl_FragColor = vec4(color, 1.0);
}