/**
 * ● Implement a class Cuboid that extends Mesh and represents a cuboid.
 * ● When a cuboid is created, it is only needed to give width, depth, and height, that is
 *   the total extensions in the x, y, and z directions respectively. The midpoint of the
 *   cuboid should be at the origin.
 * 
 * @author Alex Peschel, Oliver Olofsson
 */

class Cuboid extends Mesh{
    constructor(gl, width, height, depth, shaderProgram){
        let x = width / 2; 
        let y = height / 2;
        let z = depth / 2;

        /*The vector positions for each point relative to each other in the 3D space*/
        let vertices = [
            vec4( -x, -y,  z, 1 ),   // front/bottom/left
            vec4( -x,  y,  z, 1 ),   // front/top/left
            vec4(  x,  y,  z, 1 ),   // front/top/right
            vec4(  x, -y,  z, 1) ,   // front/bottom/right

            vec4(  x, -y, -z, 1 ),   // back/bottom/right
            vec4(  x,  y, -z, 1 ),   // back/top/right
            vec4( -x,  y, -z, 1 ),   // back/top/left
            vec4( -x, -y, -z, 1 )    // back/bottom/left
        ];
    
        /*The connections between the vertices*/
        let indices = [
            0, 1, 2, 
            2, 3, 0, 
            0, 1, 6, 
            6, 7, 0, 
            1, 2, 5,
            5, 6, 1, 
            2, 5, 4,
            4, 3, 2,
            3, 0, 7,
            7, 4, 3,
            4, 5, 6,
            6, 7, 4
        ];

        let normals = [
            // Front
            0,  0,  1,
            0,  0,  1,
            0,  0,  1,
            0,  0,  1,
       
            // Back
            0,  0, -1,
            0,  0, -1,
            0,  0, -1,
            0,  0, -1,
       
            // Top
            0,  1,  0,
            0,  1,  0,
            0,  1,  0,
            0,  1,  0,
       
           // Bottom
            0, -1,  0,
            0, -1,  0,
            0, -1,  0,
            0, -1,  0,
       
           // Right
            1,  0,  0,
            1,  0,  0,
            1,  0,  0,
            1,  0,  0,
       
           // Left
            -1,  0,  0,
            -1,  0,  0,
            -1,  0,  0,
            -1,  0,  0
        ];
        
        super(gl, vertices, indices, normals, shaderProgram);      
    }
}
