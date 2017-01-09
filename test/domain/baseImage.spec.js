const expect = require('chai').expect;

import {BaseImage} from "../../src/domain";

describe('BaseImage', function () {
    beforeEach(() => {
        this.baseImage = new BaseImage();
    });

    it('should return type for tag.', () => {
        this.baseImage.setImage("ab");
        this.baseImage.setTag("tag");
        expect(this.baseImage.getType()).to.equal(':');
    });

    it('should return type for digest.', () => {
        this.baseImage.setImage("ab");
        this.baseImage.setDigest("digest");
        expect(this.baseImage.getType()).to.equal('@');
    });

    it('should clean digest or tag when setting the counterpart.', () => {
        this.baseImage.setImage("ab");
        this.baseImage.setTag("tag");
        this.baseImage.setDigest("digest");
        expect(this.baseImage.getTag()).to.equal(undefined);

        this.baseImage.setImage("ab");
        this.baseImage.setDigest("digest");
        this.baseImage.setTag("tag");
        expect(this.baseImage.getDigest()).to.equal(undefined);
    })
});
