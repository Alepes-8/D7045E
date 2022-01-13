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
    this.position = vec3(0,8,30); //first, right and left. secound is move up and down , third is move back and forth
    this.at = [0, 0, 0];  // how the camera is looking. (first = left or right) (secound = upp and down) ( last = unsure, but thinks it moves the camera up and down)
    this.rotate = [0, 1.0, 0];
    /*view: points the camera from the center of projection (eye) toward a desired "at" point
    with a specified "up" direction for the camera*/
    this.viewMatrix = lookAt(this.position, this.at , this.rotate);

    /*selects a lens for a perspective view and how much of the world the camera should image*/
    this.perspectiveMatrix = perspective(this.fieldOfView, this.aspect, this.near, this.far);
  
    this.normalMatrix = [
      vec3(this.viewMatrix[0][0], this.viewMatrix[0][1], this.viewMatrix[0][2]),
      vec3(this.viewMatrix[1][0], this.viewMatrix[1][1], this.viewMatrix[1][2]),
      vec3(this.viewMatrix[2][0], this.viewMatrix[2][1], this.viewMatrix[2][2])
    ];

    //this.cMatrix = mat4(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);

    this.viewMatrixInv = inverse4(this.viewMatrix);
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
    //console.log(this.viewMatrix);
    
    var perspectiveMatrix = this.gl.getUniformLocation(this.shaderProgram, "perspectiveMatrix");
    var viewMatrix = this.gl.getUniformLocation(this.shaderProgram, "viewMatrix");
    var normalMatrix = this.gl.getUniformLocation(this.shaderProgram, "normalMatrix");
    var viewMatrixInv = this.gl.getUniformLocation(this.shaderProgram, "viewMatrixInv");
    //var cameraPos = this.gl.getUniformLocation(this.shaderProgram, "cameraPos");

    //this.gl.uniform4fv(cameraPos, flatten(vec4(this.position,1)));
    this.gl.uniformMatrix4fv(perspectiveMatrix, false, flatten(this.perspectiveMatrix));
    this.gl.uniformMatrix4fv(viewMatrix, false, flatten(this.viewMatrix));
    this.gl.uniformMatrix3fv(normalMatrix, false, flatten(this.normalMatrix));
    this.gl.uniformMatrix4fv(viewMatrixInv, false, flatten(this.viewMatrixInv));
  }

  getVMatrix(){
    return this.viewMatrix;
  }
  getPMatrix() {
    return this.perspectiveMatrix;
  }
}