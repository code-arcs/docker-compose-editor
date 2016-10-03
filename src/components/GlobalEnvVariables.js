import React, {PropTypes} from "react";
import {connect} from "react-redux";
import EnvInputField from "./EnvInputField";

class GlobalEnvVariables extends React.Component {
    render() {
        return (
            <div>
                <h1>Global Environment Variables</h1>
                <p>
                    Define environment variables here which you can reuse in services later. E.g. when multiple services
                    share common environment variables, you can change them here for all services at once.
                </p>
                <EnvInputField values={this.envVars}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        envVars: state.app.envVars
    }
}
export default connect(mapStateToProps)(GlobalEnvVariables)