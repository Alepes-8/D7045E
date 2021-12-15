class Floor{
    constructor(totalX, totalY, totalZ, sideSizeX, sideSizeZ,firstMatrix, color1, color2){
        this.cubeWidth =totalX/sideSizeX;
        this.cubeHight = totalY;
        this.cubeLength = totalZ/sideSizeZ;
        this.sideSizeX = sideSizeX;
        this.sideSizeZ = sideSizeZ;
        this.firstPlacement = firstMatrix;
        this.color1 = color1;
        this.color2 = color2;
        this.movingNode = [];
    }

    createFloor(gl,  shader){
        let monoBlack = new MonochromeMaterial(gl, vec4(0, 0, 0, 1.0), shader);
        let cuboid = new Cuboid(gl,this.cubeWidth, this.cubeHight, this.cubeLength, shader.getProgram());
        for(let i = 0; i < this.sideSizeZ; i++){
            for(let j = 0; j < this.sideSizeX; j++){
                let matrix2 = mat4(1,0,0,this.cubeWidth, 0,1,0,0, 0,0,1,0, 0,0,0,1)
                let matrix3 = this.addChildren(matrix2, j);
                let monoNode;
                let sum = (j+i) % 2;
                if(sum == 1){
                    monoNode = this.color1;
                }else{
                    monoNode = this.color2;
                }
                this.movingNode.push(new GraphicsNode(gl, cuboid, monoNode, matrix3, monoBlack));
            }
        }
        return this.movingNode;
    }

    addChildren(currentCube,cube){
        let parrentCube;
        if(this.movingNode.length == 0){
            return mult(currentCube,this.firstPlacement);
        }else if(cube == 0){
            let movementZ = mat4(1,0,0,0, 0,1,0,0, 0,0,1,this.cubeLength, 0,0,0,1)
            let movementMinX = mat4(1,0,0,-this.cubeWidth, 0,1,0,0, 0,0,1,0, 0,0,0,1)
            let totMovment = mult(movementZ,movementMinX);
            currentCube = mult(currentCube,totMovment);
            parrentCube = this.movingNode[this.movingNode.length-8].transform;
        }else{
            parrentCube = this.movingNode[this.movingNode.length-1].transform;
        }
        return mult(currentCube,parrentCube);

    }
}