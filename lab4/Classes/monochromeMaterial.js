
/** 
*    ● Implement a class MonochromeMaterial that extends Material.
*    ● The constructor should take an RGB color as a parameter.
*    ● The ApplyMaterial method should activate the ShaderProgram of the material and
*    send the color to the program as a uniform.
*
*    @author Alex Peschel, Oliver Olofsson
*/

class MonochromeMaterial extends Material{

  constructor(gl, color, shaderProgram, lightSource) {
    super(shaderProgram.getProgram());
    this.gl = gl;
    this.color = color;
    //this.colorLocation = null;
    this.shaderProgram = shaderProgram;

    //this.ambient = vec4(1.0, 0.0, 1.0, 1.0);
    this.diffuse = color;
    this.specular = vec4(1.0, 1.0, 1.0, 1.0);
    this.shine = 20.0;

    //this.ambientProduct = mult(lightSource.lightAmbient, this.ambient);
    this.diffuseProduct = mult(lightSource.lightDiffuse, this.diffuse);
    this.specularProduct = mult(lightSource.lightSpecular, this.specular);
  }

  applyMaterial(transform) {
    //The cMatrix gives us the possition of the figure. 
    let cMatrix = this.gl.getUniformLocation(this.shaderProgram.getProgram(), "cMatrix");
    this.gl.uniformMatrix4fv(cMatrix, false, flatten(transform));

    //this.ambient_loc = this.gl.getUniformLocation(this.shaderProgram.getProgram(), "ambientProduct");
    this.diffuse_loc = this.gl.getUniformLocation(this.shaderProgram.getProgram(), "diffuseProduct");
    this.specular_loc = this.gl.getUniformLocation(this.shaderProgram.getProgram(), "specularProduct");

    //this.gl.uniform4fv(this.ambient_loc, flatten(this.ambientProduct));
    this.gl.uniform4fv(this.diffuse_loc, flatten(this.diffuseProduct));
    this.gl.uniform4fv(this.specular_loc, flatten(this.specularProduct));
    this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgram.getProgram(), "shininess"), this.shine);
  }
}
