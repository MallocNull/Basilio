var LCD = (function () {
    function LCD() {
    }
    LCD.Init = function () {
        LCD.screen = document.getElementById("lcd");
        for (var y = 0; y < 64; y++) {
            var row = LCD.screen.insertRow(0);
            for (var x = 0; x < 96; x++)
                row.insertCell(0).innerHTML = "";
        }
    };
    return LCD;
})();
//# sourceMappingURL=LCD.js.map