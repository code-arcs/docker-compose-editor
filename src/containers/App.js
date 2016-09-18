import React from "react";
import {connect} from "react-redux";
import {ipcRenderer} from "electron";
import LeftPanel from "./LeftPanel";
import ContentPanel from "./MainPanel";
import StatusBarPanel from "./StatusBarPanel";
import * as Actions from '../actions'


class App extends React.Component {
    componentDidMount() {
        ipcRenderer.on('open-file', (event, filename) => {
            this.props.dispatch(Actions.openFile(filename))
        });
    }

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
export default connect()(App)