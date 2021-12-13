import React from 'react';
import imageCompression from 'browser-image-compression';

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
          <img alt="asd" srcSet={this.state.originalLink} />
        ) : (
          <img alt="asdsa" src="https://navparivartan.in/wp-content/uploads/2018/11/placeholder.png" />
        )}
        <div>
          <input type="file" accept="image/*" onChange={event => this.handleClick(event)} />
        </div>
        <div>
          <br />
          {this.state.outputFileName ? (
            <button type="button" onClick={event => this.click(event)}>Cliasdadck</button>
          ) : (
            <></>
          )}
        </div>
        <div>
          <img alt="ad" srcSet={this.state.compressedLink} />
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