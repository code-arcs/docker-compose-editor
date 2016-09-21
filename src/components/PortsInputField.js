import React, {PropTypes} from "react";

class PortsInputField extends React.Component {
    addPortMapping() {
        this.props.onChange({
            action: 'insert',
            externalPort: 0,
            internalPort: 0
        });
    }

    render() {
        let portsInputs;
        if (Array.isArray(this.props.values) && this.props.values.length > 0) {
            portsInputs = this.props.values.map((ports, idx) => {
                const split = ports.split(':');
                let externalPort, internalPort;

                if (split.length === 2) {
                    externalPort = split[0];
                    internalPort = split[1];
                } else if (split.length === 1) {
                    externalPort = undefined;
                    internalPort = split[0];
                }

                return (
                    <ExternalInternalPortInputField key={idx} index={idx} externalPort={externalPort}
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
}
export default PortsInputField;

class ExternalInternalPortInputField extends React.Component {
    handleDelete() {
        this.props.onChange({index: this.props.index, action: 'delete'});
    }

    onChange(portType, event) {
        const newProps = Object.assign({}, this.props);
        newProps.action = 'update';
        newProps[portType] = event.target.value;
        this.props.onChange(newProps);
    }

    render() {
        return (
            <div className="form-control-wrapper" key={this.props.internalPort}>
                <input type="number" className="form-control" value={this.props.externalPort}
                       min="1" max="65535" onChange={this.onChange.bind(this, "externalPort")}/>
                <span className="separator">:</span>
                <input type="number" className="form-control" value={this.props.internalPort}
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