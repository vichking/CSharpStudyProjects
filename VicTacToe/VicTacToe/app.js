var humanPlayer = new HumanPlayer();
var aiPlayer = new AIPlayer();
var numberOfDimensions = 4;
function createTable() {
    // CREATE HTMLs =================================================
    var tbl = document.createElement("table");
    var btn = document.createElement("button");
    btn.setAttribute("onclick", "play()");
    btn.setAttribute("id", "startBtn");
    document.getElementById("ticTac").appendChild(tbl);
    document.getElementById("other").appendChild(btn);
    document.getElementById("startBtn").innerHTML = "Start the Game";
    // ADD NUMBERS TO THE CELLS ======================================
    for (var i = 0; i < numberOfDimensions; i++) {
        var row = document.createElement("tr");
        tbl.appendChild(row);
        for (var j = 1; j <= numberOfDimensions; j++) {
            var cell = document.createElement("td");
            row.appendChild(cell);
            var mispar = j + (numberOfDimensions * i);
            cell.setAttribute("id", "td" + mispar);
            cell.innerText = "" + mispar;
        }
    }
}
function play() {
    GameState.Initialize(numberOfDimensions);
    while (true) {
        // HUMAN
        if (!GameState.isGameOver) {
            humanPlayer.MakeMove();
        }
        else {
            alert(GameState.gameResult);
            break;
        }
        // AI
        if (!GameState.isGameOver) {
            aiPlayer.makeMove();
        }
        else {
            alert(GameState.gameResult);
            break;
        }
    }
}
//# sourceMappingURL=app.js.map