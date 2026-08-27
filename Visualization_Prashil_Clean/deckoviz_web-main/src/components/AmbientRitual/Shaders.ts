export const backgroundFragmentShader = `
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    float time = uTime * 0.2;
    
    // Multi-scale organic noise
    float n1 = sin(uv.x * 3.0 + time) * cos(uv.y * 2.0 - time);
    float n2 = sin(uv.y * 4.0 + time * 0.5) * cos(uv.x * 5.0 + time * 0.3);
    float noise = n1 * 0.5 + n2 * 0.5 + 0.5;
    
    // Smooth gradient mixing
    vec3 color = mix(uColor1, uColor2, noise);
    
    // Subtle darkening at edges for legibility
    float vignette = 1.0 - smoothstep(0.5, 1.5, length(vUv - 0.5) * 2.0);
    color *= (0.8 + 0.2 * vignette);
    
    gl_FragColor = vec4(color, 1.0);
}
`;

export const particleVertexShader = `
uniform float uTime;
uniform float uSpeed;
uniform float uIntensity;
attribute float aSize;
attribute vec3 aOffset;
varying float vAlpha;

void main() {
    vec3 pos = aOffset;
    
    // Fluid turbulence
    pos.x += sin(uTime * 0.5 + aOffset.y) * 0.2 * uIntensity;
    pos.z += cos(uTime * 0.5 + aOffset.x) * 0.2 * uIntensity;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (400.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    
    // Pulse alpha based on time and position
    vAlpha = 0.3 + 0.2 * sin(uTime + aOffset.x * 10.0);
}
`;

export const particleFragmentShader = `
varying float vAlpha;
void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;
    
    // Soft glow falloff
    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
    gl_FragColor = vec4(1.0, 1.0, 1.0, glow * vAlpha);
}
`;
