/*
Implement a class Mesh for meshes intended to be used when defining surfaces of
graphical objects.
● Apart from a graphics context, the constructor should take arrays with vertex and
index data describing the mesh, and create (via WebGL/OpenGL calls)
    ○ a Vertex Array Object handle,
    ○ a Vertex Buffer handle, and
    ○ an Element Array Buffer handle (index buffer).
● It also sets up vertex attribute pointers accordingly. !! inte fixat !!
*/

class Mesh{
    constructor(vertexArray, meshIndex){
        this.vao = gl.createVertexArray(); //'vao' = 'vertex array object'
        this.vbo = gl.createBuffer();   //'vbo' = 'vertex buffer object'
        this.ibo = gl.createBuffer();   //'ibo' = 'index buffer object'

    }
}