import React from "react";

export default class ContentPanel extends React.Component {
    render() {
        return (
            <div className="content-panel">
                {this.props.content}
            </div>
        )
    }
}