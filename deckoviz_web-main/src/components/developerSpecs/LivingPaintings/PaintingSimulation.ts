import { paintingVertexShader, paintingFragmentShader } from './Shaders';

export class PaintingSimulation {
    gl: WebGL2RenderingContext;
    program: WebGLProgram;
    quadVAO: WebGLVertexArrayObject;
    texture: WebGLTexture | null = null;
    
    params = {
        warpStrength: 1.0,
        motionSpeed: 0.05,
        dustIntensity: 0.3,
        dayTime: 0.0, // 0 to 1
    };

    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
        this.program = this.createProgram(paintingVertexShader, paintingFragmentShader);
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

    async loadTexture(url: string) {
        const gl = this.gl;
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = url;
        await new Promise(resolve => image.onload = resolve);

        if (this.texture) gl.deleteTexture(this.texture);
        
        this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        
        // Correct the 180 degree rotation / inversion issue
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    render(time: number, width: number, height: number) {
        const gl = this.gl;
        if (!this.texture) return;

        gl.useProgram(this.program);
        gl.bindVertexArray(this.quadVAO);

        gl.uniform1f(gl.getUniformLocation(this.program, 'uTime'), time);
        gl.uniform2f(gl.getUniformLocation(this.program, 'uResolution'), width, height);
        gl.uniform1f(gl.getUniformLocation(this.program, 'uWarpStrength'), this.params.warpStrength);
        gl.uniform1f(gl.getUniformLocation(this.program, 'uMotionSpeed'), this.params.motionSpeed);
        gl.uniform1f(gl.getUniformLocation(this.program, 'uDustIntensity'), this.params.dustIntensity);
        gl.uniform1f(gl.getUniformLocation(this.program, 'uDayTime'), this.params.dayTime);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.uniform1i(gl.getUniformLocation(this.program, 'uTexture'), 0);

        gl.viewport(0, 0, width, height);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}
