import React from "react";
import {connect} from "react-redux";

class StatusBarPanel extends React.Component {
    render() {
        return (
            <div className="statusbar">
                <span>{this.props.activeServices} Services</span>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let inactiveServices = 0;
    for (let service in state.app.services) {
        if (state.app.services[service]._inactive === true) {
            inactiveServices++;
        }
    }

    const totalServices = Object.keys(state.app.services).length;
    const activeServices = totalServices - inactiveServices;

    return {
        activeServices: activeServices,
        totalServices: totalServices
    }
}

export default connect(
    mapStateToProps
)(StatusBarPanel)