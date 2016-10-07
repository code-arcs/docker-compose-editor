import React, {PropTypes} from "react";
import {connect} from "react-redux";
import * as Action from "../actions";
import EnvInputField from "./EnvInputField";

class EnvInputFields extends React.Component {
    render() {
        const environmentVariables = this.props.service.getEnvironmentVariables();
        let envInputs;
        if (Array.isArray(environmentVariables) && environmentVariables.length > 0) {
            envInputs = environmentVariables.map((variable, idx) => {
                return (
                    <EnvInputField key={idx}
                                   variable={variable}
                                   onChange={this.onChange.bind(this)}/>
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

    addEnv() {
        const service = this.props.service;
        service.addEnvironmentVariable();
        this.props.dispatch(Action.updateService(service));
    }
}
export default connect()(EnvInputFields);
