import GoButton from './go_button';
import Header from './header';
import React from 'react';
import TimestampRadioButtons from './timestamp_radio_buttons';
import UploadButton from './upload_button';
import './app.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.uploadButton = React.createRef();
  }

  render() {
    return (
      <div className="app">
        <Header/>
        <div className="contents">
          <div className="intro-text">
            <span>
              Add a precise timer to any video file. Great for video analysis and editing!
            </span>
          </div>
          <form
            name="burn-in-time-code"
            action="/burn-timecode"
            method="POST"
            enctype="multipart/form-data"
            onSubmit={this.handleSubmit}>
            <div className="step">
              <div className="step-heading">
                1. Upload your movie file
              </div>
              <div className="step-contents">
                <UploadButton ref={this.uploadButton}/>
              </div>
            </div>
            <div className="step">
              <div className="step-heading">
                2. Choose your time code location
              </div>
              <div className="step-contents">
                <TimestampRadioButtons />
              </div>
            </div>
            <div className="step">
              <div className="step-heading">
                3. Add the timestamp! (Click the button)
              </div>
            </div>
            <div className="step-contents">
              <GoButton />
            </div>
          </form>
        </div>
      </div>
    );
  }

  handleSubmit = (e) => {
    if (!this.uploadButton.current.validate()) {
      e.preventDefault();
    }

  }
}

export default App;
