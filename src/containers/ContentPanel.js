import React from "react";
import {connect} from "react-redux";

class ContentPanel extends React.Component {
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

function mapStateToProps(state) {
    return state.app;

}
export default connect(mapStateToProps)(ContentPanel);
