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
        var radius = width / 2 || 0.5;
        var height = height || 2*radius;
        var slices = 32;
        var noTop = false;
        var noBottom = false;

        var vertices = [];
        var normals = [];
        var indices = [];
       
        var du = 2*Math.PI / slices;
        var kv = 0;
        var k = 0;
        var i,u;

        for (i = 0; i <= slices; i++) {
            u = i*du;
            var c = Math.cos(u);
            var s = Math.sin(u);

            vertices[kv] = vec4(c*radius, -height/2, s*radius, 1.0);
            normals[kv] = vec4(c, 0, s, 1.0);
            kv++;
            vertices[kv] = vec4(c*radius, height/2, s*radius, 1.0);
            normals[kv] = vec4(c, 0, s, 1.0);
            kv++;
        }
        for (i = 0; i < slices; i++) {
                indices[k++] = 2*i;
                indices[k++] = 2*i+3;
                indices[k++] = 2*i+1;
                indices[k++] = 2*i;
                indices[k++] = 2*i+2;
                indices[k++] = 2*i+3;
        }
        var startIndex = kv;
        if (!noBottom) {
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
        var startIndex = kv;
        if (!noTop) {
            vertices[kv] = vec4(0, height/2, 0, 1.0);
            normals[kv] = vec4(0, 1, 0, 1.0);
            kv++;
            
            for (i = 0; i <= slices; i++) {
                u = i*du;
                var c = Math.cos(u);
                var s = Math.sin(u);

                vertices[kv] = vec4(c*radius, height/2, s*radius, 1.0);
                normals[kv] = vec4(0, 1, 0, 1.0);
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