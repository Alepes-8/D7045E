function init() {

    canvas = document.getElementById("webglcanvas");
    gl = canvas.getContext("webgl2");

    if (!gl) {alert("WebGL isn't available");}

    //webgl configurations
    gl.viewport( 0, 0, canvas.width, canvas.height ); //delete
    gl.clearColor(0.2, 0.2, .2, 1 );

    gl.enable(gl.DEPTH_TEST);

    let fragmentShader = new Shader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    let vertexShader = new Shader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    shader = new ShaderProgram(gl, vertexShader.getter(), fragmentShader.getter());

    lightsource = new lightSource(gl, vec4(1,1,1,1), vec4(0, 5, 1, 1.0), shader);

    optionListiners();

    let boardWeith = 30;
    let boardHight = 0.1;
    let boardLength = 30;
    let sideSizeX = 8;
    let sideSizeZ = 8;
    let objectsHights = 4;

    //colors
    let monoBlue = new MonochromeMaterial(gl, vec4(0,1, 1, 1.0), shader, lightsource);
    let monoRed = new MonochromeMaterial(gl, vec4(1.0, 0.0, 0, 1.0), shader, lightsource);
    let monoBlack = new MonochromeMaterial(gl, vec4(0, 0, 0, 1.0), shader, lightsource);
    let monoWhite = new MonochromeMaterial(gl, vec4(1, 1, 1, 1.0), shader, lightsource);
    let monoYellow = new MonochromeMaterial(gl, vec4(1, 1, 0, 1.0), shader, lightsource);


    // translatons
    let centerTranslation = translate(0,0,0);
    let translation = translate(0,0,0);

    //transform
    let centerTransform = mat4(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
    let firstCubeTransform = mat4(1,0,0,-boardWeith/2+boardWeith/sideSizeX/2, 0,1,0,-3, 0,0,1,boardLength/2-boardLength/sideSizeZ/2, 0,0,0,1);
    let sphereTransform = mat4(1,0,0,0, 0,1,0,2, 0,0,1,0, 0,0,0,1);
    let cubeTransform = mat4(1,0,0,0, 0,1,0,2, 0,0,1,0, 0,0,0,1);
    let torusTransform = mat4(1,0,0,0, 0,1,0,2, 0,0,1,0, 0,0,0,1);
    let cylinderTransform = mat4(1,0,0,0, 0,1,0,2, 0,0,1,0, 0,0,0,1);
    let coneTransform = mat4(1,0,0,0, 0,1,0,2, 0,0,1,0, 0,0,0,1);
    let starTransform = mat4(1,0,0,0, 0,1,0,2, 0,0,1,0, 0,0,0,1);

    //shapes
    let centerNode = new Sphere(gl, 0.5, shader.getProgram());
    let firstCubes = new Cuboid(gl, boardWeith/sideSizeX, boardHight, boardLength/sideSizeZ, shader.getProgram());
    let sphere = new Sphere(gl, objectsHights*0.75, shader.getProgram());
    let cube = new Cuboid(gl, 3, objectsHights, 2, shader.getProgram());
    let torus = new Torus(gl, objectsHights/2, 1, shader.getProgram());
    let cylinder = new Cylinder(gl, 2, objectsHights, shader.getProgram());
    let cone = new Cone(gl, 3, objectsHights, shader.getProgram());
    let star = new Star(gl, 3, 2, 6, shader.getProgram());

    //center
    camera = new CameraNode(gl, shader.getProgram(),centerNode, monoRed, centerTransform, monoBlack, translation);
    arrayWorld[0].push(new GraphicsNode(gl, firstCubes, monoWhite, firstCubeTransform, monoBlack, translation, camera));


    //move item
    floor = new Floor(boardWeith, boardHight ,boardLength, sideSizeX, sideSizeZ, monoBlack, monoWhite, arrayWorld[0][0]);
    floor.createFloor(gl,shader);
    arrayWorld[1].push(floor);
    floorID = arrayWorld[1].length - 1;


    //objects
    laborint = new Laborint(boardWeith, boardLength, sideSizeX, sideSizeZ, boardHight, floor, monoBlue);
    robot = new Robot(arrayWorld[1][0].objectArray[60]);
    laborint.createLaborint(gl,shader);
    robot.createRobot(gl,shader);
        
    arrayWorld[1].push(robot);
    robotID = arrayWorld[1].length - 1;
    for(let i = 0; i <35 ; i++){
        rotateSpecificObjext(arrayWorld[1][robotID].objectArray[arrayWorld[1][robotID].leftArm],-2,"z");
        rotateSpecificObjext(arrayWorld[1][robotID].objectArray[arrayWorld[1][robotID].rightArm],2,"z");

    }
    down = true;

    //nodes
    arrayWorld[1].push(new GraphicsNode(gl, sphere, monoYellow, sphereTransform, monoBlack, translation, arrayWorld[1][floorID].objectArray[4]));
    arrayWorld[1].push(new GraphicsNode(gl, cube, monoYellow, cubeTransform, monoBlack, translation, arrayWorld[1][floorID].objectArray[15]));
    arrayWorld[1].push(new GraphicsNode(gl, torus, monoYellow, torusTransform, monoBlack, translation, arrayWorld[1][floorID].objectArray[57]));
    arrayWorld[1].push(new GraphicsNode(gl, cylinder, monoYellow, cylinderTransform, monoBlack, translation, arrayWorld[1][floorID].objectArray[32]));
    arrayWorld[1].push(new GraphicsNode(gl, cone, monoYellow, coneTransform, monoBlack, translation, arrayWorld[1][floorID].objectArray[46]));


    arrayWorld[1].push(laborint);
   
    
    //arrayWorld[1][6].objectArray[arrayWorld[1][6].head].translate = mult(arrayWorld[1][6].objectArray[arrayWorld[1][6].head].translate, rotate(45,[0,1,0]));

    render();
}
