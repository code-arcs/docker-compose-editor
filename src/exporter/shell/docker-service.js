export class ShellDockerServiceExporter {
    /**
     * @param {Service} service
     * @returns {string}
     */
    static getShellCommand(service, mode) {
        return new ShellDockerServiceExporter(service).generate(mode);
    }

    /**
     * @param {Service} service
     */
    constructor(service) {
        this.service = service;
        this.cmd = [];
    }

    generate(mode) {
        this.cmd.push(`docker service create`);
        this.cmd.push(`--name ${this.service.getName()}`);

        this._processEnvVars(this.service.getEnvironmentVariables());
        this._processPorts(this.service.getPortMappings());
        this._processRestartPolicy(this.service.getRestartPolicy());

        this._processBaseImage(this.service.getBaseImage());

        return this.cmd.join(mode === true ? '\n    ' : ' ');
    }

    /**
     * @param {BaseImage} baseimage
     */
    _processBaseImage(baseimage) {
        this.cmd.push(baseimage);
    }

    /**
     * @param {Array<EnvironmentVariable>} envVars
     * @private
     */
    _processEnvVars(envVars) {
        envVars.forEach(ev => {
            this.cmd.push(`--env ${ev.getKey()}=${ev.getValue()}`)
        });
    }

    /**
     * @param {Array<PortMapping>} portMappings
     * @private
     */
    _processPorts(portMappings) {
        portMappings.forEach(portMapping => {
            this.cmd.push(`--publish ${portMapping}`)
        })
    }

    /**
     * @param {RestartPolicy} restartPolicy
     * @private
     */
    _processRestartPolicy(restartPolicy) {
        switch(restartPolicy) {
            case 'on-failure':
                this.cmd.push(`--restart-condition on-failure`);
                break;
            case 'always':
                this.cmd.push(`--restart-condition any`);
                break;
        }
    }
}
