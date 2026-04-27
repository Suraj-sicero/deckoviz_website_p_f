export const fractalVertexShader = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPosition;
out vec2 vUv;
void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

export const fractalFragmentShader = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform vec2 uResolution;
uniform vec2 uCenter;
uniform float uZoom;
uniform float uTime;
uniform int uIterations;
uniform int uFractalType; // 0: Mandelbrot, 1: Julia, 2: Burning Ship, 3: Multibrot
uniform int uMode; // 0: Normal, 1: Kaleidoscope, 2: Sacred Geometry, 3: Psychedelic, 4: Organic
uniform vec2 uJuliaParam;
uniform float uPower;
uniform int uPalette;
uniform float uColorShift;
uniform bool uColorAnimate;

#define PI 3.14159265359

// Complex math helpers
vec2 cMul(vec2 a, vec2 b) {
    return vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x);
}

vec2 cPow(vec2 z, float p) {
    float r = length(z);
    float a = atan(z.y, z.x);
    return pow(r, p) * vec2(cos(a*p), sin(a*p));
}

// Symmetry transformations
vec2 kaleidoscope(vec2 p, float n) {
    float angle = PI / n;
    float a = atan(p.y, p.x) + angle;
    a = mod(a, 2.0 * angle) - angle;
    return length(p) * vec2(cos(a), sin(a));
}

vec2 sacredGeometry(vec2 p) {
    float r = length(p);
    float a = atan(p.y, p.x);
    a += sin(r * 10.0 - uTime) * 0.2;
    return vec2(r * cos(a), r * sin(a));
}

// Color palettes
vec3 getPalette(float t) {
    float shift = uColorShift + (uColorAnimate ? uTime * 0.2 : 0.0);
    t += shift;
    
    if (uPalette == 0) { // Neon
        return 0.5 + 0.5 * cos(6.28318 * (vec3(1.0, 0.0, 1.0) * t + vec3(0.0, 0.33, 0.67)));
    } else if (uPalette == 1) { // Cosmic
        return 0.5 + 0.5 * cos(6.28318 * (vec3(1.0, 1.0, 1.0) * t + vec3(0.0, 0.1, 0.2)));
    } else if (uPalette == 2) { // Pastel
        return 0.7 + 0.3 * cos(6.28318 * (vec3(0.3, 0.2, 0.2) * t + vec3(0.0, 0.5, 1.0)));
    } else { // Psychedelic
        return 0.5 + 0.5 * cos(6.28318 * (vec3(1.0, 2.0, 3.0) * t + vec3(0.0, 0.1, 0.2)));
    }
}

void main() {
    vec2 p = (vUv * 2.0 - 1.0);
    p.x *= uResolution.x / uResolution.y;

    // Apply Mode Transformations
    if (uMode == 1) p = kaleidoscope(p, 6.0);
    if (uMode == 2) p = sacredGeometry(p);
    if (uMode == 3) p += 0.02 * vec2(sin(p.y * 10.0 + uTime), cos(p.x * 10.0 + uTime));

    vec2 c, z;
    
    // Initialize c and z based on fractal type
    if (uFractalType == 1) { // Julia
        z = uCenter + p * uZoom;
        c = uJuliaParam;
    } else {
        z = vec2(0.0);
        c = uCenter + p * uZoom;
    }

    float iter = 0.0;
    float maxIter = float(uIterations);
    float trap = 1e10;

    for(int i = 0; i < 1000; i++) {
        if (float(i) >= maxIter) break;

        if (uFractalType == 0 || uFractalType == 1) { // Mandelbrot or Julia
            z = vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + c;
        } else if (uFractalType == 2) { // Burning Ship
            z = vec2(z.x*z.x - z.y*z.y, abs(2.0*z.x*z.y)) + c;
            z.x = abs(z.x);
            z.y = abs(z.y);
        } else if (uFractalType == 3) { // Multibrot
            z = cPow(z, uPower) + c;
        }
        
        if (uMode == 4) { // Organic
            z.x += sin(z.y * 2.0) * 0.1;
        }

        float dotZ = dot(z, z);
        if(dotZ > 65536.0) break;
        
        trap = min(trap, dotZ);
        iter += 1.0;
    }

    if(iter >= maxIter) {
        outColor = vec4(0.0, 0.0, 0.0, 1.0);
    } else {
        // Smooth coloring
        float smoothIter = iter - log2(log2(dot(z,z))) + 4.0;
        vec3 color = getPalette(smoothIter * 0.02);
        
        // Orbit trap influence for extra detail
        color = mix(color, getPalette(trap * 0.1), 0.2);
        
        // Mode 3 Psychedelic extra spice
        if (uMode == 3) {
            color.rg = cMul(color.rg, vec2(cos(uTime), sin(uTime)));
        }

        outColor = vec4(abs(color), 1.0);
    }
}
`;
