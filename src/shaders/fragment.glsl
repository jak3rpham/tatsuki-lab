uniform float uTime;

varying vec2 vUv;

void main() {
  vec3 deepBrown = vec3(0.25, 0.15, 0.08);
  vec3 brown     = vec3(0.42, 0.26, 0.15);
  vec3 cream     = vec3(0.95, 0.88, 0.78);
  vec3 white     = vec3(1.0, 1.0, 1.0);
  
  float wave = sin(uTime) * 0.5 + 0.5;
  
  vec3 colorLeft  = mix(deepBrown, brown, wave);
  vec3 colorRight = mix(cream, white, wave);
  vec3 color = mix(colorLeft, colorRight, vUv.x);
  
  gl_FragColor = vec4(color, 1.0);
}