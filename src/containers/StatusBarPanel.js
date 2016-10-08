import React from "react";
import {connect} from "react-redux";

class StatusBarPanel extends React.Component {
    render() {
        return (
            <div className="statusbar">
                <span>{this.props.globalEnvVars} Environment Variables</span>
                <span>{this.props.activeServices} Services</span>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeServices: (state.app.services || []).length,
        globalEnvVars: (state.app.envVars || []).length
    }
}

export default connect(mapStateToProps)(StatusBarPanel)