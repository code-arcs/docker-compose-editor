import React, {PropTypes} from "react";
import {connect} from "react-redux";
import * as Actions from "../actions";


const jQuery = require('jquery');
const typeahead = require('../../node_modules/typeahead.js/dist/typeahead.jquery');

class EnvInputField extends React.Component {
    handleDelete() {
        this.props.onChange(Actions.deleteEnvVariable(this.props.index));
    }

    componentDidMount() {
        const jQuery2 = jQuery(`#env_${this.props.index}`);
        jQuery2.typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            },
            {
                name: 'states',
                source: this.substringMatcher(this.props.envVars),
                display: 'key',
                templates: {
                    empty: [
                        '<div class="empty-message">',
                        'unable to find any Best Picture winners that match the current query',
                        '</div>'
                    ].join('\n'),
                    suggestion: (res) => {
                        console.log(res);
                        return `<strong>\$${res.key}:${res.value}</strong>`
                    }
                }
            });
    }

    substringMatcher(strs) {
        return function findMatches(q, cb) {
            const matches = [];
            jQuery.each(strs, function (i, str) {
                if (str.key.indexOf(q) !== -1) {
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
        let key = this.props.variable.key;
        let value = this.props.variable.value;

        if (what === "key") {
            key = event.target.value;
        }
        if (what === "value") {
            value = event.target.value;
        }

        this.props.onChange(Actions.updateEnvVariable({
            idx: this.props.index,
            key: key,
            value: value
        }));
    }

    render() {
        const key = this.props.variable.key;
        const value = this.props.variable.value;

        return (
            <div className="form-control-wrapper">
                <input type="text" className="form-control" value={key} onChange={this.onChange.bind(this, "key")}/>
                <span className="separator">:</span>
                <input type="text" className="form-control typeahead" value={value} id={"env_" + this.props.index}
                       onChange={this.onChange.bind(this, "value")}/>
                <span className="separator">
                    <a onClick={this.handleDelete.bind(this)}>
                        <svg className="icon icon-delete"><use xlinkHref="#delete"/></svg>
                    </a>
                </span>
            </div>
        )
    }
}
function mapStateToScope(state) {
    return {
        envVars: state.app.envVars
    }
}
export default connect(mapStateToScope)(EnvInputField)