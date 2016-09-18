import React from "react";
import LeftPanel from './LeftPanel'
import MainPanel from './MainPanel'
import StatusBarPanel from './StatusBarPanel'

class App extends React.Component {
    render() {
        return (
            <div className="main-panel">
                <main>
                    <LeftPanel/>
                    <MainPanel content={this.props.content}/>
                </main>
                <StatusBarPanel/>
            </div>
        )
    }
}
export default App