
function rotateObject(object,degree, way){
    if(way== "x"){
        object.translate = mult(object.translate, rotate(degree,[1,0,0]));

    }else if(way== "y"){
        object.translate = mult(object.translate, rotate(degree,[0,1,0]));

    }else if(way== "z"){
        object.translate = mult(object.translate, rotate(degree,[0,0,1]));

    }
}


function rotateFromOriginY(object, degree){
    object.translate = mult(object.translate, rotate(degree,[0,1,0]));
    rotateObjectY(object,degree);
} 

function rotateFromOriginZ(object, degree){
    object.translate = mult(object.translate, rotate(degree,[1,0,0]));
    rotateObjectZ(object,degree);
} 


function rotateObjectY(item,degree){
    let a = item.localMatrix[2][3]; //z
    let b = item.localMatrix[0][3]; //x
    let hyp = Math.sqrt(a*a + b*b);
    let angle = Math.atan(a/b) * (180/Math.PI);

    if(a == 0 && b==0){
        
    }
    else if(a > 0 && b == 0){ // exactly 90
        if(degree > 0){
            angle = -90 + degree;
            b = ( hyp * Math.cos(angle * (Math.PI/180) ));
        }else if(degree < 0){
            angle = angle + degree;
            b =  -hyp * Math.cos(angle * (Math.PI/180) );
        }
    }else if(a < 0 && b == 0){ // exactly  -90

        if(degree > 0){
            angle = -90 + degree;
            b = -hyp * Math.cos(angle * (Math.PI/180) );
        }else if(degree < 0){
            angle = angle + degree;
            b = -hyp * Math.cos(angle * (Math.PI/180) );
        }
    }
    else{ // any other degree than 90 & -90
       if(angle - degree < -90){// if you will go bellow -90
            angle = 90 + (angle -degree +90);
            if(b>0){
                b = -(hyp * Math.cos(angle * (Math.PI/180) ));
            }else{
                b = hyp * Math.cos(angle * (Math.PI/180) );
            }
        }
        else{
            angle -=degree;
        }

        if(b > 0){// if possetive x axis
            b = hyp * Math.cos(angle * (Math.PI/180) );
            a = hyp * Math.sin(angle * (Math.PI/180));
        }
        else if(b==0){
            if(a > 0){
                a = hyp * Math.sin(angle * (Math.PI/180));
            }
            if(a > 0){
                a = -(hyp * Math.sin(angle * (Math.PI/180)));
            }
            b = -(hyp * Math.cos(angle * (Math.PI/180) ));
        }
        else{
            b = -(hyp * Math.cos(angle * (Math.PI/180) ));
            a = -(hyp * Math.sin(angle * (Math.PI/180)));
        }
    }
    item.localMatrix[2][3] = a;
    item.localMatrix[0][3] = b;
}