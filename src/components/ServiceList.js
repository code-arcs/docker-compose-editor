import React, {PropTypes} from "react";
import ServiceListItem from "./ServiceListItem";
import {connect} from "react-redux";
import * as Actions from "../actions";
import {Service} from '../domain';

class ServiceList extends React.Component {
    render() {
        let services;
        if (Array.isArray(this.props.services)) {

            services = this.props.services.map((service, idx) => {
                return (
                    <ServiceListItem key={idx} service={service}/>
                )
            });
        }

        return (
            <div>
                <h2>Services</h2>
                <a className="btn btn-primary" onClick={this.addService.bind(this)}>
                    Add Service
                </a>
                <ul className="service-list">
                    {services}
                </ul>
            </div>
        )
    }

    addService() {
        this.props.dispatch(Actions.addService(new Service()));
    }
}

function mapStateToProps(state) {
    return {
        services: state.app.services
    };
}
export default connect(mapStateToProps)(ServiceList)