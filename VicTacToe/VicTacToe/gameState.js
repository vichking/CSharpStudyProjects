var GameState = (function () {
    function GameState() {
    }
    GameState.Initialize = function (numberOfDimensions) {
        GameState._numberOfDimensions = numberOfDimensions;
        GameState._isGameOver = false;
        GameState._gameResult = "The game is not over yet";
        GameState._takenCells = new Array();
        for (var i = 0; i <= Math.pow(numberOfDimensions, 2); i++) {
            GameState._takenCells[i] = 0;
        }
        GameState._gameMatrix = new Array();
        for (var i = 0; i < numberOfDimensions * 2 + 2; i++) {
            GameState._gameMatrix[i] = new Array();
        }
        // rows
        for (var i = 0; i < numberOfDimensions; i++) {
            for (var j = 1; j <= numberOfDimensions; j++) {
                GameState._gameMatrix[i][j - 1] = (j + i * numberOfDimensions).toString();
            }
        }
        // columns
        for (var i = 1; i <= numberOfDimensions; i++) {
            for (var j = 0; j < numberOfDimensions; j++) {
                GameState._gameMatrix[i + numberOfDimensions - 1][j] = (i + j * numberOfDimensions).toString();
            }
        }
        // diagonals
        for (var j = 0; j < numberOfDimensions; j++) {
            GameState._gameMatrix[numberOfDimensions * 2][j] = (1 + j + j * numberOfDimensions).toString();
        }
        for (var j = 0; j < numberOfDimensions; j++) {
            GameState._gameMatrix[numberOfDimensions * 2 + 1][j] = (numberOfDimensions * (j + 1) - j).toString();
        }
    };
    Object.defineProperty(GameState, "isGameOver", {
        // GET SET
        get: function () {
            return GameState._isGameOver;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameState, "gameResult", {
        get: function () {
            return GameState._gameResult;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameState, "takenCells", {
        get: function () {
            return GameState._takenCells;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameState, "gameMatrix", {
        get: function () {
            return GameState._gameMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameState, "numberOfDimensions", {
        get: function () {
            return GameState._numberOfDimensions;
        },
        set: function (numberOfDimensions) {
            if (numberOfDimensions < 15)
                GameState._numberOfDimensions = numberOfDimensions;
            else
                GameState._numberOfDimensions = 15;
        },
        enumerable: true,
        configurable: true
    });
    // CHECKS AND OTHER FUNCTIONS
    GameState.isCellTaken = function (cellNumber) {
        return GameState._takenCells.indexOf(cellNumber) > 0;
    };
    GameState.updateGameState = function (cellNumber, isHuman) {
        GameState._takenCells[cellNumber] = cellNumber;
        var mySymbol = isHuman ? "X" : "0";
        for (var _i = 0, _a = GameState._gameMatrix; _i < _a.length; _i++) {
            var strike = _a[_i];
            for (var i = 0; i < strike.length; i++) {
                if (strike[i] == cellNumber.toString()) {
                    strike[i] = mySymbol;
                }
            }
        }
        GameState.updateGameResult();
    };
    GameState.getAvailableCellNumber = function () {
        for (var i = 1; i <= GameState._takenCells.length + 1; i++) {
            if (GameState._takenCells[i] == 0)
                return i;
        }
        return 0;
    };
    GameState.getLastCellForEnemyNumber = function () {
        for (var _i = 0, _a = GameState._gameMatrix; _i < _a.length; _i++) {
            var strike = _a[_i];
            if (strike.filter(function (x) { return x === "X"; }).length == GameState.numberOfDimensions - 1) {
                return parseInt(strike.filter(function (x) { return x != "X"; })[0]);
            }
        }
        return 0;
    };
    GameState.getLastCellForStrikeNumber = function () {
        for (var _i = 0, _a = GameState._gameMatrix; _i < _a.length; _i++) {
            var strike = _a[_i];
            if (strike.filter(function (x) { return x === "0"; }).length == GameState.numberOfDimensions - 1) {
                return parseInt(strike.filter(function (x) { return x != "0"; })[0]);
            }
        }
        return 0;
    };
    GameState.areSameValues = function (arr) {
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var element = arr_1[_i];
            if (arr[0] != element)
                return false;
        }
        return true;
    };
    GameState.updateGameResult = function () {
        var strike;
        // CHECK IF THERE ARE ROWS OR DIAGONALS FULLY DONE
        for (var _i = 0, _a = this._gameMatrix; _i < _a.length; _i++) {
            strike = _a[_i];
            if (strike.length == this._numberOfDimensions && GameState.areSameValues(strike)) {
                GameState._isGameOver = true;
                GameState._gameResult = strike[0] == "0" ? "Computer won!" : "You won!";
            }
        }
        // CHECK IF THERE IS NO PLACE LEFT
        if (!GameState._isGameOver && GameState._takenCells.filter(function (x) { return x === 0; }).length == 1) {
            GameState._isGameOver = true;
            GameState._gameResult = "It's a draw!";
        }
    };
    return GameState;
}());
//# sourceMappingURL=gameState.js.map