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
  constructor(gl, mesh, material, transform, materialBlack , worldMatrix = null) {
    this.gl = gl;
    this.mesh = mesh;
    this.material = material;
    this.materialBlack = materialBlack;
    this.localMatrix = transform;
    if(worldMatrix == null){
      this.start = true;
      this.worldMatrix = mat4(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
      this.transform = mult(this.localMatrix,this.worldMatrix);
    }else{
      this.start = false;
      this.worldMatrix = worldMatrix;
      this.transform = mult(this.localMatrix,this.worldMatrix.transform);
      this.worldMatrix.children.push(this);
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
      matrix =  mult(this.localMatrix,this.worldMatrix.transform)
      if(matrix != this.transform){
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
  updateTransform(m2) {
   this.localMatrix = mult(this.localMatrix, inverse(m2));
  }

  getTransform() {
    return this.transform;
   }
}