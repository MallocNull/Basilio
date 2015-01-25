/// <reference path="Byte.ts" />

enum Flags { CARRY, ADDSUB, PARITY, UNUSED1, HALF, UNUSED2, ZERO, SIGN }

class Registers {
    public static byteRegisters: Byte[] = [];
    public static shadowRegisters: Byte[] = [];
    public static programCounter: Word = new Word(0);
    public static stackPointer: Word = new Word(0);

    public static Init() {
        Registers.byteRegisters["IXH"] = new Byte(0);
        Registers.byteRegisters["IXL"] = new Byte(0);
        Registers.byteRegisters["IYH"] = new Byte(0);
        Registers.byteRegisters["IYL"] = new Byte(0);

        var tmp = "ABCDEFHLIR";
        for(var i; i < tmp.length; i++)
            Registers.byteRegisters[tmp[i]] = new Byte(0);


    }

    public static GenerateWord(high: string, low: string): Word {
        return new Word(Registers.byteRegisters[high], Registers.byteRegisters[low]);
    }

    public static SetFlag(flag: Flags, value: boolean) {
        if(flag != Flags.UNUSED1 && flag != Flags.UNUSED2)
            Registers.byteRegisters["F"].Bit(flag, value);
    }

    public static GetFlag(flag: Flags): boolean {
        return Registers.byteRegisters["F"].Test(flag);
    }

    public static ExchangeAccumlatorFlags() {

    }
}