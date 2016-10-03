import lodash from 'lodash';
import * as C from '../constants';
import ComposeLoader from '../js/compose.loader';

const initialState = {
    envVars: {A:123},
    services: [],
    activeService: {}
};

export default function (state = initialState, action) {
    const newstate = lodash.cloneDeep(state);

    switch (action.type) {
        case C.ADD_SERVICE:
            newstate.services.push(action.payload);
            return newstate;
        case C.SHOW_SERVICE_DETAILS:
            state.activeService = action.payload;
            return newstate;
        case C.OPEN_FILE:
            const Compose = ComposeLoader.createFromFile(action.payload);
            newstate.services = Compose.getActiveServices();
            newstate.version = Compose.getVersion();
            console.log(newstate);
            return newstate;
        case C.SET_SERVICE_ACTIVE:
            newstate.services[action.payload.serviceName]._inactive = action.payload.active;
            return newstate;
        case C.UPDATE_SERVICE:
            newstate.services[action.payload._name] = action.payload;
            return newstate;
        case C.DELETE_ENV_VARIABLE:
            delete newstate.envVars[action.payload.key];
            return newstate;
        case C.ADD_ENV_VARIABLE:
            newstate.envVars[''] = '';
            return newstate;
        case C.UPDATE_ENV_VARIABLE:
            delete newstate.envVars[action.oldKey];
            newstate.envVars[action.payload.key] = action.payload.env;
            return newstate;
        default:
            return newstate;
    }
}