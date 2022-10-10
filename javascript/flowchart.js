$(".subject").draggable({
    containment: $("#canvas"),
    cursor: "grabbing",
    grid: [110, 60]
});

//CREATING LINES LOLOLOL

const svgCanvas = document.getElementById("svg-canvas");

let target = document.querySelectorAll('.subject');
var sender, receiver;
for(var i = 0; i < target.length; i++){
    if(target[i].textContent === "CCPROG1"){
        sender = target[i];
    }
    if(target[i].textContent === "CCPROG2"){
        receiver = target[i];
    }
}

let senderProperties = sender.getBoundingClientRect();
let receiverProperties = sender.getBoundingClientRect();

let bezierControlX = ( senderProperties.x + receiverProperties.x)/ 2;

/*
var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute("d", `M ${}`)
*/

//TODO: set the properties of sender and receiver to path wahehe