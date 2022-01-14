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
      let lightPosition = this.gl.getUniformLocation(this.shaderProgram, "lightPosition");
      this.gl.uniform4fv(lightPosition, flatten(this.lightPosition));
    }


}