export class EnvironmentVariable {
    constructor(args) {
        if (args.length === 2) {
            this._key = args[0];
            this._value = args[1];
        }
    }

    getKey() {
        return this._key;
    }

    setKey(key) {
        this._key = key;
    }

    getValue() {
        return this._value;
    }

    setValue(value) {
        this._value = value;
    }
}