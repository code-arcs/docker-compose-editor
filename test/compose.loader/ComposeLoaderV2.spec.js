const expect = require('chai').expect;

const ComposeLoaderV2 = require('../../src/js/compose.loader.v2');
const yaml = require('./parsedYaml.json');
import {Service, RestartPolicy, BaseImage, PortMapping, EnvironmentVariable} from "../../src/domain";

describe('ComposeLoaderV2', function () {
    beforeEach(() => {
        this.compose = new ComposeLoaderV2(yaml);
    });

    it('should load services.', () => {
        const services = this.compose.getServices();
        const firstService = services[0];

        expect(services.length).to.eql(6);
        expect(firstService).to.be.instanceOf(Service);
        expect(firstService.getName()).to.eql("apigateway");
        expect(firstService.getBaseImage()).to.eql(new BaseImage("quay.io/gbtec/biccloud-apigateway-sidecar-service"));
        expect(firstService.getRestartPolicy()).to.eql(RestartPolicy.UNLESS_STOPPED);
        expect(firstService.getPortMappings().length).to.eql(2);
        expect(firstService.getPortMappings()[0]).to.eql(new PortMapping(8087, 8080));
        expect(firstService.getPortMappings()[1]).to.eql(new PortMapping(8000, 8000));
        expect(firstService.getEnvironmentVariables().length).to.eql(11);
        expect(firstService.getEnvironmentVariables()[0]).to.eql(EnvironmentVariable.create('NODE_ENV', 'production'));
    });
});