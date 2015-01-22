/// <reference path="Byte.ts" />

class TI {
    static rom: Byte[][];
    static ram: Byte[][];
    static mmap: any[];

    static registers: any[];

    static Init() {
        var a = new Byte(40);
        var b = new Byte(40);
        alert(a.Get());
    }
}