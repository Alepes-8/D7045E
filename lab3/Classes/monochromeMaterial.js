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

    //the smaller the number the longer the light will reach
    let dist = transform[2][3]/8;
    let colorChange = [];

   
    //if the node is far away the RBG variables gets multiplied with lower values => darker color
    colorChange[0] = this.color[0] * (1/(1-dist));
    colorChange[1] = this.color[1] * (1/(1-dist));
    colorChange[2] = this.color[2] * (1/(1-dist));
    colorChange[3] = 1;
    this.gl.uniform4fv(this.colorLocation, colorChange);
  }
}