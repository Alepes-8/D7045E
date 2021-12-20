/**
 * Class: GraphicsNode
 *      ●  Implement a graphics node class GraphicsNode that holds a mesh, a material, and
 *       an instance specific transform (a model matrix) it gets as parameters to the
 *       constructor.
 *      ● The class should have a method draw that binds the mesh's vertex array object, calls
 *       the ApplyMaterial method of the material, and then executes a draw call.
 *      ● There should also be a method update that can changes the position and orientation
 *       of the graphics node. The method gets the change in the form of a transform (4x4
 *       matrix) and changes its internal model matrix by multiplying them. 
 * 
 *  @author Alex Peschel, Oliver Olofsson
 */

class GraphicsNode{
   /*holds a mesh resource, material and an instance specific transform*/
  constructor(gl, mesh, material, localMatrix, materialBlack, translate = mat4(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1), parentNode = null) {
    this.gl = gl;
    this.mesh = mesh;
    this.material = material;
    this.materialBlack = materialBlack;
    this.localMatrix = localMatrix;
    if(parentNode == null){
      this.start = true;
      this.worldMatrix = mult(mat4(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1), this.localMatrix);
      this.translate = translate;
      this.transform = mult(mult(this.localMatrix,this.translate),this.worldMatrix);
    }else{
      this.start = false;
      this.parentNode = parentNode; // this keeps the parent node
      this.translate = mult(translate,this.parentNode.translate); // takes the translation from parent and the added translation.
      this.worldMatrix =  mult(this.parentNode.worldMatrix, this.localMatrix); // this will represent the position.
      this.transform = mult(this.translate,this.worldMatrix); // only difference between world matrix and transform is the rotation.
      this.parentNode.children.push(this);
    }
    this.children = [];
  }

  draw() {
    /*bind the mesh's vertex array object*/
    this.gl.bindVertexArray(this.mesh.getVertexArray());

    /*call the apply material method of the material*/
    let matrix;
    if(this.start){
      matrix = this.transform;
    }else{
      matrix =  mult(mult(this.localMatrix,this.parentNode.worldMatrix),this.translate);
      if(matrix != this.transform){
        this.worldMatrix =  mult(this.parentNode.worldMatrix, this.localMatrix);
        this.transform = matrix;
      }
    }

    this.material.applyMaterial(matrix);

    /*execute a draw call*/
    this.gl.drawElements(this.gl.TRIANGLES, this.mesh.getIndices().length, this.gl.UNSIGNED_BYTE, 0);

    this.materialBlack.applyMaterial(matrix);

    this.gl.drawElements(this.gl.LINE_STRIP, this.mesh.getIndices().length, this.gl.UNSIGNED_BYTE, 0);
  }

  //if you move a node around the transform needs to be updated
  updateLocalMatrix(m) {
   this.localMatrix = mult(this.localMatrix, m);
  }

  getTransform() {
    return this.transform;
   }
}