export const weatherVertexShader = `#version 300 es
precision highp float;

layout(location = 0) in vec2 aPosition;
layout(location = 1) in vec4 aOffset; // x, y, size, life

uniform float uTime;
uniform float uWeatherType; // 0: Rain, 1: Snow, 2: Wind
uniform float uIntensity;
uniform vec2 uWind;
uniform vec2 uResolution;

out float vLife;
out float vType;

void main() {
    vLife = aOffset.w;
    vType = uWeatherType;
    
    vec2 pos = aOffset.xy;
    float size = aOffset.z;
    
    // Instance-based position logic
    vec2 p = aPosition * size;
    
    // Stretch rain particles
    if (uWeatherType == 0.0) {
        p.y *= 10.0;
    }
    
    gl_Position = vec4(pos + p / uResolution, 0.0, 1.0);
}
`;

export const weatherFragmentShader = `#version 300 es
precision highp float;

in float vLife;
in float vType;
out vec4 outColor;

uniform float uFlash;

void main() {
    vec3 color = vec3(1.0);
    float alpha = vLife;
    
    if (vType == 0.0) { // Rain
        color = vec3(0.7, 0.8, 1.0);
        alpha *= 0.5;
    } else if (vType == 1.0) { // Snow
        color = vec3(1.0);
        alpha *= 0.8;
    } else if (vType == 2.0) { // Wind/Sand
        color = vec3(0.8, 0.7, 0.5);
        alpha *= 0.3;
    }
    
    // Flash influence
    color += uFlash * 0.5;
    
    outColor = vec4(color, alpha);
}
`;

export const atmosphereFragmentShader = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform float uTime;
uniform float uWeatherType;
uniform float uFlash;
uniform float uIntensity;
uniform vec2 uResolution;

float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    
    vec3 dayColor = vec3(0.4, 0.6, 0.8);
    vec3 nightColor = vec3(0.05, 0.05, 0.1);
    vec3 stormColor = vec3(0.1, 0.1, 0.15);
    
    vec3 sky;
    if (uWeatherType == 3.0) { // Storm
        sky = mix(stormColor, vec3(0.3), uFlash);
    } else if (uWeatherType == 2.0) { // Sand
        sky = vec3(0.3, 0.2, 0.1);
    } else if (uWeatherType == 1.0) { // Snow
        sky = vec3(0.15, 0.2, 0.3);
    } else {
        sky = mix(nightColor, dayColor, 0.2); // Default to dusk
    }
    
    // Fog effect
    float fog = 0.0;
    if (uWeatherType == 4.0 || uWeatherType == 3.0) { // Fog or Storm
        fog = noise(uv * 2.0 + uTime * 0.1) * uIntensity * 0.5;
    }
    
    vec3 color = mix(sky, vec3(0.5, 0.5, 0.6), fog);
    
    // Vignette
    float vig = 1.0 - length(uv - 0.5) * 1.5;
    color *= clamp(vig, 0.5, 1.0);
    
    outColor = vec4(color, 1.0);
}
`;
