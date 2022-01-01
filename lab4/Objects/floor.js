class Floor{
    constructor(boardWeith, boardHight,boardLength, sideSizeX, sideSizeZ, color1, color2, centerNode){
        this.centerNode = centerNode;
        this.cubeWidth =boardWeith/sideSizeX;
        this.cubeHight = boardHight;
        this.cubeLength = boardLength/sideSizeZ;
        this.sideSizeX = sideSizeX;
        this.sideSizeZ = sideSizeZ;
        this.color1 = color1;
        this.color2 = color2;
        this.objectArray = [];
    }

    createFloor(gl,  shader){  
       
        let monoBlack = new MonochromeMaterial(gl, vec4(0, 0, 0, 1.0), shader);
        let cuboid = new Cuboid(gl, this.cubeWidth, this.cubeHight, this.cubeLength, shader.getProgram());
        let monoNode;

         for(let i = 0;  i < this.sideSizeZ;  i++ ){
            for(let j = 0; j < this.sideSizeX; j++){
                let parent  = this.findParent(j);
                let lockalMatrix;
                if(j == 0 && i == 0){
                    this.objectArray.push(this.centerNode);
                    continue;
                }
                else if(j == 0 && i != 0){
                    lockalMatrix = mat4(1,0,0,0, 0,1,0,0, 0,0,1,-this.cubeLength, 0,0,0,1);
                }else{
                    lockalMatrix = mat4(1,0,0,this.cubeWidth, 0,1,0,0, 0,0,1,0, 0,0,0,1)
                }

                if( (j+i) % 2 == 1){
                    monoNode = this.color1;
                }else{
                    monoNode = this.color2;
                }
                let cubeTranslate = translate(0,0,0);
                this.objectArray.push(new GraphicsNode(gl, cuboid, monoNode, lockalMatrix, monoBlack, cubeTranslate, parent));
            }
        }
    }

    draw(){
        for(let i = 0; i < this.objectArray.length; i++) {
            this.objectArray[i].draw();
        }
    }

    findParent(cube){
        if(cube == 0){
            return this.objectArray[this.objectArray.length - this.sideSizeX];
        }
        return this.objectArray[this.objectArray.length - 1];
    }
}