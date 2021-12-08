class Key{

    doKey(evt) {
        let movementChange = true;
        switch (evt.keyCode) {
            case 37:
                greenNode.updateTransform(mat4(1,0,0,-0.1, 0,1,0,0, 0,0,1,0, 0,0,0,1));
                break;        // left arrow
            case 39:
                
            greenNode.updateTransform( mat4(1,0,0,0.1, 0,1,0,0, 0,0,1,0, 0,0,0,1));
                break;       // right arrow
            case 38: 
                
                greenNode.updateTransform( mat4(1,0,0,0, 0,1,0,0.1, 0,0,1,0, 0,0,0,1));
                break;        // up arrow
            case 40:
                
                greenNode.updateTransform(mat4(1,0,0,0, 0,1,0,-0.1, 0,0,1,0, 0,0,0,1));
                break;         // down arrow
            case 33: 
            
                greenNode.updateTransform(mat4(1,0,0,0, 0,1,0,0, 0,0,1,-0.1, 0,0,0,1));
                break;         // PageUp
            case 34:        
            
                greenNode.updateTransform(mat4(1,0,0,0, 0,1,0,0, 0,0,1,0.1, 0,0,0,1)); 
                break;// PageDown

            case 65: //A
                camera.at[0] -= 0.2;
                break;

            case 68: //D
                    camera.at[0] += 0.2;
                    break;

            case 87: //W
                camera.at[1] += 0.2;
                break;

            case 83: //s
                camera.at[1] -= 0.2;
                break;
            
            case 69: //e
                if(camera.up[0] > -1){
                    camera.up[0] -= 0.1;
                    camera.up[1] += 0.1;
                }
                break;

            case 81: //q
                if(camera.up[0] < 1){
                    camera.up[0] += 0.1;
                    camera.up[1] -= 0.1;
                }
                break;
            case 13:                                // return key
            case 36: 
                greenNode.transform = mat4(1,0,0,0, 0,1,0,0, 0,0,1,5, 0,0,0,1);
                break;  // home key
            default: movementChange = false;
        }
        if (movementChange) {
                evt.preventDefault();
                render();
        }
    }
}