import React, { Component } from "react";
import ResourceAPIs from "../../utils/ResourceAPI";

class DefectDetection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: "",
      defect: ""
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("file", this.state.file);

    new ResourceAPIs().predictDefect(data).then(response => {
      this.setState({
        defect: response.data
      })
    });
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} />;
    }

    return (
      <div>
      <div>
        <form onSubmit={this._handleSubmit}>
          <input type="file" onChange={this._handleImageChange} />
          <button type="submit" onClick={this._handleSubmit}>
            Upload Image
          </button>
        </form>
        {$imagePreview}
      </div>
      <div>
        {this.state.defect}
      </div>
      </div>
    );
  }
}

export default DefectDetection;
