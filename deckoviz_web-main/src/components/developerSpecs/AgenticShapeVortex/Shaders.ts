export const vertexShaderSource = `#version 300 es
in vec2 position;
out vec2 vUv;

void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const fragmentShaderSource = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform float uTime;
uniform vec2 uResolution;
uniform int uShapeType; // 0: Galaxy, 1: Rings, 2: Spirograph, 3: Rose, 4: Starburst, 5: Superformula
uniform vec3 uPrimaryColor;
uniform vec3 uSecondaryColor;
uniform vec3 uBackgroundColor;
uniform float uSpinSpeed;
uniform float uDitherLevels;
uniform float uStarDensity;
uniform float uShapeScale;
uniform float uShapeDensity;
uniform float uShapeParam;
uniform float uGridOpacity;

// 4x4 Bayer Dithering Matrix
float bayer4x4(vec2 uv) {
    ivec2 p = ivec2(mod(uv, 4.0));
    int index = p.x + p.y * 4;
    float m[16] = float[16](
        0.0,  8.0,  2.0,  10.0,
        12.0, 4.0,  14.0, 6.0,
        3.0,  11.0, 1.0,  9.0,
        15.0, 7.0,  13.0, 5.0
    );
    return m[index] / 16.0;
}

// Simple hash for noise/stars
float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

// Twinkling stars generator
float getStars(vec2 uv, float time, float density) {
    vec2 gridUv = uv * 80.0;
    vec2 id = floor(gridUv);
    vec2 f = fract(gridUv) - 0.5;
    
    float h = hash(id);
    if (h > density * 0.15) return 0.0;
    
    float size = 0.1 + 0.4 * hash(id + 10.0);
    float dist = length(f);
    
    float twinkle = 0.5 + 0.5 * sin(time * (2.0 + h * 5.0) + h * 10.0);
    return smoothstep(size, 0.0, dist) * twinkle;
}

void main() {
    // Normalize coordinates with correct aspect ratio
    vec2 uv = vUv - 0.5;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = uv;
    p.x *= aspect;
    
    // Scale the space
    p /= uShapeScale;
    
    float r = length(p);
    float a = atan(p.y, p.x);
    
    float shapeIntensity = 0.0;
    float coreGlow = 0.0;
    
    // Spin angle
    float spin = uTime * uSpinSpeed;
    
    if (uShapeType == 0) {
        // Logarithmic Spiral Galaxy (Agentic Quality Control style)
        float armPhase = a * uShapeParam + log(r + 0.05) * uShapeDensity - spin;
        float arms = 0.5 + 0.5 * cos(armPhase);
        
        // Sharpen the arms and fade out radially
        shapeIntensity = pow(arms, 1.8) * smoothstep(0.45, 0.05, r);
        coreGlow = smoothstep(0.35, 0.0, r) * 0.8 + smoothstep(0.08, 0.0, r) * 1.0;
        
    } else if (uShapeType == 1) {
        // Pulsating Concentric Torus Rings
        float ring = 0.5 + 0.5 * sin(r * uShapeDensity * 12.0 - spin * 4.0);
        shapeIntensity = pow(ring, 2.5) * smoothstep(0.5, 0.05, r);
        coreGlow = smoothstep(0.12, 0.0, r) * 0.7;
        
    } else if (uShapeType == 2) {
        // Spiral Spirograph Gear
        float spiro = 0.2 + 0.1 * cos(a * uShapeParam + r * uShapeDensity - spin);
        shapeIntensity = smoothstep(0.03, 0.0, abs(r - spiro));
        coreGlow = smoothstep(0.08, 0.0, r) * 0.4;
        
    } else if (uShapeType == 3) {
        // Rotating Rose Curve (Rhodonea)
        float rose = abs(sin(a * uShapeParam - spin)) * 0.28;
        shapeIntensity = smoothstep(0.02, 0.0, abs(r - rose));
        coreGlow = smoothstep(0.08, 0.0, r) * 0.5;
        
    } else if (uShapeType == 4) {
        // Starburst / Rayburst
        float rays = 0.5 + 0.5 * sin(a * uShapeParam - spin);
        shapeIntensity = pow(rays, 3.5) * smoothstep(0.55, 0.05, r);
        coreGlow = smoothstep(0.06, 0.0, r) * 1.2;
        
    } else if (uShapeType == 5) {
        // Superformula Shape
        float m = uShapeParam;
        float n1 = 1.0, n2 = 1.2, n3 = 1.2;
        float cost = cos(m * (a - spin) / 4.0);
        float sint = sin(m * (a - spin) / 4.0);
        float rLimit = pow(pow(abs(cost), n2) + pow(abs(sint), n3), -1.0 / n1) * 0.28;
        shapeIntensity = smoothstep(0.02, 0.0, abs(r - rLimit));
        coreGlow = smoothstep(0.05, 0.0, r) * 0.8;
    }
    
    // Add simple radial ambient glow
    float radialAmbient = smoothstep(0.65, 0.0, r) * 0.15;
    
    // Mix shape gradient colors
    // Outer shape fades from primary to secondary, center core is secondary + white glow
    vec3 shapeColor = mix(uPrimaryColor, uSecondaryColor, shapeIntensity);
    vec3 finalGlow = mix(shapeColor, vec3(1.0), coreGlow * 0.4) * (shapeIntensity + coreGlow + radialAmbient);
    
    // Render stars background
    float starsVal = getStars(vUv, uTime, uStarDensity);
    vec3 starsColor = vec3(starsVal) * uSecondaryColor;
    
    // Combine shape and stars over background
    vec3 col = mix(uBackgroundColor, finalGlow, clamp(shapeIntensity + coreGlow + radialAmbient, 0.0, 1.0));
    col += starsColor;
    
    // Draw alignment grid
    vec2 gridLines = step(0.985, fract(vUv * vec2(30.0 * aspect, 30.0)));
    float gridVal = max(gridLines.x, gridLines.y);
    col = mix(col, vec3(0.0, 0.0, 0.0), gridVal * uGridOpacity);
    
    // Apply 4x4 Bayer matrix ordered dithering
    float ditherVal = bayer4x4(gl_FragCoord.xy) - 0.5;
    col += ditherVal * (1.0 / uDitherLevels);
    
    // Color Quantization (Retro 8-bit dithered styling)
    col = clamp(col, 0.0, 1.0);
    col = floor(col * uDitherLevels + 0.5) / uDitherLevels;
    
    fragColor = vec4(col, 1.0);
}
`;
