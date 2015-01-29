/// <reference path="../Byte.ts" />
/// <reference path="../LCD.ts" />
/// <reference path="../Memory.ts" />
/// <reference path="../Registers.ts" />
/// <reference path="../TI.ts" />

function IncrementRegister(reg: string) {
    if(reg.length == 1) {
        var tmp = Registers.byteRegisters[reg];
        var over = Registers.byteRegisters[reg].Add(1);
        Registers.SetFlag(Flags.ADDSUB, false);
        Registers.SetFlag(Flags.ZERO, over.Get() != 0);
        Registers.SetFlag(Flags.PARITY, tmp.Test(7) == false && Registers.byteRegisters[reg].Test(7) == true);
        Registers.SetFlag(Flags.HALF, (tmp.Get() & 0x0F) == 0x0F);
        Registers.SetFlag(Flags.SIGN, Registers.byteRegisters[reg].Test(7));
    } else {
        var tmp = Registers.GenerateWord(reg[0],reg[1]);
        tmp.Add(1);
        Registers.SetRegisterPair(reg, tmp);
    }
}