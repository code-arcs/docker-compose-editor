import React, {PropTypes} from "react";
import {connect} from "react-redux";
import * as Actions from "../actions";
import ImageInputField from "./ImageInputField"
import RestartPolicyInputField from "./RestartPolicyInputField"
import PortsInputField from "./PortsInputField"
import EnvInputField from "./EnvInputField"

class ServiceDetails extends React.Component {
    render() {
        const service = this.getService();
        console.log(service);
        return (
            <div>
                <h1>{this.props.params.id}</h1>
                <ImageInputField image={service.image}/>
                <RestartPolicyInputField value={service.restart} onChange={this.onChange.bind(this, 'restart')}/>
                <PortsInputField values={service.ports}/>
                <EnvInputField values={service.environment}/>
            </div>
        )
    }

    onChange(what, valueObject) {
        const service = this.getService();
        console.log(this, arguments, service);
        if(what === 'restart') {
            service.restart = valueObject.value;
            Actions.updateService(service);
        }
    }

    getService() {
        return this.props.services[this.props.params.id] || {};
    }
}

function mapStateToProps(state) {
    return {
        services: state.app.services
    }
}
export default connect(mapStateToProps)(ServiceDetails)