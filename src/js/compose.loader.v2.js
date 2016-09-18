'use strict';
const YAML = require('yamljs');

module.exports = class ComposeLoaderV2 {
    constructor(yaml, content) {
        this.yaml = yaml;
        this.parsePlainContent(content);
    }

    getActiveServices() {
        return this.yaml.services;
    }

    getInactiveServices() {
        return this.inactiveServices;
    }

    parsePlainContent(content) {
        let commentedOutLines = content.match(/^\s*#.*/mg);
        commentedOutLines = (commentedOutLines || []).join('\n').replace(/^(\s*)#/mg, '$1');
        this.inactiveServices = YAML.parse(commentedOutLines);
    }
};
