/**
 * ● Implement a class Cuboid that extends Mesh and represents a cuboid.
 * ● When a cuboid is created, it is only needed to give width, depth, and height, that is
 *   the total extensions in the x, y, and z directions respectively. The midpoint of the
 *   cuboid should be at the origin.
 * 
 * @author Alex Peschel, Oliver Olofsson
 */

class Diamond extends Mesh{
    constructor(gl, width, height, depth, shaderProgram){
        let x = width / 2; 
        let y = height / 2;
        let z = depth / 2;
        let vertices = [
            vec4( x, 0,  z, 1 ),   // front/bottom/left
            vec4( x, 0,  -z, 1 ),
            vec4( -x,  0,  -z, 1 ),   // front/top/left
            vec4( -x,  0,  z, 1 ),   // front/top/right
            vec4(  0, y,  0, 1) ,   // front/bottom/right
            vec4(  0, -y,  0, 1) 
        ];
    
        let indices = [
            0, 1, 2, 
            2, 3, 0,
            3, 0, 4,
            0, 1, 4,
            1, 2, 4,
            2, 3, 4,
            3, 0, 5,
            0, 1, 5,
            1, 2, 5,
            2, 3, 5
        ];
        
        super(gl, vertices, indices, shaderProgram);      
    }
}
