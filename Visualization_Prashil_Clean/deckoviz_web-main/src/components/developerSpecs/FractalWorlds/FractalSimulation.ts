import { fractalVertexShader, fractalFragmentShader } from './Shaders';

export class FractalSimulation {
    gl: WebGL2RenderingContext;
    program: WebGLProgram;
    quadVAO: WebGLVertexArrayObject;
    
    params = {
        center: [-0.5, 0.0],
        zoom: 1.5,
        iterations: 150,
        fractalType: 0,
        mode: 0,
        juliaParam: [0.355, 0.355],
        power: 2.0,
        palette: 0,
        colorShift: 0.0,
        colorAnimate: true,
    };

    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
        this.program = this.createProgram(fractalVertexShader, fractalFragmentShader);
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
        gl.uniform2f(gl.getUniformLocation(this.program, 'uCenter'), this.params.center[0], this.params.center[1]);
        gl.uniform1f(gl.getUniformLocation(this.program, 'uZoom'), this.params.zoom);
        gl.uniform1i(gl.getUniformLocation(this.program, 'uIterations'), this.params.iterations);
        gl.uniform1i(gl.getUniformLocation(this.program, 'uFractalType'), this.params.fractalType);
        gl.uniform1i(gl.getUniformLocation(this.program, 'uMode'), this.params.mode);
        gl.uniform2f(gl.getUniformLocation(this.program, 'uJuliaParam'), this.params.juliaParam[0], this.params.juliaParam[1]);
        gl.uniform1f(gl.getUniformLocation(this.program, 'uPower'), this.params.power);
        gl.uniform1i(gl.getUniformLocation(this.program, 'uPalette'), this.params.palette);
        gl.uniform1f(gl.getUniformLocation(this.program, 'uColorShift'), this.params.colorShift);
        gl.uniform1i(gl.getUniformLocation(this.program, 'uColorAnimate'), this.params.colorAnimate ? 1 : 0);

        gl.viewport(0, 0, width, height);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}
