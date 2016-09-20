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
        return (
            <div>
                <h1>{this.props.params.id}</h1>
                <ImageInputField image={service.image}/>
                <RestartPolicyInputField value={service.restart} onChange={this.onChange.bind(this, 'restart')}/>
                <PortsInputField values={service.ports} onChange={this.onChange.bind(this, 'ports')}/>
                <EnvInputField values={service.environment}/>
            </div>
        )
    }

    onChange(what, valueObject) {
        const service = this.getService();
        if(what === 'restart') {
            service.restart = valueObject.value;
            this.props.dispatch(Actions.updateService(service));
        }
        if(what === 'ports') {
            if(!valueObject.externalPort && !valueObject.internalPort) {
                service.ports = service.ports.splice(valueObject.index, 1);
            } else {
                service.ports[valueObject.index] = valueObject.externalPort ? [valueObject.externalPort, valueObject.internalPort].join(':') : valueObject.internalPort;
            }
            this.props.dispatch(Actions.updateService(service));
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