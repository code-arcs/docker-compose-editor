import React, {PropTypes} from "react";
import Select from "react-select";

class PortsInputField extends React.Component {
    render() {
        const portsInputs = this.props.values.map(ports => {
            const split = ports.split(':');
            let externalPort, internalPort;

            if(split.length === 2) {
                externalPort = split[0];
                internalPort = split[1];
            } else if (split.length === 1) {
                externalPort = undefined;
                internalPort = split[0];
            }

            return (
                <div className="form-control-wrapper" key={internalPort}>
                    <input type="text" className="form-control" value={externalPort}/>
                    <span className="separator">:</span>
                    <input type="text" className="form-control" value={internalPort}/>
                </div>
            );
        });

        return (
            <div className="form-group docker-image">
                <label htmlFor="">
                    Expose Ports
                    <svg className="icon"><use xlinkHref="#plus" /></svg>
                </label>
                {portsInputs}
            </div>
        )
    }
}
export default PortsInputField;