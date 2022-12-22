import React, { Component } from 'react';
import { Button, CardContent } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { FuseChipSelect } from '@fuse';
import Formsy from 'formsy-react';
import { withRouter } from 'react-router-dom';
import CroppedImage from '../sharedComponent/CroppedImage';
import { withTranslation, Translation } from 'react-i18next';
import { TextFieldFormsy } from '@fuse';

class ClientForm extends Component {
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
		const optionsCountry = props.state.listCountry;
		// console.log("optionsColor",optionsColor);
		const suggestionCountry = optionsCountry.map((item) => ({
			key: item._id,
			value: item.iso2,
			label: item.countryName,
		}));
		const suggestionsGouvernorat = props.state.gouvernoratsOptions.map(
			(item) => ({
				key: item._id,
				value: item._id,
				label: item.name_fr,
			})
		);
		const optionDelegation = props.state.delegationsOptions;
		const suggestionsDelegation = Object.values(optionDelegation).map(
			(item) => ({
				key: item._id,
				value: item._id,
				label: item.name_fr,
			})
		);
		// const suggestionsLocalite = props.state.localitesOptions.map((item) => ({
		//   key: item._id,
		//   value: item._id,
		//   label: item.name,
		// }));
		const optionRegion = props.state.optionRegion;
		const suggestionRegion = Object.values(optionRegion).map((item) => ({
			key: item._id,
			value: item._id,
			label: `${item.name_en}`,
		}));
		const optionCity = props.state.optionCity;
		const suggestionCity = Object.values(optionCity).map((item) => ({
			key: item._id,
			value: item._id,
			label: `${item.name_en}`,
		}));

