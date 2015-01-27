/// <reference path="Byte.ts" />
var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["RIGHT"] = 1] = "RIGHT";
    Direction[Direction["DOWN"] = 2] = "DOWN";
    Direction[Direction["LEFT"] = 3] = "LEFT";
})(Direction || (Direction = {}));

var LCD = (function () {
    function LCD() {
    }
    LCD.Init = function () {
        LCD.screen = document.getElementById("lcd");
        for (var y = 0; y < 64; y++) {
            var row = LCD.screen.insertRow(0);
            for (var x = 0; x < 120; x++) {
                var cell = row.insertCell(x);
                cell.style.backgroundPosition = "-" + (LCD.contrast * 2) + "px 0px";
                if (x == 95)
                    cell.style.borderRight = "4px solid white";
            }

            LCD.vram[y] = [];
            for (var x = 0; x < 15; x++)
                LCD.vram[y][x] = new Byte(0);
        }
    };

    LCD.GetCell = function (x, y) {
        return LCD.screen.rows[y % 64].cells[x % 120];
    };

    LCD.SetCellX = function (cell, x) {
        cell.style.backgroundPosition = -x + "px " + cell.style.backgroundPosition.split(" ")[1];
    };

    LCD.SetCellY = function (cell, y) {
        cell.style.backgroundPosition = cell.style.backgroundPosition.split(" ")[0] + " " + -y + "px";
    };

    LCD.SetPixel = function (x, y, value) {
        if (typeof value === "undefined") { value = true; }
        if (LCD.enabled)
            LCD.SetCellY(LCD.GetCell(x, y), value ? 2 : 0);
    };

    LCD.IncrementCursor = function () {
        switch (LCD.inc) {
            case 0 /* UP */:
                LCD.cursor[0] = (LCD.cursor[0] - 1) % 64;
                break;
            case 2 /* DOWN */:
                LCD.cursor[0] = (LCD.cursor[0] + 1) % 64;
                break;
            case 1 /* RIGHT */:
                LCD.cursor[1] = (LCD.cursor[1] + 1) % (LCD.cursor[1] < (LCD.mode ? 15 : 20) ? (LCD.mode ? 15 : 20) : 32);
                break;
            case 3 /* LEFT */:
                LCD.cursor[1] = LCD.cursor[1] > 0 ? LCD.cursor[1] - 1 : (LCD.mode ? 14 : 19);
                break;
        }
    };

    LCD.SetContrast = function (value) {
        LCD.contrast = Math.floor((value % 64) * (23 / 64));
        for (var y = 0; y < 64; y++) {
            for (var x = 0; x < 120; x++)
                LCD.SetCellX(LCD.GetCell(x, y), LCD.contrast * 2);
        }
    };

    LCD.Disable = function () {
        LCD.enabled = false;

        for (var y = 0; y < 64; y++) {
            for (var x = 0; x < 120; x++)
                LCD.SetCellY(LCD.GetCell(x, y), 4);
        }
    };

    LCD.Enable = function () {
        LCD.enabled = true;

        for (var y = 0; y < 64; y++) {
            for (var x = 0; x < 15; x++) {
                for (var bit = 0; bit < 8; bit++)
                    LCD.SetPixel(x * 8 + (bit), y, LCD.vram[y][x].Test(7 - bit));
            }
        }
    };

    LCD.Read = function () {
        var value = new Byte(0);
        if ((LCD.mode && LCD.cursor[1] < 15) || (!LCD.mode && LCD.cursor[1] < 20)) {
            if (LCD.mode)
                value = LCD.vram[LCD.cursor[0]][LCD.cursor[1]];
            else {
                value = new Byte(0);
                for (var bit = 0; bit < 6; bit++)
                    value.Bit(5 - bit, LCD.vram[LCD.cursor[0]][Math.floor((6 * LCD.cursor[1] + bit) / 8)].Test(7 - ((6 * LCD.cursor[1] + bit) % 8)));
            }
        }
        LCD.IncrementCursor();
        return value;
    };

    LCD.Write = function (value) {
        if ((LCD.mode && LCD.cursor[1] < 15) || (!LCD.mode && LCD.cursor[1] < 20)) {
            if (LCD.mode) {
                LCD.vram[LCD.cursor[0]][LCD.cursor[1]] = value;
                for (var bit = 0; bit < 8; bit++)
                    LCD.SetPixel(8 * LCD.cursor[1] + bit, LCD.cursor[0], value.Test(7 - bit));
            } else {
                for (var bit = 0; bit < 6; bit++) {
                    LCD.SetPixel(6 * LCD.cursor[1] + bit, LCD.cursor[0], value.Test(5 - bit));
                    LCD.vram[LCD.cursor[0]][Math.floor((6 * LCD.cursor[1] + bit) / 8)].Bit(7 - ((6 * LCD.cursor[1] + bit) % 8), value.Test(5 - bit));
                }
            }
        }
        LCD.IncrementCursor();
    };

    LCD.SetRow = function (row) {
        LCD.cursor[0] = row % 64;
    };

    LCD.SetColumn = function (col) {
        LCD.cursor[1] = col % 32;
    };

    LCD.SetMode = function (mode) {
        LCD.mode = mode;
    };

    LCD.SetDirection = function (dir) {
        LCD.inc = dir;
    };
    LCD.contrast = 12;
    LCD.vram = [];
    LCD.cursor = [0, 0];
    LCD.mode = true;
    LCD.inc = 2 /* DOWN */;
    LCD.enabled = true;
    return LCD;
})();
//# sourceMappingURL=LCD.js.map
