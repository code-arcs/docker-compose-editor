import lodash from 'lodash';
import * as C from '../constants';

const initialState = {
    services: [
        {name: 'user-service'},
        {name: 'tenant-service'},
        {name: 'method-service'},
        {name: 'eureka-service'},
    ],
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
        default:
            return newstate;
    }
}