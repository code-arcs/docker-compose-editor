const expect = require('chai').expect;

import {Service} from "../../src/domain";
import {EnvironmentVariableHelper} from "../../src/utils/environmentVariable";
import {EnvironmentVariable} from "../../src/domain/environmentVariable";

describe('EnvironmentVariableHelper', function () {
    const ENV_IP = EnvironmentVariable.create("IP", "127.0.0.1");
    const ENV_PORT = EnvironmentVariable.create("PORT", "8080");
    const ENV_HOST = EnvironmentVariable.create("HOST", "http://$IP/");
    const ENV_HOST_W_PORT = EnvironmentVariable.create("HOST_W_PORT", "http://$IP:$PORT/");

    it('should do nothing for env vars without vars.', () => {
        const service = new Service();
        service.addEnvironmentVariable("A", "A value");

        const serviceWithReplacements = EnvironmentVariableHelper.replaceEnvWithGlobalEnv(service);
        expect(service.getEnvironmentVariables()[0]).to.eql(EnvironmentVariable.create("A", "A value"));
        expect(serviceWithReplacements.getEnvironmentVariables()[0]).to.eql(EnvironmentVariable.create("A", "A value"));
    });

    it('should replace one var in global env vars.', () => {
        const service = new Service();
        service.addEnvironmentVariable("A", "$HOST");

        const globalEnvs = EnvironmentVariableHelper._resolveVarsInGlobalEnv([ENV_HOST, ENV_IP]);
        expect(globalEnvs[0]).to.eql(EnvironmentVariable.create("HOST", "http://127.0.0.1/"));
        expect(ENV_HOST).to.eql(EnvironmentVariable.create("HOST", "http://$IP/"));
    });

    it('should replace multiple vars in global env vars.', () => {
        const service = new Service();
        service.addEnvironmentVariable("A", "$HOST");

        const globalEnvs = EnvironmentVariableHelper._resolveVarsInGlobalEnv([ENV_HOST_W_PORT, ENV_IP, ENV_PORT]);
        expect(globalEnvs[0]).to.eql(EnvironmentVariable.create("HOST_W_PORT", "http://127.0.0.1:8080/"));
        expect(ENV_HOST_W_PORT).to.eql(EnvironmentVariable.create("HOST_W_PORT", "http://$IP:$PORT/"));
    });

    it('should replace env vars having vars.', () => {
        const service = new Service();
        service.addEnvironmentVariable("A", "$IP");

        const serviceWithReplacements = EnvironmentVariableHelper.replaceEnvWithGlobalEnv(service, [ENV_HOST, ENV_IP]);
        expect(service.getEnvironmentVariables()[0]).to.eql(EnvironmentVariable.create("A", "$IP"));
        expect(serviceWithReplacements.getEnvironmentVariables()[0]).to.eql(EnvironmentVariable.create("A", "127.0.0.1"));
    });

    it('should replace env vars having global vars containing vars.', () => {
        const service = new Service();
        service.addEnvironmentVariable("A", "$HOST_W_PORT");

        const serviceWithReplacements = EnvironmentVariableHelper.replaceEnvWithGlobalEnv(service, [ENV_HOST_W_PORT, ENV_IP, ENV_PORT]);
        expect(service.getEnvironmentVariables()[0]).to.eql(EnvironmentVariable.create("A", "$HOST_W_PORT"));
        expect(serviceWithReplacements.getEnvironmentVariables()[0]).to.eql(EnvironmentVariable.create("A", "http://127.0.0.1:8080/"));
    });

    it('should replace complex 1.', () => {
        const globalEnvs = [
            EnvironmentVariable.create("IP", "127.0.0.1"),
            EnvironmentVariable.create("MIDDLEWARE_URL", "$IP"),
            EnvironmentVariable.create("MIDDLEWARE_API_URL", "$MIDDLEWARE_URL/api"),
        ];

        const service = new Service();
        service.addEnvironmentVariable("middleware_url", "$MIDDLEWARE_URL");
        service.addEnvironmentVariable("middleware_apiUrl", "$MIDDLEWARE_API_URL");

        const serviceWithReplacements = EnvironmentVariableHelper.replaceEnvWithGlobalEnv(service, globalEnvs);
        expect(serviceWithReplacements.getEnvironmentVariable("middleware_url").getValue()).to.eql("127.0.0.1");
        expect(serviceWithReplacements.getEnvironmentVariable("middleware_apiUrl").getValue()).to.eql("127.0.0.1/api");
    });
});
