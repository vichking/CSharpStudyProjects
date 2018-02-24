class AIPlayer{    


    public makeMove(): void {
        let cellNumber = this.calculateAiInput();
        document.getElementById("td" + cellNumber).innerHTML = "O";
        GameState.updateGameState(cellNumber, false);
    }

    private calculateAiInput(): number {
        let lastCellInStrikeNumber = GameState.getLastCellForStrikeNumber();
        if (lastCellInStrikeNumber>0)
        {
            return lastCellInStrikeNumber;
        }

        let lastCellForEnemyNumber = GameState.getLastCellForEnemyNumber();
        if (lastCellForEnemyNumber > 0) {
            return lastCellForEnemyNumber;
        }

        return GameState.getAvailableCellNumber();
    }

    private validateInput(inputValue: any): number {
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
    }
    
}