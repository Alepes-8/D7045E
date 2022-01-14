/** 
*    ● Implement a class MonochromeMaterial that extends Material.
*    ● The constructor should take an RGB color as a parameter.
*    ● The ApplyMaterial method should activate the ShaderProgram of the material and
*    send the color to the program as a uniform.
*
*    @author Alex Peschel, Oliver Olofsson
*/

class MonochromeMaterial extends Material{

  constructor(gl, color, shaderProgram) {
    super(shaderProgram.getProgram());
    this.gl = gl;
    this.color = color;
    this.shaderProgram = shaderProgram;

    this.diffuseColor = color;
    this.specularColor = vec3(1.0, 1.0, 1.0);
    this.shineExponent = 20.0;
  }

  applyMaterial(transform) {
    //The modelMatrix gives us the possition of the figure. 
    let modelMatrix = this.gl.getUniformLocation(this.shaderProgram.getProgram(), "modelMatrix");
    this.gl.uniformMatrix4fv(modelMatrix, false, flatten(transform));

    this.diffuse = this.gl.getUniformLocation(this.shaderProgram.getProgram(), "diffuseProduct");
    this.specular = this.gl.getUniformLocation(this.shaderProgram.getProgram(), "specularProduct");
    this.shininess = this.gl.getUniformLocation(this.shaderProgram.getProgram(), "shininess");

    this.gl.uniform4fv(this.diffuse, this.diffuseColor);
    this.gl.uniform3fv(this.specular, this.specularColor);
    this.gl.uniform1f(this.shininess, this.shineExponent);
  }
}