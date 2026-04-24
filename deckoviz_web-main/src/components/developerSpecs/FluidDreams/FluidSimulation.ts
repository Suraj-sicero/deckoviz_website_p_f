import { 
    baseVertexShader, 
    copyShader, 
    clearShader, 
    splatShader, 
    advectionShader, 
    divergenceShader, 
    curlShader, 
    vorticityShader, 
    pressureShader, 
    gradientSubtractShader, 
    displayShader 
} from './Shaders';

export class FluidSimulation {
    gl: WebGL2RenderingContext;
    canvas: HTMLCanvasElement;
    
    programs: { [key: string]: WebGLProgram } = {};
    uniforms: { [key: string]: { [key: string]: WebGLUniformLocation } } = {};
    
    velocity!: DoubleFramebuffer;
    dye!: DoubleFramebuffer;
    pressure!: DoubleFramebuffer;
    divergence!: Framebuffer;
    curl!: Framebuffer;

    quadVAO: WebGLVertexArrayObject;
    
    params = {
        SIM_RESOLUTION: 128,
        DYE_RESOLUTION: 1024,
        DENSITY_DISSIPATION: 1,
        VELOCITY_DISSIPATION: 0.2,
        PRESSURE: 0.8,
        PRESSURE_ITERATIONS: 20,
        CURL: 30,
        SPLAT_RADIUS: 0.25,
        PAUSED: false,
    };

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const gl = canvas.getContext('webgl2', {
            alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: true,
        });

        if (!gl) throw new Error('WebGL2 not supported');
        this.gl = gl;

        // Required for rendering to float textures
        const ext = gl.getExtension('EXT_color_buffer_float');
        if (!ext) {
            console.error('EXT_color_buffer_float not supported');
            // Fallback strategy could be added here if needed, 
            // but WebGL2 usually supports this on most modern hardware.
        }

