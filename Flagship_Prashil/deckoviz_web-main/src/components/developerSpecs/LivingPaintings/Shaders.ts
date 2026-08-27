export const paintingVertexShader = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPosition;
out vec2 vUv;
void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

export const paintingFragmentShader = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform sampler2D uTexture;
uniform float uTime;
uniform float uWarpStrength;
uniform float uMotionSpeed;
uniform float uDustIntensity;
uniform float uDayTime; // 0 to 1 (Day to Night)
uniform vec2 uResolution;

// Simplex Noise
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
  i  = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
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
    vec2 uv = vUv;
    float t = uTime * uMotionSpeed;
    
    // 1. Layered Parallax Motion
    // We simulate depth using different noise frequencies
    float noise1 = snoise(uv * 1.5 + t * 0.1);
    float noise2 = snoise(uv * 4.0 - t * 0.2);
    
    // Parallax displacement (subtle)
    vec2 offset = vec2(noise1, noise2) * 0.005 * uWarpStrength;
    
    // 2. Brushstroke Animation (Van Gogh style flow)
    float flow = snoise(uv * 8.0 + t * 0.05);
    offset += vec2(cos(flow * 6.28), sin(flow * 6.28)) * 0.002 * uWarpStrength;
    
    vec4 color = texture(uTexture, uv + offset);
    
    // 3. Time Evolution (Day -> Sunset -> Night)
    // uDayTime: 0 = Day, 0.5 = Sunset, 1.0 = Night
    vec3 dayColor = vec3(1.0, 1.0, 1.0);
    vec3 sunsetColor = vec3(1.1, 0.7, 0.5);
    vec3 nightColor = vec3(0.4, 0.5, 0.8);
    
    vec3 mood;
    if (uDayTime < 0.5) mood = mix(dayColor, sunsetColor, uDayTime * 2.0);
    else mood = mix(sunsetColor, nightColor, (uDayTime - 0.5) * 2.0);
    
    color.rgb *= mood;
    
    // 4. Shifting Highlights
    float highlight = snoise(uv * 2.0 + t * 0.15);
    color.rgb += max(0.0, highlight) * 0.05 * (1.0 - uDayTime);
    
    // 5. Dust / Pollen Particles
    vec2 p = (vUv * 2.0 - 1.0);
    p.x *= uResolution.x / uResolution.y;
    
    float dust = 0.0;
    for(float i = 0.0; i < 8.0; i++) {
        float h = fract(sin(i * 456.789) * 1000.0);
        vec2 pos = vec2(
            fract(h + t * 0.02) * 2.0 - 1.0,
            fract(h * 1.5 - t * 0.01) * 2.0 - 1.0
        );
        pos.x *= uResolution.x / uResolution.y;
        float d = length(p - pos);
        dust += 0.0005 / (d * d + 0.0005);
    }
    color.rgb += dust * uDustIntensity * mix(1.0, 0.2, uDayTime);

    outColor = vec4(color.rgb, 1.0);
}
`;

