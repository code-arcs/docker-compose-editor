import React, {PropTypes} from "react";
import {connect} from "react-redux";
import * as Actions from "../actions";
import ImageInputField from "./ImageInputField";
import RestartPolicyInputField from "./RestartPolicyInputField";
import PortsInputField from "./PortsInputField";
import EnvInputFields from "./EnvInputFields";
import ServiceList from "./ServiceList";
import * as pkg from "../../package.json";

class ServiceDetails extends React.Component {
    render() {
        this.service = this.getService();
        document.title = `${pkg.productName} [${this.service._name}]`;
        return (
            <div>
                <h1>{this.props.params.id}</h1>
                <ImageInputField image={this.service.image}/>
                <RestartPolicyInputField value={this.service.restart} onChange={this.onChange.bind(this, 'restart')}/>
                <PortsInputField values={this.service.ports} onChange={this.onChange.bind(this, 'ports')}/>
                <EnvInputFields values={this.service.environment} onChange={this.onChange.bind(this, 'env')}/>
            </div>
        )
    }

    onChange(what, valueObject) {
        if (what === 'env') {
            valueObject.payload = valueObject.payload || {};
            valueObject.payload.serviceName = this.service._name;
            this.props.dispatch(valueObject);
        }
        if (what === 'restart') {
            this.service.restart = valueObject.value;
            this.props.dispatch(Actions.updateService(this.service));
        }
        if (what === 'ports') {
            if (valueObject.action === 'delete') {
                this.service.ports[valueObject.index] = undefined;
                this.service.ports = this.service.ports.filter(p => p !== undefined);
            }
            else if (valueObject.action === 'update') {
                this.service.ports[valueObject.index] = formattedPortString(valueObject);
            }
            else if (valueObject.action === 'insert') {
                this.service.ports = this.service.ports || [];
                this.service.ports.push(':');
            }

            this.props.dispatch(Actions.updateService(this.service));
        }

        function formattedPortString(valueObject) {
            return Number.isInteger(+valueObject.externalPort) ? [+valueObject.externalPort, +valueObject.internalPort].join(':') : +valueObject.internalPort;
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