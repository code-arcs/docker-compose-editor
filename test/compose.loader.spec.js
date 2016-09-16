'use strict';
const expect = require('chai').expect;
const ComposeLoader = require('../js/compose.loader');
const ComposeLoaderV2 = require('../js/compose.loader.v2');
const fs = require('fs');

describe('ComposeLoader', function () {
    it('detects compose version by version field.', function () {
        const Compose = ComposeLoader.createFromFile(__dirname + '/fixtures/docker-compose.v2.yml');
        expect(Compose).to.be.an.instanceOf(ComposeLoaderV2);
    });

    it('detects compose version by services field.', function () {
        const Compose = ComposeLoader.createFromFile(__dirname + '/fixtures/docker-compose.v2.byServicesField.yml');
        expect(Compose).to.be.an.instanceOf(ComposeLoaderV2);
    });

    it('throws error when unrecognized file content is found.', function () {
        const fn = () => ComposeLoader.createFromFile(__dirname + '/fixtures/docker-compose.v1.yml');
        expect(fn).to.throw();
    });
});