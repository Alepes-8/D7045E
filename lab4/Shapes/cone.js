/**
 * ● Implement a class Cuboid that extends Mesh and represents a cuboid.
 * ● When a cuboid is created, it is only needed to give width, depth, and height, that is
 *   the total extensions in the x, y, and z directions respectively. The midpoint of the
 *   cuboid should be at the origin.
 * 
 * @author Alex Peschel, Oliver Olofsson
 */
 class Cone extends Mesh{
    constructor(gl, width, height, shaderProgram){
        let r = width / 2; 
        let y = height / 2;
        let points= 32;
        /*The vector positions for e+ach point relative to each other in the 3D space*/

        let vertices = [
            vec4(0, -y, 0, 1.0)
        ];

        let normals = [
            vec4(0, -1, 0, 1.0)
        ];


        for(let v = 0; v < points; v++){
            vertices.push(vec4(
                r*Math.cos(v * 2 * Math.PI / points),
                -y,
                r*Math.sin(v * 2 * Math.PI / points),
                1));

            normals.push(vec4((Math.cos(v * 2 * Math.PI / points) * y/Math.sqrt(y*y+r*r)), (r/Math.sqrt(y*y+r*r)), (Math.sin(v * 2 * Math.PI / points) * y/Math.sqrt(y*y+r*r)), 1.0));
        }

        for(let v = 0; v < points; v++){
            vertices.push(vec4(0,y,0,1));
            normals.push(vec4((Math.cos(v * 2 * Math.PI / points) * y/Math.sqrt(y*y+r*r)), (r/Math.sqrt(y*y+r*r)), (Math.sin(v * 2 * Math.PI / points) * y/Math.sqrt(y*y+r*r)), 1.0));
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
        //create the cone form
        for(let i = 1; i <= points;i++ )
        {
            if(i == points){
                indices.push(points+1,i,1)
            }
            else{
                indices.push(points+1,i,i+1)
            }
        }
        super(gl, vertices, indices, normals, shaderProgram);      
    }
}


/*
c*n1 = Math.cos(v*2*Math.PI / points) * height / Math.sqrt(height*height+r*r)
s*n1 = Math.sin(v*2*Math.PI / points) * height / Math.sqrt(height*height+r*r)
n2 = radius / Math.sqrt(height*height+r*r);
*/
