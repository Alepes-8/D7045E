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
        let lockalMatrix = mat4(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
        let monoNode = this.color1;
        this.movingNode.push(new GraphicsNode(gl, cuboid, monoNode, lockalMatrix, monoBlack));
        lockalMatrix = mat4(1,0,0,this.cubeWidth, 0,1,0,0, 0,0,1,0, 0,0,0,1)
        this.movingNode.push(new GraphicsNode(gl, cuboid, monoNode, lockalMatrix, monoBlack, this.movingNode[0]));
    }


    draw(){
        for(let i = 0; i < this.movingNode.length; i++) {
            this.movingNode[i].draw();
        }
    }

    move(m){
        this.movingNode[0].updateTransform(m);
    }

    addChildren(currentCube,cube){
        let parrentCube;
        let parentIndex;
        if(this.movingNode.length == 0){
            return mult(currentCube,this.firstPlacement);
        }else if(cube == 0){
            let movementZ = mat4(1,0,0,0, 0,1,0,0, 0,0,1,this.cubeLength, 0,0,0,1);
            let movementMinX = mat4(1,0,0,-this.cubeWidth, 0,1,0,0, 0,0,1,0, 0,0,0,1);
            let totMovment = mult(movementZ,movementMinX);
            currentCube = mult(currentCube,totMovment);            
            parentIndex = this.movingNode.length-8;
            parrentCube = this.movingNode[parentIndex].transform;
        }else{
            parentIndex = this.movingNode.length-1;
            parrentCube = this.movingNode[parentIndex].transform;
        }
        return mult(currentCube,parrentCube);
    }
}