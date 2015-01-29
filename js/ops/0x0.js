/// <reference path="../Byte.ts" />
/// <reference path="../LCD.ts" />
/// <reference path="../Memory.ts" />
/// <reference path="../Registers.ts" />
/// <reference path="../TI.ts" />
TI.Opcodes[0x00] = function (args) {
    return [1, 4];
};

TI.Opcodes[0x01] = function (args) {
    Registers.SetRegisterPair("BC", new Word(args[2], args[1]));
    return [3, 10];
};

TI.Opcodes[0x02] = function (args) {
    Memory.Set(Registers.GenerateWord("B", "C"), Registers.byteRegisters["A"]);
    return [1, 7];
};

TI.Opcodes[0x03] = function (args) {
    var tmp = Registers.GenerateWord("B", "C");
    tmp.Add(1);
    Registers.SetRegisterPair("BC", tmp);
    return [1, 6];
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
    Registers.ExchangeAFShadow();
    return [1, 4];
};

TI.Opcodes[0x09] = function (args) {
    var tmp = [Registers.GenerateWord("H", "L"), Registers.GenerateWord("B", "C")];
    var overflow = tmp[0].Add(tmp[1]);
    Registers.SetRegisterPair("HL", tmp[0]);
    Registers.SetFlag(1 /* ADDSUB */, false);
    Registers.SetFlag(0 /* CARRY */, overflow.Get() != 0);

    // todo check if flags are set correctly
    return [1, 11];
};

TI.Opcodes[0x0A] = function (args) {
    Registers.byteRegisters["A"] = Memory.Get(Registers.GenerateWord("B", "C"));
    return [1, 7];
};

TI.Opcodes[0x0B] = function (args) {
    var tmp = Registers.GenerateWord("B", "C");
    tmp.Sub(1);
    Registers.SetRegisterPair("BC", tmp);
    return [1, 6];
};

TI.Opcodes[0x0C] = function (args) {
    var tmp = Registers.byteRegisters["C"];
    var over = Registers.byteRegisters["C"].Add(1);
    Registers.SetFlag(1 /* ADDSUB */, false);
    Registers.SetFlag(6 /* ZERO */, over.Get() != 0);
    Registers.SetFlag(2 /* PARITY */, tmp.Test(7) == false && Registers.byteRegisters["C"].Test(7) == true);
    Registers.SetFlag(4 /* HALF */, (tmp.Get() & 0x0F) == 0x0F);
    Registers.SetFlag(7 /* SIGN */, Registers.byteRegisters["C"].Test(7));
    return [1, 4];
};

TI.Opcodes[0x0D] = function (args) {
    // dec c
    return [1, 4];
};

TI.Opcodes[0x0E] = function (args) {
    Registers.byteRegisters["A"] = args[1];
    return [2, 7];
};

TI.Opcodes[0x0F] = function (args) {
    Registers.SetFlag(0 /* CARRY */, Registers.byteRegisters["A"].ShiftRight(true));
    Registers.SetFlag(1 /* ADDSUB */, false);
    Registers.SetFlag(4 /* HALF */, false);
    return [1, 4];
};
//# sourceMappingURL=0x0.js.map
