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
        var radius = width/2 || 0.5;
        var height = height || 2*radius;
        var slices = slices || 32;
        var noBottom = false;

        var fractions = [ 0, 0.5, 0.75, 0.875, 0.9375 ];

        var vertices = [];
        var normals = [];
        var indices = [];

        var normallength = Math.sqrt(height*height+radius*radius);
        var n1 = height/normallength;
        var n2 = radius/normallength; 
        var du = 2*Math.PI / slices;
        var kv = 0;
        var k = 0;
        var i,j,u;

        for (j = 0; j < fractions.length; j++) {
            var uoffset = (j % 2 == 0? 0 : 0.5);
            for (i = 0; i <= slices; i++) {
                var h1 = -height/2 + fractions[j]*height;
                u = (i+uoffset)*du;
                var c = Math.cos(u);
                var s = Math.sin(u);

                var cVal = c*radius*(1-fractions[j]);
                var sVal = s*radius*(1-fractions[j]);

                vertices[kv] = vec4(cVal, h1, sVal, 1.0);
                normals[kv] = vec4(c*n1, n2, s*n1, 1.0);
                kv++;
            }
        }

        var k = 0;
        for (j = 0; j < fractions.length-1; j++) {
            var row1 = j*(slices+1);
            var row2 = (j+1)*(slices+1);
            for (i = 0; i < slices; i++) {
                indices[k++] = row1 + i;
                indices[k++] = row2 + i + 1;
                indices[k++] = row2 + i;
                indices[k++] = row1 + i;
                indices[k++] = row1 + i + 1;
                indices[k++] = row2 + i + 1;
            }
        }

        var start = kv - (slices+1);
        for (i = 0; i < slices; i++) { // slices points at top, with different normals, texcoords
            u = (i+0.5)*du;
            var c = Math.cos(u);
            var s = Math.sin(u);

            vertices[kv] = vec4(0, height/2, 0, 1.0);
            normals[kv] = vec4(c*n1, n2, s*n1, 1.0);
            kv++;
        }

        for (i = 0; i < slices; i++) {
            indices[k++] = start+i;
            indices[k++] = start+i+1;
            indices[k++] = start+(slices+1)+i;
        }

        if (!noBottom) {
            var startIndex = kv;

            vertices[kv] = vec4(0, -height/2, 0, 1.0);
            normals[kv] = vec4(0, -1, 0, 1.0);
            kv++;

            for (i = 0; i <= slices; i++) {
                u = 2*Math.PI - i*du;
                var c = Math.cos(u);
                var s = Math.sin(u);

                vertices[kv] = vec4(c*radius, -height/2, s*radius, 1.0);
                normals[kv] = vec4(0, -1, 0, 1.0);
                kv++;

            }
            for (i = 0; i < slices; i++) {
                indices[k++] = startIndex;
                indices[k++] = startIndex + i + 1;
                indices[k++] = startIndex + i + 2;
            }
        } 
        super(gl, vertices, indices, normals, shaderProgram);      
    }
}
