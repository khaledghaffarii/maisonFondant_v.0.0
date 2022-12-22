import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, CardContent } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { TextFieldFormsy } from '@fuse';
import Formsy from 'formsy-react';
import { withRouter } from 'react-router-dom';
import { withTranslation, Translation } from 'react-i18next';
const styles = (theme) => ({
	layoutRoot: {},
});

class SpecialitieForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFormValid: false,
		};
		this.disableButton = this.disableButton.bind(this);
		this.enableButton = this.enableButton.bind(this);
	}
	disableButton() {
		this.setState({
			isFormValid: false,
		});
	}
	enableButton() {
		this.setState({
			isFormValid: true,
		});
	}
	render() {
		const props = this.props;
		return (
			<div className='p-16 sm:p-24 max-w-2xl'>
				<FuseAnimate animation='transition.expandIn'>
					<CardContent className='flex flex-col items-center justify-center p-32'>
						<Formsy
							onValidSubmit={props.handleSubmit}
							onValid={this.enableButton}
							onInvalid={this.disableButton}
							className='flex flex-col justify-center w-full'>
							<TextFieldFormsy
								className='mt-8 mb-16 mr-8'
								value={props.state.name}
								type='text'
								label={this.props.t('city.nameEnglish')}
								name='name'
								onChange={props.handleChange}
								margin='normal'
								variant='outlined'
								required
							/>
							<TextFieldFormsy
								className='mt-8 mb-16 mr-8'
								value={props.state.nameFr}
								type='text'
								label={this.props.t('Gouvernorate.nameFrench')}
								name='nameFr'
								onChange={props.handleChange}
								margin='normal'
								variant='outlined'
								required
							/>
							<TextFieldFormsy
								className='mt-8 mb-16 mr-8'
								value={props.state.nameAr}
								type='text'
								label={this.props.t('city.nameArabe')}
								name='nameAr'
								onChange={props.handleChange}
								margin='normal'
								variant='outlined'
								required
							/>
							<Button
								variant='contained'
								color='primary'
								className='w-224 mx-auto mt-16'
								aria-label='Register'
								disabled={!this.state.isFormValid}
								type='submit'>
								{this.props.t('speciality.add')}
							</Button>
						</Formsy>
					</CardContent>
				</FuseAnimate>
			</div>
		);
	}
}

export default withTranslation()(
	withStyles(styles, { withTheme: true })(withRouter(SpecialitieForm))
);
