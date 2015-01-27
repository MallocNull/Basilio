/// <reference path="Byte.ts" />
/// <reference path="LCD.ts" />
/// <reference path="Memory.ts" />
/// <reference path="Registers.ts" />
/// <reference path="ops/0x0.ts" />

var TI = (function () {
    function TI() {
    }
    TI.PerformOperation = function (data) {
        this.Opcodes[data[0].Get()](data);
    };

    TI.Init = function () {
        LCD.Init();
        var a = new Byte(0xF0);
        var b = new Byte(10);

        //a.Sub(b);
        //alert(a.Get());
        a.ShiftLeft(true);
        //alert(a.Get());
    };
    TI.Opcodes = [];
    return TI;
})();
//# sourceMappingURL=TI.js.map
