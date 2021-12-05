class GraphicsNode{
    constructor(mesh, material, transform){
        this.mesh = mesh;   //this is an object not an instance
        this.material = material;
        this.transform = transform
    }

    draw(self){
        gl.bindVertexArray(self.mesh); //binds the mesh's vertex array object
        self.material.applymaterial(); //calls the ApplyMaterial method of the material
        draw();
    }

    update(self){
        self.transform
    }
}