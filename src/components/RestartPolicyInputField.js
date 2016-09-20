import React, {PropTypes} from "react";
import Select from "react-select";

class RestartPolicyInputField extends React.Component {
    render() {
        return (
            <div className="form-group">
                <label htmlFor="">Restart</label>
                <select className="form-control" value={this.props.value} onChange={this.props.onChange}>
                    <option>no</option>
                    <option>on-failure</option>
                    <option>always</option>
                    <option>unless-stopped</option>
                </select>
            </div>
        )
    }
}
export default RestartPolicyInputField;