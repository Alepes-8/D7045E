/**
 * ● Implement a class Cuboid that extends Mesh and represents a cuboid.
 * ● When a cuboid is created, it is only needed to give width, depth, and height, that is
 *   the total extensions in the x, y, and z directions respectively. The midpoint of the
 *   cuboid should be at the origin.
 * 
 * @author Alex Peschel, Oliver Olofsson
 */

class SunSphere extends Mesh{
    constructor(gl, width, shaderProgram){
        let radius = width / 2;

        let slices  = 16;
        let stacks = 8;

        let indices = [];
        let vertices = [];
        let normals = [];
        // generate vertices, normals and uvs

        var du = 2*Math.PI/slices;
        var dv = Math.PI/stacks;
        var indexV = 0;
        

        for (let i = 0; i <= stacks; i++) {
            let v = -Math.PI/2 + i*dv;
            for (let j = 0; j <= slices; j++) {
                let u = j*du;

                let x = Math.cos(u)*Math.cos(v);
                let y = Math.sin(u)*Math.cos(v);
                let z = Math.sin(v);

                vertices[indexV] = vec4(radius * x, radius * y, radius * z, 1.0);
                normals[indexV] = vec4(-x, -y, -z, 1.0);
                indexV++;
            }
        }

        // generate indices
        let k = 0;
        for ( let j = 0; j < stacks ; j ++ ) {
            let row1 = j*(slices+1);
            let row2 = (j+1)*(slices+1);
            for ( let i = 0; i < slices; i ++ ) {
                indices[k++] = row1 + i;
                indices[k++] = row2 + i + 1;
                indices[k++] = row2 + i;
                indices[k++] = row1 + i;
                indices[k++] = row1 + i + 1;
                indices[k++] = row2 + i + 1;
            }
        }

        super(gl, vertices, indices, normals, shaderProgram);
    }

   
}