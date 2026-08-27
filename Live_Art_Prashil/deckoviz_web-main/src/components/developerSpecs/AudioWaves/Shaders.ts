export const waveVertexShader = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPosition;
out vec2 vUv;
void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

export const waveFragmentShader = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform float uTime;
uniform vec2 uResolution;
uniform float uBass;
uniform float uMid;
uniform float uTreble;
uniform float uIntensity;
uniform float uPatternMode;
uniform vec3 uColor1;
uniform vec3 uColor2;

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

// Particle helper
float hash(float n) { return fract(sin(n) * 43758.5453123); }

void main() {
    vec2 uv = vUv;
    vec2 p = (uv * 2.0 - 1.0);
    p.x *= uResolution.x / uResolution.y;

    float wave = 0.0;
    float t = uTime * (0.2 + uMid * 1.5);
    
    // Wave modes logic
    if (uPatternMode < 0.5) {
        for(float i = 1.0; i < 4.0; i++) {
            float freq = i * (2.0 + uMid * 5.0);
            wave += snoise(vec2(p.x * freq + t, p.y * freq - t)) * (0.12 / i) * (0.5 + uBass * 3.0);
        }
    } else if (uPatternMode < 1.5) {
        for(float i = 1.0; i < 6.0; i++) {
            float freq = i * (3.0 + uTreble * 15.0);
            wave += abs(snoise(vec2(p.x * freq, t * 3.0))) * (0.18 / i) * (0.5 + uBass * 4.0);
        }
        wave = pow(wave, 1.3);
    } else if (uPatternMode < 2.5) {
        float density = 10.0 + uMid * 30.0;
        float grid = floor(p.x * density) / density;
        wave = sin(grid * 10.0 + t * 8.0) * (0.15 + uBass * 0.4);
        wave += step(0.92, fract(p.x * (density * 0.5))) * (0.05 + uTreble * 0.1); 
    } else {
        wave = sin(p.x * (4.0 + uMid * 4.0) + t) * (0.1 + uBass * 0.5);
        wave += cos(p.x * (10.0 + uTreble * 5.0) - t * 2.0) * (0.05 + uMid * 0.2);
    }

    // Line effect
    float line = abs(p.y + wave);
    float glow = 0.02 / (line + 0.003) * uIntensity;
    
    // Particles emitting from peaks
    float particles = 0.0;
    for (float i = 0.0; i < 15.0; i++) {
        float h = hash(i * 123.456);
        float px = fract(h + uTime * 0.1) * 2.0 - 1.0;
        px *= uResolution.x / uResolution.y;
        
        // Calculate wave height at particle x
        float pWave = 0.0;
        if (uPatternMode < 0.5) pWave = snoise(vec2(px * 2.0 + t, -t)) * 0.12 * (0.5 + uBass * 3.0);
        else if (uPatternMode < 1.5) pWave = abs(snoise(vec2(px * 3.0, t * 3.0))) * 0.18 * (0.5 + uBass * 4.0);
        else pWave = sin(px * 5.0 + t) * 0.1;
        
        vec2 pPos = vec2(px, -pWave + (h - 0.5) * uBass * 0.5);
        float pDist = length(p - pPos);
        particles += (0.001 * (1.0 + uTreble * 5.0)) / (pDist * pDist + 0.001);
    }
    
    // Color mapping
    vec3 baseColor = mix(uColor1, uColor2, uv.x + uTreble * 0.8);
    vec3 color = baseColor * glow;
    
    // Add particles
    color += baseColor * particles * uIntensity;
    
    // Audio boost
    color += color * uBass * 1.2;
    
    // Flash effect on heavy bass
    if (uBass > 0.8) {
        color += uColor2 * (uBass - 0.8) * 2.5;
    }

    outColor = vec4(color, 1.0);
}
`;
