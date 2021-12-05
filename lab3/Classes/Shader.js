/**Class: Shader
 *   ● Implement a shader class that takes a shader source code and a shader type, and
 *   compiles it.
 *   ● The resulting GL Shader handle should be retrievable by a getter method.
 *   ● The shader code should be either a vertex shader or a fragment shader.
 *   ● The shader type states whether the code stands for a vertex shader or a fragment
 *   shader. There should be a method that returns the type ((for instance, as an enum).
 *   ● Include error checking so a failed compile does not go unnoticed.
 *
 *  @author Alex Peschel, Oliver Olofsson
 */
class Shader{
    constructor(){
        this.source;
        this.type;
        this.glShader;
    }

    /**
     * 
     * @param {*} self 
     * @param {*} source 
     *      source will be the main code for the shader. 
     *      It will either be vertexShaderSource or fragmentShaderSource
     * @param {*} type 
     *      type can be explained as the variable which is either gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
     * @returns 
     */
    compileShader(self, source, type){//Implement a shader class that takes a shader source code and a shader type, and compiles it.
        //save it
        let shader = gl.createShader( type );
        gl.shaderSource(shader,source);
        gl.compileShader(shader);
        if ( ! gl.getShaderParameter(shader, gl.COMPILE_STATUS) ) {
            throw new Error("Error in vertex shader:  " + gl.getShaderInfoLog(shader));
         }

        self.type = type;

        //save the compileing
        self.glShader = shader;
    }
    
    shaderType(self){
        return self.type;
    }

    getter(self){
        return self.glShader; 
    }
}