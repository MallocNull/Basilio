/// <reference path="Byte.ts" />

enum Flags { CARRY, ADDSUB, PARITY, UNUSED1, HALF, UNUSED2, ZERO, SIGN }

class Registers {
    public static byteRegisters: Byte[] = [];
    public static shadowRegisters: Word[] = [];
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

        Registers.shadowRegisters["AF"] = new Word(0);
        Registers.shadowRegisters["BC"] = new Word(0);
        Registers.shadowRegisters["DE"] = new Word(0);
        Registers.shadowRegisters["HL"] = new Word(0);
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

    public static ExchangeAFShadow() {
        var tmp = Registers.shadowRegisters["AF"];
        Registers.shadowRegisters["AF"].Set(Registers.byteRegisters["A"], Registers.byteRegisters["F"]);
        Registers.byteRegisters["A"] = tmp.High();
        Registers.byteRegisters["F"] = tmp.Low();
    }

    public static ExchangeShadow() {
        var regs = ["BC", "DE", "HL"];
        for(var reg in regs) {
            var tmp = Registers.shadowRegisters[regs[reg]];
            Registers.shadowRegisters[regs[reg]].Set(Registers.byteRegisters[regs[reg][0]], Registers.byteRegisters[regs[reg][1]]);
            Registers.byteRegisters[regs[reg][0]] = tmp.High();
            Registers.byteRegisters[regs[reg][1]] = tmp.Low();
        }
    }

    public static Exchange(a: string, b: string) {

    }
}