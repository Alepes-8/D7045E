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
        let spikes = 8;
        let outer_Vertices = x;
        let inner_Vertices = x/3;

        /*The vector positions for each point relative to each other in the 3D space*/
        let vertices = [
            vec4( 0, 0,  z, 1 ),   // front/bottom/left
            vec4( 0,  0,  -z, 1 ),   // front/top/left
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
        
        super(gl, vertices, indices, shaderProgram);      
    }
}
