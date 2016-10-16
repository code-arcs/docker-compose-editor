import React, {PropTypes} from "react";
import {connect} from "react-redux";
import GlobalEnvInputFields from "../components/GlobalEnvInputFields";
import * as pkg from "../../package.json";

class GlobalEnvVariables extends React.Component {
    onChange(action) {
        this.props.dispatch(action);
    }

    render() {
        document.title = `${pkg.productName}`;
        return (
            <div>
                <h1>Global Environment Variables</h1>
                <p>
                    Define environment variables here which you can reuse in services later. E.g. when multiple services
                    share common environment variables, you can change them here for all services at once.
                </p>
                <GlobalEnvInputFields values={this.props.envVars} onChange={this.onChange.bind(this)}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        envVars: state.app.docker.envVars
    }
}
export default connect(mapStateToProps)(GlobalEnvVariables)
