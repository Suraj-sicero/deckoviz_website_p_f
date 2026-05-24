import { vertexShaderSource, fragmentShaderSource } from "./Shaders";

export class VortexSimulation {
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram;
  private quadVAO: WebGLVertexArrayObject;

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl;
    this.program = this.createProgram(vertexShaderSource, fragmentShaderSource);
    this.quadVAO = this.createQuad();
  }

  private createProgram(vsSource: string, fsSource: string): WebGLProgram {
    const gl = this.gl;

    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, vsSource);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(vs);
      gl.deleteShader(vs);
      throw new Error("Could not compile vertex shader: " + info);
    }

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, fsSource);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(fs);
      gl.deleteShader(fs);
      throw new Error("Could not compile fragment shader: " + info);
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error("Could not link WebGL program: " + info);
    }

    return program;
  }

  private createQuad(): WebGLVertexArrayObject {
    const gl = this.gl;
    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    gl.bindVertexArray(null);
    return vao;
  }

  private hexToRgb(hex: string): [number, number, number] {
    const clean = hex.replace("#", "");
    const num = parseInt(clean, 16);
    const r = ((num >> 16) & 255) / 255;
    const g = ((num >> 8) & 255) / 255;
    const b = (num & 255) / 255;
    return [r, g, b];
  }

  public render(
    time: number,
    width: number,
    height: number,
    params: {
      shapeType: number;
      primaryColor: string;
      secondaryColor: string;
      backgroundColor: string;
      spinSpeed: number;
      ditherLevels: number;
      starDensity: number;
      shapeScale: number;
      shapeDensity: number;
      shapeParam: number;
      gridOpacity: number;
    }
  ) {
    const gl = this.gl;

    gl.useProgram(this.program);
    gl.bindVertexArray(this.quadVAO);

    // Bind uniforms
    gl.uniform1f(gl.getUniformLocation(this.program, "uTime"), time);
    gl.uniform2f(
      gl.getUniformLocation(this.program, "uResolution"),
      width,
      height
    );
    gl.uniform1i(gl.getUniformLocation(this.program, "uShapeType"), params.shapeType);

    const pColor = this.hexToRgb(params.primaryColor);
    gl.uniform3f(
      gl.getUniformLocation(this.program, "uPrimaryColor"),
      pColor[0],
      pColor[1],
      pColor[2]
    );

    const sColor = this.hexToRgb(params.secondaryColor);
    gl.uniform3f(
      gl.getUniformLocation(this.program, "uSecondaryColor"),
      sColor[0],
      sColor[1],
      sColor[2]
    );

    const bColor = this.hexToRgb(params.backgroundColor);
    gl.uniform3f(
      gl.getUniformLocation(this.program, "uBackgroundColor"),
      bColor[0],
      bColor[1],
      bColor[2]
    );

    gl.uniform1f(gl.getUniformLocation(this.program, "uSpinSpeed"), params.spinSpeed);
    gl.uniform1f(
      gl.getUniformLocation(this.program, "uDitherLevels"),
      params.ditherLevels
    );
    gl.uniform1f(
      gl.getUniformLocation(this.program, "uStarDensity"),
      params.starDensity
    );
    gl.uniform1f(
      gl.getUniformLocation(this.program, "uShapeScale"),
      params.shapeScale
    );
    gl.uniform1f(
      gl.getUniformLocation(this.program, "uShapeDensity"),
      params.shapeDensity
    );
    gl.uniform1f(
      gl.getUniformLocation(this.program, "uShapeParam"),
      params.shapeParam
    );
    gl.uniform1f(
      gl.getUniformLocation(this.program, "uGridOpacity"),
      params.gridOpacity
    );

    gl.viewport(0, 0, width, height);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    gl.bindVertexArray(null);
  }
}
