'use strict';
import {generateUUID} from "../utils";

const YAML = require('yamljs');
module.exports = class ComposeLoaderV2 {
    constructor(yaml, content) {
        this.yaml = yaml;
        this.parsePlainContent(content);

        const services = this.yaml.services;
        for (let serviceName in services) {
            const service = services[serviceName];
            this._transformEnvironment(service);
        }
    }

    getVersion() {
        return this.yaml.version;
    }

    getActiveServices() {
        const services = [];
        for (let name in this.yaml.services) {
            const service = this.yaml.services[name];
            service._id = generateUUID();
            service._name = name;
            services.push(service);
        }
        return services;
    }

    getInactiveServices() {
        return this.inactiveServices;
    }

    _transformEnvironment(service) {
        const envVars = service.environment;
        if (envVars) {
            service.environment = Object.keys(envVars).map(key => {
                return {
                    key: key,
                    value: envVars[key]
                }
            });
        }
    }

    parsePlainContent(content) {
        let commentedOutLines = content.match(/^\s*#.*/mg);
        commentedOutLines = (commentedOutLines || []).join('\n').replace(/^(\s*)#/mg, '$1');
        this.inactiveServices = YAML.parse(commentedOutLines);
    }
};
