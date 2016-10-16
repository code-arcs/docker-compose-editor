import React from "react";
import {connect} from "react-redux";
import LeftPanel from "./LeftPanel";
import ContentPanel from "./ContentPanel";
import StatusBarPanel from "./StatusBarPanel";
import {IPC} from "../ipc";

class App extends React.Component {
    componentDidMount() {
        IPC.register(this.props);
    }

    render() {
        return (
            <div className="main-panel">
                <main>
                    <LeftPanel {...this.props}/>
                    <ContentPanel {...this.props} />
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
