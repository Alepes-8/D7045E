/**Class: Shader
 *   ● Implement a shader class that takes a shader source code and a shader type, and
 *   compiles it.
 *   ● The resulting GL Shader handle should be retrievable by a getter method.
 *   ● The shader code should be either a vertex shader or a fragment shader.
 *   ● The shader type states whether the code stands for a vertex shader or a fragment
 *   shader. There should be a method that returns the type ((for instance, as an enum).
 *   ● Include error checking so a failed compile does not go unnoticed.
 *
 *  @Author Alex Peschel 
 */
class Shader{
    constructor(){
        this.source;
        this.type;
        this.glShader;
        this.shaders = {
            vertexShaderSource: vertexShaderSource = `FrpF
                attribute vec3 a_coords;
                uniform mat4 modelviewProjection;
                uniform bool lit;
                uniform vec3 normal;
                uniform mat3 normalMatrix;
                uniform vec4 color;
                varying vec4 v_color;
                void main() {
                    vec4 coords = vec4(a_coords,1.0);
                    gl_Position = modelviewProjection * coords;
                    if (lit) {
                    vec3 N = normalize(normalMatrix*normal);  // Transformed unit normal
                    float dotProduct = abs(N.z);  // cosine of angle of incidence of light with surface
                    v_color = vec4( dotProduct*color.rgb, color.a );
                    }
                    else {
                        v_color = color;
                    }
                }`,

            fragmentShaderSource: fragmentShaderSource = `
                #ifdef GL_FRAGMENT_PRECISION_HIGH
                precision highp float;
                #else
                precision mediump float;
                #endif
                varying vec4 v_color;
                void main() {
                    gl_FragColor = v_color;
                }`
        }
    }

    compileShader(self, source, type){//Implement a shader class that takes a shader source code and a shader type, and compiles it.
        //save it
        self.source = source;
        self.type = type;
        
        
        try {
            //Compile it
            let shader = ;

        } catch (error) {
            console.error(error);
            // expected output: ReferenceError: nonExistentFunction is not defined
            // Note - error messages will vary depending on browser
        }
        

        //save the compileing
        self.glShader = shader;

        return shader;
    }
    
    shaderType(self){
        return self.type;
    }

    getter(self){
        return self.glShader; 
    }
}