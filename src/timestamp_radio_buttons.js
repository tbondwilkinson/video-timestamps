import React from 'react';
import './timestamp_radio_buttons.css';

const LocationOption = {
	TopLeft: 'top-left',
	TopMiddle: 'top-middle',
	TopRight: 'top-right',
	BottomLeft: 'bottom-left',
	BottomMiddle: 'bottom-middle',
	BottomRight: 'bottom-right',
};

class TimestampRadioButtons extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedLocation: LocationOption.TopLeft,
		};
	}

	handleOptionChange = (e) => {
		this.setState({
			selectedLocation: e.target.value,
		});
	}

  render() {
  	return (
  		<div className="timestamp-radio-buttons">
  			<div className="radio-option">
	  			<input
	  				type="radio"
	  				id={LocationOption.TopLeft}
	  				name="location"
	  				value={LocationOption.TopLeft}
	  				checked={this.state.selectedLocation === LocationOption.TopLeft}
	  				onChange={this.handleOptionChange} />
	  			<label htmlFor={LocationOption.TopLeft}>Top Left</label>
  			</div>
  			<div className="radio-option">
	  			<input
	  				type="radio"
	  				id={LocationOption.TopMiddle}
	  				name="location"
	  				value={LocationOption.TopMiddle}
	  				checked={this.state.selectedLocation === LocationOption.TopMiddle}
	  				onChange={this.handleOptionChange} />
	  			<label htmlFor={LocationOption.TopMiddle}>Top Middle</label>
  			</div>
  			<div className="radio-option">
	  			<input
	  				type="radio"
	  				id={LocationOption.TopRight}
	  				name="location"
	  				value={LocationOption.TopRight}
	  				checked={this.state.selectedLocation === LocationOption.TopRight}
	  				onChange={this.handleOptionChange} />
	  			<label htmlFor={LocationOption.TopRight}>Top Right</label>
  			</div>
  			<div className="radio-option">
	  			<input
	  				type="radio"
	  				id={LocationOption.BottomLeft}
	  				name="location"
	  				value={LocationOption.BottomLeft} 
	  				checked={this.state.selectedLocation === LocationOption.BottomLeft}
	  				onChange={this.handleOptionChange} />
	  			<label htmlFor={LocationOption.BottomLeft}>Bottom Left</label>
  			</div>
  			<div className="radio-option">
	  			<input
	  				type="radio"
	  				id={LocationOption.BottomMiddle}
	  				name="location"
	  				value={LocationOption.BottomMiddle}
	  				checked={this.state.selectedLocation === LocationOption.BottomMiddle}
	  				onChange={this.handleOptionChange} />
	  			<label htmlFor={LocationOption.BottomMiddle}>Bottom Middle</label>
  			</div>
  			<div className="radio-option">
	  			<input
	  				type="radio"
	  				id={LocationOption.BottomRight}
	  				name="location"
	  				value={LocationOption.BottomRight}
	  				checked={this.state.selectedLocation === LocationOption.BottomRight}
	  				onChange={this.handleOptionChange} />
	  			<label htmlFor={LocationOption.BottomRight}>Bottom Right</label>
  			</div>
  		</div>
  	);
  }
}

export default TimestampRadioButtons;