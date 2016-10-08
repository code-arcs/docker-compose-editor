import React, {PropTypes} from "react";
import {connect} from "react-redux";
import ImageInputField from "./ImageInputField";
import RestartPolicyInputField from "./RestartPolicyInputField";
import PortsInputField from "./PortsInputField";
import ServiceEnvInputFields from "./ServiceEnvInputFields";
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
                {/*<div style={style}>*/}
                    {/*<pre>{JSON.stringify(this.service, null, 2)}</pre>*/}
                {/*</div>*/}
                <ServiceNameInputField service={this.service}/>
                <ImageInputField service={this.service}/>
                <RestartPolicyInputField service={this.service}/>
                <PortsInputField service={this.service}/>
                <ServiceEnvInputFields service={this.service}/>
            </div>
        )
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