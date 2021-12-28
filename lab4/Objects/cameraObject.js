class CameraObject extends Camera{
    constructor(gl, shaderProgram){
        super(gl, shaderProgram);   
        let cameraForm = new Sphere(gl, 0.5, shader.getProgram());
        let cameraTranform = mat4(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
        let cameraTranslate =   translate(0,0,0);

        this.cameraObject = new GraphicsNode(gl, cameraForm, new MonochromeMaterial(gl, vec4(1,1, 1, 1.0), shader), cameraTranform, new MonochromeMaterial(gl, vec4(0,0, 0, 1.0), shader), cameraTranslate)
    }
}