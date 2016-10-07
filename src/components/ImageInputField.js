import React, {PropTypes} from "react";
import {connect} from "react-redux";
import * as Action from "../actions";
const _ = require('../../i18n');

class ImageInputField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const image = this.props.service.getBaseImage();
        this.state.imageType = image.getType();

        return (
            <div className="form-group docker-image">
                <label htmlFor="exampleInputName2">{_('Image name')}</label>
                <div className="form-control-wrapper">
                    <input type="text"
                           className="form-control docker-image-name"
                           value={image.getImage()}
                           onChange={this.onChange.bind(this, 'image')}/>
                    <select className="form-control image-type"
                            value={this.state.imageType}
                            onChange={this.onChange.bind(this, 'type')}>
                        <option>:</option>
                        <option>@</option>
                    </select>
                    <input type="text"
                           className="form-control docker-image-tag"
                           value={image.getTag()}
                           onChange={this.onChange.bind(this, 'tag')}/>
                </div>
            </div>
        )
    }

    onChange(what, event) {
        const baseImage = this.props.service.getBaseImage();
        if (what === 'type') {
            const val = baseImage.getTag() || baseImage.getDigest() || "";
            if (event.target.value === ':') {
                baseImage.setTag(val);
            } else {
                baseImage.setDigest(val);
            }
        }
        if (what === 'image') {
            baseImage.setImage(event.target.value);
        }
        if (what === 'tag') {
            if (this.state.imageType === ':') {
                baseImage.setTag(event.target.value);
            } else {
                baseImage.setDigest(event.target.value);
            }
        }
        this.props.dispatch(Action.updateService(this.props.service));
    }
}
export default connect()(ImageInputField);
