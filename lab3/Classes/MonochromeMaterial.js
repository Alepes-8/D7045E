/*
● Implement a class MonochromeMaterial that extends Material.
● The constructor should take an RGB color as a parameter.
● The ApplyMaterial method should activate the ShaderProgram of the material and
send the color to the program as a uniform.
*/

class MonochromeMaterial extends Material{
    constructor(valueR, valueG, valueB){
        this.valueR = valueR;
        this.valueG = valueG;
        this.valueB = valueB;
    }

    ApplyMaterial(){
        
    }
}