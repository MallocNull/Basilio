/// <reference path="Byte.ts" />

enum Direction { UP, RIGHT, DOWN, LEFT }

class LCD {
    private static screen: HTMLTableElement;
    private static contrast: number = 12;
    private static vram: Byte[][] = [];
    private static cursor: number[] = [0,0]; // row ; column
    private static mode: boolean = true; // false: 6 bit ; true: 8 bit
    private static inc: Direction = Direction.DOWN;
    private static enabled: boolean = true;

    static Init() {
        LCD.screen = <HTMLTableElement>document.getElementById("lcd");
        for(var y = 0; y < 64; y++) {
            var row = <HTMLTableRowElement>LCD.screen.insertRow(0);
                for(var x = 0; x < 120; x++) {
                var cell = row.insertCell(x);
                cell.style.backgroundPosition = "-"+ (LCD.contrast * 2) +"px 0px";
                if(x == 95) cell.style.borderRight = "4px solid white";
            }

            LCD.vram[y] = [];
            for(var x = 0; x < 15; x++)
                LCD.vram[y][x] = new Byte(0);
        }
    }

    private static GetCell(x: number, y: number): HTMLTableCellElement {
        return <HTMLTableCellElement>(<HTMLTableRowElement>LCD.screen.rows[y % 64]).cells[x % 120];
    }

    private static SetCellX(cell: HTMLTableCellElement, x: number) {
        cell.style.backgroundPosition = -x +"px "+ cell.style.backgroundPosition.split(" ")[1];
    }

    private static SetCellY(cell: HTMLTableCellElement, y: number) {
        cell.style.backgroundPosition = cell.style.backgroundPosition.split(" ")[0] +" "+ -y +"px";
    }

    private static SetPixel(x: number, y: number, value: boolean = true) {
        LCD.SetCellY(LCD.GetCell(x, y), value ? 2 : 0);
    }

    private static IncrementCursor() {
        switch(LCD.inc) {
            case Direction.UP:
                LCD.cursor[0] = (LCD.cursor[0] - 1) % 64;
                break;
            case Direction.DOWN:
                LCD.cursor[0] = (LCD.cursor[0] + 1) % 64;
                break;
            case Direction.RIGHT:
                LCD.cursor[1] = (LCD.cursor[1] + 1) % (LCD.mode ? 15 : 20);
                break;
            case Direction.LEFT:
                LCD.cursor[1] = (LCD.cursor[1] - 1) % (LCD.mode ? 15 : 20);
                break;
        }
    }

    public static SetContrast(value: number) {
        LCD.contrast = Math.floor((value % 64) * (23/64));
        for(var y = 0; y < 64; y++) {
            for(var x = 0; x < 120; x++)
                LCD.SetCellX(LCD.GetCell(x, y), LCD.contrast * 2);
        }
    }

    public static Disable() {
        LCD.enabled = false;

        for(var y = 0; y < 64; y++) {
            for(var x = 0; x < 120; x++)
                LCD.SetCellY(LCD.GetCell(x, y), 4);
        }
    }

    public static Enable() {
        LCD.enabled = true;

        for(var y = 0; y < 64; y++) {
            for(var x = 0; x < 15; x++) {
                for(var bit = 0; bit < 8; bit++)
                    LCD.SetPixel(x*8 + (bit), y, LCD.vram[y][x].Test(7-bit));
            }
        }
    }

    public static Read(): Byte {
        var value;
        if(LCD.mode) value = LCD.vram[LCD.cursor[0]][LCD.cursor[1]];
        else {
            value = new Byte(0);
            for(var bit = 0; bit < 6; bit++)
                value.Bit(5-bit, LCD.vram[LCD.cursor[0]][Math.floor((6 * LCD.cursor[1] + bit) / 8)].Test(7 - ((6 * LCD.cursor[1] + bit) % 8)));
        }
        LCD.IncrementCursor();
        return value;
    }

    public static Write(value: Byte) {
        if(LCD.mode) {
            LCD.vram[LCD.cursor[0]][LCD.cursor[1]] = value;
            for(var bit = 0; bit < 8; bit++)
                LCD.SetPixel(8 * LCD.cursor[1] + bit, LCD.cursor[0], value.Test(7 - bit));
        } else {
            for(var bit = 0; bit < 6; bit++) {
                console.log(value.Test(bit));
                LCD.SetPixel(6 * LCD.cursor[1] + bit, LCD.cursor[0], value.Test(5 - bit));
                LCD.vram[LCD.cursor[0]][Math.floor((6*LCD.cursor[1]+bit)/8)].Bit(7-((6*LCD.cursor[1]+bit)%8), value.Test(5-bit));
            }
        }
        LCD.IncrementCursor();
    }

    public static SetRow(row: number) {
        LCD.cursor[0] = row % 64;
    }

    public static SetColumn(col: number) {
        LCD.cursor[1] = col % (LCD.mode ? 15 : 20);
    }

    public static SetMode() {

    }
}