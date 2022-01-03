
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

    this.ambientColor = color;
    this.diffuseColor = color;
    this.specularColor = vec3(1.0, 1.0, 1.0);
    this.shineExponent = 20.0;

    this.ambientProduct = mult(lightSource.lightAmbient, this.ambientColor);
    this.diffuseProduct = mult(lightSource.lightDiffuse, this.diffuseColor);
    this.specularProduct = mult(lightSource.lightSpecular, this.specularColor);
  
  }

  applyMaterial(transform) {
    //The cMatrix gives us the possition of the figure. 
    let cMatrix = this.gl.getUniformLocation(this.shaderProgram.getProgram(), "cMatrix");
    this.gl.uniformMatrix4fv(cMatrix, false, flatten(transform));

    this.ambient = this.gl.getUniformLocation(this.shaderProgram.getProgram(), "ambientProduct");
    this.diffuse = this.gl.getUniformLocation(this.shaderProgram.getProgram(), "diffuseProduct");
    this.specular = this.gl.getUniformLocation(this.shaderProgram.getProgram(), "specularProduct");
    this.shininess = this.gl.getUniformLocation(this.shaderProgram.getProgram(), "shininess");

    this.gl.uniform4fv(this.ambient, flatten(this.ambientProduct));
    this.gl.uniform4fv(this.diffuse, flatten(this.diffuseProduct));
    this.gl.uniform3fv(this.specular, flatten(this.specularProduct));
    /*this.gl.uniform4fv(this.ambient, this.ambientColor);
    this.gl.uniform4fv(this.diffuse, this.diffuseColor);
    this.gl.uniform3fv(this.specular, this.specularColor);*/
    this.gl.uniform1f(this.shininess, this.shineExponent);
  }
}
