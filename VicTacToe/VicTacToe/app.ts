let humanPlayer = new HumanPlayer();
let aiPlayer = new AIPlayer();
let numberOfDimensions = 4;



function createTable(): void {

    // CREATE HTMLs =================================================

    var tbl = document.createElement("table");
    var btn = document.createElement("button");
    btn.setAttribute("onclick", "move()");
    btn.setAttribute("id", "startBtn");

    document.getElementById("ticTac").appendChild(tbl);
    document.getElementById("other").appendChild(btn);
    document.getElementById("startBtn").innerHTML = "Make A Move";

    // ADD NUMBERS TO THE CELLS ======================================

    for (var i = 0; i < numberOfDimensions; i++) {
        var row = document.createElement("tr");
        tbl.appendChild(row);
        for (var j = 1; j <= numberOfDimensions; j++) {
            var cell = document.createElement("td");
            row.appendChild(cell);
            var mispar = j + (numberOfDimensions * i);
            cell.setAttribute("id", "td" + mispar);
            cell.innerText = `${mispar}`;
        }
    }
    GameState.Initialize(numberOfDimensions);
}



function move() :void {

    // HUMAN
    let cellNumber: number;
    cellNumber = humanPlayer.getUserInput();
    document.getElementById("td" + cellNumber).innerHTML = "X";
    GameState.updateGameState(cellNumber, true);

   if (GameState.isGameOver) {
        document.getElementById("startBtn").setAttribute("disabled", "true");
        alert(GameState.gameResult);
    }

    // COMPUTER
    cellNumber = aiPlayer.calculateAiInput();
    document.getElementById("td" + cellNumber).innerHTML = "O";
    GameState.updateGameState(cellNumber, false);

    if (GameState.isGameOver) {
        document.getElementById("startBtn").setAttribute("disabled", "true");
        alert(GameState.gameResult);
    }
 
}
