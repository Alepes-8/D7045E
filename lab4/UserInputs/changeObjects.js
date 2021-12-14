/**
 * @author Alex Peschel, Oliver Olofsson
 */
class ChangeObjects{
    mainNode(){
        console.log("hejsan");
        let form = document.getElementById("mainForm").value;
        let width = document.getElementById("mainwidth").value;
        let height = document.getElementById("mainheight").value;
        let depth = document.getElementById("maindepth").value;
        let monoNode = new MonochromeMaterial(gl, vec4(1.0, 0.0, 0, 1.0), shader);
        let monoBlack = new MonochromeMaterial(gl, vec4(0, 0, 0, 1.0), shader);
        let cuboid1; 
        if(form == "1"){
            cuboid1 = new Cuboid(gl, width, height, depth, shader.getProgram());
        }
        else if(form == "2"){
            cuboid1 = new Diamond(gl, width, height, depth, shader.getProgram());
        }
        else if(form == "3"){
            cuboid1 = new Pyramid(gl, width, height, depth, shader.getProgram());
        }
        movingNode = new GraphicsNode(gl, cuboid1, monoNode, movingNode.getTransform(), monoBlack);
        render();
    }


    secoundChange(){
        let form = document.getElementById("secoundaryForm").value;
        let width = document.getElementById("secwidth").value;
        let height = document.getElementById("secheight").value;
        let depth = document.getElementById("secdepth").value;

        let monoBlue = new MonochromeMaterial(gl, vec4(0,1, 1, 1.0), shader);
        let monoBlack = new MonochromeMaterial(gl, vec4(0, 0, 0, 1.0), shader);
        
        let cuboid1;
        let temp = [];
        
        if(form == "4"){
            let max = 10;
            let min = -10;
            let maxZ = 10;
            let minZ = -40
            for (let i = 0; i <= 60; i++) {
                let choice =  Math.floor(Math.random() * 3) + 1;
                let cuboid1; 
                if(choice == "1"){
                    cuboid1 = new Cuboid(gl, width, height, depth, shader.getProgram());
                }
                else if(choice == "2"){
                    cuboid1 = new Diamond(gl, width, height, depth, shader.getProgram());
                }
                else if(choice == "3"){
                    cuboid1 = new Pyramid(gl, width, height, depth, shader.getProgram());
                }
                let x = Math.floor(Math.random() * (max - min)) + min;
                let y = Math.floor(Math.random() * (max - min)) + min;
                let z = Math.floor(Math.random() * (maxZ - minZ)) + minZ;
                let transform = mat4(1,0,0,x, 0,1,0,y, 0,0,1,z, 0,0,0,1);
                temp.push(new GraphicsNode(gl, cuboid1, monoBlue, nodes[i].getTransform() ,monoBlack));
            }
        }else{
            let cuboid1; 
            if(form == "1"){
                cuboid1 = new Cuboid(gl, width, height, depth, shader.getProgram());
            }
            else if(form == "2"){
                cuboid1 = new Diamond(gl, width, height, depth, shader.getProgram());
            }
            else if(form == "3"){
                cuboid1 = new Pyramid(gl, width, height, depth, shader.getProgram());
            }
            let max = 10;
            let min = -10;
            let maxZ = 10;
            let minZ = -40
            for (let i = 0; i <= 60; i++) {
                let x = Math.floor(Math.random() * (max - min)) + min;
                let y = Math.floor(Math.random() * (max - min)) + min;
                let z = Math.floor(Math.random() * (maxZ - minZ)) + minZ;
                let transform = mat4(1,0,0,x, 0,1,0,y, 0,0,1,z, 0,0,0,1);
                temp.push(new GraphicsNode(gl, cuboid1, monoBlue, nodes[i].getTransform(),monoBlack));
            }
        }
        nodes = temp;
        render();
    }
}