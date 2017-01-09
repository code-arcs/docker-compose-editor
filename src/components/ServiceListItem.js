import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import * as Actions from "../actions";

class ServiceListItem extends React.Component {
    handleChange(event) {
        const service = this.props.service;
        service.setActive(event.target.checked);
        this.props.dispatch(Actions.updateService(service));
    }

    render() {
        const clazzName = ["service-list-item"];
        if (!this.props.service.isActive()) {
            clazzName.push("inactive")
        }

        return (
            <li className={clazzName.join(' ')}>
                <Link to={"/services/" + this.props.service._id}>{this.props.service._name}</Link>
                <input checked={this.props.service.isActive()} type="checkbox" onChange={this.handleChange.bind(this)}/>
            </li>
        )
    }
}
export default connect()(ServiceListItem)
