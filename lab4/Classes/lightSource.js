class LightSource{

    constructor(gl, color, lightPosition, shaderProgram) {
      this.lightPosition = lightPosition;
      //this.lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
      this.lightDiffuse = color;
      this.lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);
      this.gl = gl;
      this.shaderProgram = shaderProgram;
    }
  
    activate() {
      this.gl.uniform4fv(this.gl.getUniformLocation(this.shaderProgram.getProgram(), "lightPosition"),flatten(this.lightPosition));
    }
  }