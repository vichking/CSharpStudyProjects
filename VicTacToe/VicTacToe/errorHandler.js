var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NanError = (function (_super) {
    __extends(NanError, _super);
    function NanError() {
        var _this = _super.call(this) || this;
        _this.message = "Please enter an integer number.";
        _this.name = "Non-numberical input error";
        return _this;
    }
    return NanError;
}(Error));
var OutOfRangeError = (function (_super) {
    __extends(OutOfRangeError, _super);
    function OutOfRangeError() {
        var _this = _super.call(this) || this;
        _this.message = "Enter an integer number between 1 and your number of dimensions squared.";
        _this.name = "Input number out of range Error";
        return _this;
    }
    return OutOfRangeError;
}(Error));
var InvalidCellError = (function (_super) {
    __extends(InvalidCellError, _super);
    function InvalidCellError() {
        var _this = _super.call(this) || this;
        _this.message = "This square is taken already (or you picked an empty value). Please pick another one.";
        _this.name = "Occupied square Error";
        return _this;
    }
    return InvalidCellError;
}(Error));
//# sourceMappingURL=errorHandler.js.map