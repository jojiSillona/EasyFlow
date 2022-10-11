$(".subject").draggable({
    containment: $("#canvas"),
    cursor: "grabbing",
    grid: [110, 60]
});

//CREATING LINES LOLOLOL

const svgCanvas = document.getElementById("svg-canvas");
let target = document.querySelectorAll('.subject');

function strokeLine(prerequisite, requisite){
    var sender, receiver;
    for(var i = 0; i < target.length; i++){
        if(target[i].textContent === prerequisite){
            sender = target[i];
        }
        if(target[i].textContent === requisite){
            receiver = target[i];
        }
    }
    
    let senderProperties = sender.getBoundingClientRect();
    let receiverProperties = receiver.getBoundingClientRect();
    
    let bezierControlX = ( senderProperties.left + 90 + receiverProperties.left)/ 2;
    
    //TODO: Try offset-left

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M ${senderProperties.left + 90 - 214.31}, ${senderProperties.top + 20 - 357.8} 
                            C ${bezierControlX - 214.31}, ${senderProperties.top + 20 - 357.8}  
                            ${bezierControlX - 214.31}, ${receiverProperties.top + 20 - 357.8}  
                            ${receiverProperties.left - 214.31}, ${receiverProperties.top + 20 - 357.8}`);
    path.setAttribute("stroke", "black");
    path.setAttribute("fill", "transparent");
    
    svgCanvas.appendChild(path);
}



strokeLine("CCPROG1", "CCPROG2");
strokeLine("CCPROG2", "CCPROG3");
strokeLine("CCDSTRU", "CCDSALG");
strokeLine("MTH101A", "CSMATH1");
strokeLine("MTH101A", "CSMATH2");


//TODO: Update line everytime subjects move
