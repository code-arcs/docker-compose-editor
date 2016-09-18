import React, {PropTypes} from "react";
import Select from "react-select";

class RestartPolicyInputField extends React.Component {
    constructor(args) {
        super(args);
        this.options = [
            {value: 'no', label: 'no'},
            {value: 'on-failure', label: 'on-failure'},
            {value: 'always', label: 'unless-stopped'},
            {value: 'unless-stopped', label: 'unless-stopped'}
        ];
    }

    logChange(val) {
        console.log("Selected: ", val);
        this.props.value = val.value;
    }

    render() {
        return (
            <div className="form-group docker-image">
                <label htmlFor="">Restart</label>

                <Select options={this.options} value={this.props.value} onChange={this.logChange.bind(this)}/>
            </div>
        )
    }
}
export default RestartPolicyInputField