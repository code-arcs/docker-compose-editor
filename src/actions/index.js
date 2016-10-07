import * as C from "../constants";

export function addService(service) {
    return {
        type: C.ADD_SERVICE,
        payload: service || {}
    };
}

export function showServiceDetails(service) {
    return {
        type: C.SHOW_SERVICE_DETAILS,
        payload: service
    }
}

export function openFile(yamlFile) {
    return {
        type: C.OPEN_FILE,
        payload: yamlFile
    }
}

export function setServiceActive(serviceName, active) {
    return {
        type: C.SET_SERVICE_ACTIVE,
        payload: {
            serviceName: serviceName,
            active: active
        }
    }
}

export function updateService(service) {
    return {
        type: C.UPDATE_SERVICE,
        payload: service
    }
}

export function updateEnvVariable(payload) {
    return {
        type: C.UPDATE_ENV_VARIABLE,
        payload: payload
    }
}

export function addEnvVariable() {
    return {
        type: C.ADD_ENV_VARIABLE
    }
}

export function deleteEnvVariable(idx) {
    return {
        type: C.DELETE_ENV_VARIABLE,
        payload: {
            idx: idx
        }
    }
}