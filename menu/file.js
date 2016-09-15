const {dialog} = require('electron');

module.exports = {
    label: 'File',
    submenu: [
        {
            label: 'Open...',
            click () {
                const newVar = {
                    properties: ['openFile'],
                    filters: [
                        {name: 'Docker Compose', extensions: ['yml', 'yaml']},
                        {name: 'All files', extensions: ['*']}
                    ]
                };
                console.log(dialog.showOpenDialog(newVar));
            }
        }
    ]
};