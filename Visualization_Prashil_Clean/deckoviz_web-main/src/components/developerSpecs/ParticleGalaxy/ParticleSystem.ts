import { 
    updateVertexShader, 
    renderVertexShader, 
    renderFragmentShader, 
    passThroughFragmentShader,
    screenVertexShader,
    trailFragmentShader
} from './Shaders';

export class ParticleSystem {
    gl: WebGL2RenderingContext;
    count: number;
    
    updateProgram: WebGLProgram;
    renderProgram: WebGLProgram;
    trailProgram: WebGLProgram;
    
    vaos: WebGLVertexArrayObject[] = [];
    vbos: WebGLBuffer[][] = [];
    tfos: WebGLTransformFeedback[] = [];
    trailVao: WebGLVertexArrayObject | null = null;
    
    currentIndex = 0;
    
    params = {
        force: 0.15,
        damping: 0.96,
        noiseAmount: 0.5,
        pointSize: 1.5,
        fade: 0.92,
        mode: 1, // 1: attract, -1: repel
        color1: [0.2, 0.5, 1.0], // Blue
        color2: [1.0, 0.2, 0.8], // Pink
        mouseDown: 0,
        mouse: [0, 0],
        zoom: 0.8,
        trails: true
    };

    constructor(gl: WebGL2RenderingContext, count: number) {
        this.gl = gl;
        this.count = count;

        this.updateProgram = this.createProgram(updateVertexShader, passThroughFragmentShader, ['vPosition', 'vVelocity']);
        this.renderProgram = this.createProgram(renderVertexShader, renderFragmentShader);
        this.trailProgram = this.createProgram(screenVertexShader, trailFragmentShader);

        this.initBuffers();
        this.initTrailBuffer();
    }

    createProgram(vsSource: string, fsSource: string, varyings?: string[]) {
        const gl = this.gl;
        const vs = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vs, vsSource);
        gl.compileShader(vs);
        if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(vs)!);

        const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fs, fsSource);
        gl.compileShader(fs);
        if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(fs)!);

        const program = gl.createProgram()!;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        
        if (varyings) {
            gl.transformFeedbackVaryings(program, varyings, gl.INTERLEAVED_ATTRIBS);
        }
        
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program)!);
        
        return program;
    }

    initBuffers() {
        const gl = this.gl;
        const interleavedData = new Float32Array(this.count * 4);
        for (let i = 0; i < this.count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.sqrt(Math.random()) * 0.8;
            interleavedData[i * 4] = Math.cos(angle) * radius;
            interleavedData[i * 4 + 1] = Math.sin(angle) * radius;
            interleavedData[i * 4 + 2] = (Math.random() - 0.5) * 0.01;
            interleavedData[i * 4 + 3] = (Math.random() - 0.5) * 0.01;
        }

        this.vaos = [];
        this.tfos = [];
        for (let i = 0; i < 2; i++) {
            const vao = gl.createVertexArray()!;
            gl.bindVertexArray(vao);
            const vbo = gl.createBuffer()!;
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, interleavedData, gl.STREAM_DRAW);
            gl.enableVertexAttribArray(0); // pos
            gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0);
            gl.enableVertexAttribArray(1); // vel
            gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 16, 8);
            this.vaos.push(vao);
            const tfo = gl.createTransformFeedback()!;
            gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, tfo);
            gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, vbo);
            this.tfos.push(tfo);
        }
    }

    initTrailBuffer() {
        const gl = this.gl;
        this.trailVao = gl.createVertexArray();
        gl.bindVertexArray(this.trailVao);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    }

    update(time: number, dt: number) {
        const gl = this.gl;
        const writeIndex = 1 - this.currentIndex;
        gl.useProgram(this.updateProgram);
        gl.uniform1f(gl.getUniformLocation(this.updateProgram, 'uTime'), time);
        gl.uniform1f(gl.getUniformLocation(this.updateProgram, 'uDeltaTime'), dt);
        gl.uniform2f(gl.getUniformLocation(this.updateProgram, 'uMouse'), this.params.mouse[0], this.params.mouse[1]);
        gl.uniform1f(gl.getUniformLocation(this.updateProgram, 'uMouseDown'), this.params.mouseDown);
        gl.uniform1f(gl.getUniformLocation(this.updateProgram, 'uMode'), this.params.mode);
        gl.uniform1f(gl.getUniformLocation(this.updateProgram, 'uForce'), this.params.force);
        gl.uniform1f(gl.getUniformLocation(this.updateProgram, 'uDamping'), this.params.damping);
        gl.uniform1f(gl.getUniformLocation(this.updateProgram, 'uNoiseAmount'), this.params.noiseAmount);
        gl.enable(gl.RASTERIZER_DISCARD);
        gl.bindVertexArray(this.vaos[this.currentIndex]);
        gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, this.tfos[writeIndex]);
        gl.beginTransformFeedback(gl.POINTS);
        gl.drawArrays(gl.POINTS, 0, this.count);
        gl.endTransformFeedback();
        gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
        gl.disable(gl.RASTERIZER_DISCARD);
        this.currentIndex = writeIndex;
    }

    render(width: number, height: number) {
        const gl = this.gl;
        
        // Draw Trails (Fade)
        if (this.params.trails) {
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.useProgram(this.trailProgram);
            gl.uniform1f(gl.getUniformLocation(this.trailProgram, 'uFade'), this.params.fade);
            gl.bindVertexArray(this.trailVao);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            gl.disable(gl.BLEND);
        } else {
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }

        // Render Particles
        gl.useProgram(this.renderProgram);
        const aspect = width / height;
        const zoom = this.params.zoom;
        const projection = new Float32Array([
            zoom / aspect, 0, 0, 0,
            0, zoom, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
        gl.uniformMatrix4fv(gl.getUniformLocation(this.renderProgram, 'uProjection'), false, projection);
        gl.uniform1f(gl.getUniformLocation(this.renderProgram, 'uPointSize'), this.params.pointSize);
        gl.uniform3fv(gl.getUniformLocation(this.renderProgram, 'uColor1'), this.params.color1);
        gl.uniform3fv(gl.getUniformLocation(this.renderProgram, 'uColor2'), this.params.color2);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.bindVertexArray(this.vaos[this.currentIndex]);
        gl.drawArrays(gl.POINTS, 0, this.count);
        gl.disable(gl.BLEND);
    }
}
