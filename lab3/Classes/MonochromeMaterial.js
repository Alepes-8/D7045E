/** 
*    ● Implement a class MonochromeMaterial that extends Material.
*    ● The constructor should take an RGB color as a parameter.
*    ● The ApplyMaterial method should activate the ShaderProgram of the material and
*    send the color to the program as a uniform.
*
*    @author Alex Peschel, Oliver Olofsson
*/

class MonochromeMaterial extends Material{
    constructor(valueR, valueG, valueB, shaderProgram){
        super(shaderProgram)
        this.valueR = valueR;
        this.valueG = valueG;
        this.valueB = valueB;
        this.colorLocation = gl.getUniformLocation(shaderProgram, 'uniform_color');
    }

    ApplyMaterial(self){
        this.shaderProgram.activate();
        gl.unifrom4f(this.colorLocation, this.valueR, this.valueG, this.valueB);
    }
}