const expect = require('chai').expect;

import {Service, RestartPolicy} from "../../../src/domain";
import {ShellDockerServiceExporter} from "../../../src/exporter/shell/docker-service";

describe('ShellDockerServiceExporter', function() {
    it('should convert image.', () => {
        const service = new Service("database");
        service.setBaseImage("mysql:5.6");

        const shellCommand = ShellDockerServiceExporter.getShellCommand(service);

        expect(shellCommand).to.equal('docker service create --name database mysql:5.6');
    });

    it('should convert env vars.', () => {
        const service = new Service("database");
        service.setBaseImage("mysql:5.6");
        service.addEnvironmentVariable("NODE_ENV", "development");

        const shellCommand = ShellDockerServiceExporter.getShellCommand(service);

        expect(shellCommand).to.equal('docker service create --name database --env NODE_ENV=development mysql:5.6');
    });

    it('should resolve env values.', () => {
        const service = new Service("database");
        service.setBaseImage("mysql:5.6");
        service.addEnvironmentVariable("A", "aaa");
        service.addEnvironmentVariable("B", "$A bbb");

        const shellCommand = ShellDockerServiceExporter.getShellCommand(service);

        expect(shellCommand).to.equal('docker service create --name database --env A=aaa --env B=aaa bbb mysql:5.6');
    });

    it('should convert ports.', () => {
        const service = new Service("database");
        service.setBaseImage("mysql:5.6");
        service.addPortMapping(1337, 3360);
        service.addPortMapping(8080);

        const shellCommand = ShellDockerServiceExporter.getShellCommand(service);

        expect(shellCommand).to.equal('docker service create --name database --publish 1337:3360 --publish 8080 mysql:5.6');
    });

    it('should convert restart-policy.', () => {
        const service = new Service("database");
        service.setBaseImage("mysql:5.6");

        service.setRestartPolicy(RestartPolicy.ON_FAILURE);
        let shellCommand = ShellDockerServiceExporter.getShellCommand(service);
        expect(shellCommand).to.equal('docker service create --name database --restart-condition on-failure mysql:5.6');

        service.setRestartPolicy(RestartPolicy.NO);
        shellCommand = ShellDockerServiceExporter.getShellCommand(service);
        expect(shellCommand).to.equal('docker service create --name database mysql:5.6');

        service.setRestartPolicy(RestartPolicy.ALWAYS);
        shellCommand = ShellDockerServiceExporter.getShellCommand(service);
        expect(shellCommand).to.equal('docker service create --name database --restart-condition any mysql:5.6');
    });

    it('should pretty print.', () => {
        const service = new Service("database");
        service.setBaseImage("mysql:5.6");
        service.addEnvironmentVariable("NODE_ENV", "development");

        const shellCommand = ShellDockerServiceExporter.getShellCommand(service, [], true);

        const actual = 'docker service create\n    --name database\n    --env NODE_ENV=development\n    mysql:5.6';
        expect(shellCommand).to.equal(actual);
    });
});
