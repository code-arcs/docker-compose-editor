import React, {PropTypes} from "react";
import {connect} from "react-redux";
import * as Action from "../actions";

class PortsInputField extends React.Component {
    render() {
        const portMappings = this.props.service.getPortMappings();
        let portsInputs;
        if (Array.isArray(portMappings) && portMappings.length > 0) {
            portsInputs = portMappings.map((portMapping, idx) => {
                return (
                    <PortInputField key={idx}
                                    index={idx}
                                    portMapping={portMapping}
                                    validate={this.validate.bind(this)}
                                    errorMessage="Port in use!"
                                    onChange={this.onChange.bind(this)}
                                    onDelete={this.onDelete.bind(this, idx)}/>
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

    addPortMapping() {
        const service = this.props.service;
        service.addPortMapping(0, 0);
        this.props.dispatch(Action.updateService(service));
    }

    onChange() {
        this.props.dispatch(Action.updateService(this.props.service));
    }

    onDelete(idx) {
        const service = this.props.service;
        const portMappings = service.getPortMappings().filter((p, pidx) => pidx !== idx);
        service.setPortMappings(portMappings);
        this.props.dispatch(Action.updateService(service));
    }

    validate(value) {
        const ports = {
            externalPort: [],
            internalPort: []
        };

        this.props.values.forEach((val, idx) => {
            if (idx != value.index) {
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

}
export default connect()(PortsInputField);

/**
 *
 */
class PortInputField extends React.Component {
    render() {
        return (
            <div className="form-control-wrapper">
                <input type="text" className="form-control "
                       value={this.props.portMapping.getExternalPort()}
                       onChange={this.onChange.bind(this, "external")}/>
                <span className="separator">:</span>
                <input type="text" className="form-control "
                       value={this.props.portMapping.getInternalPort()}
                       onChange={this.onChange.bind(this, "internal")}/>
                <span className="separator">
                    <a onClick={this.props.onDelete.bind(this)}>
                        <svg className="icon icon-delete"><use xlinkHref="#delete"/></svg>
                    </a>
                </span>
            </div>
        )
    }

    onChange(portType, event) {
        const portMapping = this.props.portMapping;
        const value = event.target.value;
        if(portType === 'external') {
            portMapping.setExternalPort(value);
        }
        if(portType === 'internal') {
            portMapping.setInternalPort(value);
        }

        this.props.onChange(portMapping);
    }
}