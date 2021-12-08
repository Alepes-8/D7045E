/**
 * ● Implement a class Cuboid that extends Mesh and represents a cuboid.
 * ● When a cuboid is created, it is only needed to give width, depth, and height, that is
 *   the total extensions in the x, y, and z directions respectively. The midpoint of the
 *   cuboid should be at the origin.
 * 
 * @author Alex Peschel, Oliver Olofsson
 */

class Cuboid extends Mesh{
    constructor(width,depth,height){
        this.width = width; 
        this.depth = depth;
        this.height = height;
    }

    getWidth(){
        return this.width;
    }
    getDepth(){
        return this.depth;
    }
    getHeight(){
        return this.height;
    }
}
