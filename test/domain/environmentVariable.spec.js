const expect = require('chai').expect;

import {EnvironmentVariable} from "../../src/domain";

describe('EnvironmentVariable', function () {
    it('should override toJSON.', () => {
        const envVar = EnvironmentVariable.create("A", 1);
        expect(JSON.stringify(envVar)).to.equal('{"_key":"A","_value":1}');
    });
});
