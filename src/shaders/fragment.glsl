uniform float uTime;

varying vec2 vUv;
varying float vElevation;

void main() {
  vec3 deepBrown = vec3(0.25, 0.15, 0.08);
  vec3 brown     = vec3(0.42, 0.26, 0.15);
  vec3 cream     = vec3(0.95, 0.88, 0.78);
  
  // Bây giờ color không phải pulse theo time nữa
  // Mà dựa vào ELEVATION: chỗ trũng = deepBrown, chỗ ngang = brown, đỉnh = cream
  // vElevation range ~[-1, 1] → remap về [0, 1] để làm t cho mix
  float t = vElevation * 0.5 + 0.5;
  
  // Mix 2 màu base trước, rồi mix với màu thứ 3 — pattern lồng nhau (giống Mod 3 W2)
  vec3 lowColor = mix(deepBrown, brown, t * 2.0);     // t<0.5 mix range
  vec3 highColor = mix(brown, cream, (t - 0.5) * 2.0); // t>0.5 mix range
  
  // Chọn lowColor hay highColor tùy elevation
  vec3 color = (t < 0.5) ? lowColor : highColor;
  
  gl_FragColor = vec4(color, 1.0);
}