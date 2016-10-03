import React from "react";
import ServiceList from "../components/ServiceList";
import {connect} from "react-redux";
import {Link} from "react-router";

class LeftPanel extends React.Component {
    render() {
        return (
            <div className="left-panel">
                <div className="left-nav-panel">
                    <ul className="service-list">
                        <li className="service-list-item">
                            <Link to={"/env"}>
                                <svg className="icon">
                                    <use xlinkHref="#globe"/>
                                </svg>
                                Environment Variables
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="service-list-panel">
                    <h2 className="left-panel-title">Services</h2>
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