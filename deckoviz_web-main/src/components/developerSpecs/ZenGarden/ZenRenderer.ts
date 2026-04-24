import { zenVertexShader, rakeFragmentShader, zenRenderFragmentShader } from './Shaders';

export class ZenRenderer {
    gl: WebGL2RenderingContext;
    rakeProgram: WebGLProgram;
    renderProgram: WebGLProgram;
    quadVAO: WebGLVertexArrayObject;
    
    heightmaps: WebGLTexture[] = [];
    fbos: WebGLFramebuffer[] = [];
    currentMap = 0;
    
    params = {
        brushSize: 0.05,
        depth: 0.6,
        spacing: 1.0,
        mouse: [0.5, 0.5],
        prevMouse: [0.5, 0.5],
        isDrawing: false,
    };

    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
        this.rakeProgram = this.createProgram(zenVertexShader, rakeFragmentShader);
        this.renderProgram = this.createProgram(zenVertexShader, zenRenderFragmentShader);
        this.quadVAO = this.createQuad();
        this.initHeightmaps(1024, 1024);
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

    initHeightmaps(w: number, h: number) {
        const gl = this.gl;
        for (let i = 0; i < 2; i++) {
            const tex = gl.createTexture()!;
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, w, h, 0, gl.RED, gl.FLOAT, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            this.heightmaps.push(tex);

            const fbo = gl.createFramebuffer()!;
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
            this.fbos.push(fbo);
        }
        
        // Initial clear to neutral height
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbos[0]);
        gl.clearColor(0.5, 0.5, 0.5, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbos[1]);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    update() {
        if (!this.params.isDrawing) return;
        const gl = this.gl;
        const nextMap = 1 - this.currentMap;

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbos[nextMap]);
        gl.useProgram(this.rakeProgram);
        gl.bindVertexArray(this.quadVAO);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.heightmaps[this.currentMap]);
        gl.uniform1i(gl.getUniformLocation(this.rakeProgram, 'uHeightmap'), 0);
        
        gl.uniform2f(gl.getUniformLocation(this.rakeProgram, 'uPos'), this.params.mouse[0], this.params.mouse[1]);
        gl.uniform2f(gl.getUniformLocation(this.rakeProgram, 'uPrevPos'), this.params.prevMouse[0], this.params.prevMouse[1]);
        gl.uniform1f(gl.getUniformLocation(this.rakeProgram, 'uSize'), this.params.brushSize);
        gl.uniform1f(gl.getUniformLocation(this.rakeProgram, 'uDepth'), this.params.depth);
        gl.uniform1f(gl.getUniformLocation(this.rakeProgram, 'uSpacing'), this.params.spacing);

        gl.viewport(0, 0, 1024, 1024);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        this.currentMap = nextMap;
        this.params.prevMouse = [...this.params.mouse];
    }

    render(width: number, height: number) {
        const gl = this.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.useProgram(this.renderProgram);
        gl.bindVertexArray(this.quadVAO);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.heightmaps[this.currentMap]);
        gl.uniform1i(gl.getUniformLocation(this.renderProgram, 'uHeightmap'), 0);
        gl.uniform2f(gl.getUniformLocation(this.renderProgram, 'uResolution'), width, height);
        gl.uniform3f(gl.getUniformLocation(this.renderProgram, 'uLightPos'), -1.0, 1.0, 2.0);

        gl.viewport(0, 0, width, height);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    reset() {
        const gl = this.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbos[0]);
        gl.clearColor(0.5, 0.5, 0.5, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbos[1]);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
}
