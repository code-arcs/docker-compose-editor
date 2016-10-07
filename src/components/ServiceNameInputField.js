import React, {PropTypes} from "react";
import * as Action from "../actions";
import {connect} from "react-redux";

class ServiceNameInputField extends React.Component {
    render() {
        return (
            <input type="text"
                   className="form-control service-name"
                   value={this.props.service.getName()}
                   onChange={this.onChange.bind(this)}/>
        )
    }

    onChange(event) {
        const service = this.props.service;
        service.setName(event.target.value);
        this.props.dispatch(Action.updateService(service));
    }
}

export default connect()(ServiceNameInputField);
