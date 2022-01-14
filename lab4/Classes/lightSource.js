class LightSource{

  constructor(gl, lightPosition, shaderProgram) {
    this.lightPosition = lightPosition;
    this.gl = gl;
    this.shaderProgram = shaderProgram;
  }
  
  activate() {
    let lightPosition = this.gl.getUniformLocation(this.shaderProgram, "lightPosition");
    this.gl.uniform4fv(lightPosition, flatten(this.lightPosition));
  }
}