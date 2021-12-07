/**
 * Class: GraphicsNode
 *      ●  Implement a graphics node class GraphicsNode that holds a mesh, a material, and
 *       an instance specific transform (a model matrix) it gets as parameters to the
 *       constructor.
 *      ● The class should have a method draw that binds the mesh's vertex array object, calls
 *       the ApplyMaterial method of the material, and then executes a draw call.
 *      ● There should also be a method update that can changes the position and orientation
 *       of the graphics node. The method gets the change in the form of a transform (4x4
 *       matrix) and changes its internal model matrix by multiplying them. 
 * 
 *  @Author Alex Peschel
 */

class GraphicsNode{
    constructor(gl, mesh, material, transform){
        this.gl = gl; 
        this.mesh = mesh;   //this is an object not an instance
        this.material = material;
        this.transform = transform; 
    } 

    draw(){
        this.gl.bindVertexArray(this.mesh.getVertexArray()); //binds the mesh's vertex array object
        this.material.applyMaterial(this.transform); //calls the ApplyMaterial method of the material
        // gl.drawElements(mode, count, type, offset);
        // https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements

        console.log("hejsan");
        console.log( this.mesh.getIndices());
        this.gl.drawElements(this.gl.TRIANGLES, this.mesh.getIndices().length, this.gl.UNSIGNED_BYTE, 0); //executes a draw call

        


        /* Draw the six faces of a cube, with different colors.  The faces are drawn
        with lighting turned on, and with the normal vectors that are needed for
        the lighting calculuations. */
        
        let firstCube = new Cuboid(2,1,4);
        let height = firstCube.height/2;
        let width = firstCube.width/2;
        let depth = firstCube.depth/2;
        let coard = [1, -4, -10 ]
        let changeX = greenGraphicNode.transform[0][3];
        let changeY = greenGraphicNode.transform[1][3];
        let changeZ = greenGraphicNode.transform[2][3];
    
    

        gl.uniform1i( u_lit, 1 );  // Turn on lighting calculations for the cube.
        gl.uniform3f( u_normal, 0, 0, 1 ); // send normal vector to shader program (height,width,depth) 
        //greenGraphicNode.draw();
        
        drawPrimitive( gl.TRIANGLE_FAN, [0,1,0,1], [ -width+changeX+coard[0], -height+changeY+coard[1], depth+changeZ+coard[2],  +width+changeX+coard[0],-height+changeY+coard[1],depth+changeZ+coard[2], +width+changeX+coard[0],height+changeY+coard[1],depth+changeZ+coard[2],  -width+changeX+coard[0], height+changeY+coard[1],depth+changeZ+coard[2]]);

        gl.uniform3f( u_normal, 0, 0, 1 );    
        drawPrimitive( gl.TRIANGLE_FAN, [0,1,0,1], [ -width+changeX+coard[0],-height+changeY+coard[1],-depth+changeZ+coard[2], -width+changeX+coard[0],height+changeY+coard[1],-depth+changeZ+coard[2], width+changeX+coard[0],height+changeY+coard[1],-depth+changeZ+coard[2], width+changeX+coard[0],-height+changeY+coard[1],-depth+changeZ+coard[2] ]);

        gl.uniform3f( u_normal, 0, 0, 1 );    
        drawPrimitive( gl.TRIANGLE_FAN, [0,1,0,1], [ -width+changeX+coard[0],height+changeY+coard[1],-depth+changeZ+coard[2], -width+changeX+coard[0],height+changeY+coard[1],depth+changeZ+coard[2], width+changeX+coard[0],height+changeY+coard[1],depth+changeZ+coard[2],width+changeX+coard[0],height+changeY+coard[1],-depth+changeZ+coard[2] ]);
        drawPrimitive( gl.LINE_LOOP, [0,0,0,1], [-width+changeX+coard[0],height+changeY+coard[1],-depth+changeZ+coard[2], -width+changeX+coard[0],height+changeY+coard[1],depth+changeZ+coard[2], width+changeX+coard[0],height+changeY+coard[1],depth+changeZ+coard[2],width+changeX+coard[0],height+changeY+coard[1],-depth+changeZ+coard[2] ] );

        gl.uniform3f( u_normal, 0, 0, 1 );    
        drawPrimitive( gl.TRIANGLE_FAN, [0,1,0,1], [ -width+changeX+coard[0],-height+changeY+coard[1],-depth+changeZ+coard[2], width+changeX+coard[0],-height+changeY+coard[1],-depth+changeZ+coard[2], width+changeX+coard[0],-height+changeY+coard[1],depth+changeZ+coard[2],-width+changeX+coard[0],-height+changeY+coard[1],depth+changeZ+coard[2] ]);
        drawPrimitive( gl.LINE_LOOP, [0,0,0,1], [-width+changeX+coard[0],-height+changeY+coard[1],-depth+changeZ+coard[2], width+changeX+coard[0],-height+changeY+coard[1],-depth+changeZ+coard[2], width+changeX+coard[0],-height+changeY+coard[1],depth+changeZ+coard[2],-width+changeX+coard[0],-height+changeY+coard[1],depth+changeZ+coard[2] ] );

        gl.uniform3f( u_normal, 0, 0, 1 );    
        drawPrimitive( gl.TRIANGLE_FAN, [0,1,0,1], [ width+changeX+coard[0],-height+changeY+coard[1],-depth+changeZ+coard[2], width+changeX+coard[0],height+changeY+coard[1],-depth+changeZ+coard[2], width+changeX+coard[0],height+changeY+coard[1],depth+changeZ+coard[2], width+changeX+coard[0],-height+changeY+coard[1],depth+changeZ+coard[2] ]);
        drawPrimitive( gl.LINE_LOOP, [0,0,0,1], [ width+changeX+coard[0],-height+changeY+coard[1],-depth+changeZ+coard[2], width+changeX+coard[0],height+changeY+coard[1],-depth+changeZ+coard[2], width+changeX+coard[0],height+changeY+coard[1],depth+changeZ+coard[2], width+changeX+coard[0],-height+changeY+coard[1],depth+changeZ+coard[2]] );

        gl.uniform3f( u_normal, 0, 0, 1 );    
        drawPrimitive( gl.TRIANGLE_FAN, [0,1,0,1], [ -width+changeX+coard[0],-height+changeY+coard[1],-depth+changeZ+coard[2], -width+changeX+coard[0],-height+changeY+coard[1],depth+changeZ+coard[2], -width+changeX+coard[0],height+changeY+coard[1],depth+changeZ+coard[2], -width+changeX+coard[0],height+changeY+coard[1],-depth+changeZ+coard[2] ]);
        drawPrimitive( gl.LINE_LOOP, [0,0,0,1], [ -width+changeX+coard[0],-height+changeY+coard[1],-depth+changeZ+coard[2], -width+changeX+coard[0],-height+changeY+coard[1],depth+changeZ+coard[2], -width+changeX+coard[0],height+changeY+coard[1],depth+changeZ+coard[2], -width+changeX+coard[0],height+changeY+coard[1],-depth+changeZ+coard[2] ] );


        /* Draw coordinate axes as thick colored lines that extend through the cube.
        The lines are drawn with lighting disabled. */
        
        gl.uniform1i( u_lit, 0 );  // Turn off lighting

    }

    
    /**multiply two matrixes
     * 
     * from //https://stackoverflow.com/questions/27205018/multiply-2-matrices-in-javascript 
     * 
     * */
    update(m2){   
        var result = [];
        var m1 = this.transform;
        console.log(m1);

        for (var i = 0; i < m1.length; i++) {
            result[i] = [];
            for (var j = 0; j < m2[0].length; j++) {

                var sum = 0;
                for (var k = 0; k < m1[0].length; k++) {
                    sum += m1[i][k] * m2[k][j];
                }
                result[i][j] = sum;
            }
        }
        result[0][0] = 1
        result[1][1] = 1
        result[2][2] = 1
        this.transform = result;
    }


}
