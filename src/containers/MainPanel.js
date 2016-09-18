import React from 'react'

export default class MainPanel extends React.Component {
    render() {
        return (
            <div className="main-panel">
                {this.props.content}
            </div>
        )
    }
}