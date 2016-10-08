import React from "react";
import {connect} from "react-redux";
import {ipcRenderer} from "electron";
import LeftPanel from "./LeftPanel";
import ContentPanel from "./ContentPanel";
import StatusBarPanel from "./StatusBarPanel";
import ComposeLoader from "../js/compose.loader";
import * as Actions from "../actions";
import * as pkg from "../../package.json";

class App extends React.Component {
    componentDidMount() {
        ipcRenderer.on('open-file', (event, data) => {
            this.props.dispatch(Actions.openFile(data));
            document.title = pkg.productName;
        });

        ipcRenderer.on('export', () => {
            ipcRenderer.send('export-data', ComposeLoader.toYaml(this.props));
        });

        ipcRenderer.on('save', () => {
            ipcRenderer.send('save-data', JSON.stringify({
                envVars: this.props.envVars,
                services: this.props.services
            }));
        });

        ipcRenderer.on('import', (event, filename) => {
            this.props.dispatch(Actions.importComposeFile(filename));
        });
    }

    render() {
        return (
            <div className="main-panel">
                <main>
                    <LeftPanel/>
                    <ContentPanel {...this.props} sidebar={this.props.sidebar} content={this.props.content}/>
                </main>
                <StatusBarPanel/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.app;
}
export default connect(mapStateToProps)(App)