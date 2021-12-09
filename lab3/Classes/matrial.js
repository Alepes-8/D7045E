/**
● Implement an abstract class Material that acts as a surface material.
● The class should have:
    a. An internal variable prog that points to a ShaderProgram object. This
    shaderProgram should not be created within the class but rather supplied via
    a parameter to the constructor. The fragment shader in the ShaderProgram
    performs the coloring of a mesh by mimicking the intended effect of the
    material.
        ■ (The vertex shader transforms mesh vertices and can of course also
        affect the coloring by sending information over to the fragment
        shader.) 
    b. an abstract (not implemented) method ApplyMaterial that subclasses should
    implement to get the shaders fitted with uniforms before a draw call can be
    issued.

    @author Alex Peschel, Oliver Olofsson
 */

/**
 * Abstract class
 */
class Material{
    /* holds a variable that points to a ShaderProgram object */
    constructor(shaderProgram){
        this.shaderProgram = shaderProgram; 
 
        if(this.constructor == Material){
            throw new Error("Object of Abstract Class cannot be created");
        }
    }

    /* Abstract method that will be overriden by subclasses */
    applyMaterial(){
        throw new Error("Has no implementation yet")
    }
}