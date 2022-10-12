//CREATING LINES LOLOLOL
const svgCanvas = document.getElementById("svg-canvas");
let target = document.querySelectorAll('.subject');

function simplifyCoordinates(targetStyle){
    if(targetStyle === "auto"){
        return 0;
    } else {
        return targetStyle.replace('px', '');
    }
}

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
    
    var senderX = window.getComputedStyle(sender).left;
    senderX = Math.abs(parseInt(simplifyCoordinates(senderX)));
    var senderY = window.getComputedStyle(sender).top;
    senderY = Math.abs(parseInt(simplifyCoordinates(senderY)));
    var receiverX = window.getComputedStyle(receiver).left;
    receiverX = Math.abs(parseInt(simplifyCoordinates(receiverX)));
    var receiverY = window.getComputedStyle(receiver).top;
    receiverY = Math.abs(parseInt(simplifyCoordinates(receiverY)));

    let bezierControlX = (senderX + 110 + receiverX)/ 2;

    console.log(prerequisite + " TO " + requisite + " SENDER: "+ senderX + ", " + senderY + " RECEIVER: " + receiverX + ", " + receiverY + " BEZIER: " + bezierControlX);

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("id", `${prerequisite}-${requisite}`);

    path.setAttribute("d", `M ${senderX + 110}, ${senderY + 40},
                            C ${bezierControlX}, ${senderY + 40}
                            ${bezierControlX}, ${receiverY - 20}
                            ${receiverX + 20}, ${receiverY - 20}`);
    path.setAttribute("stroke", "black");
    path.setAttribute("fill", "transparent");
    
    svgCanvas.appendChild(path);
}

strokeLine("CCPROG1", "CCPROG2");
strokeLine("CCPROG2", "CCPROG3");
strokeLine("CCDSTRU", "CCDSALG");
strokeLine("MTH101A", "CSMATH1");
strokeLine("MTH101A", "CSMATH2");

//TODO: Animate line whenever subjects move

var draggedSubject = "CCPROG1"

$(".subject").draggable({
    containment: $("#canvas"),
    cursor: "grabbing",
    grid: [110, 60]
});