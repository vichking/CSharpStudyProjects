class NanError extends Error {
    constructor() {
        super();
        this.message = "Please enter an integer number.";
        this.name = "Non-numberical input error";
    }
}
class OutOfRangeError extends Error {
    constructor() {
        super();
        this.message = "Enter an integer number between 1 and your number of dimensions squared.";
        this.name = "Input number out of range Error";
    }
}
class InvalidCellError extends Error{
    constructor() {
        super();
        this.message = "This square is taken already (or you picked an empty value). Please pick another one.";
        this.name = "Occupied square Error";
    }
}