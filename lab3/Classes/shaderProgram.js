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

class ShaderProgram{

    constructor(){
        this.prog;
    }

    combineShaders(self, shader1, shader2){ //links them into a GL Shader program
        self.prog = createProgram(gl, shader1, shader2);
    }

    activate(self){ //activates the GL shader program
        gl.useProgram(self.prog);
    }
}