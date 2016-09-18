import React, {PropTypes} from "react";
import ServiceListItem from "./ServiceListItem";
import {connect} from "react-redux";

class ServiceList extends React.Component {
    render() {
        let services = this.props.services.map((s, idx) => {
            return (
                <ServiceListItem key={idx} service={s}/>
            )
        });

        return (
            <ul className="service-list">
                {services}
            </ul>
        )
    }
}
ServiceList.propTypes = {
    services: PropTypes.array.isRequired,
};
export default connect()(ServiceList)