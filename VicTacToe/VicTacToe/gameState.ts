class GameState{    

    private static _gameMatrix: string[][];    // 8 arrays, 3 elements each (winning combos)
    private static _gameResult: string;
    private static _isGameOver: boolean;
    private static _takenCells: Array<number>;
    private static _numberOfDimensions: number;
    
 
    public static Initialize(numberOfDimensions: number): void  {
        GameState._numberOfDimensions = numberOfDimensions;
        GameState._isGameOver = false;
        GameState._gameResult = "The game is not over yet";
        
        GameState._takenCells = new Array<number>();
        for (let i: number = 0; i <= Math.pow(numberOfDimensions, 2); i++){
            GameState._takenCells[i] = 0;
        }

        GameState._gameMatrix = new Array<string[]>();
        for (let i: number = 0; i < numberOfDimensions*2 + 2; i++) {
            GameState._gameMatrix[i] = new Array<string>();
        }

        // rows
        for (let i: number = 0; i < numberOfDimensions; i++) {
            for (let j: number = 1; j <= numberOfDimensions; j++) {
                GameState._gameMatrix[i][j - 1] = (j + i * numberOfDimensions).toString();
            }
        }
        // columns
        for (let i: number = 1; i <= numberOfDimensions; i++) {
            for (let j: number = 0; j < numberOfDimensions; j++) {
                GameState._gameMatrix[i + numberOfDimensions-1][j] = (i + j * numberOfDimensions).toString();
            }
        }

        // diagonals
        for (let j: number = 0; j <numberOfDimensions; j++) {
            GameState._gameMatrix[numberOfDimensions * 2][j] = (1 + j + j* numberOfDimensions).toString();
        }
        for (let j: number = 0; j < numberOfDimensions; j++) {
            GameState._gameMatrix[numberOfDimensions * 2 + 1][j] = (numberOfDimensions*(j+1) - j).toString();
        }
    }

    


    // GET SET
    public static get isGameOver(): boolean {
        return GameState._isGameOver;
    }
    public static get gameResult(): string {
        return GameState._gameResult;
    }    
    public static get takenCells(): number[] {
        return GameState._takenCells;
    }
    public static get gameMatrix(): Array<string[]> {
        return GameState._gameMatrix;
    }
    public static get numberOfDimensions(): number {
        return GameState._numberOfDimensions;
    }
    public static set numberOfDimensions(numberOfDimensions) {
        if (numberOfDimensions < 15)
            GameState._numberOfDimensions = numberOfDimensions;
        else
            GameState._numberOfDimensions = 15;
    }


    // CHECKS AND OTHER FUNCTIONS
    public static isCellTaken(cellNumber: number): boolean {
        return GameState._takenCells.indexOf(cellNumber) > 0;            
    }

    public static updateGameState(cellNumber: number, isHuman: boolean): void {
        GameState._takenCells[cellNumber] = cellNumber;

        let mySymbol = isHuman ? "X" : "0";
        for (let strike of GameState._gameMatrix) {
            for (let i: number = 0; i < strike.length; i++) {
                if (strike[i] == cellNumber.toString()) {
                    strike[i] = mySymbol;
                }
            }
        }
        GameState.updateGameResult();
    }

    public static getAvailableCellNumber(): number {
        for (let i: number = 1; i <= GameState._takenCells.length + 1; i++) {
            if (GameState._takenCells[i] == 0)
                return i;
        }
        return 0;
    }

    public static getLastCellForEnemyNumber(): number {
        for (let strike of GameState._gameMatrix) {
            if (strike.filter(x => x === "X").length == GameState.numberOfDimensions - 1) {
                return parseInt(strike.filter(x => x != "X")[0]);
            }
        }
        return 0;
    }

    public static getLastCellForStrikeNumber(): number {
        for (let strike of GameState._gameMatrix) {
            if (strike.filter(x => x === "0").length == GameState.numberOfDimensions - 1) {
                return parseInt(strike.filter(x => x != "0")[0]);
            }
        }
        return 0;
    }

    private  static areSameValues(arr: string[]): boolean {
        for (let element of arr) {
            if (arr[0] != element)
                return false;
        }
        return true;
    }

    public static updateGameResult() {        
        let strike: string[];

        // CHECK IF THERE ARE ROWS OR DIAGONALS FULLY DONE
        for (strike of this._gameMatrix) {
            if (strike.length == this._numberOfDimensions && GameState.areSameValues(strike)) {
                GameState._isGameOver = true;
                GameState._gameResult = strike[0] == "0" ? "Computer won!" : "You won!";
            }
        }
        // CHECK IF THERE IS NO PLACE LEFT
        if (!GameState._isGameOver && GameState._takenCells.filter(x => x === 0).length == 1) {
            GameState._isGameOver = true;
            GameState._gameResult = "It's a draw!";
        }
    }

    
}