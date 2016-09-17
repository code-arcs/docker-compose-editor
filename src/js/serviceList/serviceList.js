const React = require('react');
const ReactDOM = require('react-dom');

React.createClass({
    render: () => {
        return (
            <ul class="service-list">
                {this.props.list.map((listValue) => {
                    return (
                        <li class="service-list-item" style="text-align: center;">
                            {listValue}
                        </li>
                    )
                })}
            </ul>
        )
    }
});