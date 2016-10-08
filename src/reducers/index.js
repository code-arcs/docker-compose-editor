import lodash from "lodash";
import * as C from "../constants";
import ComposeLoader from "../js/compose.loader";
import {ReducerRegistry} from "./reducerRegistry";
import {EnvironmentVariable} from "../domain";
import {generateUUID} from "../utils";

const initialState = {
    envVars: [
        EnvironmentVariable.create("A", 1),
        EnvironmentVariable.create("B", 2),
    ],
    services: [],
    activeService: {}
};

const reducerRegistry = new ReducerRegistry();

export default function (state = initialState, action) {
    const newState = lodash.cloneDeep(state);
    return reducerRegistry.execute(action.type, newState, action);
}

reducerRegistry.register(C.SET_SERVICE_ACTIVE, (state, action) => {
    state.services[action.payload.serviceName]._inactive = action.payload.active;
    return state;
});

reducerRegistry.register(C.UPDATE_SERVICE, (state, action) => {
    let service = state.services.find(service => service._id === action.payload._id);
    service = action.payload;
    return state;
});

reducerRegistry.register(C.ADD_SERVICE, (state, action) => {
    action.payload._id = generateUUID();
    state.services.push(action.payload);
    return state;
});

reducerRegistry.register(C.SHOW_SERVICE_DETAILS, (state, action) => {
    state.activeService = action.payload;
    return state;
});

reducerRegistry.register(C.OPEN_FILE, (state, action) => {
    const Compose = ComposeLoader.createFromFile(action.payload);
    state.services = Compose.getServices();
    return state;
});

reducerRegistry.register(C.UPDATE_ENV_VARIABLE, (state, action) => {
    if (action.payload.serviceName) {
        const service = state.services.find(s => s._name === action.payload.serviceName);
        service.environment[action.payload.idx] = {
            key: action.payload.key,
            value: action.payload.value,
        };
    } else {
        state.envVars[action.payload.idx] = {
            key: action.payload.key,
            value: action.payload.value,
        };
    }
    return state;
});

reducerRegistry.register(C.DELETE_ENV_VARIABLE, (state, action) => {
    if (action.payload.serviceName) {
        const service = state.services[action.payload.serviceName];
        service.environment = service.environment.filter((val, idx) => action.payload.idx !== idx);
    } else {
        state.envVars = state.envVars.filter((val, idx) => action.payload.idx !== idx);
    }
    return state;
});

reducerRegistry.register(C.ADD_ENV_VARIABLE, (state, action) => {
    state.envVars.push(new EnvironmentVariable());
    return state;
});

reducerRegistry.register(C.IMPORT_COMPOSE_FILE, (state, action) => {
    const Compose = ComposeLoader.createFromFile(action.payload);
    Array.prototype.push.apply(state.services, Compose.getServices());
    return state;
});
