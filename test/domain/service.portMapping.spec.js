const expect = require('chai').expect;

import {Service} from "../../src/domain";

describe('Service: Port Mapping', function () {
    beforeEach(() => {
        this.service = new Service();
    });

    it('should set port mapping based on numbers.', () => {
        this.service.addPortMapping('1337', '8080');
        expect(this.service.getPortMappings()[0].getExternalPort()).to.equal('1337');
        expect(this.service.getPortMappings()[0].getInternalPort()).to.equal('8080');
    });

    it('should set port mapping based on string.', () => {
        this.service.addPortMapping('1337:8080');
        expect(this.service.getPortMappings()[0].getExternalPort()).to.equal('1337');
        expect(this.service.getPortMappings()[0].getInternalPort()).to.equal('8080');
    });

    it('should set port mapping based on string.', () => {
        this.service.addPortMapping('8080');
        expect(this.service.getPortMappings()[0].getExternalPort()).to.equal('');
        expect(this.service.getPortMappings()[0].getInternalPort()).to.equal('8080');
    });

    it('should set port mapping based on string with range.', () => {
        this.service.addPortMapping('8080-8090');
        expect(this.service.getPortMappings()[0].getExternalPort()).to.equal('');
        expect(this.service.getPortMappings()[0].getInternalPort()).to.equal('8080-8090');
    });

    it('should set port mapping based on string with range internal / external.', () => {
        this.service.addPortMapping('7070-7080:8080-8090');
        expect(this.service.getPortMappings()[0].getExternalPort()).to.equal('7070-7080');
        expect(this.service.getPortMappings()[0].getInternalPort()).to.equal('8080-8090');
    });

    it('should set port mapping based on string with range internal / external having different range sizes.', () => {
        expect(() => this.service.addPortMapping('7070:8080-8090')).to.throw(Error);
        expect(() => this.service.addPortMapping('7070-7071:8080')).to.throw(Error);
        expect(() => this.service.addPortMapping('7071-7070:8080-8081')).to.throw(Error);
        expect(() => this.service.addPortMapping('7071-7070')).to.throw(Error);
    });
});
