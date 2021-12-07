/**
    Implement a class Mesh for meshes intended to be used when defining surfaces of
    graphical objects.
    ● Apart from a graphics context, the constructor should take arrays with vertex and
    index data describing the mesh, and create (via WebGL/OpenGL calls)
        ○ a Vertex Array Object handle,
        ○ a Vertex Buffer handle, and
        ○ an Element Array Buffer handle (index buffer).
    ● It also sets up vertex attribute pointers accordingly.

    @author Alex Peschel, Oliver Olofsson
 */ 

class Mesh{
    constructor(gl, vertices, indices, shaderProgram){
        this.gl = gl;
        this.vertices = vertices;
        this.indices = indices;

        this.vao = this.gl.createVertexArray(); //'vao' = 'vertex array object'
        this.gl.bindVertexArray(this.vao);  

        this.vbo = this.gl.createBuffer();   //'vbo' = 'vertex buffer object'
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);

        this.gl.bufferData(this.gl.ARRAY_BUFFER, flatten(this.vertices), this.gl.STREAM_DRAW);

        this.ibo = this.gl.createBuffer();   //'ibo' = 'index buffer object'
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ibo);

        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(this.indices), this.gl.STREAM_DRAW);

        this.vertexPos =  this.gl.getAttribLocation(shaderProgram, "vertexPos"); //Fix a call to ShaderProgram
        this.gl.vertexAttribPointer(this.vertexPos, 4, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.vertexPos);
    }

    getVertexArray() {
        return this.vao;
    }

    getVertices(){
        return this.vertices;
    }

    getIndices(){
        return this.indices;
    }
}
