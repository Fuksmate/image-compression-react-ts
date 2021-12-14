import React from 'react';
import imageCompression from 'browser-image-compression';
import "./compressor.css"

export default class Compression extends React.Component {
  state = {
    compressedLink: "",
    originalImage: "",
    originalLink: "",
    outputFileName: "",
    clicked: false,
    uploadImage: false
  };

  handleClick(event: any) {

    const imageFile = event.target.files[0];
    this.setState({
      originalLink: URL.createObjectURL(imageFile),
      originalImage: imageFile,
      outputFileName: imageFile.name,
      uploadImage: true
    })

  };

  changeValue(event: any) {
    this.setState({ [event.target.name]: event.target.value });
  };

  click(event: any) {
    event.preventDefault();
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWOrker: true
    };

    let cos = this.state.originalImage as unknown as File;
    if (options.maxSizeMB >= cos.size) {
      alert("Grafika jest za mała");
      return 0;
    }

    let output;
    imageCompression(cos, options).then(x => {
      output = x;

      const downloadLink = URL.createObjectURL(output);
      this.setState({
        compressedLink: downloadLink
      });
    });
    this.setState({ clicked: true });

    return 1;
  }

  render() {
    return (
      <div>
        {this.state.uploadImage ? (
          <img alt="" srcSet={this.state.originalLink} />
        ) : (
          <img alt="" src="https://techblog.sdstudio.top/wp-content/uploads/2021/09/ba11d056cec27254d89b310745e4071b-1.png" />
        )}
        <div>
          <label htmlFor="file-upload" className="custom-file-upload">
            Upload
          </label>
          <input id="file-upload" type="file" accept="image/*" onChange={event => this.handleClick(event)} />
        </div>
        <div>
          <br />
          {this.state.outputFileName ? (
            <button className="custom-file-button" type="button" onClick={event => this.click(event)}>Kompresuj</button>
          ) : (
            <></>
          )}
        </div>
        <div>
          <img className='image' alt="" srcSet={this.state.compressedLink} />
          {this.state.clicked ? (
            <div>
              <a href={this.state.compressedLink} download={this.state.outputFileName}>Download</a>
            </div>) : (
            <></>
          )
          }
        </div>
      </div>
    )
  }
};