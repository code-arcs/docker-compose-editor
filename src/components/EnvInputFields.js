import React, {PropTypes} from "react";
import * as Actions from "../actions";
import EnvInputField from "./EnvInputField";

class EnvInputFields extends React.Component {
    addEnv() {
        this.props.onChange(Actions.addEnvVariable());
    }

    render() {
        const values = this.props.values;
        let envInputs = [];
        if (Array.isArray(values) && values.length > 0) {
            envInputs = values.map((variable, idx) => {
                return (
                    <EnvInputField key={idx} index={idx} variable={variable} onChange={this.props.onChange.bind(this)}/>
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
                    <a onClick={this.addEnv.bind(this)}>
                        <svg className="icon">
                            <use xlinkHref="#plus"/>
                        </svg>
                    </a>
                </label>
                {envInputs}
            </div>
        )
    }
}
export default EnvInputFields;
