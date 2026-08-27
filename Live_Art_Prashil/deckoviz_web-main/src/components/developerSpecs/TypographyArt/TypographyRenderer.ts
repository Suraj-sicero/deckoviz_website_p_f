import { typoVertexShader, typoFragmentShader } from './Shaders';

export class TypographyRenderer {
    gl: WebGL2RenderingContext;
    program: WebGLProgram;
    quadVAO: WebGLVertexArrayObject;
    sdfTexture: WebGLTexture | null = null;
    
    params = {
        text: 'DECKOVIZ',
        color: [0.0, 0.8, 1.0],
        strength: 0.5,
        mouse: [0.5, 0.5],
        font: 'Inter, sans-serif'
    };

    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
        this.program = this.createProgram(typoVertexShader, typoFragmentShader);
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

    updateText(text: string) {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d')!;
        
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.font = `bold 120px ${this.params.font}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Split text into lines if needed
        const words = text.split(' ');
        const lines = [];
        let currentLine = words[0];
        for(let i = 1; i < words.length; i++) {
            if(currentLine.length + words[i].length > 12) {
                lines.push(currentLine);
                currentLine = words[i];
            } else {
                currentLine += ' ' + words[i];
            }
        }
        lines.push(currentLine);

        lines.forEach((line, i) => {
            ctx.fillText(line, canvas.width / 2, canvas.height / 2 + (i - (lines.length-1)/2) * 140);
        });

        // Simple Blur to simulate SDF gradient
        ctx.filter = 'blur(10px)';
        ctx.fillStyle = 'white';
        lines.forEach((line, i) => {
            ctx.fillText(line, canvas.width / 2, canvas.height / 2 + (i - (lines.length-1)/2) * 140);
        });

        const gl = this.gl;
        if (this.sdfTexture) gl.deleteTexture(this.sdfTexture);
        this.sdfTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.sdfTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    render(time: number, width: number, height: number) {
        const gl = this.gl;
        if (!this.sdfTexture) return;

        gl.useProgram(this.program);
        gl.bindVertexArray(this.quadVAO);

        gl.uniform1f(gl.getUniformLocation(this.program, 'uTime'), time);
        gl.uniform2fv(gl.getUniformLocation(this.program, 'uMouse'), this.params.mouse);
        gl.uniform1f(gl.getUniformLocation(this.program, 'uStrength'), this.params.strength);
        gl.uniform3fv(gl.getUniformLocation(this.program, 'uColor'), this.params.color);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.sdfTexture);
        gl.uniform1i(gl.getUniformLocation(this.program, 'uSdfTex'), 0);

        gl.viewport(0, 0, width, height);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}
