/**
 * ● Implement a class Cuboid that extends Mesh and represents a cuboid.
 * ● When a cuboid is created, it is only needed to give width, depth, and height, that is
 *   the total extensions in the x, y, and z directions respectively. The midpoint of the
 *   cuboid should be at the origin.
 * 
 * @author Alex Peschel, Oliver Olofsson
 */

class Star extends Mesh{
    constructor(gl, width, depth, spike, shaderProgram){
        let x = width / 2; 
        let z = depth / 2;
        let spikes = spike;
        let outer_Vertices = x;
        let inner_Vertices = x/3;

        /*The vector positions for each point relative to each other in the 3D space*/
        let vertices = [
            vec4( 0, 0,  z, 1 ),   // front/bottom/left
            vec4( 0,  0,  -z, 1 ),   // front/top/left
        ];

        for(let i = 0; i < spikes; i++){
            vertices.push(vec4(
                outer_Vertices*Math.cos((2*i) * 2 * Math.PI / (spikes*2)),
                outer_Vertices*Math.sin( (i*2)* 2 * Math.PI / (spikes*2)),
                0,
                1));
            vertices.push(vec4(
                inner_Vertices*Math.cos((i*2+1) * 2 * Math.PI / (spikes*2)),
                inner_Vertices*Math.sin((i*2+1) * 2 * Math.PI / (spikes*2)),
                0,
                1));
        }


    
        /*The connections between the vertices*/
        let indices = [];
        for(let start = 0; start < 2; start++){
            for(let i = 2; i <= spikes*2+1; i++){
                if(i == spikes*2 + 1 ){
                    indices.push(start, i, 2);
                }else{
                    indices.push(start, i, i+1);
                }     
            }
        }
        super(gl, vertices, indices, shaderProgram);   
        this.x = x; 
        this.z = z;
        this.spikes = spikes;
        this.shaderProgram = shaderProgram;

    }

    changeSize(gl , width, depth){

        let x = width / 2; 
        let z = depth / 2;
        let outer_Vertices = x;
        let inner_Vertices = x/3;

        let vertices = [
            vec4( 0, 0,  z, 1 ),   // front/bottom/left
            vec4( 0,  0,  -z, 1 ),   // front/top/left
        ];

        for(let i = 0; i < this.spikes; i++){
            vertices.push(vec4(
                outer_Vertices*Math.cos((2*i) * 2 * Math.PI / (this.spikes*2)),
                outer_Vertices*Math.sin( (i*2)* 2 * Math.PI / (this.spikes*2)),
                0,
                1));
            vertices.push(vec4(
                inner_Vertices*Math.cos((i*2+1) * 2 * Math.PI / (this.spikes*2)),
                inner_Vertices*Math.sin((i*2+1) * 2 * Math.PI / (this.spikes*2)),
                0,
                1));
        }
    
        /*vertex array object handle, this.vertexArray gets the value of a WebGLVertexArrayObject
        representing a vertex array object (VAO) which points to vertex array data*/
        gl.bindVertexArray(this.vao);  
    
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    
        /*send the array of vertices to the GPU*/
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    

        /*Set up vertex attribute pointers*/
        this.vertexPos =  gl.getAttribLocation( this.shaderProgram, "vertexPos"); //Fix a call to ShaderProgram      
        gl.vertexAttribPointer(this.vertexPos, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.vertexPos);
        this.x = x; 
        this.z = z;
    }
}
