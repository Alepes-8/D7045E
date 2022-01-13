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
            vec4( -x,  y, -z, 1 ),   // top/upper/left = back/upper/left
            vec4( -x,  y,  z, 1 ),   // top/lower/left = front/upper/left
            vec4(  x,  y,  z, 1 ),   // top/lower/right = front/upper/right
            vec4(  x,  y, -z, 1 ),   // top/upper/right = back/upper/right

            vec4( -x,  y,  z, 1 ),   // left/upper/right = top/lower/left = front/upper/left
            vec4( -x, -y,  z, 1 ),   // left/lower/right = bot/upper/left = front/lower/left
            vec4( -x, -y, -z, 1 ),   // left/lower/left = bot/lower/left = back/lower/left
            vec4( -x,  y, -z, 1 ),    // left/upper/left = top/upper/left = back/upper/left

            vec4(  x,  y,  z, 1 ),   // right/upper/left = top/lower/right = front/upper/right
            vec4(  x, -y,  z, 1 ),   // right/lower/left = bot/upper/right = front/lower/right
            vec4(  x, -y, -z, 1 ),   // right/lower/right = bot/lower/right = back/lower/right
            vec4(  x,  y, -z, 1 ),   // right/upper/right = top/upper/right = back/upper/right
            
            vec4(  x,  y,  z, 1 ),   // front/upper/right
            vec4(  x, -y,  z, 1 ),   // front/lower/right
            vec4( -x, -y,  z, 1 ),   // front/lower/left
            vec4( -x,  y,  z, 1 ),   // front/upper/left
            
            vec4(  x,  y, -z, 1 ),   // back/upper/right
            vec4(  x, -y, -z, 1 ),   // back/lower/right
            vec4( -x, -y, -z, 1 ),   // back/lower/left
            vec4( -x,  y, -z, 1 ),   // back/upper/left
            
            vec4( -x, -y, -z, 1 ),   // bot/lower/left = back/lower/left
            vec4( -x, -y,  z, 1 ),   // bot/upper/left = front/lower/left
            vec4(  x, -y,  z, 1 ),   // bot/upper/right = front/lower/right
            vec4(  x, -y, -z, 1 )   // bot/lower/right = back/lower/right
            
        ];
    
        /*The connections between the vertices*/
        let indices = [
            /*0, 1, 2, 
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
            6, 7, 4*/
            
            /*0, 1, 2, 
            0, 2, 3, 
            
            5, 4, 6, 
            6, 4, 7, 
            
            9, 8, 10, 
            10, 8, 11, 
            
            13, 12, 14, 
            15, 14, 12, 
            
            16, 17, 18, 
            16, 18, 19, 
            
            21, 20, 22, 
            22, 20, 23*/

            0, 1, 2, 
            0, 3, 2, 
            
            5, 4, 6, 
            6, 4, 7, 
            
            8, 9, 10, 
            8, 11, 10, 
            
            12, 13, 14, 
            12, 15, 14, 
            
            16, 17, 18, 
            16, 19, 18, 
            
            21, 20, 22, 
            22, 20, 23
        ];

        let normals = [
            // Top
            [0,  1,  0, 0],
            [0,  1,  0, 0],
            [0,  1,  0, 0],
            [0,  1,  0, 0],

            // Left
            [-1,  0,  0, 0],
            [-1,  0,  0, 0],
            [-1,  0,  0, 0],
            [-1,  0,  0, 0],

            // Right
            [1,  0,  0, 0],
            [1,  0,  0, 0],
            [1,  0,  0, 0],
            [1,  0,  0, 0],

            // Front
            [0,  0,  1, 0],
            [0,  0,  1, 0],
            [0,  0,  1, 0],
            [0,  0,  1, 0],
       
            // Back
            [0,  0, -1, 0],
            [0,  0, -1, 0],
            [0,  0, -1, 0],
            [0,  0, -1, 0],
       
           // Bottom
            [0, -1,  0, 0],
            [0, -1,  0, 0],
            [0, -1,  0, 0],
            [0, -1,  0, 0]
       
        ];
        
        //console.log("V: ", vertices);
        //.log("I; ", indices);
        //console.log("N: ", normals);
        super(gl, vertices, indices, normals, shaderProgram);      
    }
}