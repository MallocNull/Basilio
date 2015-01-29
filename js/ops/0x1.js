/// <reference path="../Byte.ts" />
/// <reference path="../LCD.ts" />
/// <reference path="../Memory.ts" />
/// <reference path="../Registers.ts" />
/// <reference path="../TI.ts" />
TI.Opcodes[0x10] = function (args) {
    Registers.byteRegisters["B"].Sub(1);
    if (Registers.byteRegisters["B"].Get() != 0) {
        Registers.programCounter.AddByte(args[1], true);
        return [0, 13];
    } else
        return [2, 8];
};

TI.Opcodes[0x11] = function (args) {
    Registers.SetRegisterPair("DE", new Word(args[2], args[1]));
    return [3, 10];
};

TI.Opcodes[0x12] = function (args) {
    Memory.Set(Registers.GenerateWord("D", "E"), Registers.byteRegisters["A"]);
    return [1, 7];
};

TI.Opcodes[0x13] = function (args) {
    var tmp = Registers.GenerateWord("D", "E");
    tmp.Add(1);
    Registers.SetRegisterPair("DE", tmp);
    return [1, 6];
};

TI.Opcodes[0x13] = function (args) {
};
//# sourceMappingURL=0x1.js.map
