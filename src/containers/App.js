import React from "react";
import LeftPanel from './LeftPanel'
import ContentPanel from './MainPanel'
import StatusBarPanel from './StatusBarPanel'

class App extends React.Component {
    render() {
        return (
            <div className="main-panel">
                <main>
                    <LeftPanel/>
                    <ContentPanel content={this.props.content}/>
                </main>
                <StatusBarPanel/>
            </div>
        )
    }
}
export default App