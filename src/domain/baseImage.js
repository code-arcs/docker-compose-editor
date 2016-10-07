export class BaseImage {
    constructor(image) {
        if(image.indexOf(':') !== -1) {
            const imageName = image.split(':');
            this._image = imageName[0];
            this._tag = imageName[1] || 'latest';
        }
        else if(image.indexOf('@') !== -1) {
            const imageName = image.split('@');
            this._image = imageName[0];
            this._digest = imageName[1];
            if(this._digest.trim() === '') {
                this._tag = 'latest';
                this._digest = undefined;
            }
        }
        else {
            this._image = image;
            this._tag = 'latest';
        }
    }

    getImage() {
        return this._image;
    }

    getTag() {
        return this._tag;
    }

    getDigest() {
        return this._digest;
    }

    toString(dropLatest = false) {
        const toString = [this._image];
        if(this._tag) {
            if(this._tag !== 'latest') {
                toString.push(':');
                toString.push(this._tag);
            } else if(!dropLatest) {
                toString.push(':');
                toString.push(this._tag);
            }
        }
        if(this._digest) {
            toString.push('@');
            toString.push(this._digest);
        }

        return toString.join('');
    }
}
