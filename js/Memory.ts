/// <reference path="Byte.ts" />

class Bank {
    public data: Byte[] = [];

    public constructor(fill: number = 0) {

    }
}

class MemoryMap {
    public type: boolean; // false - ROM ; true - RAM
    public index: number; // page index

    public Set(type: boolean, index: number) {
        this.type = type;
        this.index = index;
    }

    public constructor(type: boolean, index: number) {
        this.Set(type, index);
    }
}

class Memory {
    static rom: Bank[];
    static ram: Bank[];
    static romLock: boolean = true;

    static Init() {

    }

    static Get(location: Word): Byte {
        return new Byte(0);
    }

    static Set(location: Word, value: Byte) {

    }
}