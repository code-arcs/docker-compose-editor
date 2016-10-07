export class EnvironmentVariable {
    constructor(args) {
        if (args.length === 2) {
            this._key = args[0];
            this._value = args[1];
        }
    }
}