import ComposeLoader from "../js/compose.loader";
import {ipcRenderer} from "electron";
import * as Actions from "../actions";
import * as pkg from "../../package.json";

export class IPC {
    static register(props) {
        ipcRenderer.on('open-file', (event, data) => {
            props.dispatch(Actions.openFile(data));
            document.title = pkg.productName;
        });

        ipcRenderer.on('export', () => {
            console.log(props);
            ipcRenderer.send('export-data', ComposeLoader.toYaml(props));
        });

        ipcRenderer.on('export.docker-service', () => {

        });

        ipcRenderer.on('save', () => {
            ipcRenderer.send('save-data', JSON.stringify({
                envVars: props.envVars,
                services: props.services
            }));
        });

        ipcRenderer.on('import', (event, filename) => {
            props.dispatch(Actions.importComposeFile(filename));
        });
    }
}
