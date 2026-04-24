export const zenVertexShader = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPosition;
out vec2 vUv;
void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

export const rakeFragmentShader = `#version 300 es
precision highp float;

in vec2 vUv;
out float outHeight;

uniform sampler2D uHeightmap;
uniform vec2 uPos;
uniform vec2 uPrevPos;
uniform float uSize;
uniform float uDepth;
uniform float uSpacing;
uniform float uAngle;

void main() {
    float h = texture(uHeightmap, vUv).r;
    
    // Distance to line segment (rake stroke)
    vec2 pa = vUv - uPrevPos;
    vec2 ba = uPos - uPrevPos;
    float h2 = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    float d = length(pa - ba * h2);
    
    if (d < uSize) {
        // Parallel grooves based on local coordinate across the stroke
        vec2 dir = normalize(ba);
        vec2 perp = vec2(-dir.y, dir.x);
        float localX = dot(vUv - uPos, perp);
        
        float rake = sin(localX * 100.0 / uSpacing) * 0.5 + 0.5;
        float influence = (1.0 - d / uSize);
        h = mix(h, rake * uDepth, influence * 0.5);
    }
    
    outHeight = h;
}
`;

export const zenRenderFragmentShader = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform sampler2D uHeightmap;
uniform vec2 uResolution;
uniform vec3 uLightPos;

void main() {
    vec2 texel = 1.0 / uResolution;
    
    // Height samples for normals
    float h = texture(uHeightmap, vUv).r;
    float hR = texture(uHeightmap, vUv + vec2(texel.x, 0.0)).r;
    float hU = texture(uHeightmap, vUv + vec2(0.0, texel.y)).r;
    
    // Normal calculation
    vec3 normal = normalize(vec3((h - hR) * 100.0, (h - hU) * 100.0, 1.0));
    
    // Lighting (Blinn-Phong)
    vec3 lightDir = normalize(uLightPos - vec3(vUv, 0.0));
    float diff = max(dot(normal, lightDir), 0.0);
    
    // Sand color
    vec3 sandColor = vec3(0.9, 0.85, 0.7);
    vec3 ambient = sandColor * 0.4;
    vec3 diffuse = sandColor * diff * 0.8;
    
    // Specular for graininess
    float spec = pow(max(dot(normal, normalize(lightDir + vec3(0,0,1))), 0.0), 32.0);
    vec3 specular = vec3(1.0) * spec * 0.2;
    
    outColor = vec4(ambient + diffuse + specular, 1.0);
}
`;
