import React, {PropTypes} from "react";

class PortsInputField extends React.Component {
    addPortMapping() {
        this.props.onChange({
            action: 'insert',
            externalPort: 0,
            internalPort: 0
        });
    }

    validate(value) {
        const ports = {
            externalPort: [],
            internalPort: []
        };

        this.props.values.forEach((val, idx) => {
            if(idx != value.index) {
                const __ret = this.splitPortString(val);
                ports.externalPort.push(__ret.externalPort);
                ports.internalPort.push(__ret.internalPort);
            }
        });

        const externalPortInUse = ports.externalPort.indexOf(value.externalPort) !== -1;
        const internalPortInUse = ports.internalPort.indexOf(value.internalPort) !== -1;
        return {
            externalPortInUse: externalPortInUse,
            internalPortInUse: internalPortInUse,
            hasErrors() {
                return !externalPortInUse && !internalPortInUse;
            }
        }
    }

    render() {
        let portsInputs;
        if (Array.isArray(this.props.values) && this.props.values.length > 0) {
            portsInputs = this.props.values.map((ports, idx) => {
                const __ret = this.splitPortString(ports);
                const externalPort = __ret.externalPort;
                const internalPort = __ret.internalPort;

                return (
                    <ExternalInternalPortInputField key={idx} index={idx} externalPort={externalPort}
                                                    validate={this.validate.bind(this)} errorMessage="Port in use!"
                                                    internalPort={internalPort} onChange={this.props.onChange}/>
                );
            });
        } else {
            portsInputs = (
                <div className="no-values-panel">No port mappings defined.</div>
            )
        }

        return (
            <div className="form-group ports-group">
                <label htmlFor="">
                    Expose Ports
                    <a onClick={this.addPortMapping.bind(this)}>
                        <svg className="icon">
                            <use xlinkHref="#plus"/>
                        </svg>
                    </a>
                </label>
                {portsInputs}
            </div>
        )
    }

    splitPortString(ports) {
        let externalPort, internalPort;
        const split = String(ports).split(':');

        if (split.length === 2) {
            externalPort = split[0];
            internalPort = split[1];
        } else if (split.length === 1) {
            externalPort = undefined;
            internalPort = split[0];
        }

        return {externalPort: externalPort, internalPort: internalPort};
    }
}
export default PortsInputField;

/**
 *
 */
class ExternalInternalPortInputField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            internalPortInUse: false,
            externalPortInUse: false
        };
    }

    handleDelete() {
        this.props.onChange({index: this.props.index, action: 'delete'});
    }

    onChange(portType, event) {
        const newProps = Object.assign({}, this.props);
        newProps.action = 'update';
        newProps[portType] = event.target.value;

        var validate = this.props.validate(newProps, event.target.value);
        if(!validate.hasErrors()) {
            this.setState({
                internalPortInUse: validate.internalPortInUse,
                externalPortInUse: validate.externalPortInUse
            });
        } else {
            this.setState({
                internalPortInUse: false,
                externalPortInUse: false
            });
        }
        this.props.onChange(newProps);
    }

    render() {
        return (
            <div className="form-control-wrapper">
                <input type="number" className={"form-control " + (this.state.externalPortInUse ? 'error' : '')} value={this.props.externalPort}
                       min="1" max="65535" onChange={this.onChange.bind(this, "externalPort")}/>
                <span className="separator">:</span>
                <input type="number" className={"form-control " + (this.state.internalPortInUse ? 'error' : '')} value={this.props.internalPort}
                       min="1" max="65535" onChange={this.onChange.bind(this, "internalPort")}/>
                <span className="separator">
                    <a onClick={this.handleDelete.bind(this)}>
                        <svg className="icon icon-delete"><use xlinkHref="#delete"/></svg>
                    </a>
                </span>
            </div>
        )
    }
}