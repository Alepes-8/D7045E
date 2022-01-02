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
    this.modelViewvMatrix = lookAt(this.position, this.at , this.rotate);

    /*selects a lens for a perspective view and how much of the world the camera should image*/
    this.perspectiveMatrix = perspective(this.fieldOfView, this.aspect, this.near, this.far);
  
    this.nMatrix = [
      vec3(this.modelViewvMatrix[0][0], this.modelViewvMatrix[0][1], this.modelViewvMatrix[0][2]),
      vec3(this.modelViewvMatrix[1][0], this.modelViewvMatrix[1][1], this.modelViewvMatrix[1][2]),
      vec3(this.modelViewvMatrix[2][0], this.modelViewvMatrix[2][1], this.modelViewvMatrix[2][2])
    ];

    this.cMatrix = mat4(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);

    this.modelvMatrixInv = inverse4(this.modelViewvMatrix);
  }

  //activate the camera view by sending the view matrix and projection matrix to the program
  activate(status) {
    if (status) {
      this.perspectiveMatrix = perspective(this.fieldOfView, this.aspect, this.near, this.far);
    }
    else {
      this.perspectiveMatrix = ortho(-11, 11, -11, 11, this.near, this.far);
    }
    this.modelViewvMatrix = lookAt(this.position, this.at , this.rotate);
    
    var perspectiveMatrix = this.gl.getUniformLocation(this.shaderProgram, "perspectiveMatrix");
    var modelViewvMatrix = this.gl.getUniformLocation(this.shaderProgram, "modelViewvMatrix");
    var nMatrix = this.gl.getUniformLocation(this.shaderProgram, "nMatrix");
    var modelvMatrixInv = this.gl.getUniformLocation(this.shaderProgram, "modelvMatrixInv");
    //var cameraPos = this.gl.getUniformLocation(this.shaderProgram, "cameraPos");

    //this.gl.uniform4fv(cameraPos, flatten(vec4(this.position,1)));
    this.gl.uniformMatrix4fv(perspectiveMatrix, false, flatten(this.perspectiveMatrix));
    this.gl.uniformMatrix4fv(modelViewvMatrix, false, flatten(this.modelViewvMatrix));
    this.gl.uniformMatrix3fv(nMatrix, false, flatten(this.nMatrix));
    this.gl.uniformMatrix4fv(modelvMatrixInv, false, flatten(this.modelvMatrixInv));
  }

  getVMatrix(){
    return this.modelViewvMatrix;
  }

  getPMatrix() {
    return this.perspectiveMatrix;
  }
}
