/**
 * @author Alex Peschel, Oliver Olofsson
 */
class Key{

    doKey(evt) {
        let movementChange = true;
        switch (evt.keyCode) {
            case 37:
                floor.move(mat4(1,0,0,-0.1, 0,1,0,0, 0,0,1,0, 0,0,0,1));
                break;        // left arrow

            case 39:
                movingNode.updateTransform( mat4(1,0,0,0.1, 0,1,0,0, 0,0,1,0, 0,0,0,1));
                break;       // right arrow

            case 38: 
                movingNode.updateTransform( mat4(1,0,0,0, 0,1,0,0.1, 0,0,1,0, 0,0,0,1));
                break;        // up arrow

            case 40:
                movingNode.updateTransform(mat4(1,0,0,0, 0,1,0,-0.1, 0,0,1,0, 0,0,0,1));
                break;         // down arrow

            case 33: 
                movingNode.updateTransform(mat4(1,0,0,0, 0,1,0,0, 0,0,1,-0.1, 0,0,0,1));
                break;         // PageUp

            case 34:        
                movingNode.updateTransform(mat4(1,0,0,0, 0,1,0,0, 0,0,1,0.1, 0,0,0,1)); 
                break;// PageDown

            case 81: //A
                camera.at[0] -= 0.2;
                break;

            case 69: //D
                camera.at[0] += 0.2;
                break;

            case 68: //e
                camera.position[0] += 0.1;
                break;

            case 65: //q
                camera.position[0] -= 0.1;
                break;

            case 83: //s
                camera.position[2] += 0.2;
                break;

            case 87: //w
                camera.position[2 ] -= 0.2;
                break;
            
            case 32: //space
                camera.position[1] += 0.1;
                break;

            case 17: //ctrl
                camera.position[1] -= 0.1;
                break;
            
            case 13:                                // return key
            case 36: 
                movingNode.transform = mat4(1,0,0,0, 0,1,0,0, 0,0,1,5, 0,0,0,1);
                break;  // home key
            default: movementChange = false;
        }
        if (movementChange) {
                evt.preventDefault();
                render();
        }
    }
}