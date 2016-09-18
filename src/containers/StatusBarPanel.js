import React from 'react'
import { connect } from 'react-redux'

class StatusBarPanel extends React.Component {
    render() {
        const serviceCount = Object.keys(this.props.services).length;
        return (
            <div className="statusbar">
                <span>{serviceCount} Services</span>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        services: state.app.services
    }
}

export default connect(
    mapStateToProps
)(StatusBarPanel)