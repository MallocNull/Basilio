class Byte {
    private value: number;

    public constructor(init: number = 0) {
        this.value = init & 0xFF;
    }

    public Add(val: Byte): Byte {
        var ret = new Byte(((this.value + val.Get()) & ~0xFF) >> 8);
        this.value = (this.value + val.Get()) & 0xFF;
        alert(this.value + val.Get());
        return ret;
    }

    public Sub(val: Byte): Byte {
        return this.Add(new Byte(-val.Get()));
    }

    public Get(): number {
        return this.value;
    }

    public Set(val: number) {
        this.value = val & 0xFF;
    }
}

class Word {
    private value: Byte[];


}