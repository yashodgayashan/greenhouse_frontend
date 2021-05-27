import React, { Component } from "react";
import ResourceAPIs from "../../utils/ResourceAPI";

class Harvest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: "",
      responseImage: "",
      responseImagePreviewUrl: ""
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("file", this.state.file);

    new ResourceAPIs().predictHarvest(data).then(response => {
      this.setState({ responseImage: response.data });
      let readerTwo = new FileReader();
      let fileTwo = response.data;
      let fileThree = fileTwo.blob();
      readerTwo.onloadend = () => {
        this.setState({
          responseImagePreviewUrl: readerTwo.result
        });
      };
      readerTwo.readAsDataURL(fileThree);
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
    let { imagePreviewUrl, responseImagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} />;
    }

    return (
      <div>
        <form onSubmit={this._handleSubmit}>
          <input type="file" onChange={this._handleImageChange} />
          <button type="submit" onClick={this._handleSubmit}>
            Upload Image
          </button>
        </form>
        {$imagePreview}
      </div>
    );
  }
}

export default Harvest;
