import React, {PropTypes} from "react";
const _ = require('../../i18n');

class ImageInputField extends React.Component {
    onChange() {

    }

    render() {
        let imageName = "";
        let imageTag = "";

        const image = this.props.image;
        if(image) {
            const split = image.split(':');
            imageName = split[0];
            imageTag = split[1] || "latest";
        }

        return (
            <div className="form-group docker-image">
                <label htmlFor="exampleInputName2">{_('Image name')}</label>
                <div className="form-control-wrapper">
                    <input type="text"
                           className="form-control docker-image-name"
                           value={imageName}
                           onChange={this.onChange}/>
                    <span className="separator">:</span>
                    <input type="text"
                           className="form-control docker-image-tag"
                           value={imageTag}
                           onChange={this.onChange}/>
                </div>
            </div>
        )
    }
}
export default ImageInputField