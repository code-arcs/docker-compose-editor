import {Service} from "../domain/service";
'use strict';
module.exports = class ComposeLoaderV2 {
    constructor(yaml, content) {
        this.yaml = yaml;

        this.services = [];
        this._processServices();
    }

    _processServices() {
        for (let name in this.yaml.services) {
            const yamlService = this.yaml.services[name];
            const service = new Service(name);
            this._processService(service, yamlService);
        }
    }

    _processService(service, yamlService) {
        service.setBaseImage(yamlService.image);
        service.setRestartPolicy(yamlService.restart);
        this._processServicePorts(service, yamlService);
        this._processEnvironmentVariables(service, yamlService);
        this.services.push(service);
    }

    _processServicePorts(service, yamlService) {
        const ports = Array.isArray(yamlService.ports) ? yamlService.ports : [];
        ports.forEach(port => service.addPortMapping(port));
    }

    _processEnvironmentVariables(service, yamlService) {
        for (let envVarKey in yamlService.environment) {
            service.addEnvironmentVariable(envVarKey, yamlService.environment[envVarKey]);
        }
    }

    getVersion() {
        return this.yaml.version;
    }

    getServices() {
        return this.services;
    }
};
