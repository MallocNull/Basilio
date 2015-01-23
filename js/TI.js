/// <reference path="Byte.ts" />
/// <reference path="LCD.ts" />
var TI = (function () {
    function TI() {
    }
    TI.Init = function () {
        LCD.Init();
        var a = new Byte(10);
        var b = new Byte(40);
        //a.Add(b);
        //a.Sub(b);
        alert(a.Neg().Get());
    };
    return TI;
})();
//# sourceMappingURL=TI.js.map