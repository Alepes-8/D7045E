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
}