const {ipcRenderer} = require('electron');
const fs = require('fs');
const YAML = require('yamljs');
const ComposeLoader = require('./compose.loader');

ipcRenderer.on('open-file', (event, arg) => {
    if(arg && arg[0]) {
        const Compose = ComposeLoader.createFromFile(arg[0]);
        const content = fs.readFileSync(arg[0], 'utf8');
        const activeServices = YAML.parse(content);


        renderServiceList(Compose.getActiveServices());
        renderServiceList(Compose.getInactiveServices(), false);
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