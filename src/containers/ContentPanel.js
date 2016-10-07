import React from "react";

export default class ContentPanel extends React.Component {
    render() {
        let sidebar;
        if (this.props.sidebar) {
            sidebar = (
                <div className="sidebar">
                    {this.props.sidebar}
                </div>
            );
        }

        return (
            <div className="content-panel">
                {sidebar}
                <div className="content">
                    {this.props.content}
                </div>
            </div>
        )
    }
}