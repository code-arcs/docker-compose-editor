import React, {PropTypes} from "react";
import {connect} from "react-redux";
import * as Actions from "../actions";

const jQuery = require('jquery');
const typeahead = require('../../node_modules/typeahead.js/dist/typeahead.jquery');

class EnvInputField extends React.Component {
    render() {
        const key = this.props.variable.key;
        const value = this.props.variable.value;

        return (
            <div className="form-control-wrapper">
                <input type="text"
                       className="form-control"
                       value={this.props.variable.getKey()}
                       onChange={this.onChange.bind(this, "key")}/>
                <span className="separator">:</span>
                <input type="text"
                       className="form-control typeahead"
                       value={this.props.variable.getValue()}
                       id={"env_" + this.props.index}
                       onChange={this.onChange.bind(this, "value")}/>
                <span className="separator">
                    <a onClick={this.handleDelete.bind(this)}>
                        <svg className="icon icon-delete"><use xlinkHref="#delete"/></svg>
                    </a>
                </span>
            </div>
        )
    }


    handleDelete() {
        this.props.onChange(Actions.deleteEnvVariable(this.props.index));
    }

    componentDidMount() {
        jQuery(`#env_${this.props.index}`).typeahead({
                hint: false,
                highlight: true,
                minLength: 1
            },
            {
                name: 'states',
                source: this.substringMatcher(this.props.envVars),
                display: 'key',
                templates: {
                    suggestion: (res) => `<div><strong>${res.key}:</strong> ${res.value}</div>`
                }
            });
    }

    substringMatcher(strs) {
        return function findMatches(q, cb) {
            const matches = [];

            q = q.replace(/^\$/g, '');

            jQuery.each(strs, function (i, str) {
                if (JSON.stringify(str).toLowerCase().indexOf(q.toLowerCase()) !== -1) {
                    matches.push({
                        key: `\$${str.key}`,
                        value: str.value
                    });
                }
            });
            cb(matches);
        };
    }

    onChange(what, event) {
        const environmentVariable = this.props.variable;

        if (what === "key") {
            environmentVariable.setKey(event.target.value);
        }
        if (what === "value") {
            environmentVariable.setValue(event.target.value);
        }

        this.props.onChange();
    }
}
function mapStateToScope(state) {
    return {
        envVars: state.app.envVars
    }
}
export default connect(mapStateToScope)(EnvInputField)