/// <reference path="Byte.ts" />
var Flags;
(function (Flags) {
    Flags[Flags["CARRY"] = 0] = "CARRY";
    Flags[Flags["ADDSUB"] = 1] = "ADDSUB";
    Flags[Flags["PARITY"] = 2] = "PARITY";
    Flags[Flags["UNUSED1"] = 3] = "UNUSED1";
    Flags[Flags["HALF"] = 4] = "HALF";
    Flags[Flags["UNUSED2"] = 5] = "UNUSED2";
    Flags[Flags["ZERO"] = 6] = "ZERO";
    Flags[Flags["SIGN"] = 7] = "SIGN";
})(Flags || (Flags = {}));
var Registers = (function () {
    function Registers() {
    }
    Registers.Init = function () {
        Registers.byteRegisters["IXH"] = new Byte(0);
        Registers.byteRegisters["IXL"] = new Byte(0);
        Registers.byteRegisters["IYH"] = new Byte(0);
        Registers.byteRegisters["IYL"] = new Byte(0);
        var tmp = "ABCDEFHLIR";
        for (var i; i < tmp.length; i++)
            Registers.byteRegisters[tmp[i]] = new Byte(0);
    };
    Registers.GenerateWord = function (high, low) {
        return new Word(Registers.byteRegisters[high], Registers.byteRegisters[low]);
    };
    Registers.SetFlag = function (flag, value) {
        if (flag != 3 /* UNUSED1 */ && flag != 5 /* UNUSED2 */)
            Registers.byteRegisters["F"].Bit(flag, value);
    };
    Registers.GetFlag = function (flag) {
        return Registers.byteRegisters["F"].Test(flag);
    };
    Registers.ExchangeAccumlatorFlags = function () {
    };
    Registers.byteRegisters = [];
    Registers.shadowRegisters = [];
    Registers.programCounter = new Word(0);
    Registers.stackPointer = new Word(0);
    return Registers;
})();
//# sourceMappingURL=Registers.js.map