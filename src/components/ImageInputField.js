import React, {PropTypes} from "react";

class ImageInputField extends React.Component {
    render() {
        const image = this.props.image;
        const split = image.split(':');
        const imageName = split[0];
        const imageTag = split[1] || "latest"

        return (
            <div className="form-group">
                <label htmlFor="exampleInputName2">Name</label>
                <input type="text" className="form-control" value={imageName}/>
                <input type="text" className="form-control" value={imageTag}/>
            </div>
        )
    }
}
export default ImageInputField