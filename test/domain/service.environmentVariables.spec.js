const expect = require('chai').expect;

import {Service} from "../../src/domain";

describe('Service: EnvVars', function () {
    beforeEach(() => {
        this.service = new Service();
    });

    it('should set environment variable by key, value.', () => {
        this.service.addEnvironmentVariable('a', 1);
        expect(this.service.getEnvironmentVariables()[0]).to.eql({_key: 'a', _value: 1});
    });

    it('should replace environment variable in value.', () => {
        this.service.addEnvironmentVariable('A', 'env A!');
        this.service.addEnvironmentVariable('B', 'Value from $A');
        expect(this.service.getEnvironmentVariable('B', true)).to.eql({_key: 'B', _value: 'Value from env A!'});
    });

    it('should replace environment variables in value.', () => {
        this.service.addEnvironmentVariable('A', 'Hello,');
        this.service.addEnvironmentVariable('B', 'I am');
        this.service.addEnvironmentVariable('C', 'a string!');
        this.service.addEnvironmentVariable('D', '$A $B $C');
        expect(this.service.getEnvironmentVariable('D', true)).to.eql({_key: 'D', _value: 'Hello, I am a string!'});
        expect(this.service.getEnvironmentVariable('D')).to.eql({_key: 'D', _value: '$A $B $C'});
    });
});
