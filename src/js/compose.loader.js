'use strict';
import {RestartPolicy} from "../domain/restartPolicy";

const YAML = require('yamljs');
const fs = require('fs');
const ComposeLoaderV2 = require('./compose.loader.v2');


export default class ComposeLoader {
    static createFromFile(file) {
        const content = fs.readFileSync(file, 'utf8');
        const yaml = YAML.parse(content);

        if (ComposeLoader._isVersion(yaml, '2')) {
            return new ComposeLoaderV2(yaml, content);
        }

        throw "Unrecognized Docker Compose file.";
    }

    static toYaml(state) {
        if (state.version === '2') {
            const services = {};

            state.services
                .filter(s => s.isActive())
                .forEach(service => {
                    const ts = {};
                    ts.image = service.getBaseImage().toString();

                    if (service.getRestartPolicy() !== RestartPolicy.NO) {
                        ts.restart = service.getRestartPolicy();
                    }
                    if (service.getPortMappings().length > 0) {
                        ts.ports = service.getPortMappings().map(portMapping => portMapping.toString());
                    }
                    if (service.getEnvironmentVariables().length > 0) {
                        ts.environment = {};
                        service.getEnvironmentVariables().forEach(e => {
                            ts.environment[e.getKey()] = e.getValue()
                        })
                    }

                    services[service.getName()] = ts;
                });

            console.log(services);

            return YAML.stringify({
                version: '2',
                services: services
            }, 10);
        }
    }

    static _isVersion(yaml, version) {
        return yaml.version && yaml.version === version || yaml.services;
    }
};
