import React from 'react';
import './upload_button.css';

class UploadButton extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			filename: undefined,
			invalid: undefined,
		};
		this.fileInput = React.createRef();
	}

	render() {
		let filenameMessage = '';
		if (this.state.filename) {
			filenameMessage = `File uploaded: ${this.state.filename}`;
		}
		return (
			<div className="upload-button-container">
	      <button className="upload-button" type="button" onClick={this.openFileDialog}>
	      	Upload
	      </button>
	      <div className="upload-button-filename">
	      	{filenameMessage}
	      </div>
	      <div className={`upload-button-invalid ${this.state.invalid ? '' : 'noshow'}`}>
	      Please upload your movie
	      </div>
	      <input
	      	ref={this.fileInput}
	      	type="file"
	      	accept="video/*"
	      	name="movie"
	      	onChange={this.handleUpload}
	        style={{display: "none"}} />
      </div>
    );
	}

	openFileDialog = (e) => {
		this.fileInput.current.click();
	}

	handleUpload = (e) => {
		const file = this.getFile();
		if (file) {
			this.setState({
				filename: file.name,
				invalid: false,
			})
		}
	}

	getFile() {
		return this.fileInput.current.files[0];
	}

	validate() {
		if (!this.getFile()) {
			this.setState({
				invalid: true,
			})
			return false;
		}
		return true;
	}
}

export default UploadButton;