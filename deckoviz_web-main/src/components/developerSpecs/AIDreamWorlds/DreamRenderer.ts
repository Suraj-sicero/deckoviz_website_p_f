import { dreamVertexShader, dreamFragmentShader } from './Shaders';

export class DreamRenderer {
    gl: WebGL2RenderingContext;
    program: WebGLProgram;
    quadVAO: WebGLVertexArrayObject;
    textures: WebGLTexture[] = [];
    
    currentIdx = 0;
    nextIdx = 1;
    mix = 0;

    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
        this.program = this.createProgram(dreamVertexShader, dreamFragmentShader);
        this.quadVAO = this.createQuad();
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

    async loadFrames(urls: string[]) {
        const gl = this.gl;
        // Clean up old textures
        this.textures.forEach(t => gl.deleteTexture(t));
        this.textures = [];

        const loaders = urls.map(url => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = url;
            return new Promise<WebGLTexture>((resolve) => {
                img.onload = () => {
                    const tex = gl.createTexture()!;
                    gl.bindTexture(gl.TEXTURE_2D, tex);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                    resolve(tex);
                };
                img.onerror = () => {
                    console.error("Failed to load dream frame:", url);
                    const tex = gl.createTexture()!;
                    gl.bindTexture(gl.TEXTURE_2D, tex);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
                    resolve(tex);
                };
            });
        });

        this.textures = await Promise.all(loaders);
        this.currentIdx = 0;
        this.nextIdx = 1;
        this.mix = 0;
    }

    render(time: number, width: number, height: number, speed: number) {
        const gl = this.gl;
        if (this.textures.length < 2) return;

        this.mix += speed;
        if (this.mix >= 1.0) {
            this.mix = 0;
            this.currentIdx = (this.currentIdx + 1) % this.textures.length;
            this.nextIdx = (this.currentIdx + 1) % this.textures.length;
        }

        gl.useProgram(this.program);
        gl.bindVertexArray(this.quadVAO);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.textures[this.currentIdx]);
        gl.uniform1i(gl.getUniformLocation(this.program, 'uTex1'), 0);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.textures[this.nextIdx]);
        gl.uniform1i(gl.getUniformLocation(this.program, 'uTex2'), 1);

        gl.uniform1f(gl.getUniformLocation(this.program, 'uMix'), this.mix);
        gl.uniform1f(gl.getUniformLocation(this.program, 'uTime'), time);

        gl.viewport(0, 0, width, height);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}
