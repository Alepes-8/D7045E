class Robot{
    constructor(start, lightSource){
        
        this.worldMatrix = start;
        this.objectArray = [];
        this.star;
        this.head;
        this.mainBody
        this.lowerBody
        this.leftArm;
        this.rightArm;
        this.down = true;
        this.starWidth = 2;
        this.length = 0.5;
        this.headDegree = 0;
        this.rotateLeft = true;
        this.lightSource = lightSource;
    }
    createRobot(gl,shader){
        
        let monoGreen = new MonochromeMaterial(gl, vec4(0,1,0, 1), shader);
        let monoYellow= new MonochromeMaterial(gl, vec4(1, 1, 0, 1.0), shader);
        let monoRed = new MonochromeMaterial(gl, vec4(1, 0, 0, 1.0), shader);
        let monoBlack = new MonochromeMaterial(gl, vec4(0, 0, 0, 1.0), shader);
        let monoGrey = new MonochromeMaterial(gl, vec4(0.4, 0.4, 0.4, 1), shader);
        //body
        let botCone = new Cone(gl, 2.5, 2.5, shader.getProgram());
        let midCone1 = new Cone(gl, 2, 2, shader.getProgram());
        let botConeTransformer = mat4(1,0,0,0, 0,1,0,1.9, 0,0,1,0, 0,0,0,1);
        let mid1ConeTransformer = mat4(1,0,0,0, 0,1,0,0.6, 0,0,1,0, 0,0,0,1);
        let botConeTranslation = translate(0,0,0);
        let mid1ConeTranslation = translate(0,0,0);
        //head
        let topCone = new Cone(gl, 1.5, 1.5, shader.getProgram());
        let star = new Star(gl, this.starWidth, this.length, 6, shader.getProgram());
        let antena = new Cylinder(gl, 0.05, 0.5, shader.getProgram());
        let topConeTransformer = mat4(1,0,0,0, 0,1,0,.5, 0,0,1,0, 0,0,0,1);
        let starTransformer = mat4(1,0,0,0, 0,1,0,.7, 0,0,1,0, 0,0,0,1);
        let eyeTransformer1 = mat4(1,0,0,-.5, 0,1,0,0, 0,0,1,.1, 0,0,0,1);
        let eyeTransformer2 = mat4(1,0,0, .5, 0,1,0,0, 0,0,1,.1, 0,0,0,1);
        let topConeTranslation = translate(0,0,0);
        let starTranslation = translate(0,0,0);
        let eye1Translation = translate(0,0,0);
        let eye2Translation = translate(0,0,0);
        //arm
        let arm = new Cylinder(gl, 0.2, 1,  shader.getProgram());
        let hand = new Sphere(gl, 0.3, shader.getProgram());
        let armTransformer1 = mat4(1,0,0, -0.90, 0,1,0,-0.6, 0,0,1,0, 0,0,0,1);
        let armTransformer2 = mat4(1,0,0, 0.90, 0,1,0,-0.6, 0,0,1,0, 0,0,0,1);
        let handTransformer1 = mat4(1,0,0,0, 0,1,0,-0.5, 0,0,1,0, 0,0,0,1);
        let handTransformer2 = mat4(1,0,0,0, 0,1,0,-0.5, 0,0,1,0, 0,0,0,1);
        let arm1Translation = translate(0,0,0);
        let arm2Translation = translate(0,0,0);
        let hand1Translation = translate(0,0,0);
        let hand2Translation = translate(0,0,0);
        //leg
        let thigh = new Cylinder(gl, 0.2, 0.7, shader.getProgram());
        let foot = new Cone(gl, 0.6, .3, shader.getProgram());
        let thighTransformer1 = mat4(1,0,0, -.5, 0,1,0,-1.5, 0,0,1,0, 0,0,0,1);
        let thighTransformer2 = mat4(1,0,0,.5, 0,1,0,-1.5, 0,0,1,0, 0,0,0,1);
        let footTransformer = mat4(1,0,0,0, 0,1,0,-0.2, 0,0,1,0, 0,0,0,1);
        let thigh1Translation = translate(0,0,0);
        let thigh2Translation = translate(0,0,0);
        let foot1Translation = translate(0,0,0);
        let foo2Translation = translate(0,0,0);
        //body
        this.objectArray.push(new GraphicsNode(gl, botCone, monoGreen, botConeTransformer, monoBlack, botConeTranslation, this.worldMatrix))
        this.lowerBody = this.objectArray.length-1;
        this.objectArray.push(new GraphicsNode(gl, midCone1, monoGreen, mid1ConeTransformer, monoBlack, mid1ConeTranslation, this.objectArray[this.objectArray.length-1]))
        this.mainBody = this.objectArray.length-1;;
        //head
        this.objectArray.push(new GraphicsNode(gl, topCone, monoGreen, topConeTransformer, monoBlack, topConeTranslation, this.objectArray[this.objectArray.length-1]))
        this.head = this.objectArray.length-1;
        this.objectArray.push(new GraphicsNode(gl, star, monoYellow, starTransformer, monoBlack, starTranslation, this.objectArray[this.objectArray.length-1]))
        this.star = this.objectArray.length-1;
        this.objectArray.push(new GraphicsNode(gl, antena, monoRed, eyeTransformer1, monoBlack, eye1Translation, this.objectArray[this.head]))
        this.objectArray.push(new GraphicsNode(gl, antena, monoRed, eyeTransformer2, monoBlack, eye2Translation, this.objectArray[this.head]))
       /* rotateObject(this.objectArray[ this.objectArray.length-2],45, "z");
        rotateObject(this.objectArray[ this.objectArray.length-1],-45, "z");
        // arm 
        this.objectArray.push(new GraphicsNode(gl, arm, monoGrey, armTransformer1, monoBlack, arm1Translation, this.objectArray[this.mainBody]))
        this.leftArm = this.objectArray.length-1;
        this.objectArray.push(new GraphicsNode(gl, arm, monoGrey, armTransformer2, monoBlack, arm2Translation, this.objectArray[this.mainBody]))
        this.rightArm = this.objectArray.length-1;
        this.objectArray.push(new GraphicsNode(gl, hand, monoRed, handTransformer1, monoBlack, hand1Translation, this.objectArray[this.leftArm]))
        this.objectArray.push(new GraphicsNode(gl, hand, monoRed, handTransformer2, monoBlack, hand2Translation, this.objectArray[this.rightArm]))
        rotateObject(this.objectArray[ this.leftArm],-45, "z");
        rotateObject(this.objectArray[ this.rightArm],45, "z");
        
        //leg
        this.objectArray.push(new GraphicsNode(gl, thigh, monoGrey, thighTransformer1, monoBlack, thigh1Translation, this.objectArray[this.lowerBody]))
        this.leftLeg = this.objectArray.length-1;
        this.objectArray.push(new GraphicsNode(gl, thigh, monoGrey, thighTransformer2, monoBlack, thigh2Translation, this.objectArray[this.lowerBody]))
        this.rightLeg = this.objectArray.length-1;
        this.objectArray.push(new GraphicsNode(gl, foot, monoRed, footTransformer, monoBlack, foot1Translation, this.objectArray[this.leftLeg]))
        this.objectArray.push(new GraphicsNode(gl, foot, monoRed, footTransformer, monoBlack, foo2Translation, this.objectArray[this.rightLeg]))
*/
    }

    rotateHead(degree){
        //rotate counterclockwise
        if(this.rotateLeft == true && this.headDegree < 90){
            rotateObject(this.objectArray[this.head],degree, "y");
            this.headDegree +=degree;
        }else if( this.rotateLeft == true && this.headDegree >= 90){
            this.rotateLeft = false;
        }
        //rotate clockwise
        else if(this.rotateLeft == false && this.headDegree > -90){
            rotateObject(this.objectArray[this.head],-degree, "y");
            this.headDegree -=degree;
        }else if( this.rotateLeft == false && this.headDegree <= -90){
            this.rotateLeft = true;
        }
    }

    changeSizeStar(degree){
        //first two is to shrink the size of the star
        if(this.objectArray[this.star].mesh.x * 2 > this.starWidth/3 && this.down == true){
            
            this.objectArray[this.star].mesh.changeSize(this.objectArray[this.star].gl,  this.objectArray[this.star].mesh.x * 2 - degree,this.objectArray[this.star].mesh.z * 2);
        }else if(this.objectArray[this.star].mesh.x * 2 <= 1 && this.down == true){
            this.down = false;
        }
        //two last is to make it bigger again
        else if(this.down == false && this.objectArray[this.star].mesh.x * 2 < this.starWidth){
            this.objectArray[this.star].mesh.changeSize(this.objectArray[this.star].gl,  this.objectArray[this.star].mesh.x * 2 + degree,this.objectArray[this.star].mesh.z * 2);
        }
        else if(this.objectArray[this.star].mesh.x * 2 >= this.starWidth && this.down == false){
            this.down = true;
        }
    }
    draw(){
        for(let i = 0; i < this.objectArray.length; i++){
            this.objectArray[i].draw();
        }
    }
}