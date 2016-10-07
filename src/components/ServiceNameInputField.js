import React, {PropTypes} from "react";
import {connect} from "react-redux";


class ServiceNameInputField extends React.Component {
    render() {
        return (
            <input type="text" className="form-control service-name" value={this.props.value}
                   onChange={this.props.onChange}/>
        )
    }
}

export default connect()(ServiceNameInputField)