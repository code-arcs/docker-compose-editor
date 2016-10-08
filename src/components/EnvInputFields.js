import React, {PropTypes} from "react";
import {connect} from "react-redux";
import * as Action from "../actions";
import EnvInputField from "./EnvInputField";

class EnvInputFields extends React.Component {
    render() {
        const environmentVariables = this.props.service ? this.props.service.getEnvironmentVariables() : this.props.envVars;
        let envInputs;
        if (Array.isArray(environmentVariables) && environmentVariables.length > 0) {
            envInputs = environmentVariables.map((variable, idx) => {
                return (
                    <EnvInputField key={idx}
                                   index={idx}
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
        if(this.props.service) {
            const service = this.props.service;
            service.addEnvironmentVariable();
            this.props.dispatch(Action.updateService(service));
        } else {
            this.props.dispatch(Action.addEnvVariable());
        }
    }
}

function mapStateToScope(state) {
    return {
        envVars: state.app.envVars
    }
}

export default connect(mapStateToScope)(EnvInputFields);
