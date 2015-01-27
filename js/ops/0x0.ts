/// <reference path="../Byte.ts" />
/// <reference path="../LCD.ts" />
/// <reference path="../Memory.ts" />
/// <reference path="../Registers.ts" />
/// <reference path="../TI.ts" />

TI.Opcodes[0x00] = function(args: Byte[]): number[] {
    return [1, 4];
};

TI.Opcodes[0x01] = function(args: Byte[]): number[] {
    Registers.byteRegisters["B"] = args[2];
    Registers.byteRegisters["C"] = args[1];
    return [3, 10];
};

TI.Opcodes[0x02] = function(args: Byte[]): number[] {
    Memory.Set(Registers.GenerateWord("B","C"), Registers.byteRegisters["A"]);
    return [1, 7];
};

TI.Opcodes[0x03] = function(args: Byte[]): number[] {
    // inc bc
    return [1, 4];
};

TI.Opcodes[0x04] = function(args: Byte[]): number[] {
    var tmp = Registers.byteRegisters["B"];
    var over = Registers.byteRegisters["B"].Add(1);
    Registers.SetFlag(Flags.ADDSUB, false);
    Registers.SetFlag(Flags.ZERO, over.Get() != 0);
    Registers.SetFlag(Flags.PARITY, tmp.Test(7) == false && Registers.byteRegisters["B"].Test(7) == true);
    Registers.SetFlag(Flags.HALF, (tmp.Get() & 0x0F) == 0x0F);
    Registers.SetFlag(Flags.SIGN, Registers.byteRegisters["B"].Test(7))
    return [1, 4];
};

TI.Opcodes[0x05] = function(args: Byte[]): number[] {
    // dec b
    return [1, 4];
};

TI.Opcodes[0x06] = function(args: Byte[]): number[] {
    Registers.byteRegisters["B"] = args[1];
    return [1, 7];
};

TI.Opcodes[0x07] = function(args: Byte[]): number[] {
    Registers.SetFlag(Flags.CARRY, Registers.byteRegisters["A"].ShiftLeft(true));
    Registers.SetFlag(Flags.ADDSUB, false);
    Registers.SetFlag(Flags.HALF, false);
    return [1, 4];
};

TI.Opcodes[0x08] = function(args: Byte[]): number[] {
    Registers.ExchangeAFShadow();
    return [1,4];
};

TI.Opcodes[0x09] = function(args: Byte[]): number[] {
    // add hl, bc
    return [1, 11];
};

TI.Opcodes[0x0A] = function(args: Byte[]): number[] {
    Registers.byteRegisters["A"] = Memory.Get(Registers.GenerateWord("B","C"));
    return [1, 7];
};

TI.Opcodes[0x0B] = function(args: Byte[]): number[] {
    // dec bc
    return [1, 4];
};

TI.Opcodes[0x0C] = function(args: Byte[]): number[] {
    var tmp = Registers.byteRegisters["C"];
    var over = Registers.byteRegisters["C"].Add(1);
    Registers.SetFlag(Flags.ADDSUB, false);
    Registers.SetFlag(Flags.ZERO, over.Get() != 0);
    Registers.SetFlag(Flags.PARITY, tmp.Test(7) == false && Registers.byteRegisters["C"].Test(7) == true);
    Registers.SetFlag(Flags.HALF, (tmp.Get() & 0x0F) == 0x0F);
    Registers.SetFlag(Flags.SIGN, Registers.byteRegisters["C"].Test(7))
    return [1, 4];
};