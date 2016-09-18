import React from 'react';
import ServiceList from '../components/ServiceList';
import { connect } from 'react-redux'
import * as Actions from '../actions'

class LeftPanel extends React.Component {
    render() {
        return (
            <div className="left-panel">
                <div className="left-nav-panel">
                </div>
                <div className="service-list-panel">
                    <ServiceList services={this.props.services}/>
                </div>
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
)(LeftPanel)