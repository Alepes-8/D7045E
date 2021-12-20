/**
 * @author Alex Peschel, Oliver Olofsson
 */
class Key{

    doKey(evt) {
        let movementChange = true;
        let currentValue = camera.at[1];        
        switch (evt.keyCode) {
            case 37:
                moveWorld(mat4(1,0,0,0.1, 0,1,0,0, 0,0,1,0, 0,0,0,1));
                break;        // left arrow

            case 39:
                moveWorld( mat4(1,0,0,-0.1, 0,1,0,0, 0,0,1,0, 0,0,0,1));
                break;       // right arrow

            case 38: 
                console.log(Math.cos(lookDirectionDegree*(Math.PI/180)))
                if(lookDirectionDegree == 0 ){
                    moveWorld(mat4(1,0,0,0, 0,1,0,0, 0,0,1,0.1, 0,0,0,1));
                }else if(lookDirectionDegree > 0){
                    moveWorld(mat4(1,0,0,0, 0,1,0,-0.1* Math.abs(Math.sin(lookDirectionDegree*(Math.PI/180))), 0,0,1,0.1 * Math.abs(Math.cos(lookDirectionDegree*(Math.PI/180))), 0,0,0,1));
                }else if(lookDirectionDegree < 0){
                    moveWorld(mat4(1,0,0,0, 0,1,0,0.1* Math.abs(Math.sin(lookDirectionDegree*(Math.PI/180))), 0,0,1,0.1 *  Math.abs(Math.cos(lookDirectionDegree*(Math.PI/180))), 0,0,0,1));
                }
                break;        // up arrow

            case 40:       // down arrow
                if(lookDirectionDegree == 0 ){
                    moveWorld(mat4(1,0,0,0, 0,1,0,0, 0,0,1,-0.1, 0,0,0,1));
                }else if(lookDirectionDegree > 0){
                    moveWorld(mat4(1,0,0,0, 0,1,0,0.1* Math.abs(Math.sin(lookDirectionDegree*(Math.PI/180))), 0,0,1,-0.1 * Math.abs(Math.cos(lookDirectionDegree*(Math.PI/180))), 0,0,0,1));
                }else if(lookDirectionDegree < 0){
                    moveWorld(mat4(1,0,0,0, 0,1,0,-0.1* Math.abs(Math.sin(lookDirectionDegree*(Math.PI/180))), 0,0,1,-0.1 *  Math.abs(Math.cos(lookDirectionDegree*(Math.PI/180))), 0,0,0,1));
                }
                break;

            case 33: 
                moveWorld( mat4(1,0,0,0, 0,1,0,0.1, 0,0,1,0, 0,0,0,1));
                break;         // PageUp

            case 34:     
                moveWorld(mat4(1,0,0,0, 0,1,0,-0.1, 0,0,1,0, 0,0,0,1));   
                break;// PageDown

            case 81: //q
                rotateWorldY(-2);
                break;

            case 69: //e
                rotateWorldY(2);
                break;

            case 68: //d
                //camera.position[0] += 0.1;
                break;

            case 65: //a
                //camera.position[0] -= 0.1;
                break;

            case 83: //s
                
                if( currentValue > -0.5){
                    if(currentValue < 0.04 && currentValue >= 0 || currentValue > -0.04 && currentValue <= 0){
                        camera.at[1] -= 0.005;
                        lookDirectionDegree -= 2.8125;
                    }else if(currentValue < 0.1 && currentValue >= 0.04 || currentValue > -0.1 && currentValue <= -0.04){
                        camera.at[1] -= 0.0075;
                        lookDirectionDegree -= 2.8125;
                    }else if(currentValue < 0.2 && currentValue >= 0.1 || currentValue > -0.2 && currentValue <= -0.1){
                        camera.at[1] -= 0.0125;
                        lookDirectionDegree -= 2.8125;
                    }else if(currentValue <= 0.5 && currentValue >= 0.2  || currentValue > -0.5 && currentValue <= -0.2){
                        camera.at[1] -= 0.0375;
                        if(lookDirectionDegree != -87.1875){
                            lookDirectionDegree -= 2.8125;
                        }
                    }else if(currentValue > 0.5){
                        camera.at[1] -= 0.0375;
                        lookDirectionDegree -= 2.8125;
                    }
                }
                console.log(lookDirectionDegree);
                break;

            case 87: //w
                if( currentValue < 0.5){
                    if(currentValue < 0.04 && currentValue >= 0 || currentValue > -0.04 && currentValue <= 0){
                        camera.at[1] += 0.005;
                        lookDirectionDegree += 2.8125;
                    }else if(currentValue < 0.1 && currentValue >= 0.04 || currentValue > -0.1 && currentValue <= -0.04){
                        camera.at[1] += 0.0075;
                        lookDirectionDegree += 2.8125;
                    }else if(currentValue < 0.2 && currentValue >= 0.1 || currentValue > -0.2 && currentValue <= -0.1){
                        camera.at[1] += 0.0125;
                        lookDirectionDegree += 2.8125;
                    }else if(currentValue < 0.5 && currentValue >= 0.2  || currentValue >= -0.5 && currentValue <= -0.2){
                        camera.at[1] += 0.0375;
                        if(lookDirectionDegree != 87.1875){
                            lookDirectionDegree += 2.8125;
                        }
                    }else if(currentValue < -0.5){
                        camera.at[1] += 0.0375;
                        lookDirectionDegree += 2.8125;
                    }
                }
                console.log(lookDirectionDegree);
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
                //render();
        }
    }
}