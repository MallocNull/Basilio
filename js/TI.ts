/// <reference path="Byte.ts" />
/// <reference path="LCD.ts" />

class TI {
    static registers: any[];

    static Init() {
        LCD.Init();
        var a = new Byte(10);
        var b = new Byte(40);
        //a.Add(b);
        //a.Sub(b);
        alert(a.Neg().Get());
    }
}