import React, {PropTypes} from "react";

class PortsInputField extends React.Component {
    render() {
        const values = this.props.values;
        let envInputs = [];
        if(Array.isArray(values) && values.length > 0) {
            envInputs = Object.keys(values).map(key => {
                return (
                    <div className="form-control-wrapper" key={key}>
                        <input type="text" className="form-control" value={key}/>
                        <span className="separator">:</span>
                        <input type="text" className="form-control" value={values[key]}/>
                        <span className="separator">
                        <a href="#">
                            <svg className="icon icon-delete"><use xlinkHref="#delete"/></svg>
                        </a>
                    </span>
                    </div>
                );
            });
        } else {
            envInputs = (
                <div className="no-values-panel">No environment variables declared.</div>
            )
        }

        return (
            <div className="form-group">
                <label htmlFor="">
                    Environment variables
                    <svg className="icon">
                        <use xlinkHref="#plus"/>
                    </svg>
                </label>
                {envInputs}
            </div>
        )
    }
}
export default PortsInputField;