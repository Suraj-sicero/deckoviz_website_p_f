import { waveVertexShader, waveFragmentShader } from './Shaders';

export class WaveSimulation {
    gl: WebGL2RenderingContext;
    program: WebGLProgram;
    quadVAO: WebGLVertexArrayObject;
    
    params = {
        bass: 0,
        mid: 0,
        treble: 0,
        intensity: 0.8,
        patternMode: 0,
        color1: [0.5, 0.0, 1.0], // Violet
        color2: [0.0, 1.0, 1.0], // Cyan
    };

    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
        this.program = this.createProgram(waveVertexShader, waveFragmentShader);
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

    render(time: number, width: number, height: number) {
        const gl = this.gl;
        gl.useProgram(this.program);
        gl.bindVertexArray(this.quadVAO);

        gl.uniform1f(gl.getUniformLocation(this.program, 'uTime'), time);
        gl.uniform2f(gl.getUniformLocation(this.program, 'uResolution'), width, height);
        gl.uniform1f(gl.getUniformLocation(this.program, 'uBass'), this.params.bass);
        gl.uniform1f(gl.getUniformLocation(this.program, 'uMid'), this.params.mid);
        gl.uniform1f(gl.getUniformLocation(this.program, 'uTreble'), this.params.treble);
        gl.uniform1f(gl.getUniformLocation(this.program, 'uIntensity'), this.params.intensity);
        gl.uniform1f(gl.getUniformLocation(this.program, 'uPatternMode'), this.params.patternMode);
        gl.uniform3fv(gl.getUniformLocation(this.program, 'uColor1'), this.params.color1);
        gl.uniform3fv(gl.getUniformLocation(this.program, 'uColor2'), this.params.color2);

        gl.viewport(0, 0, width, height);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}
