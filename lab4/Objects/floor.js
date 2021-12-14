class Floor{
    constructor(startX, startY, startZ){
        this.startX =startX;
        this.startY = startY;
        this.startZ = startZ;
    }

    createFloor(gl, cubeWidth, cubeHight, cubeLength,  shaderProgram){
        let firstCuboid = new Cuboid(gl,cubeWidth, cubeHight, cubeLength, shaderProgram);
    }

    addChildren(currentCube, parrentCube){

    }
}