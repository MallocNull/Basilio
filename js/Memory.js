/// <reference path="Byte.ts" />
var Bank = (function () {
    function Bank(fill) {
        if (fill === void 0) { fill = 0; }
        this.data = [];
    }
    return Bank;
})();
var MemoryMap = (function () {
    function MemoryMap(type, index) {
        this.Set(type, index);
    }
    MemoryMap.prototype.Set = function (type, index) {
        this.type = type;
        this.index = index;
    };
    return MemoryMap;
})();
var Memory = (function () {
    function Memory() {
    }
    Memory.Init = function () {
    };
    Memory.Get = function (location) {
        return new Byte(0);
    };
    Memory.Set = function (location, value) {
    };
    Memory.romLock = true;
    return Memory;
})();
//# sourceMappingURL=Memory.js.map