import React, {PropTypes} from "react";
import * as Actions from "../actions";

class EnvInputField extends React.Component {
    addEnv() {
        this.props.onChange(Actions.addEnvVariable());
    }

    render() {
        const values = this.props.values;
        let envInputs = [];
        if (Array.isArray(values) && values.length > 0) {
            envInputs = values.map((variable, idx) => {
                return (
                    <InputField key={idx} index={idx} variable={variable} onChange={this.props.onChange.bind(this)}/>
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
        this.props.onChange(Actions.deleteEnvVariable(this.props.index));
    }

    onChange(what, event) {
        let key = this.props.variable.key;
        let value = this.props.variable.value;

        if (what === "key") {
            key = event.target.value;
        }
        if (what === "value") {
            value = event.target.value;
        }

        this.props.onChange(Actions.updateEnvVariable({
            idx: this.props.index,
            key: key,
            value: value
        }));
    }

    render() {
        const key = this.props.variable.key;
        const value = this.props.variable.value;

        return (
            <div className="form-control-wrapper">
                <input type="text" list="exampleList" className="form-control" value={key} onChange={this.onChange.bind(this, "key")}/>
                <datalist id="exampleList">
                    <option value="A">A</option>
                    <option value="A">B</option>
                </datalist>
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
