import React, { Component } from 'react';
import { Button, CardContent } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { FuseChipSelect } from '@fuse';
import Formsy from 'formsy-react';
import { TextFieldFormsy } from '@fuse';
import { withRouter } from 'react-router-dom';
import CroppedImage from 'app/main/sharedComponent/CroppedImage';
class CountryForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFormValid: false,
		};
		this.disableButton = this.disableButton.bind(this);
		this.enableButton = this.enableButton.bind(this);
		this.handleChipChangeValid = this.handleChipChangeValid.bind(this);
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
	handleChipChangeValid(value) {
		let t = false;
		value.map((data) => {
			switch ('') {
				case data.Piece:
					console.log('aaa', data.Piece);
					t = true;
					break;
				case data.Quantite:
					t = true;
					break;
				case data.Remise:
					t = true;
					break;
				case data.tva:
					t = true;
					break;
			}

			if (t == true) {
				this.setState({
					isFormValid: false,
				});
			} else {
				this.setState({
					isFormValid: true,
				});
			}
		});
	}
	render() {
		const props = this.props;

		const optionsCurrency = props.state.listCurrency;
		// console.log("optionsColor",optionsColor);
		const suggestionCurrency = optionsCurrency.map((item) => ({
			key: item._id,
			value: item._id,
			label: item.currencyEnglish,
		}));
		return (
			<div className='p-24 sm:p-24 max-w-2xl'>
				<FuseAnimate>
					<CardContent className='flex flex-col items-center justify-center p-32'>
						<Formsy
							onValidSubmit={props.handleSubmit}
							onValid={this.enableButton}
							onInvalid={this.disableButton}
							className='flex flex-col justify-center w-full'>
							<CroppedImage
								fileChangedHandler={props.fileChangedHandler}
								style={{ marginButton: 35 }}
							/>
							<TextFieldFormsy
								className='mt-8 mb-16'
								value={props.state.countryName}
								label='country name'
								name='countryName'
								type='text'
								onChange={props.handleChange}
								InputLabelProps={{
									shrink: true,
								}}
								margin='normal'
								variant='outlined'
								required
							/>
							<FuseChipSelect
								className='w-full my-16'
								value={props.state.currency}
								onChange={props.handleChipChangeCurrency}
								placeholder='Select currency'
								textFieldProps={{
									label: 'currency',
									InputLabelProps: {
										shrink: true,
									},
									variant: 'outlined',
								}}
								options={suggestionCurrency}
							/>
							<TextFieldFormsy
								className='mt-8 mb-16'
								value={props.state.iso2}
								label='iso2'
								name='iso2'
								type='text'
								onChange={props.handleChange}
								InputLabelProps={{
									shrink: true,
								}}
								margin='normal'
								variant='outlined'
								required
							/>
							<TextFieldFormsy
								className='mt-8 mb-16'
								value={props.state.iso3}
								label='iso3'
								name='iso3'
								type='text'
								onChange={props.handleChange}
								InputLabelProps={{
									shrink: true,
								}}
								margin='normal'
								variant='outlined'
								required
							/>
							<TextFieldFormsy
								className='mt-8 mb-16'
								value={props.state.phoneCode}
								label='Phone code'
								name='phoneCode'
								type='number'
								onChange={props.handleChange}
								InputLabelProps={{
									shrink: true,
								}}
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
								{props.ButtonText}
							</Button>
						</Formsy>
					</CardContent>
				</FuseAnimate>
			</div>
		);
	}
}
export default withRouter(CountryForm);
