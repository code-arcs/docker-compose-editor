const {ipcRenderer} = require('electron');
const fs = require('fs');
const YAML = require('yamljs');
const DockerComposeLoader = require('./compose.loader');

ipcRenderer.on('open-file', (event, arg) => {
    if(arg && arg[0]) {
        const dockerCompose = DockerComposeLoader.load(arg[0]);
        const content = fs.readFileSync(arg[0], 'utf8');
        const activeServices = YAML.parse(content);


        renderServiceList(Object.keys(activeServices));
        renderServiceList(Object.keys(inActiveServices), false);
    }
});

function renderServiceList(services, active = true) {
    services.map(service => {
        const li = document.createElement('li');
        li.className = "service-list-item";

        const a = document.createElement('a');
        a.href = "#";
        a.innerText = service;

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = active;

        li.appendChild(a);
        //li.appendChild(input);
        document.getElementsByClassName('service-list')[0].appendChild(li);
    });
}