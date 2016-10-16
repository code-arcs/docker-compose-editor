import ComposeLoader from "../js/compose.loader";
import {ipcRenderer} from "electron";
import * as Actions from "../actions";
import * as pkg from "../../package.json";

export class IPC {
    static register(props) {
        [
            'open-file',
            'export',
            'export.docker-service',
            'save',
            'import'
        ].forEach(l => ipcRenderer.removeAllListeners(l))

        ipcRenderer.on('open-file', (event, data) => {
            props.dispatch(Actions.openFile(data));
            document.title = pkg.productName;
        });

        ipcRenderer.on('export', () => {
            console.log(props);
            ipcRenderer.send('export-data', ComposeLoader.toYaml(props.docker));
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
