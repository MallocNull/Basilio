/// <reference path="../Byte.ts" />
/// <reference path="../LCD.ts" />
/// <reference path="../Memory.ts" />
/// <reference path="../Registers.ts" />
/// <reference path="../TI.ts" />
TI.Opcodes[0x00] = function (args) {
    return [1, 4];
};
TI.Opcodes[0x01] = function (args) {
    Registers.byteRegisters["B"] = args[2];
    Registers.byteRegisters["C"] = args[1];
    return [3, 10];
};
TI.Opcodes[0x02] = function (args) {
    Memory.Set(Registers.GenerateWord("B", "C"), Registers.byteRegisters["A"]);
    return [1, 7];
};
TI.Opcodes[0x03] = function (args) {
    // inc bc
    return [1, 4];
};
TI.Opcodes[0x04] = function (args) {
    var tmp = Registers.byteRegisters["B"];
    var over = Registers.byteRegisters["B"].Add(1);
    Registers.SetFlag(1 /* ADDSUB */, false);
    Registers.SetFlag(6 /* ZERO */, over.Get() != 0);
    Registers.SetFlag(2 /* PARITY */, tmp.Test(7) == false && Registers.byteRegisters["B"].Test(7) == true);
    Registers.SetFlag(4 /* HALF */, (tmp.Get() & 0x0F) == 0x0F);
    Registers.SetFlag(7 /* SIGN */, Registers.byteRegisters["B"].Test(7));
    return [1, 4];
};
TI.Opcodes[0x05] = function (args) {
    // dec b
    return [1, 4];
};
TI.Opcodes[0x06] = function (args) {
    Registers.byteRegisters["B"] = args[1];
    return [1, 7];
};
TI.Opcodes[0x07] = function (args) {
    Registers.SetFlag(0 /* CARRY */, Registers.byteRegisters["A"].ShiftLeft(true));
    Registers.SetFlag(1 /* ADDSUB */, false);
    Registers.SetFlag(4 /* HALF */, false);
    return [1, 4];
};
TI.Opcodes[0x08] = function (args) {
    return [];
};
//# sourceMappingURL=0x0.js.map