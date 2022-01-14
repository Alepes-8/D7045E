/**
 * @author Alex Peschel, Oliver Olofsson
 */
 class Camera{
  constructor(gl, shaderProgram) {
    this.gl = gl;
    this.shaderProgram = shaderProgram;
    this.fieldOfView = 45;
    this.aspect = (gl.canvas.width/gl.canvas.height);
    this.near = 1;  //when does the cubes disepear from the screen if the are to close
    this.far = 100; // How large is the area which things can be seen within
    this.position = vec3(0,0,0.1); //first, right and left. secound is move up and down , third is move back and forth
    this.at = [0, 0, 0];  // how the camera is looking. (first = left or right) (secound = upp and down) ( last = unsure, but thinks it moves the camera up and down)
    this.rotate = [0, 1.0, 0];
    /*view: points the camera from the center of projection (eye) toward a desired "at" point
    with a specified "up" direction for the camera*/
    this.viewMatrix = lookAt(this.position, this.at , this.rotate);

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
    this.viewMatrix = lookAt(this.position, this.at , this.rotate);
    
    var perspectiveMatrix = this.gl.getUniformLocation(this.shaderProgram, "perspectiveMatrix");
    var viewMatrix = this.gl.getUniformLocation(this.shaderProgram, "viewMatrix");

    this.gl.uniformMatrix4fv(perspectiveMatrix, false, flatten(this.perspectiveMatrix));
    this.gl.uniformMatrix4fv(viewMatrix, false, flatten(this.viewMatrix));
  }

  getVMatrix(){
    return this.viewMatrix;
  }
  getPMatrix() {
    return this.perspectiveMatrix;
  }
}