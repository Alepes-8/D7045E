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
        this.gl = gl;
       
        
       

       
    }

}
