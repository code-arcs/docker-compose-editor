import ComposeLoader from "../js/compose.loader";
import {ipcRenderer} from "electron";
import * as Actions from "../actions";
import * as pkg from "../../package.json";
import {Service} from "../domain/service";
import {ShellDockerServiceExporter} from "../exporter/shell/docker-service";

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
            ipcRenderer.send('export', ComposeLoader.toYaml(props.docker));
        });

        ipcRenderer.on('export.docker-service', () => {
            const s = (props.docker.services)
                .filter(s => s.isActive())
                .map(s => Service.fromJSON(s))
                .map(s => ShellDockerServiceExporter.getShellCommand(s, props.docker.envVars, true))
                .join('\n\n');
            ipcRenderer.send('export.docker-service', s);
        });

        ipcRenderer.on('save', () => {
            ipcRenderer.send('save', JSON.stringify({
                envVars: props.docker.envVars,
                services: props.docker.services
            }));
        });

        ipcRenderer.on('import', (event, filename) => {
            props.dispatch(Actions.importComposeFile(filename));
        });
    }
}
