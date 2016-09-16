'use strict';
const expect = require('chai').expect;
const ComposeLoader = require('../js/compose.loader');
const ComposeLoaderV2 = require('../js/compose.loader.v2');
const fs = require('fs');

describe('ComposeLoaderV2', function () {
    it('retrieves services correclty.', function () {
        const Compose = ComposeLoader.createFromFile(__dirname + '/fixtures/docker-compose.v2.yml');
        expect(Compose).to.be.an.instanceOf(ComposeLoaderV2);
        expect(Compose.getActiveServices()).to.have.lengthOf(8);
        expect(Compose.getInactiveServices()).to.have.lengthOf(1);
    });
});