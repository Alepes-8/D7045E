/** 
*    ● Implement a class MonochromeMaterial that extends Material.
*    ● The constructor should take an RGB color as a parameter.
*    ● The ApplyMaterial method should activate the ShaderProgram of the material and
*    send the color to the program as a uniform.
*
*    @author Alex Peschel, Oliver Olofsson
*/

class MonochromeMaterial extends Material{
    constructor(gl, color, shaderProgram){
        super(shaderProgram)
        this.gl = gl;
        this.color = color;
        this.colorLocation = null
        this.shaderProgram = shaderProgram;
    }
 
    ApplyMaterial(transform){
        let cMatrix = this.gl.getUniformLocation(this.shaderProgram.getProgram(), "cMatrix");
        this.gl.uniformMatrix4fv(cMatrix, false, transform);

        this.colorLocation = this.gl.getUniformLocation(this.shaderProgram.getProgram(), 'u_color');

        let dist = transform[2][3]/10;
        let colorChange = [];

        if(dist == 1){ // if the distance is 1 the cubes should have their original color as they are close to the camera.
            this.gl.unifrom4fv(this.colorLocation, this.color);
        }else{
            //Make the color of the cubes darker the farther away they are from the camera.
            colorChange[0] = this.color[0] * (1/(1-dist));
            colorChange[1] = this.color[1] * (1/(1-dist));
            colorChange[2] = this.color[2] * (1/(1-dist));  
            colorChange[3] = 1
            this.gl.unifrom4fv(this.colorLocation, colorChange);
        }
    }
}
