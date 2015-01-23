var Byte = (function () {
    function Byte(init) {
        if (init === void 0) { init = 0; }
        this.value = init & 0xFF | (init < 0 ? 0x80 : 0);
    }
    Byte.prototype.Add = function (val) {
        val = typeof val == "number" ? new Byte(val) : val;
        var hold = this.value + val.Get();
        this.value = hold & 0xFF;
        return new Byte(hold > 255 ? hold - 255 : 0);
    };
    Byte.prototype.Sub = function (val) {
        val = typeof val == "number" ? new Byte(val) : val;
        return this.Add(val.Neg());
    };
    Byte.prototype.Get = function () {
        return this.value;
    };
    Byte.prototype.Set = function (val) {
        this.value = typeof val == "number" ? val & 0xFF : val.Get();
    };
    Byte.prototype.Neg = function (bind) {
        if (bind === void 0) { bind = false; }
        var tmp = new Byte(~this.value + 1);
        this.value = bind ? tmp.Get() : this.value;
        return tmp;
    };
    Byte.prototype.And = function (val) {
        val = typeof val == "number" ? new Byte(val) : val;
        this.value = this.value & val.Get();
    };
    Byte.prototype.Or = function (val) {
        val = typeof val == "number" ? new Byte(val) : val;
        this.value = this.value | val.Get();
    };
    Byte.prototype.Xor = function (val) {
        val = typeof val == "number" ? new Byte(val) : val;
        this.value = this.value ^ val.Get();
    };
    Byte.prototype.Not = function () {
        this.value = ~this.value;
    };
    Byte.prototype.Bit = function (pos, val) {
        pos = pos % 8;
        this.Set(val ? (this.value | Math.pow(2, pos)) : (this.value & ~Math.pow(2, pos)));
    };
    Byte.prototype.Test = function (pos) {
        pos = pos % 8;
        return (this.value & Math.pow(2, pos)) != 0;
    };
    Byte.prototype.ShiftLeft = function (carry, value) {
        if (carry === void 0) { carry = false; }
        if (value === void 0) { value = false; }
        var ret = (this.value & 0x80) != 0;
        this.Set(this.value << 1);
        this.Bit(0, carry ? ret : value);
        return ret;
    };
    Byte.prototype.ShiftRight = function (carry, value) {
        if (carry === void 0) { carry = false; }
        if (value === void 0) { value = false; }
        var ret = (this.value & 0x80) != 0;
        this.Set(this.value >>> 1);
        this.Bit(7, carry ? ret : value);
        return ret;
    };
    return Byte;
})();
var Word = (function () {
    function Word(init) {
        if (init === void 0) { init = 0; }
        this.value = [new Byte((init & ~0xFF) >> 8), new Byte(init & 0xFF)];
    }
    return Word;
})();
//# sourceMappingURL=Byte.js.map