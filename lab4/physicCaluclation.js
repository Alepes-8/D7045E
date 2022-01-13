function physic(deltaTime){
    if(Math.abs(px) > 0){
        px += ((-px) * friction *deltaTime);
        if(px> 0 && px<0.005){
            px = 0;
        }
        if(px< 0 && px>-0.005){
            px = 0;
        }
    }
     
    if(Math.abs(pz) > 0){
        pz += ((-pz) * friction *deltaTime);
        if(pz> 0 && pz<0.005){
            pz = 0;
        }
        if(pz< 0 && pz>-0.005){
            pz = 0;
        }
        
    }
    if(Math.abs(py) > 0){
        py += ((-py) * friction *deltaTime);
        if(py> 0 && py<0.005){
            py = 0;
        }
        if(py< 0 && py>-0.005){
            py = 0;
        }
        
    }
    if(Math.abs(ang) > 0){
        ang += ((-ang) * friction *deltaTime);
        if(ang> 0 && ang<0.05){
            ang = 0;
        }
        if(ang< 0 && ang>-0.05){
            ang = 0;
        }
    }

    if(Math.abs(topang) > 0){
        topang += ((-topang) * friction *deltaTime);
        if(topang> 0 && ang<0.05){
            topang = 0;
        }
        if(topang< 0 && topang>-0.05){
            topang = 0;
        }
    }
}