		return (
			<div className='p-16 sm:p-24 max-w-2xl'>
				<FuseAnimate animation='transition.expandIn'>
					<CardContent className='flex flex-col items-center justify-center p-32'>
						<Formsy
							name='registerForm'
							className='flex flex-col justify-center w-full'
							onValidSubmit={props.handleSubmit}
							onValid={this.enableButton}
							onInvalid={this.disableButton}>
							<CroppedImage fileChangedHandler={props.fileChangedHandler} />
							{localStorage.getItem('AdminOrTeam') == 'admin' ? (
								<FuseChipSelect
									className='w-full my-16'
									value={props.state.country}
									onChange={props.handleChipChangeCountry}
									placeholder='Select Country'
									textFieldProps={{
										label: 'Country',
										InputLabelProps: {
											shrink: true,
										},
										variant: 'outlined',
									}}
									options={suggestionCountry}
								/>
							) : (
								''
							)}

							<TextFieldFormsy
								className='mt-8 mb-16 mr-8'
								value={props.state.fname}
								type='text'
								name='fname'
								label={
									<Translation>
										{(t) => <div>{t('customer.firstName')}</div>}
									</Translation>
								}
								onChange={props.handleChange}
								margin='normal'
								variant='outlined'
								required
							/>
							<TextFieldFormsy
								className='mt-8 mb-16 mr-8'
								value={props.state.lname}
								type='text'
								name='lname'
								label={
									<Translation>
										{(t) => <div>{t('customer.lastName')}</div>}
									</Translation>
								}
								onChange={props.handleChange}
								margin='normal'
								variant='outlined'
								required
							/>
							<TextFieldFormsy
								className='mt-8 mb-16 mr-8'
								value={props.state.lang}
								type='text'
								name='lang'
								label={
									<Translation>
										{(t) => <div>{t('contact.lang')}</div>}
									</Translation>
								}
								onChange={props.handleChange}
								margin='normal'
								variant='outlined'
								required
							/>
							{props.state.testCountry == 'SA' ? (
								<>
									<FuseChipSelect
										className='w-full my-16'
										value={props.state.regionList}
										onChange={props.handleChipChangeRegion}
										placeholder='Select  region'
										textFieldProps={{
											label: (
												<Translation>
													{(t) => <div>{t('region.region')}</div>}
												</Translation>
											),
											InputLabelProps: {
												shrink: true,
											},
											variant: 'outlined',
										}}
										options={suggestionRegion}
									/>
									<FuseChipSelect
										className='w-full my-16'
										value={props.state.cityList}
										onChange={props.handleChipChangeCity}
										placeholder='Select city'
										textFieldProps={{
											label: (
												<Translation>
													{(t) => <div>{t('city.city')}</div>}
												</Translation>
											),
											InputLabelProps: {
												shrink: true,
											},
											variant: 'outlined',
										}}
										options={suggestionCity}
									/>
								</>
							) : props.state.testCountry == 'TN' ? (
								<>
									<FuseChipSelect
										className='w-full my-16'
										value={props.state.gouvernorat}
										onChange={props.handleChangeGouvernorat}
										placeholder='Select  gouvernorat'
										textFieldProps={{
											label: (
												<Translation>
													{(t) => <div>{t('customer.governorates')}</div>}
												</Translation>
											),
											InputLabelProps: {
												shrink: true,
											},
											variant: 'outlined',
										}}
										options={suggestionsGouvernorat}
									/>
									<FuseChipSelect
										className='w-full my-16'
										value={props.state.delegation}
										placeholder='Select delegation'
										textFieldProps={{
											label: (
												<Translation>
													{(t) => <div>{t('customer.delegation')}</div>}
												</Translation>
											),
											InputLabelProps: {
												shrink: true,
											},
											variant: 'outlined',
										}}
										onChange={props.handleChangeDelegation}
										options={suggestionsDelegation}
										required
									/>
									{/* <FuseChipSelect
                    className="w-full my-16"
                    value={props.state.localite}
                    onChange={props.handleChangeLocalite}
                    placeholder="Select localite"
                    textFieldProps={{
                      label: (
                        <Translation>
                          {(t) => <div>{t("customer.locality")}</div>}
                        </Translation>
                      ),
                      InputLabelProps: {
                        shrink: true,
                      },
                      variant: "outlined",
                    }}
                    options={suggestionsLocalite}
                    required
                  /> */}
								</>
							) : (
								''
							)}

							<TextFieldFormsy
								className='mt-8 mb-16 mr-8'
								value={props.state.localite}
								name='localite'
								label={
									<Translation>
										{(t) => <div>{t('customer.locality')}</div>}
									</Translation>
								}
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
								className='mt-8 mb-16 mr-8'
								value={props.state.codePostal}
								name='codePostal'
								label={
									<Translation>
										{(t) => <div>{t('customer.postalCode')}</div>}
									</Translation>
								}
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
								value={props.state.email}
								type='email'
								name='email'
								label={
									<Translation>
										{(t) => <div>{t('customer.email')}</div>}
									</Translation>
								}
								autoComplete='email'
								onChange={props.handleChange}
								validations='isEmail'
								validationError={
									props.state.email != '' ? (
										<Translation>
											{(t) => <div>{t('customer.errors.email')}</div>}
										</Translation>
									) : (
										''
									)
								}
								margin='normal'
								variant='outlined'
								required
							/>
							<TextFieldFormsy
								className='mt-8 mb-16 mr-8'
								value={props.state.username}
								type='text'
								name='username'
								label={
									<Translation>
										{(t) => <div>{t('customer.userName')}</div>}
									</Translation>
								}
								onChange={props.handleChange}
								margin='normal'
								variant='outlined'
								required
							/>
							{props.showPassword && (
								<TextFieldFormsy
									className='mt-8 mb-16'
									value={props.state.password}
									type='password'
									name='password'
									label={
										<Translation>
											{(t) => <div>{t('customer.password')}</div>}
										</Translation>
									}
									validations={{
										minLength: 6,
									}}
									validationErrors={{
										minLength: (
											<Translation>
												{(t) => <div>{t('errors.password')}</div>}
											</Translation>
										),
									}}
									onChange={props.handleChange}
									autoComplete='current-password'
									margin='normal'
									variant='outlined'
									required
								/>
							)}

							<TextFieldFormsy
								className='mt-8 mb-16'
								value={props.state.phone}
								type='number'
								name='phone'
								label={
									<Translation>
										{(t) => <div>{t('customer.phone')}</div>}
									</Translation>
								}
								validations={{
									minLength: 8,
									maxLength: 8,
								}}
								validationErrors={{
									minLength: (
										<Translation>
											{(t) => <div>{t('customer.errors.phone.minLength')}</div>}
										</Translation>
									),
									maxLength: (
										<Translation>
											{(t) => <div>{t('customer.errors.phone.maxLength')}</div>}
										</Translation>
									),
								}}
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
								type='submit'
								disabled={!this.state.isFormValid}>
								{props.ButtonText}
							</Button>
						</Formsy>
					</CardContent>
				</FuseAnimate>
			</div>
		);
	}
}

export default withTranslation()(withRouter(ClientForm));
