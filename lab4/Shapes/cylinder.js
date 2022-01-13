/**
 * ● Implement a class Cuboid that extends Mesh and represents a cuboid.
 * ● When a cuboid is created, it is only needed to give width, depth, and height, that is
 *   the total extensions in the x, y, and z directions respectively. The midpoint of the
 *   cuboid should be at the origin.
 * 
 * @author Alex Peschel, Oliver Olofsson
 */
 class Cylinder extends Mesh{
    constructor(gl, width, height, shaderProgram){
        let r = width / 2; 
        let y = height / 2;
        let points= 30;
        let vertices = [
            vec4( 0, -y,  0, 1 )   // front/bottom/left
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

            normals.push(vec4((Math.cos(v * 2 * Math.PI / points)), 0, (Math.sin(v * 2 * Math.PI / points)), 1.0));
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
        normals.push(vec4((0), 1, (0), 1.0));

        for(let v2 = 0; v2 < points; v2++){
            vertices.push(vec4(
                r*Math.cos(v2 * 2 * Math.PI / points),
                y,
                r*Math.sin(v2 * 2 * Math.PI / points),
                1));

            normals.push(vec4((Math.cos(v2 * 2 * Math.PI / points)), 0, (Math.sin(v2 * 2 * Math.PI / points)), 1.0));
        }

        for(let i2 = 1; i2 <= points;i2++ )
        {
            if(i2 == points){
                indices.push(points+1,points+1+i2,points+2)
            }else{
                indices.push(points+1,points+1+i2,points+i2+2)
            }
                
        }
        for(let side = 1; side <= points;side++ )
        {
            if(side == points){
                indices.push(side,1,points+2)
                indices.push(points+1+side,side,points+2)
            }else{
                indices.push(side,side+1,points+1+side)
                indices.push(points+1+side,side+1,points+2+side)
            }
        }

        super(gl, vertices, indices, normals, shaderProgram);      
    }
}