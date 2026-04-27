import { weatherVertexShader, weatherFragmentShader, atmosphereFragmentShader } from './Shaders';

export class WeatherRenderer {
    gl: WebGL2RenderingContext;
    particleProgram: WebGLProgram;
    atmosProgram: WebGLProgram;
    quadVAO: WebGLVertexArrayObject;
    particleVAO: WebGLVertexArrayObject;
    instanceVBO: WebGLBuffer;
    
    particleCount = 20000;
    particles: Float32Array;
    
    params = {
        type: 0, // 0: Rain, 1: Snow, 2: Sand, 3: Storm, 4: Fog
        intensity: 0.5,
        wind: [0.0, 0.0],
        flash: 0.0,
        time: 0.0,
    };

    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
        this.particleProgram = this.createProgram(weatherVertexShader, weatherFragmentShader);
        this.atmosProgram = this.createProgram(this.getAtmosVS(), atmosphereFragmentShader);
        
        this.quadVAO = this.createQuad();
        this.particles = new Float32Array(this.particleCount * 4); // x, y, size, life
        this.initParticles();
        
        this.instanceVBO = gl.createBuffer()!;
        this.particleVAO = this.createParticleVAO();
    }

    getAtmosVS() {
        return `#version 300 es
        layout(location = 0) in vec2 aPosition;
        void main() {
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }`;
    }

    createProgram(vsSource: string, fsSource: string) {
        const gl = this.gl;
        const vs = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vs, vsSource);
        gl.compileShader(vs);
        const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fs, fsSource);
        gl.compileShader(fs);
        const program = gl.createProgram()!;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        return program;
    }

    createQuad() {
        const gl = this.gl;
        const vao = gl.createVertexArray()!;
        gl.bindVertexArray(vao);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        return vao;
    }

    createParticleVAO() {
        const gl = this.gl;
        const vao = gl.createVertexArray()!;
        gl.bindVertexArray(vao);
        
        // Base particle shape (a tiny quad)
        const quadBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        
        // Instance data buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceVBO);
        gl.bufferData(gl.ARRAY_BUFFER, this.particles, gl.DYNAMIC_DRAW);
        
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 0, 0);
        gl.vertexAttribDivisor(1, 1);
        
        return vao;
    }

    initParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.resetParticle(i);
        }
    }

    resetParticle(i: number) {
        const idx = i * 4;
        this.particles[idx] = (Math.random() * 2 - 1); // x
        this.particles[idx + 1] = (Math.random() * 2 - 1); // y
        this.particles[idx + 2] = Math.random() * 2 + 1; // size
        this.particles[idx + 3] = Math.random(); // life
    }

    update(dt: number) {
        this.params.time += dt * 0.001;
        
        // Flash logic for storm
        if (this.params.type === 3) {
            if (Math.random() < 0.01) this.params.flash = 1.0;
            this.params.flash *= 0.9;
        } else {
            this.params.flash = 0.0;
        }

        const type = this.params.type;
        const speed = (type === 0 ? 0.05 : 0.01) * this.params.intensity;
        const windX = this.params.wind[0] * 0.02;

        for (let i = 0; i < this.particleCount; i++) {
            const idx = i * 4;
            
            // Movement
            this.particles[idx] += windX;
            this.particles[idx + 1] -= speed;
            
            // Boundary check
            if (this.particles[idx + 1] < -1.0) {
                this.particles[idx + 1] = 1.0;
                this.particles[idx] = Math.random() * 2 - 1;
            }
            if (Math.abs(this.particles[idx]) > 1.1) {
                this.particles[idx] = -Math.sign(this.particles[idx]) * 1.0;
            }
        }
        
        const gl = this.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceVBO);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.particles);
    }

    render(width: number, height: number) {
        const gl = this.gl;
        gl.viewport(0, 0, width, height);
        
        // 1. Atmosphere
        gl.useProgram(this.atmosProgram);
        gl.bindVertexArray(this.quadVAO);
        gl.uniform1f(gl.getUniformLocation(this.atmosProgram, 'uTime'), this.params.time);
        gl.uniform1f(gl.getUniformLocation(this.atmosProgram, 'uWeatherType'), this.params.type);
        gl.uniform1f(gl.getUniformLocation(this.atmosProgram, 'uFlash'), this.params.flash);
        gl.uniform1f(gl.getUniformLocation(this.atmosProgram, 'uIntensity'), this.params.intensity);
        gl.uniform2f(gl.getUniformLocation(this.atmosProgram, 'uResolution'), width, height);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        // 2. Particles
        if (this.params.type !== 4) { // No particles in pure fog
            gl.useProgram(this.particleProgram);
            gl.bindVertexArray(this.particleVAO);
            gl.uniform1f(gl.getUniformLocation(this.particleProgram, 'uTime'), this.params.time);
            gl.uniform1f(gl.getUniformLocation(this.particleProgram, 'uWeatherType'), this.params.type);
            gl.uniform1f(gl.getUniformLocation(this.particleProgram, 'uIntensity'), this.params.intensity);
            gl.uniform1f(gl.getUniformLocation(this.particleProgram, 'uFlash'), this.params.flash);
            gl.uniform2f(gl.getUniformLocation(this.particleProgram, 'uWind'), this.params.wind[0], this.params.wind[1]);
            gl.uniform2f(gl.getUniformLocation(this.particleProgram, 'uResolution'), width, height);
            
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, this.particleCount);
            gl.disable(gl.BLEND);
        }
    }
}
