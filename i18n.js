const electron = require('electron');
const app = electron.app;

module.exports = function(what) {
    let strings;
    try {
        strings = require(`./locales/${locale}.json`);
    } catch(e) {
        strings = require(`./locales/de.json`);
    }

    what.split('.').forEach(p => strings = (strings[p] || {}));
    return (typeof strings === 'string') ? strings : what;
};