import React, {PropTypes} from "react";
import ServiceListItem from "./ServiceListItem";
import {connect} from "react-redux";

class ServiceList extends React.Component {
    render() {
        let services = Object.keys(this.props.services).map((s, idx) => {
            const service = this.props.services[s];
            service._name = s;
            return (
                <ServiceListItem key={idx} service={service}/>
            )
        });

        return (
            <ul className="service-list">
                {services}
            </ul>
        )
    }
}
export default connect()(ServiceList)