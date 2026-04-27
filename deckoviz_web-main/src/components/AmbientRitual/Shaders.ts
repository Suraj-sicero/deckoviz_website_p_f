export const backgroundFragmentShader = `
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
varying vec2 vUv;

void main() {
    float n = sin(vUv.x * 2.0 + uTime * 0.1) * cos(vUv.y * 2.0 + uTime * 0.1) * 0.5 + 0.5;
    vec3 color = mix(uColor1, uColor2, n);
    gl_FragColor = vec4(color, 1.0);
}
`;

export const particleVertexShader = `
uniform float uTime;
uniform float uSpeed;
uniform float uIntensity;
attribute float aSize;
attribute vec3 aOffset;

void main() {
    vec3 pos = position + aOffset;
    
    // Different motion styles handled here or via attributes
    pos.y += sin(uTime * uSpeed + aOffset.x) * uIntensity;
    pos.x += cos(uTime * uSpeed + aOffset.y) * uIntensity;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}
`;

export const particleFragmentShader = `
void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * 0.5);
}
`;
