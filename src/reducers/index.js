import lodash from 'lodash';
import * as C from '../constants';

const initialState = {
    services: [1,2,3,4,6,7],
    activeService: {}
};

export default function (state = initialState, action) {
    const state = lodash.cloneDeep(state);

    switch (action.type) {
        case C.ADD_SERVICE:
            state.services.push(action.payload);
            return state;
        case C.SHOW_SERVICE_DETAILS:
            state.activeService = action.payload;
            return state;
        default:
            return state;
    }
}