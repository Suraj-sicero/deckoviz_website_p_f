export const commonVertexShader = `
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vViewPosition;

uniform float uTime;
uniform float uSpeed;
uniform float uIntensity;

void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    
    gl_Position = projectionMatrix * mvPosition;
}
`;

export const liquidMetalShader = {
    vertex: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        uniform float uTime;
        uniform float uSpeed;
        
        // Simplex 3D noise
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        float snoise(vec3 v) { 
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
            float n_ = 0.142857142857;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ * ns.x + ns.yyyy;
            vec4 y = y_ * ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
            vec3 p0 = vec3(a0.xy,h.x);
            vec3 p1 = vec3(a0.zw,h.y);
            vec3 p2 = vec3(a1.xy,h.z);
            vec3 p3 = vec3(a1.zw,h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
            p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
        }

        void main() {
            vec3 pos = position;
            float noise = snoise(pos * 0.5 + uTime * uSpeed * 0.5);
            pos += normal * noise * 0.2;
            vNormal = normalize(normalMatrix * normal);
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            vViewPosition = -mvPosition.xyz;
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragment: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        uniform vec3 uColor;
        
        void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewPosition);
            float fresnel = pow(1.0 - dot(viewDir, normal), 3.0);
            vec3 color = mix(uColor, vec3(1.0), fresnel);
            gl_FragColor = vec4(color, 1.0);
        }
    `
};

export const lavaShader = {
    fragment: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float uTime;
        uniform float uSpeed;
        uniform float uIntensity;

        float noise(vec2 p) {
            return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
            vec2 p = vUv * 5.0;
            float n = noise(p + uTime * uSpeed);
            
            vec3 dark = vec3(0.1, 0.0, 0.0);
            vec3 glow = vec3(1.0, 0.3, 0.0);
            
            float dist = distance(vUv, vec2(0.5));
            float mask = sin(p.x * 2.0 + uTime) * cos(p.y * 2.0 + uTime * 0.5);
            
            vec3 color = mix(dark, glow * uIntensity, smoothstep(-0.2, 0.5, mask));
            gl_FragColor = vec4(color, 1.0);
        }
    `
};

export const crystalShader = {
    fragment: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        uniform vec3 uColor;

        void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewPosition);
            float fresnel = pow(1.0 - dot(viewDir, normal), 2.0);
            
            vec3 baseColor = uColor;
            vec3 rainbow = vec3(
                sin(fresnel * 10.0),
                sin(fresnel * 10.0 + 2.0),
                sin(fresnel * 10.0 + 4.0)
            ) * 0.5 + 0.5;
            
            vec3 finalColor = mix(baseColor, rainbow, fresnel);
            gl_FragColor = vec4(finalColor, 1.0);
        }
    `
};

export const glassShader = {
    fragment: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        uniform vec3 uColor;

        void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewPosition);
            float fresnel = pow(1.0 - dot(viewDir, normal), 5.0);
            float alpha = mix(0.2, 0.8, fresnel);
            gl_FragColor = vec4(uColor, alpha);
        }
    `
};

export const fabricShader = {
    vertex: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        uniform float uTime;
        uniform float uSpeed;
        
        void main() {
            vUv = uv;
            vec3 pos = position;
            float wave = sin(pos.x * 2.0 + uTime * uSpeed) * cos(pos.y * 2.0 + uTime * uSpeed) * 0.1;
            pos += normal * wave;
            vNormal = normalize(normalMatrix * normal);
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            vViewPosition = -mvPosition.xyz;
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragment: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        uniform vec3 uColor;
        
        void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewPosition);
            float specular = pow(max(dot(normal, viewDir), 0.0), 8.0);
            
            // Simulating fabric weave pattern
            float weave = sin(vUv.x * 200.0) * sin(vUv.y * 200.0) * 0.1;
            vec3 color = mix(uColor, vec3(1.0), specular + weave);
            gl_FragColor = vec4(color, 1.0);
        }
    `
};

export const sandShader = {
    fragment: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uColor;
        
        float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }
        
        void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewPosition);
            float diff = max(dot(normal, viewDir), 0.0);
            
            float grain = random(vUv * 500.0 + uTime * 0.1);
            vec3 color = uColor * (diff + grain * 0.2);
            gl_FragColor = vec4(color, 1.0);
        }
    `
};
