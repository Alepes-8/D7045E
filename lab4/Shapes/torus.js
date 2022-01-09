/**
 * ● Implement a class Cuboid that extends Mesh and represents a cuboid.
 * ● When a cuboid is created, it is only needed to give width, depth, and height, that is
 *   the total extensions in the x, y, and z directions respectively. The midpoint of the
 *   cuboid should be at the origin.
 * 
 * @author Alex Peschel, Oliver Olofsson
 */
 class Torus extends Mesh{
    constructor(gl, width, height, shaderProgram){
        let radius = width / 2; 
        let tube = height / 2;
  
        let radialSegments = 8
        let tubularSegments = 8
        let arc = Math.PI * 2 // the whole loop. If we place Math.PI will the system only draw half a cirkle 
        let indices = [];
		let vertices = [];

		// generate vertices, normals and uvs

		for ( let j = 0; j <= radialSegments; j ++ ) {
			for ( let i = 0; i <= tubularSegments; i ++ ) {
				const u = i / tubularSegments * arc;
				const v = j / radialSegments * Math.PI * 2;

				// vertex

				let verX = ( radius + tube * Math.cos( v ) ) * Math.cos( u );
				let verY = ( radius + tube * Math.cos( v ) ) * Math.sin( u );
				let verZ = tube * Math.sin( v );

				vertices.push( vec4(verX, verY, verZ,1));

			}

		}
		// generate indices
		for ( let j = 1; j <= radialSegments; j ++ ) {
			for ( let i = 1; i <= tubularSegments; i ++ ) {
				// indices
				let a = ( tubularSegments + 1 ) * j + i - 1;
				let b = ( tubularSegments + 1 ) * ( j - 1 ) + i - 1;
				let c = ( tubularSegments + 1 ) * ( j - 1 ) + i;
				let d = ( tubularSegments + 1 ) * j + i;
				// faces
				indices.push( a, b, d );
				indices.push( b, c, d );
			}

		}

        super(gl, vertices, indices, shaderProgram);      
    }
}