export class PortMapping {
    constructor(externalPort, internalPort) {
        if (internalPort === undefined && typeof externalPort === 'string') {
            const splittedPorts = externalPort.split(':');
            if (splittedPorts.length === 2) {
                this._externalPort = splittedPorts[0];
                this._internalPort = splittedPorts[1];
            } else if (splittedPorts.length === 1) {
                this._externalPort = undefined;
                this._internalPort = splittedPorts[0];
            }
        } else {
            this._externalPort = externalPort;
            this._internalPort = internalPort;
        }

        const isExternalPortRange = (this.getExternalPort() || "").indexOf('-') !== -1;
        const isInternalPortRange = (this.getInternalPort() || "").indexOf('-') !== -1;
        if (this.getInternalPort() && this.getExternalPort() && (isExternalPortRange && !isInternalPortRange || !isExternalPortRange && isInternalPortRange)) {
            throw new Error();
        }

        if (isExternalPortRange) {
            const split = this.getExternalPort().split("-");
            if (+split[0] >= +split[1]) {
                throw new Error(`External port range is malformed! ${this.getExternalPort()}`);
            }
        }

        if (isInternalPortRange) {
            const split = this.getInternalPort().split("-");
            if (+split[0] >= +split[1]) {
                throw new Error(`External port range is malformed! ${this.getInternalPort()}`);
            }
        }
    }

    getExternalPort() {
        return this._externalPort;
    }

    getInternalPort() {
        return this._internalPort;
    }
}