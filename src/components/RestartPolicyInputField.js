import React, {PropTypes} from "react";
import {connect} from "react-redux";
import * as Actions from "../actions";
import {RestartPolicy} from '../domain'

class RestartPolicyInputField extends React.Component {
    render() {
        const policies = Object.keys(RestartPolicy).map((restartPolicyName, idx) => {
            return (
                <option key={idx} value={restartPolicyName}>{RestartPolicy[restartPolicyName]}</option>
            )
        });

        return (
            <div className="form-group">
                <label htmlFor="">Restart</label>
                <select className="form-control" value={this.props.service.restart} onChange={this.onChange.bind(this)}>
                    {policies}
                </select>
            </div>
        )
    }

    onChange(event) {
        // @value {Service} service
        const service = this.props.service;
        service.setRestartPolicy(event.target.value);
        this.props.dispatch(Actions.updateService(service));
    }
}
export default connect()(RestartPolicyInputField)