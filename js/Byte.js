var Byte = (function () {
    function Byte(init) {
        if (typeof init === "undefined") { init = 0; }
        this.value = init & 0xFF;
    }
    Byte.prototype.Add = function (val) {
        var ret = new Byte(((this.value + val.Get()) & ~0xFF) >> 8);
        this.value = (this.value + val.Get()) & 0xFF;
        alert(this.value + val.Get());
        return ret;
    };

    Byte.prototype.Sub = function (val) {
        return this.Add(new Byte(-val.Get()));
    };

    Byte.prototype.Get = function () {
        return this.value;
    };

    Byte.prototype.Set = function (val) {
        this.value = val & 0xFF;
    };
    return Byte;
})();

var Word = (function () {
    function Word() {
    }
    return Word;
})();
//# sourceMappingURL=Byte.js.map
