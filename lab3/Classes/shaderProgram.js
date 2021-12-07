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
        this.comboProg;
        this.gl;
    }

    combineShaders(gl, shader1, shader2){ //links them into a GL Shader program
        let prog = gl.createProgram();
        gl.attachShader(prog,shader1);
        gl.attachShader(prog, shader2);   
        gl.linkProgram(prog);
        if ( ! gl.getProgramParameter( prog, gl.LINK_STATUS) ) {
        throw new Error("Link error in program:  " + gl.getProgramInfoLog(prog));
        }
        this.comboProg = prog;
        this.gl = gl;
    }

    activate(){ //activates the GL shader program
        this.gl.useProgram(this.comboProg);
    }

    getProgram(){
        return this.comboProg;
    }
}