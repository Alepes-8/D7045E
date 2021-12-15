class Robot{
    constructor(referenceStart){
        
        this.worldMatrix = referenceStart;
        this.parts = [];
        this.star;
    }


    createRobot(){
        let monoGreen = new MonochromeMaterial(gl, vec4(0,1,0, 1), shader);
        let monoYellow= new MonochromeMaterial(gl, vec4(1, 1, 0, 1.0), shader);
        let monoRed = new MonochromeMaterial(gl, vec4(1, 0, 0, 1.0), shader);
        let monoBlack = new MonochromeMaterial(gl, vec4(0, 0, 0, 1.0), shader);
        let monoGrey = new MonochromeMaterial(gl, vec4(0.4, 0.4, 0.4, 1), shader);

        //body
        let botCone = new Cone(gl, 2.5, 2.5, shader.getProgram());
        let midCone1 = new Cone(gl, 2, 2, shader.getProgram());
        let midCone2 = new Cone(gl, 1.5, 1.5, shader.getProgram());

        let botConeTransformer = mat4(1,0,0,0, 0,1,0,2.5, 0,0,1,0, 0,0,0,1);
        let mid1ConeTransformer = mat4(1,0,0,0, 0,1,0,0.6, 0,0,1,0, 0,0,0,1);
        let mid2ConeTransformer = mat4(1,0,0,0, 0,1,0,.5, 0,0,1,0, 0,0,0,1); 

        //head
        let topCone = new Cone(gl, 1, 1, shader.getProgram());
        let star = new Star(gl, 1, 1, 6, shader.getProgram());
        let eye = new Sphere(gl, .2, shader.getProgram());

        let topConeTransformer = mat4(1,0,0,0, 0,1,0,.4, 0,0,1,0, 0,0,0,1);
        let starTransformer = mat4(1,0,0,0, 0,1,0,.7, 0,0,1,0, 0,0,0,1);
        let eyeTransformer1 = mat4(1,0,0,-.25, 0,1,0,0, 0,0,1,.1, 0,0,0,1);
        let eyeTransformer2 = mat4(1,0,0, .25, 0,1,0,0, 0,0,1,.1, 0,0,0,1);

        //leg
        let thigh = new Cylinder(gl, 0.5, 0.7, shader.getProgram());
        let foot = new Cone(gl, 0.7, .5, shader.getProgram());

        let thighTransformer1 = mat4(1,0,0, -.5, 0,1,0,-1.5, 0,0,1,0, 0,0,0,1);
        let thighTransformer2 = mat4(1,0,0,.5, 0,1,0,-1.5, 0,0,1,0, 0,0,0,1);
        let footTransformer = mat4(1,0,0,0, 0,1,0,-0.2, 0,0,1,0, 0,0,0,1);

        //arm
        let arm = new Cylinder(gl, 0.3, 0.7,  shader.getProgram());
        let hand = new Sphere(gl, 0.35, shader.getProgram());
        let armTransformer1 = mat4(1,0,0, -1, 0,1,0,0, 0,0,1,0, 0,0,0,1);
        let armTransformer2 = mat4(1,0,0, 1, 0,1,0,0, 0,0,1,0, 0,0,0,1);

        let handTransformer = mat4(1,0,0,0, 0,1,0,-0.3, 0,0,1,0, 0,0,0,1);



        //body  
        this.parts.push(new GraphicsNode(gl, botCone, monoGreen, botConeTransformer,monoBlack, this.worldMatrix));
        let bottom = this.parts[this.parts.length-1];
        this.parts.push(new GraphicsNode(gl, midCone1, monoGreen, mid1ConeTransformer,monoBlack, bottom));
        this.parts.push(new GraphicsNode(gl, midCone2, monoGreen, mid2ConeTransformer,monoBlack, this.parts[this.parts.length-1]));
        let middle = this.parts[this.parts.length-1];

        //head
       
        this.parts.push(new GraphicsNode(gl, topCone, monoGreen, topConeTransformer,monoBlack, middle)); 
        let head = this.parts[this.parts.length-1]
        this.parts.push(new GraphicsNode(gl, star, monoYellow, starTransformer,monoBlack, head)); 
        this.star = this.parts[this.parts.length-1];
        this.parts.push(new GraphicsNode(gl, eye, monoRed, eyeTransformer1,monoBlack, head)); 
        this.parts.push(new GraphicsNode(gl, eye, monoRed, eyeTransformer2,monoBlack, head)); 

        //leg
        this.parts.push(new GraphicsNode(gl, thigh, monoGrey, thighTransformer1,monoBlack, bottom)); 
        let thigh1 = this.parts[this.parts.length-1];
        this.parts.push(new GraphicsNode(gl, thigh, monoGrey, thighTransformer2,monoBlack, bottom));
        let thigh2 = this.parts[this.parts.length-1];
        
        this.parts.push(new GraphicsNode(gl, foot, monoRed, footTransformer,monoBlack, thigh1));
        this.parts.push(new GraphicsNode(gl, foot, monoRed, footTransformer,monoBlack, thigh2));

        //arm
        this.parts.push(new GraphicsNode(gl, arm, monoGrey, armTransformer1,monoBlack, bottom)); 
        let rightArm = this.parts[this.parts.length-1];
        this.parts.push(new GraphicsNode(gl, arm, monoGrey, armTransformer2,monoBlack, bottom)); 
        let leftArm = this.parts[this.parts.length-1];

        this.parts.push(new GraphicsNode(gl, hand, monoRed, handTransformer,monoBlack, rightArm));
        this.parts.push(new GraphicsNode(gl, hand, monoRed, handTransformer,monoBlack, leftArm));

        
    }

    rotateHead(){
        let degree  = 45 ;
        let rotation = rotate(degree,[0,1,0]); 

        let newMatrix = mult(this.star.transform, rotation);
        this.star.transform=newMatrix;

    }

    draw(){
        for(let i = 0; i < this.parts.length; i++){
            this.parts[i].draw();
        }
    }
}