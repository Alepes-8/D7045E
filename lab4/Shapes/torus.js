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
        var outerRadius = width/2;
        var innerRadius = height/3;
        var slices = 16;
        var stacks = 8;

        var vertices = [];
        var normals = [];
        var indices = [];

        var du = 2*Math.PI/slices;
        var dv = 2*Math.PI/stacks;
        var centerRadius = (innerRadius+outerRadius)/2;
        var tubeRadius = outerRadius - centerRadius;
        var indexV = 0;

        for (var j = 0; j <= stacks; j++) {
            var v = -Math.PI + j*dv;
            var cos = Math.cos(v);
            var sin = Math.sin(v);
            for (var i = 0; i <= slices; i++) {
                var u = i*du;
                var cx = Math.cos(u);
                var cy = Math.sin(u);

                var x = cx*(centerRadius + tubeRadius*cos);
                var y = cy*(centerRadius + tubeRadius*cos);
                var z = sin*tubeRadius;

                vertices[indexV] = vec4(x, y, z, 1.0);
                normals[indexV] = vec4(cx*cos, cy*cos, sin, 1.0);
                indexV++;
            } 
        }
        var k = 0;
        for (var j = 0; j < stacks; j++) {
            var row1 = j*(slices+1);
            var row2 = (j+1)*(slices+1);
            for (var i = 0; i < slices; i++) {
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