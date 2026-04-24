export const updateVertexShader = `#version 300 es
precision highp float;

layout(location = 0) in vec2 aPosition;
layout(location = 1) in vec2 aVelocity;

out vec2 vPosition;
out vec2 vVelocity;

uniform float uTime;
uniform float uDeltaTime;
uniform vec2 uMouse;
uniform float uMouseDown;
uniform float uMode; // 1: Attract, -1: Repel
uniform float uForce;
uniform float uDamping;
uniform float uNoiseAmount;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i  = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
    vec2 pos = aPosition;
    vec2 vel = aVelocity;

    // Gravity / Repulsion
    vec2 toMouse = uMouse - pos;
    float distSq = dot(toMouse, toMouse);
    float dist = sqrt(distSq);
    vec2 dir = toMouse / (dist + 0.0001);
    
    float strength = uForce / (distSq + 0.1);
    if (uMouseDown > 0.5) strength *= 5.0;
    
    vel += dir * strength * uMode * uDeltaTime;

    // Curl-like noise
    float n1 = snoise(pos * 2.0 + uTime * 0.1);
    float n2 = snoise(pos * 2.0 + 13.37 + uTime * 0.1);
    vel += vec2(n1, n2) * uNoiseAmount * uDeltaTime;

    // Swirl force
    vec2 swirl = vec2(-toMouse.y, toMouse.x) / (dist + 0.1);
    vel += swirl * 0.1 * uDeltaTime;

    // Integration
    vel *= uDamping;
    pos += vel * uDeltaTime;

    // Boundary check (wrap around or bounce)
    // if (abs(pos.x) > 2.0) pos.x *= -0.9;
    // if (abs(pos.y) > 2.0) pos.y *= -0.9;

    vPosition = pos;
    vVelocity = vel;
}
`;

export const renderVertexShader = `#version 300 es
precision highp float;

layout(location = 0) in vec2 aPosition;
layout(location = 1) in vec2 aVelocity;

out vec4 vColor;
out float vSpeed;

uniform mat4 uProjection;
uniform float uPointSize;
uniform vec3 uColor1;
uniform vec3 uColor2;

void main() {
    float speed = length(aVelocity);
    vSpeed = speed;
    
    // Color mapping
    vec3 color = mix(uColor1, uColor2, clamp(speed * 0.5, 0.0, 1.0));
    vColor = vec4(color, 1.0);

    gl_Position = uProjection * vec4(aPosition, 0.0, 1.0);
    gl_PointSize = uPointSize * (1.0 + speed * 2.0);
}
`;

export const renderFragmentShader = `#version 300 es
precision highp float;

in vec4 vColor;
in float vSpeed;
out vec4 outColor;

void main() {
    float dist = length(gl_PointCoord - 0.5);
    if (dist > 0.5) discard;
    
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha = pow(alpha, 2.0); // Sharper falloff
    
    outColor = vec4(vColor.rgb, alpha * 0.8);
}
`;

export const passThroughFragmentShader = `#version 300 es
precision highp float;
void main() {
    discard;
}
`;

export const screenVertexShader = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPosition;
out vec2 vUv;
void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

export const trailFragmentShader = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uTexture;
uniform float uFade;

void main() {
    vec4 tex = texture(uTexture, vUv);
    outColor = tex * uFade;
}
`;
