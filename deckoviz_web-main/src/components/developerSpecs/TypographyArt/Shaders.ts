export const typoVertexShader = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPosition;
out vec2 vUv;
void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

export const typoFragmentShader = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform sampler2D uSdfTex;
uniform float uTime;
uniform vec2 uMouse;
uniform float uStrength;
uniform vec3 uColor;

void main() {
    vec2 uv = vUv;
    
    // Dynamic distortion based on mouse and time
    float distToMouse = length(uv - uMouse);
    vec2 warp = normalize(uv - uMouse) * (uStrength * 0.05 / (distToMouse + 0.1)) * sin(uTime + distToMouse * 10.0);
    
    // Sample SDF
    float sdf = texture(uSdfTex, uv + warp).r;
    
    // SDF thresholding with smoothing (anti-aliasing)
    float edge = 0.5;
    float smoothing = 0.02;
    float alpha = smoothstep(edge - smoothing, edge + smoothing, sdf);
    
    // Color and glow
    vec3 color = uColor;
    float glow = smoothstep(edge + 0.2, edge, sdf) * 0.5;
    
    outColor = vec4(color + glow, alpha);
}
`;
