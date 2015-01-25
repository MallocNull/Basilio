/// <reference path="Byte.ts" />
/// <reference path="LCD.ts" />
/// <reference path="Memory.ts" />
/// <reference path="Registers.ts" />
/// <reference path="ops/0x0.ts" />

interface opcode {
    (args: Byte[]): number[];
    // opcodes receive an array of four bytes from memory starting at the point of the program counter
    // opcodes return an array,
    // first value is the program counter increment (size of instruction)
    // second value is the number of T-States taken by the instruction
}

class TI {
    public static Opcodes: opcode[] = [];

    static Init() {
        LCD.Init();
        var a = new Byte(0xF0);
        var b = new Byte(10);
        //a.Sub(b);
        alert(a.Get());
        a.ShiftLeft(true);
        alert(a.Get());
    }
}

