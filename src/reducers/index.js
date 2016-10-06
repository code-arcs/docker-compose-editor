import lodash from "lodash";
import * as C from "../constants";
import ComposeLoader from "../js/compose.loader";
import {ReducerRegistry} from "./reducerRegistry";

const initialState = {
    envVars: [
        {key: "SPRING_RABBITMQ_HOST", value: "127.0.0.1"},
        {key: "EUREKA_CLIENT_SERVICEURL", value: "http://eureka-service:8761"}
    ],
    services: [],
    activeService: {}
};

const reducerRegistry = new ReducerRegistry();

export default function (state = initialState, action) {
    const newState = lodash.cloneDeep(state);
    return reducerRegistry.execute(action.type, newState, action);
}

reducerRegistry.addReducer(C.SET_SERVICE_ACTIVE, (state, action) => {
    state.services[action.payload.serviceName]._inactive = action.payload.active;
    return state;
});

reducerRegistry.addReducer(C.UPDATE_SERVICE, (state, action) => {
    state.services[action.payload._name] = action.payload;
    return state;
});

reducerRegistry.addReducer(C.ADD_SERVICE, (state, action) => {
    state.services.push(action.payload);
    return state;
});

reducerRegistry.addReducer(C.SHOW_SERVICE_DETAILS, (state, action) => {
    state.activeService = action.payload;
    return state;
});

reducerRegistry.addReducer(C.OPEN_FILE, (state, action) => {
    const Compose = ComposeLoader.createFromFile(action.payload);
    state.services = Compose.getActiveServices();
    state.version = Compose.getVersion();
    return state;
});

reducerRegistry.addReducer(C.UPDATE_ENV_VARIABLE, (state, action) => {
    if(action.payload.serviceName) {
        const service = state.services[action.payload.serviceName];
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

reducerRegistry.addReducer(C.DELETE_ENV_VARIABLE, (state, action) => {
    if(action.payload.serviceName) {
        const service = state.services[action.payload.serviceName];
        service.environment = service.environment.filter((val, idx) => action.payload.idx !== idx);
    } else {
        state.envVars = state.envVars.filter((val, idx) => action.payload.idx !== idx);
    }
    return state;
});

reducerRegistry.addReducer(C.ADD_ENV_VARIABLE, (state, action) => {
    state.envVars.push({});
    return state;
});
