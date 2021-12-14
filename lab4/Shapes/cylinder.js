/**
 * ● Implement a class Cuboid that extends Mesh and represents a cuboid.
 * ● When a cuboid is created, it is only needed to give width, depth, and height, that is
 *   the total extensions in the x, y, and z directions respectively. The midpoint of the
 *   cuboid should be at the origin.
 * 
 * @author Alex Peschel, Oliver Olofsson
 */

class Cylinder extends Mesh{
    constructor(gl, width, height, depth, shaderProgram){
        let r = width / 2; 
        let y = height / 2;
        let z = depth / 2;
        let points= 30;
        let vertices = [
            vec4( 0, -y,  0, 1 ),   // front/bottom/left
        ];

        for(let v = 0; v < points; v++){
            vertices.push(vec4(
                r*Math.cos(v * 2 * Math.PI / points),
                -y,
                r*Math.sin(v * 2 * Math.PI / points),
                1));
        }

       
        
        /*The connections between the vertices*/
        let indices = [];
        //create the cirkle indeces
        for(let i = 1; i <= points;i++ )
        {
            if(i == points){
                indices.push(0,i,1)
            }
            else{
                indices.push(0,i,i+1)
            }
        }

        vertices.push(vec4(0,y,0,1));

        for(let v2 = 0; v2 < points; v2++){
            vertices.push(vec4(
                r*Math.cos(v2 * 2 * Math.PI / points),
                y,
                r*Math.sin(v2 * 2 * Math.PI / points),
                1));
        }

        for(let i = 1; i <= points;i++ )
        {
            if(i == points){
                indices.push(points+1,points+1+i,points+1)
            }
            else{
                indices.push(points+1,points+1+i,points+i+2)
            }
        }
        
        super(gl, vertices, indices, shaderProgram);      
    }
}
