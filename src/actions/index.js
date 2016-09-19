import * as C from "../constants";

export function addService(service) {
    return {
        type: C.ADD_SERVICE,
        payload: {
            service: service
        }
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