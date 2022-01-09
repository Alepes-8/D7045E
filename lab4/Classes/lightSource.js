class LightSource{

    constructor(gl, color, lightPosition, shaderProgram) {
      this.lightPosition = lightPosition;
      this.lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
      this.lightDiffuse = color;
      this.lightSpecular = vec3(1.0, 1.0, 1.0);
      this.gl = gl;
      this.shaderProgram = shaderProgram;

      this.modelMatrix_loc = this.gl.getUniformLocation(this.shaderProgram, "modelMatrix");
      this.viewMatrix_loc = this.gl.getUniformLocation(this.shaderProgram, "viewMatrix");
      this.normalMatrix =  this.gl.getUniformLocation(this.shaderProgram, "normalMatrix");
    }
  
    activate() {
      /*let modelMatrix = this.gl.getUniform(this.shaderProgram, this.modelMatrix_loc);
      let viewMatrix = this.gl.getUniform(this.shaderProgram, this.viewMatrix_loc);
      console.log("M: ", mat4(modelMatrix));
      console.log("V: ", viewMatrix);
      
      let u_normalMatrix = normalMatrixs( mult((viewMatrix), (modelMatrix)), true);
      //console.log("N: ", u_normalMatrix);
      
      this.gl.uniformMatrix3fv(this.normalMatrix, false, flatten(u_normalMatrix));*/

      let lightPosition = this.gl.getUniformLocation(this.shaderProgram, "lightPosition");
      this.gl.uniform4fv(lightPosition, flatten(this.lightPosition));
    }
}