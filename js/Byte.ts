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

    public constructor(high: number);
    public constructor(high: Byte, low: Byte);
    public constructor(high: any, low?: Byte) {
        this.Set(high, low);
    }

    public Get(): number {
        return (this.value[0].Get() << 8) | this.value[1].Get();
    }

    public High(): Byte {
        return this.value[0];
    }

    public Low(): Byte {
        return this.value[1];
    }

    public Set(high: number);
    public Set(high: Byte, low: Byte);
    public Set(high: any, low?: Byte) {
        this.value = typeof high == "number" ? [new Byte((high & ~0xFF) >> 8), new Byte(high & 0xFF)] : [high, low];
    }

    public SetHigh(value: number);
    public SetHigh(value: Byte);
    public SetHigh(value: any) {
        this.value[0] = typeof value == "number" ? new Byte(value) : value;
    }

    public SetLow(value: number);
    public SetLow(value: Byte);
    public SetLow(value: any) {
        this.value[1] = typeof value == "number" ? new Byte(value) : value;
    }

    public Add(value: number): Word;
    public Add(value: Word): Word;
    public Add(value: any): Word {
        value = typeof value == "number" ? new Word(value) : value;
        var hold = this.Get() + value.Get();
        this.Set(hold);
        return new Word(hold > 0xFFFF ? hold - 0xFFFF : 0);
        //var overflow = [this.value[0].Add(value.High()), this.value[1].Add(value.Low())];
        //return new Word(overflow[0].Get() + this.value[0].Add(overflow[1]).Get());
    }

    public Sub(value: number): Word;
    public Sub(value: Word): Word;
    public Sub(value: any): Word {
        value = typeof value == "number" ? new Word(value) : value;
        return this.Add(value.Neg());
    }

    public AddByte(value: number, signed: boolean): Word;
    public AddByte(value: Byte, signed: boolean): Word;
    public AddByte(value: any, signed: boolean = false): Word {
        value = typeof value != "number" ? new Word((value.Test(7) && signed ? 0xFF00 : 0x0000) | value.Get()) : new Word(value);
        return this.Add(value);
    }

    public SubByte(value: number): Word;
    public SubByte(value: Byte): Word;
    public SubByte(value: any): Word {
        value = typeof value != "number" ? new Byte(value) : value;
        return this.AddByte(value.Neg(), true);
    }

    public Not() {
        this.value[0].Not();
        this.value[1].Not();
    }

    public And(value: number);
    public And(value: Word);
    public And(value: any) {
        value = typeof value == "number" ? new Word(value) : value;
        this.value[0].And(value.High());
        this.value[1].And(value.Low());
    }

    public Or(value: number);
    public Or(value: Word);
    public Or(value: any) {
        value = typeof value == "number" ? new Word(value) : value;
        this.value[0].Or(value.High());
        this.value[1].Or(value.Low());
    }

    public Xor(value: number);
    public Xor(value: Word);
    public Xor(value: any) {
        value = typeof value == "number" ? new Word(value) : value;
        this.value[0].Xor(value.High());
        this.value[1].Xor(value.Low());
    }

    public Neg() {
        this.Not();
        this.Add(1);
    }
}