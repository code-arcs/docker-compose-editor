const {Menu} = require('electron');

const template = [
    require('./file'),
    require('./edit'),
    require('./help')
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);