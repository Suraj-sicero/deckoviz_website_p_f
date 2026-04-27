export const dreamVertexShader = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPosition;
out vec2 vUv;
void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

export const dreamFragmentShader = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform float uMix;
uniform float uTime;

// Simple 2D noise
float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 uv = vUv;
    
    // Noise-based displacement for dreamy transition
    float n = noise(uv * 10.0 + uTime * 0.1);
    vec2 disp = vec2(n, noise(uv * 11.0 + uTime * 0.1)) * 0.05 * sin(uMix * 3.14159);
    
    vec4 col1 = texture(uTex1, uv + disp * uMix);
    vec4 col2 = texture(uTex2, uv - disp * (1.0 - uMix));
    
    outColor = mix(col1, col2, uMix);
}
`;
