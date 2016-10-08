import React, {PropTypes} from "react";
import {connect} from "react-redux";
import * as Action from "../actions";
import EnvInputField from "./EnvInputField";

class ServiceEnvInputFields extends React.Component {
    render() {
        const environmentVariables = this.props.service.getEnvironmentVariables();
        let envInputs;
        if (Array.isArray(environmentVariables) && environmentVariables.length > 0) {
            envInputs = environmentVariables.map((variable, idx) => {
                return (
                    <EnvInputField key={idx}
                                   index={idx}
                                   variable={variable}
                                   onChange={this.onChange.bind(this)}
                                   onDelete={this.onDelete.bind(this)}/>
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

    onChange() {
        this.props.dispatch(Action.updateService(this.props.service));
    }

    onDelete(idx) {
        const filter = this.props.service.getEnvironmentVariables().filter((env, envIdx) => envIdx !== idx);
        this.props.service.setEnvironmentVariables(filter);
        this.onChange();
    }

    addEnv() {
        const service = this.props.service;
        service.addEnvironmentVariable();
        this.props.dispatch(Action.updateService(service));
    }
}

export default connect()(ServiceEnvInputFields);
