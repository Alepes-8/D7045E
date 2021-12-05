/**
 * Class: GraphicsNode
 *      ●  Implement a graphics node class GraphicsNode that holds a mesh, a material, and
 *       an instance specific transform (a model matrix) it gets as parameters to the
 *       constructor.
 *      ● The class should have a method draw that binds the mesh's vertex array object, calls
 *       the ApplyMaterial method of the material, and then executes a draw call.
 *      ● There should also be a method update that can changes the position and orientation
 *       of the graphics node. The method gets the change in the form of a transform (4x4
 *       matrix) and changes its internal model matrix by multiplying them. 
 * 
 *  @Author Alex Peschel
 */

class GraphicsNode{
    constructor(mesh, material, transform){
        this.mesh = mesh;   //this is an object not an instance
        this.material = material;
        this.transform = transform
    }

    draw(self){
        gl.bindVertexArray(self.mesh); //binds the mesh's vertex array object
        self.material.applymaterial(); //calls the ApplyMaterial method of the material
        draw();
    }

    
    /**multiply two matrixes
     * 
     * from //https://stackoverflow.com/questions/27205018/multiply-2-matrices-in-javascript 
     * 
     * */
    update(self, m2){   
        var result = [];
        var m1 = self.transform;
        for (var i = 0; i < m1.length; i++) {
            result[i] = [];
            for (var j = 0; j < m2[0].length; j++) {
                var sum = 0;
                for (var k = 0; k < m1[0].length; k++) {
                    sum += m1[i][k] * m2[k][j];
                }
                result[i][j] = sum;
            }
        }
        return result;
    }


}