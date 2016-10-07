import React, {PropTypes} from "react";
import {connect} from "react-redux";
import * as Actions from "../actions";
import ImageInputField from "./ImageInputField";
import RestartPolicyInputField from "./RestartPolicyInputField";
import PortsInputField from "./PortsInputField";
import EnvInputFields from "./EnvInputFields";
import ServiceNameInputField from "./ServiceNameInputField";
import * as pkg from "../../package.json";

class ServiceDetails extends React.Component {
    render() {
        this.service = this.getService();
        document.title = `${pkg.productName} [${this.service._name}]`;

        const style = {
            position: 'absolute',
            top: 0,
            right: 0,
            fontSize: 10
        };

        return (
            <div>
                <div style={style}>
                    <pre>{JSON.stringify(this.service, null, 2)}</pre>
                </div>
                <ServiceNameInputField value={this.service._name} onChange={this.onChange.bind(this, 'name')}/>
                <ImageInputField service={this.service}/>
                <RestartPolicyInputField service={this.service} onChange={this.onChange.bind(this, 'restart')}/>
                <PortsInputField service={this.service.ports} onChange={this.onChange.bind(this, 'ports')}/>
                <EnvInputFields values={this.service.environment} onChange={this.onChange.bind(this, 'env')}/>
            </div>
        )
    }

    onChange(what, valueObject) {
    }

    getService() {
        return this.props.services.find(service => service._id === this.props.params.id) || {};
    }
}

function mapStateToProps(state) {
    return {
        services: state.app.services
    }
}
export default connect(mapStateToProps)(ServiceDetails)