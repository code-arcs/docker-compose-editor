import React, {PropTypes} from "react";
import Select from "react-select";

class PortsInputField extends React.Component {
    render() {
        const values = this.props.values;
        const envInputs = Object.keys(values).map(key => {
            console.log(key);
            return (
                <div className="form-control-wrapper" key={key}>
                    <input type="text" className="form-control" value={key}/>
                    <span className="separator">:</span>
                    <input type="text" className="form-control" value={values[key]}/>
                </div>
            );
        });

        return (
            <div className="form-group docker-image">
                <label htmlFor="">Environment variables</label>
                {envInputs}
            </div>
        )
    }
}
export default PortsInputField;