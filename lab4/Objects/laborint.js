class Laborint{
    constructor(xSize, ySize, xAmount, yAmount, thickness, floor, color, lightSource){
        this.xSize = xSize;
        this.ySize = ySize;
        this.xAmount = xAmount;
        this.yAmount = yAmount;
        this.thickness = thickness;
        this.weight = xSize/xAmount;
        this.length = ySize/yAmount;
        this.color = color;
        this.floor = floor;
        this.objectArray = [];
        this.lightSource = lightSource;
    }

    createRandomLaborint(gl,  shader){  
        let monoBlack = new MonochromeMaterial(gl, vec4(0, 0, 0, 1.0), shader);
        var arr = [];
        let hight;
        if(this.weight > this.length){
            hight = this.weight;
        }else if(this.weight < this.length){
            hight = this.length;
        }else{
            hight = this.length;
        }
        while(arr.length < this.yAmount*this.xAmount*0.5){
            var r = Math.floor(Math.random() * this.yAmount*this.xAmount-1) + 1;
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        for(let i = 0; i < arr.length; i++){
            let translation = translate(0,0,0);
            let cuboid = new Cuboid(gl,this.thickness, hight, this.length, shader.getProgram());
            let transform = mat4(1,0,0,this.weight/2, 0,1,0,hight/2, 0,0,1,0, 0,0,0,1);
            this.objectArray.push(new GraphicsNode(gl, shader.getProgram(), cuboid, this.color, transform, monoBlack, translation, this.floor.objectArray[arr[i]]));
        }
        arr = [];
        while(arr.length < this.yAmount*this.xAmount*0.5){
            var r = Math.floor(Math.random() * this.yAmount*this.xAmount-1) + 1;
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        for(let j = 0; j < arr.length; j++){
            let translation = translate(0,0,0);
            let cuboid = new Cuboid(gl, this.weight, hight, this.thickness, shader.getProgram());
            let transform = mat4(1,0,0,0, 0,1,0,hight/2, 0,0,1,this.length/2, 0,0,0,1);
            this.objectArray.push(new GraphicsNode(gl, shader.getProgram(), cuboid, this.color, transform, monoBlack, translation, this.floor.objectArray[arr[j]]));
        }
        
    }

    createLaborint(gl,  shader){  
        let monoBlack = new MonochromeMaterial(gl, vec4(0, 0, 0, 1.0), shader, this.lightSource);
        var arr = [];
        let hight;
        if(this.weight > this.length){
            hight = this.weight;
        }else if(this.weight < this.length){
            hight = this.length;
        }else{
            hight = this.length;
        }


        //right
        arr.push(1);
        arr.push(2);
        arr.push(5);
        arr.push(7);
        arr.push(8);
        arr.push(9);

        arr.push(14);

        arr.push(15);
        arr.push(17);
        arr.push(19);
        arr.push(23);
        arr.push(25);
        arr.push(29);

        arr.push(31);
        arr.push(32);
        arr.push(34);

        arr.push(36);
        arr.push(37);

        
        arr.push(39);
        arr.push(42);
        arr.push(44);
        arr.push(46);

        arr.push(47);
        arr.push(50);


        arr.push(55);
        arr.push(62);

        arr.push(63);
        for(let i = 0; i < arr.length; i++){
            let translation = translate(0,0,0);
            let cuboid = new Cuboid(gl,this.thickness, hight, this.length, shader.getProgram());
            let transform = mat4(1,0,0,this.weight/2, 0,1,0,hight/2, 0,0,1,0, 0,0,0,1);
            this.objectArray.push(new GraphicsNode(gl, shader.getProgram(), cuboid, this.color, transform, monoBlack, translation, this.floor.objectArray[arr[i]]));
        }


        //left
        arr = [];
        arr.push(0);
        arr.push(8);
        arr.push(16);
        arr.push(24);
        arr.push(32);
        arr.push(40);
        arr.push(48);
        arr.push(56);
        for(let i = 0; i < arr.length; i++){
            let translation = translate(0,0,0);
            let cuboid = new Cuboid(gl,this.thickness, hight, this.length, shader.getProgram());
            let transform = mat4(1,0,0,-this.weight/2, 0,1,0,hight/2, 0,0,1,0, 0,0,0,1);
            this.objectArray.push(new GraphicsNode(gl, shader.getProgram(), cuboid, this.color, transform, monoBlack, translation, this.floor.objectArray[arr[i]]));
        }



        //down
        arr = [];
        arr.push(0);
        arr.push(1);
        arr.push(2);
        arr.push(3);
        arr.push(4);
        arr.push(5);
        arr.push(6);
        arr.push(7);
        arr.push(11);
        arr.push(13);

        arr.push(20);
        arr.push(21);
        arr.push(22);
        arr.push(25);
        arr.push(29);
        arr.push(31);
        arr.push(40);
        arr.push(41);

        arr.push(44);

        arr.push(46);
        arr.push(49);
        arr.push(50);
        arr.push(56);

        arr.push(52);
        arr.push(54);
        arr.push(62);



        for(let j = 0; j < arr.length; j++){
            let translation = translate(0,0,0);
            let cuboid = new Cuboid(gl, this.weight, hight, this.thickness, shader.getProgram());
            let transform = mat4(1,0,0,0, 0,1,0,hight/2, 0,0,1,this.length/2, 0,0,0,1);
            this.objectArray.push(new GraphicsNode(gl, shader.getProgram(), cuboid, this.color, transform, monoBlack, translation, this.floor.objectArray[arr[j]]));
        }


        //up
        arr = [];



        arr.push(56);
        arr.push(57);
        arr.push(58);
        arr.push(59);
        arr.push(60);
        arr.push(61);
        arr.push(62);
        arr.push(63);
        for(let j = 0; j < arr.length; j++){
            let translation = translate(0,0,0);
            let cuboid = new Cuboid(gl, this.weight, hight, this.thickness, shader.getProgram());
            let transform = mat4(1,0,0,0, 0,1,0,hight/2, 0,0,1,-this.length/2, 0,0,0,1);
            this.objectArray.push(new GraphicsNode(gl, shader.getProgram(), cuboid, this.color, transform, monoBlack, translation, this.floor.objectArray[arr[j]]));
        }
        
    }

    draw(){
        for(let i = 0; i < this.objectArray.length; i++){
            this.objectArray[i].draw();
        }
    }
}