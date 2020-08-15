import React from 'react';
import './go_button.css';

class GoButton extends React.Component {
	render() {
		return (
			<div>
				<input type="submit" value="GO!" className="go-button"/>
			</div>
		);
	}
}

export default GoButton;