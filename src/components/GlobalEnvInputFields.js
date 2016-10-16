import React, {PropTypes} from "react";
import {connect} from "react-redux";
import * as Action from "../actions";
import EnvInputField from "./EnvInputField";

class GlobalEnvInputFields extends React.Component {
    render() {
        const environmentVariables = this.props.envVars;
        let envInputs;
        if (Array.isArray(environmentVariables) && environmentVariables.length > 0) {
            envInputs = environmentVariables.map((variable, idx) => {
                return (
                    <EnvInputField key={idx}
                                   index={idx}
                                   variable={variable}
                                   onDelete={this.onDelete.bind(this)}/>
                );
            });
        } else {
            envInputs = (
                <div className="no-values-panel">No global environment variables declared.</div>
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

    onDelete(idx) {
        this.props.dispatch(Action.deleteEnvVariable(idx));
    }

    addEnv() {
        this.props.dispatch(Action.addEnvVariable());
    }
}

function mapStateToScope(state) {
    return {
        envVars: state.app.docker.envVars
    }
}

export default connect(mapStateToScope)(GlobalEnvInputFields);
