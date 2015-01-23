class LCD {
    private static screen: HTMLTableElement;


    static Init() {
        LCD.screen = <HTMLTableElement>document.getElementById("lcd");
        for(var y = 0; y < 64; y++) {
            var row = <HTMLTableRowElement>LCD.screen.insertRow(0);
            for(var x = 0; x < 96; x++)
                row.insertCell(0).innerHTML = "";
        }
    }
}