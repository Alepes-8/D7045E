/**
 * Class: ShaderProgram
 *       ● Implement a class ShaderProgram that takes a vertex shader instance and a
 *       fragment shader instance (both being Shader objects), and links them into a GL
 *       Shader program.
 *       ● Add a method, called activate, that, when called, activates the GL shader program
 *       (via glUseProgram).
 * 
 *  @author Alex Peschel, Oliver Olofsson
 */

class Shader {
  constructor(gl, type, source) {
    this.type = type;

    /*create the shader*/
    this.shader = gl.createShader(type);
    /*upload the shader source*/
    gl.shaderSource(this.shader, document.getElementById(source).text);
    /*compile the shader*/
    gl.compileShader(this.shader)
  }

  gettype() {
    return this.type;
  }

  getter() {
    return this.shader;
  }
}