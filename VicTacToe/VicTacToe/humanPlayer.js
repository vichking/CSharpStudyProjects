var HumanPlayer = (function () {
    function HumanPlayer() {
    }
    HumanPlayer.prototype.MakeMove = function () {
        var cellNumber = this.getUserInput();
        document.getElementById("td" + cellNumber).innerHTML = "X";
        GameState.updateGameState(cellNumber, true);
    };
    HumanPlayer.prototype.getUserInput = function () {
        var validCellNumber = 0;
        do {
            var inputValue = prompt("Enter your move:");
            try {
                validCellNumber = this.validateInput(inputValue);
            }
            catch (err) {
                alert(err.message);
            }
        } while (validCellNumber == 0);
        return validCellNumber;
    };
    HumanPlayer.prototype.validateInput = function (inputValue) {
        if (inputValue == "") {
            throw new InvalidCellError();
        }
        else if (isNaN(parseInt(inputValue))) {
            throw new NanError();
        }
        else if (parseInt(inputValue) != Math.floor(parseInt(inputValue)) ||
            (parseInt(inputValue) < 1 || parseInt(inputValue) > Math.pow(GameState.numberOfDimensions, 2))) {
            throw new OutOfRangeError();
        }
        else if (GameState.isCellTaken(parseInt(inputValue))) {
            throw new InvalidCellError();
        }
        return parseInt(inputValue);
    };
    return HumanPlayer;
}());
//# sourceMappingURL=humanPlayer.js.map