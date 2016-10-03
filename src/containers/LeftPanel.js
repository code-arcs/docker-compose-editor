import React from "react";
import ServiceList from "../components/ServiceList";
import {connect} from "react-redux";
import {Link} from "react-router";

class LeftPanel extends React.Component {
    render() {
        return (
            <div className="left-panel">
                <div className="left-nav-panel">
                    <Link to={"/env"}>Environment Variables</Link>
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