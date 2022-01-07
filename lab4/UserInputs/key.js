function keyInput(deltaTime){
    if (keys['37'] || keys['39']) { //left and right
        const direction = keys['37'] ? 1 : -1;
        px += direction * speed ;
        px += (-px * friction* deltaTime )
    }
    if (keys['38'] || keys['40']) { //forward and backwards
        const direction = keys['38'] ? 1 : -1;
        if(document.getElementById("fly").checked){
            if(lookDirectionDegree == 0 ){
                pz += direction * speed ;
                pz += (-pz * friction* deltaTime )
            }else if(lookDirectionDegree > 0){
                console.log(lookDirectionDegree)

                let temp = direction * speed ;
                let tempZ = temp *  Math.abs(Math.cos(lookDirectionDegree*(Math.PI/180)));
                let tempY = -temp * Math.abs(Math.sin(lookDirectionDegree*(Math.PI/180)));
                pz += tempZ;
                py += tempY;
            }else if(lookDirectionDegree < 0){
                console.log(lookDirectionDegree)
                let temp = direction * speed ;
                let tempZ = temp *  Math.abs(Math.cos(lookDirectionDegree*(Math.PI/180)));
                let tempY = temp * Math.abs(Math.sin(lookDirectionDegree*(Math.PI/180)));
                pz += tempZ;
                py += tempY;
            }
        }else{
            pz += direction * speed ;
            pz += (-pz * friction* deltaTime )
        }
        
    }
    if (keys['32'] || keys['16']) {//upp and down
        const direction = keys['16'] ? 1 : -1;
        py += direction * speed ;
        py += (-py * friction* deltaTime )
    }
    
    if (keys['65'] || keys['68']) { //rotate world right and left
        const direction = keys['68'] ? 1 : -1;
        ang += direction * turnSpeed ;
        ang += (-ang * friction* deltaTime )
        
    }

    if (keys['87'] || keys['83']) {
        const direction = keys['87'] ? 1 : -1;
        let currentValue = camera.at[1];        
        if(direction == -1){
            if( currentValue > -0.5){
                if(currentValue < 0.04 && currentValue >= 0 || currentValue > -0.04 && currentValue <= 0){
                    camera.at[1] -= 0.01/20;
                    lookDirectionDegree -= 5.625/20;
                }else if(currentValue < 0.1 && currentValue >= 0.04 || currentValue > -0.1 && currentValue <= -0.04){
                    camera.at[1] -= 0.015/20;
                    lookDirectionDegree -= 5.625/20;
                }else if(currentValue < 0.2 && currentValue >= 0.1 || currentValue > -0.2 && currentValue <= -0.1){
                    camera.at[1] -= 0.025/30;
                    lookDirectionDegree -= 5.625/30;
                }else if(currentValue <= 0.5 && currentValue >= 0.2  || currentValue > -0.5 && currentValue <= -0.2){
                    camera.at[1] -= 0.075/15;
                    if(lookDirectionDegree != -87.1875){
                        lookDirectionDegree -= 5.625/15;
                    }
                }else if(currentValue > 0.5){
                    camera.at[1] -= 0.075 /15;
                    lookDirectionDegree -= 5.625/15;
                }
            }
        }else{
            if( currentValue < 0.5){
                if(currentValue < 0.04 && currentValue >= 0 || currentValue > -0.04 && currentValue <= 0){
                    camera.at[1] += 0.01/20;
                    lookDirectionDegree += 5.625/20;
                }else if(currentValue < 0.1 && currentValue >= 0.04 || currentValue > -0.1 && currentValue <= -0.04){
                    camera.at[1] += 0.015/20;
                    lookDirectionDegree += 5.625/20;
                }else if(currentValue < 0.2 && currentValue >= 0.1 || currentValue > -0.2 && currentValue <= -0.1){
                    camera.at[1] += 0.025/30;
                    lookDirectionDegree += 5.625/30;
                }else if(currentValue < 0.5 && currentValue >= 0.2  || currentValue >= -0.5 && currentValue <= -0.2){
                    camera.at[1] += 0.075/15;
                    if(lookDirectionDegree != 87.1875){
                        lookDirectionDegree += 5.625/15;
                    }
                }else if(currentValue < -0.5){
                    camera.at[1] += 0.075 /15;
                    lookDirectionDegree += 5.625/15;
                }
            }
        }
    }
}