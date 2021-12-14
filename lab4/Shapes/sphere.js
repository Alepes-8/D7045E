/**
 * ● Implement a class Cuboid that extends Mesh and represents a cuboid.
 * ● When a cuboid is created, it is only needed to give width, depth, and height, that is
 *   the total extensions in the x, y, and z directions respectively. The midpoint of the
 *   cuboid should be at the origin.
 * 
 * @author Alex Peschel, Oliver Olofsson
 */

class Sphere extends Mesh{
    constructor(gl, width, height, depth, shaderProgram){
        let r = width / 2; 
        let y = height / 2;
        let z = depth / 2;

        let points= 10;
        let au, su, cu;
        let av, sv, cv;
        let p1, p2;

        /*The vector positions for each point relative to each other in the 3D space*/
        let vertices = [];
        
        for(let u = 0; u <= points; u++){
            au = u * Math.PI / points;
            su = Math.sin(au);
            cu = Math.cos(au);
            for(let v = 0; v <= points; v++){
                av = v * 2 * Math.PI / points;
                sv = Math.sin(av);
                cv = Math.cos(av);
                vertices.push(vec4(
                    sv*su,
                    -y+cu,
                    cv*su,
                    1));
            }
        }
            

        
        /*for (j = 0; j <= SPHERE_DIV; j++) 
        {
            aj = j * Math.PI / SPHERE_DIV;
            sj = Math.sin(aj);
            cj = Math.cos(aj);
            for (i = 0; i <= SPHERE_DIV; i++) 
            {
                ai = i * 2 * Math.PI / SPHERE_DIV;
                si = Math.sin(ai);
                ci = Math.cos(ai);
                vertices.push(si * sj);  // X
                vertices.push(cj);       // Y
                vertices.push(ci * sj);  // Z
            }
        }*/
    
        /*The connections between the vertices*/
        let indices = [];
        //create the circle indices
        for(let j = 0; j <= points; j++){
            for(let i = 0; i <= points; i++){
                p1 = j * (points + 1) + i;
                p2 = p1 + (points + 1);
                indices.push(p1);
                indices.push(p2);
                indices.push(p1 + 1);
                indices.push(p1 + 1);
                indices.push(p2);
                indices.push(p2 + 1);
            }
        }    

        /*for (j = 0; j < SPHERE_DIV; j++)
        {
            for (i = 0; i < SPHERE_DIV; i++)
            {
                p1 = j * (SPHERE_DIV+1) + i;
                p2 = p1 + (SPHERE_DIV+1);
                indices.push(p1);
                indices.push(p2);
                indices.push(p1 + 1);
                indices.push(p1 + 1);
                indices.push(p2);
                indices.push(p2 + 1);
            }
        }*/

        super(gl, vertices, indices, shaderProgram);      
    }
}
