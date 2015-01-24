class Byte {
    private value: number;

    public constructor(init: number = 0) {
        this.value = init & 0xFF | (init < 0 ? 0x80 : 0);
    }

    public Add(val: Byte): Byte;
    public Add(val: number): Byte;
    public Add(val: any): Byte {
        val = typeof val == "number" ? new Byte(val) : val;
        var hold = this.value + val.Get();
        this.value = hold & 0xFF;
        return new Byte(hold > 255 ? hold - 255 : 0);
    }

    public Sub(val: Byte): Byte;
    public Sub(val: number): Byte;
    public Sub(val: any): Byte {
        val = typeof val == "number" ? new Byte(val) : val;
        return this.Add(val.Neg());
    }

    public Get(): number {
        return this.value;
    }

    public Set(val: Byte);
    public Set(val: number);
    public Set(val: any) {
        this.value = typeof val == "number" ? val & 0xFF : val.Get();
    }

    public Neg(bind: boolean = false) {
        var tmp = new Byte(~this.value + 1);
        this.value = bind ? tmp.Get() : this.value;
        return tmp;
    }

    public And(val: Byte);
    public And(val: number);
    public And(val: any) {
        val = typeof val == "number" ? new Byte(val) : val;
        this.value = this.value & val.Get();
    }

    public Or(val: Byte);
    public Or(val: number);
    public Or(val: any) {
        val = typeof val == "number" ? new Byte(val) : val;
        this.value = this.value | val.Get();
    }

    public Xor(val: Byte);
    public Xor(val: number);
    public Xor(val: any) {
        val = typeof val == "number" ? new Byte(val) : val;
        this.value = this.value ^ val.Get();
    }

    public Not() {
        this.value = ~this.value;
    }

    public Bit(pos: number, val: boolean) {
        pos = pos % 8;
        this.Set(val ? (this.value | Math.pow(2, pos)) : (this.value & ~Math.pow(2, pos)));
    }

    public Test(pos: number): boolean {
        pos = pos % 8;
        return (this.value & Math.pow(2, pos)) != 0;
    }

    public ShiftLeft(carry: boolean = false, value: boolean = false): boolean {
        var ret = (this.value & 0x80) != 0;
        this.Set(this.value << 1);
        this.Bit(0, carry ? ret : value);
        return ret;
    }

    public ShiftRight(carry: boolean = false, value: boolean = false): boolean {
        var ret = (this.value & 0x80) != 0;
        this.Set(this.value >>> 1);
        this.Bit(7, carry ? ret : value);
        return ret;
    }
}

class Word {
    private value: Byte[];


    public constructor(init: number = 0) {
        this.value = [new Byte((init & ~0xFF) >> 8), new Byte(init & 0xFF)];
    }
}