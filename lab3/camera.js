class Camera{
    
  constructor(gl, shaderProgram) {
    this.gl = gl;
    this.shaderProgram = shaderProgram;
    this.radius = 10;
    this.theta = 0.0;
    this.fieldOfView = 45;
    this.aspect = (gl.canvas.width/gl.canvas.height);
    this.near = 1;  //when does the cubes disepear from the screen if the are to close
    this.far = 100; // How large is the area which things can be seen within
    this.eye = vec3(this.radius * Math.sin(this.theta) * Math.cos(Math.PI),
                this.radius * Math.sin(this.theta) * Math.sin(Math.PI),
                this.radius * Math.cos(this.theta));
    this.at = [0, 0, 0];  // how the camera is looking. (first = left or right) (secound = upp and down) ( last = unsure, but thinks it moves the camera up and down)
    this.up = [0, 1.0, 0];

    /*view: points the camera from the center of projection (eye) toward a desired "at" point
    with a specified "up" direction for the camera*/
    this.vMatrix = lookAt(this.eye, this.at , this.up);

    /*selects a lens for a perspective view and how much of the world the camera should image*/
    this.perspectiveMatrix = perspective(this.fieldOfView, this.aspect, this.near, this.far);
  }

  //activate the camera view by sending the view matrix and projection matrix to the program
  activate(status) {
    if (status) {
      this.perspectiveMatrix = perspective(this.fieldOfView, this.aspect, this.near, this.far);
    }
    else {
      this.perspectiveMatrix = ortho(-11, 11, -11, 11, this.near, this.far);
    }
    this.vMatrix = lookAt(this.eye, this.at , this.up);
    let perspectiveMatrix = this.gl.getUniformLocation(this.shaderProgram, "perspectiveMatrix");
    let vMatrix = this.gl.getUniformLocation(this.shaderProgram, "vMatrix");
    this.gl.uniformMatrix4fv(perspectiveMatrix, false, flatten(this.perspectiveMatrix));
    this.gl.uniformMatrix4fv(vMatrix, false, flatten(this.vMatrix));
  }

  getVMatrix(){
    return this.mvMatrix;
  }

  getPMatrix() {
    return this.perspectiveMatrix;
  }


}
