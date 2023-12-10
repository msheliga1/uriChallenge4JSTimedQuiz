// Mike Sheliga - 12.9.23
// URI Challenge 4 - Dynamic Javascript - Timed Javascript Quiz with Scores

alert("Welcome to Mike Sheliga's Time Javascript Quiz");
init( ); 

function createStartScreen()
{
    alert("Starting createStartScreen");
    var mainEl = document.getElementById("main");
    var btn = document.createElement("button");
    btn.innerHTML = "View High Scores";
    btn.setAttribute("id", "viewHighScoreButton");
    // btn.setAttribute("color", "purple");
    // btn.bgcolor = "#ff00ff";
    // btn.style.backgroundColor = "#ffffff"; 
    mainEl.appendChild(btn);
}

function init ( ) {
    createStartScreen();
}
