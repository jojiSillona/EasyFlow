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
            target[i].setAttribute("data-path", `${prerequisite}-${requisite}`);
        }
        if(target[i].textContent === requisite){
            receiver = target[i];
            target[i].setAttribute("data-path", `${prerequisite}-${requisite}`);
        }
    }

    var senderX, senderY, receiverX, receiverY;

    senderX = parseInt(simplifyCoordinates(window.getComputedStyle(sender).left));
    senderY = parseInt(simplifyCoordinates(window.getComputedStyle(sender).top));
    receiverX = parseInt(simplifyCoordinates(window.getComputedStyle(receiver).left));
    receiverY = parseInt(simplifyCoordinates(window.getComputedStyle(receiver).top));

    let bezierControlX = (senderX + 110 + receiverX)/ 2;

    console.log(prerequisite + " TO " + requisite + " SENDER: "+ senderX + ", " + senderY + " RECEIVER: " + receiverX + ", " + receiverY + " BEZIER: " + bezierControlX);

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("id", `${prerequisite}-${requisite}`);

    path.setAttribute("d", `M ${senderX + 110}, ${senderY + 40},
                            C ${bezierControlX}, ${senderY + 40}
                            ${bezierControlX}, ${receiverY + 40}
                            ${receiverX + 20}, ${receiverY + 40}`);
    path.setAttribute("stroke", "black");
    path.setAttribute("fill", "transparent");

    svgCanvas.appendChild(path);
}

strokeLine("FDNECON", "FDNECON2");
strokeLine("FDNACCT", "FDNACCT2");
strokeLine("FDNACCT2", "FDNACCT3");
strokeLine("GESPORTS", "GETEAMS");


//TODO: Animate line whenever subjects move

function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return Array.prototype.filter.call(elements, function(element){
      return RegExp(text).test(element.textContent);
    });
}

$(".subject").draggable({
    containment: $("#canvas"),
    cursor: "grabbing",
    grid: [110, 60],
    drag: function(event, ui){
        var target = this.dataset.path;

        let children = target.split("-");
        //console.log(children[0], children[1]);

        var path = document.querySelector(`[id^='${target}']`);
        let sender = contains('div', children[0]);
        let receiver = contains('div', children[1]);

        var senderX = parseInt(simplifyCoordinates(window.getComputedStyle(sender[2]).left));
        var senderY = parseInt(simplifyCoordinates(window.getComputedStyle(sender[2]).top));
        var receiverX = parseInt(simplifyCoordinates(window.getComputedStyle(receiver[2]).left));
        var receiverY = parseInt(simplifyCoordinates(window.getComputedStyle(receiver[2]).top));

        let bezierControlX = (senderX + 110 + receiverX)/ 2;

        path.setAttribute("d", `M ${senderX + 110}, ${senderY + 40},
                                C ${bezierControlX}, ${senderY + 40}
                                ${bezierControlX}, ${receiverY + 40}
                                ${receiverX + 20}, ${receiverY + 40}`);
    }
});