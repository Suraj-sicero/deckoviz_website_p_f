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
    
    // Multi-layered distortion
    float distToMouse = length(uv - uMouse);
    float warpAmount = uStrength * 0.15 / (distToMouse + 0.15);
    vec2 warpDir = normalize(uv - uMouse);
    
    vec2 warp = warpDir * warpAmount * (sin(uTime * 1.5 + distToMouse * 8.0) * 0.5 + 0.5);
    warp += vec2(sin(uv.y * 10.0 + uTime), cos(uv.x * 10.0 + uTime)) * 0.005 * uStrength;

    // Chromatic Aberration
    float aberration = 0.015 * uStrength;
    float r = texture(uSdfTex, uv + warp + vec2(aberration, 0.0)).r;
    float g = texture(uSdfTex, uv + warp).r;
    float b = texture(uSdfTex, uv + warp - vec2(aberration, 0.0)).r;
    
    // SDF edge detection with anti-aliasing
    float threshold = 0.5;
    float smoothing = 0.02;
    
    float alphaR = smoothstep(threshold - smoothing, threshold + smoothing, r);
    float alphaG = smoothstep(threshold - smoothing, threshold + smoothing, g);
    float alphaB = smoothstep(threshold - smoothing, threshold + smoothing, b);
    
    // Combine channels for final text
    vec3 textColor = vec3(
        alphaR * uColor.r,
        alphaG * uColor.g,
        alphaB * uColor.b
    );
    
    float mask = max(alphaR, max(alphaG, alphaB));

    // Volumetric Bloom / Glow
    float glowMask = smoothstep(0.4, 0.6, g);
    vec3 glow = uColor * glowMask * 1.2;
    
    // Subtle Scanlines
    float scanline = sin(uv.y * 800.0) * 0.04;
    textColor -= scanline * mask;

    // Final composition
    vec3 finalColor = textColor + glow * 0.2;
    
    // Background Vignette
    float vignette = 1.0 - smoothstep(0.5, 1.5, distToMouse);
    finalColor += vec3(0.01, 0.02, 0.03) * vignette; // Subtle deep blue tint

    outColor = vec4(finalColor, 1.0);
}
`;
