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
        let radius = width / 2; 
        let y = height / 2;
        let z = depth / 2;
  

        let heightSegments  = 10;
        let widthSegments = 10;
        let arc = Math.PI * 2; // the whole loop. If we place Math.PI will the system only draw half a cirkle 
        let indices = [];
		let vertices = [];

		// generate vertices, normals and uvs

		for ( let j = 0; j <= heightSegments ; j ++ ) {

			for ( let i = 0; i <= widthSegments; i ++ ) {

				const u = i / widthSegments * arc;
				const v = j / heightSegments * arc;

				// vertex

				let verX = -( radius) * Math.sin( v ) * Math.cos( u );
				let verY = ( radius) * Math.cos( v );
				let verZ = radius * Math.sin( v ) * Math.sin( u );

				vertices.push( vec4(verX, verY, verZ, 1));

			}

		}

		// generate indices

		for ( let j = 1; j <= heightSegments ; j ++ ) {

			for ( let i = 1; i <= widthSegments; i ++ ) {

				// indices

				let a = ( widthSegments + 1 ) * j + i - 1;
				let b = ( widthSegments + 1 ) * ( j - 1 ) + i - 1;
				let c = ( widthSegments + 1 ) * ( j - 1 ) + i;
				let d = ( widthSegments + 1 ) * j + i;

				// faces

				indices.push( a, b, d );
				indices.push( b, c, d );

			}

		}

        super(gl, vertices, indices, shaderProgram);      
    }
}
