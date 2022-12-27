import React, { Component } from 'react';
import {
	Button,
	CardContent,
	FormControlLabel,
	Radio,
} from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { FuseChipSelect } from '@fuse';
import { RadioGroupFormsy } from '@fuse';
import Formsy from 'formsy-react';
import { TextFieldFormsy } from '@fuse';
import List from './list';
import { withRouter } from 'react-router-dom';
import { withTranslation, Translation } from 'react-i18next';
import env from '../../static';
import Request from '../../utils/Request';
import Add from '@material-ui/icons/Add';
import DeleteForever from '@material-ui/icons/DeleteForever';
import AppContext from 'app/AppContext';

class SalesForm extends Component {
	static contextType = AppContext;
	request = new Request();
	constructor(props) {
		super(props);
		this.state = {
			isFormValid: false,
			customerId: '',
			dataCustomer: '',
			productDataId: '',
			listInput: { name: '', quantity: '', price: '' },
		};
		this.disableButton = this.disableButton.bind(this);
		this.enableButton = this.enableButton.bind(this);
		this.handleChipChangeValid = this.handleChipChangeValid.bind(this);
		this.handleChangeUser = this.handleChangeUser.bind(this);
	}
	handleChangeUser(event) {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
		// localStorage.clear();
		// localStorage.setItem('AdminOrTeam', value);
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
				// case data.product_id:
				// 	t = true;
				// 	break;
				case data.name:
					t = true;
					break;
				case data.quantity:
					t = true;
					break;
				case data.price:
					t = true;
					break;
				// case data.subTotal:
				// 	t = true;
				// 	break;
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
		const contextData = this.context;
		let CustomerOptions = props.state.customerList;
		const suggestionsCustomer = CustomerOptions.map((item) => ({
			key: item._id,
			value: item._id,
			label: `${item.name}`,
			phone: `${item.phone}`,
			address: `${item.address}`,
			email: `${item.email}`,
			is_franchise: `${item.is_franchise}`,
			is_mall: `${item.is_mall}`,
		}));

		let productOptions = props.state.productList;
		const suggestionsList = productOptions.map((item) => ({
			key: item._id,
			value: item._id,
			label: `${item.name}`,
			quantity: `${item.quantity}`,
			price: `${item.price}`,
		}));

		return (
			<div className='p-16 sm:p-24 max-w-2xl'>
				<FuseAnimate animation='transition.expandIn'>
					<CardContent className='flex flex-col items-center justify-center p-32 '>
						<Formsy
							onValidSubmit={props.handleSubmit}
							onValid={this.enableButton}
							onInvalid={this.disableButton}
							className='flex flex-col  w-full h-full'>
							<div style={{ width: 400 }}>
								<FuseChipSelect
									className='w-0 my-16'
									value={props.state.customer}
									onChange={props.handleChipChangeCustomer}
									placeholder='Select Customer'
									textFieldProps={{
										label: 'Customer',
										InputLabelProps: {
											shrink: true,
										},
										variant: 'outlined',
									}}
									options={suggestionsCustomer}
									required
								/>
							</div>

							{props.state.customer !== '' && (
								<div
									style={{
										height: 1000,
									}}>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'flex-start',
											marginBottom: 20,
											width: 300,
										}}>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												borderBottom: '1px solid rgb(212, 212, 212)',
											}}>
											<p style={{ fontWeight: 'bold' }}>Contact :</p>
											<p style={{ textAlign: 'center', marginLeft: 15 }}>
												{props.state.customer.label}{' '}
											</p>
										</div>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												borderBottom: '1px solid rgb(212, 212, 212)',
											}}>
											<p style={{ fontWeight: 'bold' }}>Phone :</p>
											<p style={{ textAlign: 'center', marginLeft: 15 }}>
												{props.state.customer.phone}{' '}
											</p>
										</div>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												borderBottom: '1px solid rgb(212, 212, 212)',
												justifyContent: '',
											}}>
											<p style={{ fontWeight: 'bold' }}>Email :</p>
											<p style={{ textAlign: 'center', marginLeft: 15 }}>
												{props.state.customer.email}{' '}
											</p>
										</div>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												borderBottom: '1px solid rgb(212, 212, 212)',
											}}>
											<p style={{ fontWeight: 'bold' }}>Location :</p>
											<p style={{ textAlign: 'center', marginLeft: 15 }}>
												{props.state.customer.address}{' '}
											</p>
										</div>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												borderBottom: '1px solid rgb(212, 212, 212)',
											}}>
											<p style={{ fontWeight: 'bold' }}>Type :</p>
											{props.state.customer.is_franchise ? (
												<p style={{ textAlign: 'center', marginLeft: 15 }}>
													Franchis{' '}
												</p>
											) : (
												<p style={{ textAlign: 'center', marginLeft: 15 }}>
													Mall{' '}
												</p>
											)}
										</div>
									</div>

									<List
										handleChipChangeList={props.handleChipChangeProduct}
										handleChipChangeValid={this.handleChipChangeValid}
										suggestionsList={suggestionsList}
										value={props.state.productOption}
										listProduit={props.state.product}
										//productDataId={this.state.productDataId}
										handelChange={props.handelChange}
										valueKey={props.handleChipChangeIndexProduct}
										update={props.state.update}
									/>

									{/* {console.log(
										'🚀 ~ file: SalesForm.js:220 ~ SalesForm ~ render ~ props.state.productOption',
										props.state.productOption
									)} */}
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											position: 'absolute',
											right: 0,

											marginRight: 40,

											borderColor: '#eee',
											width: 300,
											padding: 5,
											border: '1px solid rgb(212, 212, 212)',
											borderRadius: 15,
										}}>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
											}}>
											<p
												style={{
													fontWeight: 'bold',
													fontSize: 25,
													borderBottom: '1px solid rgb(212, 212, 212)',
												}}>
												Total :{' '}
												{contextData.totalPrice.total &&
													contextData.totalPrice.total}{' '}
												Dt
											</p>
										</div>
									</div>

									<Button
										variant='contained'
										color='primary'
										className='w-224 mx-auto mt-16'
										aria-label='Register'
										disabled={!this.state.isFormValid}
										type='submit'>
										{this.props.ButtonText}
									</Button>
								</div>
							)}
						</Formsy>
					</CardContent>
				</FuseAnimate>
			</div>
		);
	}
}
export default withTranslation()(withRouter(SalesForm));
