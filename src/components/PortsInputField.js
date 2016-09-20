import React, {PropTypes} from "react";

class PortsInputField extends React.Component {
    render() {
        let portsInputs;
        if(this.props.values) {
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
            <div className="form-group">
                <label htmlFor="">
                    Expose Ports
                    <svg className="icon"><use xlinkHref="#plus"/></svg>
                </label>
                {portsInputs}
            </div>
        )
    }
}
export default PortsInputField;

class ExternalInternalPortInputField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: props.index,
            externalPort: props.externalPort,
            internalPort: props.internalPort
        }
    }

    handleDelete() {
        this.props.onChange({index: this.props.index});
    }

    onChange(portType, event) {
        this.state[portType] = event.target.value;
        this.props.onChange(this.state);
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