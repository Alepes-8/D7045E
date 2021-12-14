/**
 * Class: ShaderProgram
 *  ● Implement a class ShaderProgram that takes a vertex shader instance and a
 *    fragment shader instance (both being Shader objects), and links them into a GL
 *    Shader program.
 *  ● Add a method, called activate, that, when called, activates the GL shader program
 *    (via glUseProgram).
 * 
 *  @author Alex Peschel, Oliver Olofsson
 */

 class ShaderProgram {
  constructor(gl, vertexShader, fragmentShader) {
    this.gl = gl;        
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;


    this.prog = gl.createProgram();
    this.gl.attachShader(this.prog, this.fragmentShader);
    this.gl.attachShader(this.prog, this.vertexShader);
    this.gl.linkProgram(this.prog);
    
  }

  /*a method that activates the GL shader program (via glUseProgram)*/
  activate() {
    this.gl.useProgram(this.prog);
  }

  getProgram() {
    return this.prog;
  }
}