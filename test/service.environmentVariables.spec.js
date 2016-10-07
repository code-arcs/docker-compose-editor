const expect = require('chai').expect;

import {Service, RestartPolicy} from "../src/domain";

describe('Service: EnvVars', function() {
    beforeEach(() => {
        this.service = new Service();
    });

    it('should set environment variable by key, value.', () => {
        this.service.addEnvironmentVariable('a', 1);
        expect(this.service.getEnvironmentVariables()[0]).to.eql({_key: 'a', _value: 1});
    });
});