import {generateUUID, RandomNameGenerator} from "../utils";
import {PortMapping, RestartPolicy, BaseImage, EnvironmentVariable} from "./";

export class Service {
    constructor(name) {
        this._id = generateUUID();
        this._name = name || RandomNameGenerator.getRandomName();
        this._baseImage = new BaseImage();
        this._ports = [];
        this._environment = [];
        this._restart = RestartPolicy.NO;
        this._active = true;
    }

    setName(name) {
        this._name = name;
    }

    getName() {
        return this._name;
    }

    setBaseImage(image) {
        this._baseImage = new BaseImage(image);
    }

    /**
     * @returns {BaseImage}
     */
    getBaseImage() {
        return this._baseImage;
    }

    setRestartPolicy(policy) {
        this._restart = RestartPolicy.get(policy);
    }

    getRestartPolicy() {
        return this._restart;
    }

    addPortMapping(externalPort, internalPort) {
        const portMapping = new PortMapping(externalPort, internalPort);
        const externalPortAlreadyUsed = this._ports.some(portMapping => portMapping.externalPort === portMapping.getExternalPort());
        const internalPortAlreadyUsed = this._ports.some(portMapping => portMapping.internalPort === portMapping.getInternalPort());
        if (externalPortAlreadyUsed || internalPortAlreadyUsed) {
            // TODO: what to do, when some of the desired ports are already in use?
        } else {
            this._ports.push(portMapping);
        }
    }

    setPortMappings(portMappings) {
        this._ports = portMappings;
    }

    /**
     * @returns {Array<PortMapping>}
     */
    getPortMappings() {
        return this._ports;
    }

    addEnvironmentVariable() {
        this._environment.push(new EnvironmentVariable(arguments));
    }

    getEnvironmentVariables() {
        return this._environment;
    }

    setEnvironmentVariables(envVars) {
        this._environment = envVars;
    }

    setActive(active) {
        this._active = active;
    }

    isActive() {
        return this._active;
    }

    static fromJSON(json) {
        const service = Object.assign(new Service(), json);
        service._baseImage = BaseImage.fromJSON(service._baseImage);
        service._environment = service._environment.map(EnvironmentVariable.fromJSON);
        service._ports = service._ports.map(PortMapping.fromJSON);
        return service;
    }
}
