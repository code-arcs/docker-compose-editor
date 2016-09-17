'use strict';
const YAML = require('yamljs');
const fs = require('fs');
const ComposeLoaderV2 = require('./compose.loader.v2');

module.exports = class ComposeLoader {
    static createFromFile(file) {
        const content = fs.readFileSync(file, 'utf8');
        const yaml = YAML.parse(content);

        if(ComposeLoader._isVersion(yaml, '2')) {
            return new ComposeLoaderV2(yaml, content);
        }

        throw "Unrecognized Docker Compose file.";
    }

    static _isVersion(yaml, version) {
        return yaml.version && yaml.version === version || yaml.services;
    }
};