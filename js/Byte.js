var Byte = (function () {
    function Byte(init) {
        if (typeof init === "undefined") { init = 0; }
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
        if (typeof bind === "undefined") { bind = false; }
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
        if (typeof carry === "undefined") { carry = false; }
        if (typeof value === "undefined") { value = false; }
        var ret = (this.value & 0x80) != 0;
        this.Set(this.value << 1);
        this.Bit(0, carry ? ret : value);
        return ret;
    };

    Byte.prototype.ShiftRight = function (carry, value) {
        if (typeof carry === "undefined") { carry = false; }
        if (typeof value === "undefined") { value = false; }
        var ret = (this.value & 0x80) != 0;
        this.Set(this.value >>> 1);
        this.Bit(7, carry ? ret : value);
        return ret;
    };
    return Byte;
})();

var Word = (function () {
    function Word(high, low) {
        this.Set(high, low);
    }
    Word.prototype.Get = function () {
        return (this.value[0].Get() << 8) | this.value[1].Get();
    };

    Word.prototype.High = function () {
        return this.value[0];
    };

    Word.prototype.Low = function () {
        return this.value[1];
    };

    Word.prototype.Set = function (high, low) {
        this.value = typeof high == "number" ? [new Byte((high & ~0xFF) >> 8), new Byte(high & 0xFF)] : [high, low];
    };

    Word.prototype.SetHigh = function (value) {
        this.value[0] = typeof value == "number" ? new Byte(value) : value;
    };

    Word.prototype.SetLow = function (value) {
        this.value[1] = typeof value == "number" ? new Byte(value) : value;
    };

    Word.prototype.Add = function (value) {
        value = typeof value == "number" ? new Word(value) : value;
        var hold = this.Get() + value.Get();
        this.Set(hold);
        return new Word(hold > 0xFFFF ? hold - 0xFFFF : 0);
        //var overflow = [this.value[0].Add(value.High()), this.value[1].Add(value.Low())];
        //return new Word(overflow[0].Get() + this.value[0].Add(overflow[1]).Get());
    };

    Word.prototype.Sub = function (value) {
        value = typeof value == "number" ? new Word(value) : value;
        return this.Add(value.Neg());
    };

    Word.prototype.AddByte = function (value, signed) {
        if (typeof signed === "undefined") { signed = false; }
        value = typeof value != "number" ? new Word((value.Test(7) && signed ? 0xFF00 : 0x0000) | value.Get()) : new Word(value);
        return this.Add(value);
    };

    Word.prototype.SubByte = function (value) {
        value = typeof value != "number" ? new Byte(value) : value;
        return this.AddByte(value.Neg(), true);
    };

    Word.prototype.Not = function () {
        this.value[0].Not();
        this.value[1].Not();
    };

    Word.prototype.And = function (value) {
        value = typeof value == "number" ? new Word(value) : value;
        this.value[0].And(value.High());
        this.value[1].And(value.Low());
    };

    Word.prototype.Or = function (value) {
        value = typeof value == "number" ? new Word(value) : value;
        this.value[0].Or(value.High());
        this.value[1].Or(value.Low());
    };

    Word.prototype.Xor = function (value) {
        value = typeof value == "number" ? new Word(value) : value;
        this.value[0].Xor(value.High());
        this.value[1].Xor(value.Low());
    };

    Word.prototype.Neg = function () {
        this.Not();
        this.Add(1);
    };
    return Word;
})();
//# sourceMappingURL=Byte.js.map
