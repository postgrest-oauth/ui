import React, { Component } from 'react';
import { Button, Typography } from 'material-ui';
import { Link } from 'react-router-dom';

export default class Success extends Component {
	render() {
		return(
			<div className='form'>
				<Typography color='primary'>{this.props.language.successMessage}</Typography>
				<Button
					component={Link} 
					to="/signin"
          variant="raised" 
          color="primary"
					style={{ padding:"10px 30px", marginTop:"15px" }}
				>
					{this.props.language.nextButton}
				</Button>
			</div>
		)
	}
};