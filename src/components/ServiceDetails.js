import React, {PropTypes} from "react";
import {connect} from "react-redux";

class ServiceDetails extends React.Component {
    render() {
        const service = this.getService();
        return (
            <h1>{service.name}</h1>
        )
    }

    getService() {
        return this.props.services.find(s => s.name === this.props.params.id);
    }
}

function mapStateToProps(state) {
    return {
        services: state.app.services
    }
}
export default connect(mapStateToProps)(ServiceDetails)