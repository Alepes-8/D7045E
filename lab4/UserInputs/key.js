function keyInput(deltaTime){
    if (keys['37'] || keys['39']) { //left and right
        const direction = keys['39'] ? 1 : -1;
            px -= deltaTime * speed * direction * friction;
        }
        if (keys['38'] || keys['40']) { //forward and backwards
            const direction = keys['40'] ? 1 : -1;
            if(document.getElementById("fly").checked){
                if(lookDirectionDegree == 0 ){
                    pz -= deltaTime * speed * direction * friction;
                }else if(lookDirectionDegree > 0){
                    let temp = deltaTime * speed * direction * friction;
                    pz -= temp *  Math.abs(Math.cos(lookDirectionDegree*(Math.PI/180)));
                    py +=  temp * Math.abs(Math.sin(lookDirectionDegree*(Math.PI/180)))
                }else if(lookDirectionDegree < 0){
                    let temp = deltaTime * speed * direction * friction;
                    pz -= temp *  Math.abs(Math.cos(lookDirectionDegree*(Math.PI/180)));
                    py -=  temp * Math.abs(Math.sin(lookDirectionDegree*(Math.PI/180)));
                }
            }else{
                pz -= deltaTime * speed * direction * friction;
            }
            
            
        }
        if (keys['32'] || keys['16']) {//upp and down
        const direction = keys['32'] ? 1 : -1;
            py -= deltaTime * speed * direction * friction;
        }
        
        if (keys['65'] || keys['68']) { //rotate world right and left
            const direction = keys['68'] ? 1 : -1;
            ang += deltaTime * turnSpeed * direction;
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