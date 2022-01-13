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

        let slices  = 16;
		let stacks = 8;
        let indices = [];
		let vertices = [];
		let normals = [];

		// generate vertices, normals and uvs

		for ( let j = 0; j <= stacks; j ++ ) {
			let v = -Math.PI/2 + j* Math.PI/stacks;

			for ( let i = 0; i <= slices; i ++ ) {

				let u = i * 2*Math.PI/slices;
				
				// vertex

				let x = Math.cos( u ) * Math.cos( v );
				let y =  Math.sin( u ) * Math.cos( v );
				let z = Math.sin( v );

				let verX = radius * x;
				let verY = radius * y;
				let verZ = radius * z;

				vertices.push( vec4(verX, verY, verZ, 1.0));
				normals.push(vec4(x, y, z, 1.0))
			}
		}

		// generate indices
		for ( let j = 0; j < stacks ; j ++ ) {
			let row1 = j*(slices+1);
			let row2 = (j+1)*(slices+1);
			for ( let i = 0; i < slices; i ++ ) {

				indices.push(row1+i);
				indices.push(row2+i+1);
				indices.push(row2+i);
				indices.push(row1+i);
				indices.push(row1+i+1);
				indices.push(row2+i+1);
				/*
				// indices
				let a = ( points + 1 ) * j + i - 1;
				let b = ( points + 1 ) * ( j - 1 ) + i - 1;
				let c = ( points + 1 ) * ( j - 1 ) + i;
				let d = ( points + 1 ) * j + i;
				// faces
				indices.push( a, b, d );
				indices.push( b, c, d );
				*/
			}
		}

        super(gl, vertices, indices, normals, shaderProgram);      
    }
}