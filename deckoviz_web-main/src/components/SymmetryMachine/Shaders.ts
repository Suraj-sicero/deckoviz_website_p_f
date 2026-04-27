export const kaleidoscopeShader = {
    vertex: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragment: `
        uniform float uTime;
        uniform float uSides;
        uniform float uZoom;
        uniform float uIntensity;
        uniform float uColorShift;
        varying vec2 vUv;

        #define PI 3.14159265359

        vec2 rotate(vec2 p, float a) {
            float s = sin(a);
            float c = cos(a);
            return mat2(c, -s, s, c) * p;
        }

        void main() {
            vec2 uv = vUv - 0.5;
            uv *= uZoom;
            
            // Polar coordinates
            float angle = atan(uv.y, uv.x);
            float radius = length(uv);
            
            // Symmetry
            float slice = PI * 2.0 / uSides;
            angle = mod(angle, slice);
            if (angle > slice * 0.5) angle = slice - angle;
            
            // Back to Cartesian
            vec2 p = vec2(cos(angle), sin(angle)) * radius;
            
            // Pattern generation
            p = rotate(p, uTime * 0.1);
            float pattern = sin(p.x * 10.0 + uTime) * cos(p.y * 10.0 - uTime);
            pattern += sin(radius * 20.0 - uTime * 2.0) * 0.5;
            
            // Color logic
            vec3 color = vec3(
                0.5 + 0.5 * sin(uColorShift + pattern * uIntensity),
                0.5 + 0.5 * sin(uColorShift + pattern * uIntensity + 2.0),
                0.5 + 0.5 * sin(uColorShift + pattern * uIntensity + 4.0)
            );
            
            // Add some glow
            color += pow(1.0 - radius, 3.0) * 0.2;
            
            gl_FragColor = vec4(color, 1.0);
        }
    `
};
