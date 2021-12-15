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
        let monoNode;
        for(let i = 0;  i < this.sideSizeZ;  i++ ){
            for(let j = 0; j < this.sideSizeX; j++){
                let parent  = this.findParent(j);
                let lockalMatrix;
                if(j == 0 && i != 0){
                    lockalMatrix = mat4(1,0,0,0, 0,1,0,0, 0,0,1,this.cubeLength, 0,0,0,1)
                }else{
                    lockalMatrix = mat4(1,0,0,this.cubeWidth, 0,1,0,0, 0,0,1,0, 0,0,0,1)
                }
                if( (j+i) % 2 == 1){
                    monoNode = this.color1;
                }else{
                    monoNode = this.color2;
                }
                this.movingNode.push(new GraphicsNode(gl, cuboid, monoNode, lockalMatrix, monoBlack , parent));
            }
        }
    }


    draw(){
        for(let i = 0; i < this.movingNode.length; i++) {
            this.movingNode[i].draw();
        }
    }

    move(m){
        this.movingNode[0].updateTransform(m);
    }

    findParent(cube){
        if(this.movingNode.length == 0){
            return null;
        }else if(cube == 0){
            return this.movingNode[this.movingNode.length - this.sideSizeX];
        }
        return this.movingNode[this.movingNode.length - 1];
    }
}