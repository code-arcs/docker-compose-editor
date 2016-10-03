import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import * as Actions from "../actions";

class ServiceListItem extends React.Component {
    handleChange(event) {
        this.props.dispatch(Actions.setServiceActive(this.props.service._name, !event.target.checked));
    }

    render() {
        const clazzName = ["service-list-item"];
        if (this.props.service._inactive) {
            clazzName.push("inactive")
        }

        return (
            <li className={clazzName.join(' ')}>
                <Link to={"/service/" + this.props.service._name}>{this.props.service._name}</Link>
                <input checked={!this.props.service._inactive} type="checkbox" onClick={this.handleChange.bind(this)}/>
            </li>
        )
    }
}
export default connect()(ServiceListItem)