        this.initPrograms();
        this.initFramebuffers();
        this.quadVAO = this.createQuad();
    }

    initPrograms() {
        this.createProgram('copy', baseVertexShader, copyShader);
        this.createProgram('clear', baseVertexShader, clearShader);
        this.createProgram('splat', baseVertexShader, splatShader);
        this.createProgram('advection', baseVertexShader, advectionShader);
        this.createProgram('divergence', baseVertexShader, divergenceShader);
        this.createProgram('curl', baseVertexShader, curlShader);
        this.createProgram('vorticity', baseVertexShader, vorticityShader);
        this.createProgram('pressure', baseVertexShader, pressureShader);
        this.createProgram('gradientSubtract', baseVertexShader, gradientSubtractShader);
        this.createProgram('display', baseVertexShader, displayShader);
    }

    createProgram(name: string, vsSource: string, fsSource: string) {
        const gl = this.gl;
        const vs = this.compileShader(gl.VERTEX_SHADER, vsSource);
        const fs = this.compileShader(gl.FRAGMENT_SHADER, fsSource);
        const program = gl.createProgram()!;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error(gl.getProgramInfoLog(program)!);
        }

        this.programs[name] = program;
        this.uniforms[name] = {};
        
        const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < count; i++) {
            const info = gl.getActiveUniform(program, i)!;
            this.uniforms[name][info.name] = gl.getUniformLocation(program, info.name)!;
        }
    }

    compileShader(type: number, source: string) {
        const gl = this.gl;
        const shader = gl.createShader(type)!;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw new Error(gl.getShaderInfoLog(shader)!);
        }
        return shader;
    }

    initFramebuffers() {
        const gl = this.gl;
        const simRes = this.params.SIM_RESOLUTION;
        const dyeRes = this.params.DYE_RESOLUTION;

        // Try to find the best available float format
        let texType = gl.HALF_FLOAT;
        let rgba = gl.RGBA16F;
        let rg = gl.RG16F;
        let r = gl.R16F;

        // Check for float support specifically
        if (!gl.getExtension('EXT_color_buffer_float')) {
            // Fallback to basic float if half-float is problematic
            // Though in WebGL2, HALF_FLOAT is usually more supported for rendering than FLOAT
            // If all else fails, simulation might still be black, but we try to initialize.
        }

        this.velocity = new DoubleFramebuffer(gl, simRes, simRes, rg, gl.RG, texType, gl.LINEAR);
        this.dye = new DoubleFramebuffer(gl, dyeRes, dyeRes, rgba, gl.RGBA, texType, gl.LINEAR);
        this.pressure = new DoubleFramebuffer(gl, simRes, simRes, r, gl.RED, texType, gl.NEAREST);
        this.divergence = new Framebuffer(gl, simRes, simRes, r, gl.RED, texType, gl.NEAREST);
        this.curl = new Framebuffer(gl, simRes, simRes, r, gl.RED, texType, gl.NEAREST);
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

    step(dt: number) {
        const gl = this.gl;
        gl.bindVertexArray(this.quadVAO);

        // Advection
        gl.viewport(0, 0, this.velocity.width, this.velocity.height);
        this.use('advection');
        gl.uniform1i(this.uni('uVelocity'), 0);
        gl.uniform1i(this.uni('uSource'), 0);
        gl.uniform2f(this.uni('texelSize'), 1 / this.velocity.width, 1 / this.velocity.height);
        gl.uniform1f(this.uni('dt'), dt);
        gl.uniform1f(this.uni('dissipation'), this.params.VELOCITY_DISSIPATION);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.velocity.read.texture);
        this.blit(this.velocity.write);
        this.velocity.swap();

        this.use('advection');
        gl.viewport(0, 0, this.dye.width, this.dye.height);
        gl.uniform1i(this.uni('uVelocity'), 0);
        gl.uniform1i(this.uni('uSource'), 1);
        gl.uniform2f(this.uni('texelSize'), 1 / this.velocity.width, 1 / this.velocity.height);
        gl.uniform1f(this.uni('dissipation'), this.params.DENSITY_DISSIPATION);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.velocity.read.texture);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.dye.read.texture);
        this.blit(this.dye.write);
        this.dye.swap();

        // Curl
        gl.viewport(0, 0, this.velocity.width, this.velocity.height);
        this.use('curl');
        gl.uniform2f(this.uni('texelSize'), 1 / this.velocity.width, 1 / this.velocity.height);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.velocity.read.texture);
        this.blit(this.curl);

        // Vorticity
        this.use('vorticity');
        gl.uniform2f(this.uni('texelSize'), 1 / this.velocity.width, 1 / this.velocity.height);
        gl.uniform1f(this.uni('curl'), this.params.CURL);
        gl.uniform1f(this.uni('dt'), dt);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.velocity.read.texture);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.curl.texture);
        this.blit(this.velocity.write);
        this.velocity.swap();

        // Divergence
        this.use('divergence');
        gl.uniform2f(this.uni('texelSize'), 1 / this.velocity.width, 1 / this.velocity.height);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.velocity.read.texture);
        this.blit(this.divergence);

        // Clear Pressure
        this.use('clear');
        gl.uniform1f(this.uni('value'), this.params.PRESSURE);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.pressure.read.texture);
        this.blit(this.pressure.write);
        this.pressure.swap();

        // Pressure Solve
        this.use('pressure');
        gl.uniform2f(this.uni('texelSize'), 1 / this.velocity.width, 1 / this.velocity.height);
        gl.uniform1i(this.uni('uDivergence'), 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.divergence.texture);
        for (let i = 0; i < this.params.PRESSURE_ITERATIONS; i++) {
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, this.pressure.read.texture);
            gl.uniform1i(this.uni('uPressure'), 1);
            this.blit(this.pressure.write);
            this.pressure.swap();
        }

        // Gradient Subtract
        this.use('gradientSubtract');
        gl.uniform2f(this.uni('texelSize'), 1 / this.velocity.width, 1 / this.velocity.height);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.pressure.read.texture);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.velocity.read.texture);
        gl.uniform1i(this.uni('uPressure'), 0);
        gl.uniform1i(this.uni('uVelocity'), 1);
        this.blit(this.velocity.write);
        this.velocity.swap();
    }

    render() {
        const gl = this.gl;
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        this.use('display');
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.dye.read.texture);
        this.blit(null);
    }

    splat(x: number, y: number, dx: number, dy: number, color: [number, number, number]) {
        const gl = this.gl;
        gl.bindVertexArray(this.quadVAO);
        gl.viewport(0, 0, this.velocity.width, this.velocity.height);
        this.use('splat');
        gl.uniform1i(this.uni('uTarget'), 0);
        gl.uniform1f(this.uni('aspectRatio'), this.canvas.width / this.canvas.height);
        gl.uniform2f(this.uni('point'), x, y);
        gl.uniform3f(this.uni('color'), dx, dy, 0.0);
        gl.uniform1f(this.uni('radius'), this.params.SPLAT_RADIUS / 100);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.velocity.read.texture);
        this.blit(this.velocity.write);
        this.velocity.swap();

        gl.viewport(0, 0, this.dye.width, this.dye.height);
        this.use('splat');
        gl.uniform1i(this.uni('uTarget'), 0);
        gl.uniform3f(this.uni('color'), color[0], color[1], color[2]);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.dye.read.texture);
        this.blit(this.dye.write);
        this.dye.swap();
    }

    private currentProgramName: string = '';
    use(name: string) {
        this.gl.useProgram(this.programs[name]);
        this.currentProgramName = name;
    }

    uni(name: string) {
        return this.uniforms[this.currentProgramName][name];
    }

    blit(target: Framebuffer | null) {
        const gl = this.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, target ? target.fbo : null);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}

class Framebuffer {
    fbo: WebGLFramebuffer;
    texture: WebGLTexture;
    width: number;
    height: number;

    constructor(gl: WebGL2RenderingContext, w: number, h: number, internalFormat: number, format: number, type: number, filter: number) {
        this.width = w;
        this.height = h;
        this.texture = gl.createTexture()!;
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

        this.fbo = gl.createFramebuffer()!;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
    }
}

class DoubleFramebuffer {
    read: Framebuffer;
    write: Framebuffer;
    width: number;
    height: number;

    constructor(gl: WebGL2RenderingContext, w: number, h: number, internalFormat: number, format: number, type: number, filter: number) {
        this.width = w;
        this.height = h;
        this.read = new Framebuffer(gl, w, h, internalFormat, format, type, filter);
        this.write = new Framebuffer(gl, w, h, internalFormat, format, type, filter);
    }

    swap() {
        const temp = this.read;
        this.read = this.write;
        this.write = temp;
    }
}
