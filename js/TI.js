/// <reference path="Byte.ts" />
var TI = (function () {
    function TI() {
    }
    TI.Init = function () {
        var a = new Byte(10);
        var b = new Byte(40);
        //a.Add(b);
        //a.Sub(b);
        alert(a.Neg().Get());
    };
    return TI;
})();
//# sourceMappingURL=TI.js.map