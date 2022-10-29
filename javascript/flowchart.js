window.onload = function() {
    $(".subject").draggable({
        containment: $("#canvas"),
        cursor: "grabbing",
        grid: [110, 60]
    });
}

