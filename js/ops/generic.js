/// <reference path="../Byte.ts" />
/// <reference path="../LCD.ts" />
/// <reference path="../Memory.ts" />
/// <reference path="../Registers.ts" />
/// <reference path="../TI.ts" />
function IncrementRegister(reg) {
    if (reg.length == 1) {
        var tmp = Registers.byteRegisters[reg];
        var over = Registers.byteRegisters[reg].Add(1);
        Registers.SetFlag(1 /* ADDSUB */, false);
        Registers.SetFlag(6 /* ZERO */, over.Get() != 0);
        Registers.SetFlag(2 /* PARITY */, tmp.Test(7) == false && Registers.byteRegisters[reg].Test(7) == true);
        Registers.SetFlag(4 /* HALF */, (tmp.Get() & 0x0F) == 0x0F);
        Registers.SetFlag(7 /* SIGN */, Registers.byteRegisters[reg].Test(7));
    } else {
        var tmp = Registers.GenerateWord(reg[0], reg[1]);
        tmp.Add(1);
        Registers.SetRegisterPair(reg, tmp);
    }
}
//# sourceMappingURL=generic.js.map
