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
    this.colorLocation = null;
    this.shaderProgram = shaderProgram;
  }

  applyMaterial(transform) {
    //The cMatrix gives us the possition of the figure. 
    let cMatrix = this.gl.getUniformLocation(this.shaderProgram.getProgram(), "cMatrix");
    this.gl.uniformMatrix4fv(cMatrix, false, flatten(transform));

    this.colorLocation = this.gl.getUniformLocation(this.shaderProgram.getProgram(), "u_Color");
    //if the node is far away the RBG variables gets multiplied with lower values => darker color
    this.gl.uniform4fv(this.colorLocation, this.color);
  }
}