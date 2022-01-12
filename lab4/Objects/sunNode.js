class SunNode extends LightSource{
    constructor(gl,shaderProgram, mesh, material, localMatrix, materialBlack, translate = mat4(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1), worldMatrix = null, color) {
        super(gl, color, vec4(localMatrix[0][3],localMatrix[1][3],localMatrix[2][3],1), shaderProgram);
        this.gl = gl;
        this.mesh = mesh;
        this.material = material;
        this.materialBlack = materialBlack;
        this.localMatrix = localMatrix;
        if(worldMatrix == null){
            this.start = true;
            this.worldMatrix = mat4(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
            this.translate = translate;
            this.transform = mult(mult(this.translate, this.localMatrix),this.worldMatrix);
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
        /*/*bind the mesh's vertex array object*/
        this.gl.bindVertexArray(this.mesh.getVertexArray());
        
        /*call the apply material method of the material*/
        //this.localMatrix = mat4(1,0,0,this.lightPosition.x, 0,1,0,this.lightPosition.y, 0,0,1,this.lightPosition.z, 0,0,0,1);
        let matrix;
        if(this.start){
          matrix = this.transform;
        }else{
          matrix =  mult(mult(this.localMatrix,this.worldMatrix.transform),this.translate);
          if(matrix != this.transform){
            this.transform = matrix;
          }
        }
        console.log(this.transform);
        this.lightPosition = vec4(this.transform[0][3],this.transform[1][3],this.transform[2][3],1);


        this.material.applyMaterial(matrix);
        /*execute a draw call*/
        this.gl.drawElements(this.gl.TRIANGLES, this.mesh.getIndices().length, this.gl.UNSIGNED_BYTE, 0);
    }

    giveParent(worldMatrix){
        this.start = false;
        this.worldMatrix =  worldMatrix;
        this.localMatrix = mult(this.localMatrix ,mat4(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1)); // takes the translation from parent and the added translation.
    
        this.translate = mult(this.translate,this.worldMatrix.translate); // takes the translation from parent and the added translation.
        this.transform = mult(this.translate,this.worldMatrix.transform); // only difference between world matrix and transform is the rotation.
        this.worldMatrix.children.push(this);
    }

    giveColors(mainColor, black){
        this.material = mainColor;
        this.materialBlack = black;
    }

    updateLocalMatrix(m) {
        this.localMatrix = mult(this.localMatrix, m);
    }
    
    getTransform() {
        return this.transform;
    }
}