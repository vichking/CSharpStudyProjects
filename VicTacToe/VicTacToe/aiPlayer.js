var AIPlayer = (function () {
    function AIPlayer() {
    }
    AIPlayer.prototype.calculateAiInput = function () {
        var lastCellInStrikeNumber = GameState.getLastCellForStrikeNumber();
        if (lastCellInStrikeNumber > 0) {
            return lastCellInStrikeNumber;
        }
        var lastCellForEnemyNumber = GameState.getLastCellForEnemyNumber();
        if (lastCellForEnemyNumber > 0) {
            return lastCellForEnemyNumber;
        }
        return GameState.getAvailableCellNumber();
    };
    AIPlayer.prototype.validateInput = function (inputValue) {
        var parsedVal = parseInt(inputValue);
        if (inputValue == "") {
            throw new InvalidCellError();
        }
        else if (isNaN(parsedVal)) {
            throw new NanError();
        }
        else if (parsedVal != Math.floor(parsedVal) || (parsedVal < 1 || parsedVal > Math.pow(GameState.numberOfDimensions, 2))) {
            throw new OutOfRangeError();
        }
        else if (GameState.isCellTaken(parsedVal)) {
            throw new InvalidCellError();
        }
        return parsedVal;
    };
    return AIPlayer;
}());
//# sourceMappingURL=aiPlayer.js.map