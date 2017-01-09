const expect = require('chai').expect;

import {Service} from "../../src/domain";

describe('Service: Image', function () {
    beforeEach(() => {
        this.service = new Service();
    });

    it('should set image with tag based on string.', () => {
        this.service.setBaseImage('image:tag');
        expect(this.service.getBaseImage().getImage()).to.equal('image');
        expect(this.service.getBaseImage().getTag()).to.equal('tag');
        expect(this.service.getBaseImage().getDigest()).to.equal(undefined);
    });

    it('should set image with empty tag based on string.', () => {
        this.service.setBaseImage('image:');
        expect(this.service.getBaseImage().getImage()).to.equal('image');
        expect(this.service.getBaseImage().getTag()).to.equal('latest');
        expect(this.service.getBaseImage().getDigest()).to.equal(undefined);
    });

    it('should set image without tag based on string.', () => {
        this.service.setBaseImage('image');
        expect(this.service.getBaseImage().getImage()).to.equal('image');
        expect(this.service.getBaseImage().getTag()).to.equal('latest');
        expect(this.service.getBaseImage().getDigest()).to.equal(undefined);
    });

    it('should set image with digest based on string.', () => {
        this.service.setBaseImage('image@123');
        expect(this.service.getBaseImage().getImage()).to.equal('image');
        expect(this.service.getBaseImage().getTag()).to.equal(undefined);
        expect(this.service.getBaseImage().getDigest()).to.equal('123');
    });

    it('should set image with empty digest based on string.', () => {
        this.service.setBaseImage('image@');
        expect(this.service.getBaseImage().getImage()).to.equal('image');
        expect(this.service.getBaseImage().getTag()).to.equal('latest');
        expect(this.service.getBaseImage().getDigest()).to.equal(undefined);
    });

    it('should not fail when providing empty image name.', () => {
        this.service.setBaseImage();
        expect(this.service.getBaseImage().getImage()).to.equal(undefined);
        expect(this.service.getBaseImage().getTag()).to.equal(undefined);
        expect(this.service.getBaseImage().getDigest()).to.equal(undefined);
    });

    it('should return image as string.', () => {
        this.service.setBaseImage('image:123');
        expect(this.service.getBaseImage().toString()).to.equal('image:123');

        this.service.setBaseImage('image');
        expect(this.service.getBaseImage().toString()).to.equal('image:latest');

        this.service.setBaseImage('image');
        expect(this.service.getBaseImage().toString(true)).to.equal('image');

        this.service.setBaseImage('image@123');
        expect(this.service.getBaseImage().toString()).to.equal('image@123');
    })
});
