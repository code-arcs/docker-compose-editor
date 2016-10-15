const should = require('chai').should();

import {Service, RestartPolicy} from "../../src/domain";

describe('Service: Restart Policy', function() {
    beforeEach(() => {
        this.service = new Service();
    });

    it('should set restart policy based on string.', () => {
        this.service.setRestartPolicy('ON_FAILURE');
        this.service.getRestartPolicy().should.equal(RestartPolicy.ON_FAILURE);
    });

    it('should set restart policy based on constant.', () => {
        this.service.setRestartPolicy(RestartPolicy.ON_FAILURE);
        this.service.getRestartPolicy().should.equal(RestartPolicy.ON_FAILURE);
    });

    it('should set default restart policy when invalid key is provided.', () => {
        this.service.setRestartPolicy('invalid');
        this.service.getRestartPolicy().should.equal(RestartPolicy.NO);
    });
});
