import React, {PropTypes} from "react";
import ServiceListItem from "./ServiceListItem";
import {connect} from "react-redux";
import * as Actions from "../actions";
import {RandomNameGenerator} from "../utils";

class ServiceList extends React.Component {
    render() {
        let services;
        if (this.props.services) {
            services = Object.keys(this.props.services).map((s, idx) => {
                const service = this.props.services[s];
                service._name = s;
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
        this.props.dispatch(Actions.addService({
            _name: RandomNameGenerator.getRandomName()
        }));
    }
}

function mapStateToProps(state) {
    return {
        services: state.app.services
    };
}
export default connect(mapStateToProps)(ServiceList)