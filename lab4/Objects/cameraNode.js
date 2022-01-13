class CameraNode extends Camera{
    constructor(gl,shaderProgram, mesh, material, localMatrix, materialBlack, translate = mat4(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1), worldMatrix = null) {
        super(gl, shaderProgram);
        this.gl = gl;
        this.mesh = mesh;
        this.material = material;
        this.materialBlack = materialBlack;
        this.localMatrix = localMatrix;
        if(worldMatrix == null){
            this.start = true;
            this.worldMatrix = mat4(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
            this.translate = translate;
            this.transform = mult(mult(this.localMatrix,this.translate),this.worldMatrix);
        }else{
            this.start = false;
            this.worldMatrix = worldMatrix;
            this.translate = mult(translate,this.worldMatrix.translate); // takes the translation from parent and the added translation.
            this.transform = mult(this.translate,this.worldMatrix.transform); // only difference between world matrix and transform is the rotation.
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
            matrix =  mult(this.localMatrix ,this.translate);
            if(matrix != this.transform){
                this.transform = matrix;
            }
        }else{
            matrix =  mult(mult(this.worldMatrix.transform, this.localMatrix),this.translate);
            if(matrix != this.transform){
            this.transform = matrix;
            }
        }

        this.material.applyMaterial(matrix);
        //execute a draw call
        this.gl.drawElements(this.gl.TRIANGLES, this.mesh.getIndices().length, this.gl.UNSIGNED_BYTE, 0);
    }

    //if you move a node around the transform needs to be updated
    updateLocalMatrix(m) {
        this.localMatrix = mult(this.localMatrix, m);
    }

    getTransform() {
        return this.transform;
    }
}