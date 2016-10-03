import React, {PropTypes} from "react";
import * as Actions from "../actions";

class EnvInputField extends React.Component {
    addEnv() {
        this.props.onChange(Actions.addEnvVariable());
    }

    render() {
        const values = this.props.values;
        let envInputs = [];
        if (values && Object.keys(values).length > 0) {
            envInputs = Object.keys(values).map((key, idx) => {
                var value = {};
                value[key] = values[key];

                return (
                    <InputField key={idx} index={idx} value={value} onChange={this.props.onChange.bind(this)}/>
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
export default EnvInputField;

class InputField extends React.Component {
    handleDelete() {
        const key = Object.keys(this.props.value)[0];
        this.props.onChange(Actions.deleteEnvVariable(key));
    }

    onChange(what, event) {
        let key, oldKey;
        key = oldKey = Object.keys(this.props.value)[0];
        let value = this.props.value[key];

        if (what === "key") {
            key = event.target.value;
        }
        if (what === "value") {
            value = event.target.value;
        }

        this.props.onChange(Actions.updateEnvVariable(oldKey, {
            key: key,
            value: value
        }));
    }

    render() {
        const key = Object.keys(this.props.value)[0];
        const value = this.props.value[key];

        return (
            <div className="form-control-wrapper">
                <input type="text" className="form-control" value={key} onChange={this.onChange.bind(this, "key")}/>
                <span className="separator">:</span>
                <input type="text" className="form-control" value={value} onChange={this.onChange.bind(this, "value")}/>
                <span className="separator">
                    <a onClick={this.handleDelete.bind(this)}>
                        <svg className="icon icon-delete"><use xlinkHref="#delete"/></svg>
                    </a>
                </span>
            </div>
        )
    }
}
