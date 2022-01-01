/**
 * ● Implement a class Cuboid that extends Mesh and represents a cuboid.
 * ● When a cuboid is created, it is only needed to give width, depth, and height, that is
 *   the total extensions in the x, y, and z directions respectively. The midpoint of the
 *   cuboid should be at the origin.
 * 
 * @author Alex Peschel, Oliver Olofsson
 */

class Sphere extends Mesh{
    constructor(gl, width, shaderProgram){
        let radius = width / 2;   

        let points  = 10;
        let indices = [];
		let vertices = [];

		// generate vertices, normals and uvs

		for ( let j = 0; j <= points ; j ++ ) {

			for ( let i = 0; i <= points; i ++ ) {

				const v = j / points * Math.PI;
				const u = i / points * Math.PI * 2;
				
				// vertex

				let verX = -( radius) * Math.sin( v ) * Math.cos( u );
				let verY = ( radius) * Math.cos( v );
				let verZ = radius * Math.sin( v ) * Math.sin( u );

				vertices.push( vec4(verX, verY, verZ, 1));
			}
		}

		// generate indices

		for ( let j = 1; j <= points ; j ++ ) {
			for ( let i = 1; i <= points; i ++ ) {

				// indices
				let a = ( points + 1 ) * j + i - 1;
				let b = ( points + 1 ) * ( j - 1 ) + i - 1;
				let c = ( points + 1 ) * ( j - 1 ) + i;
				let d = ( points + 1 ) * j + i;

				// faces
				indices.push( a, b, d );
				indices.push( b, c, d );
			}
		}

        super(gl, vertices, indices, shaderProgram);      
    }
}
