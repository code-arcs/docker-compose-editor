export class ReducerRegistry {
    constructor() {
        this.reducer = {};
    }

    register(actionType, fn) {
        this.reducer[actionType] = fn;
    }

    getReducer(actionType) {
        return this.reducer[actionType] || ((state) => state);
    }

    execute(actionType, state, action) {
        return this.getReducer(actionType)(state, action);
    }
}