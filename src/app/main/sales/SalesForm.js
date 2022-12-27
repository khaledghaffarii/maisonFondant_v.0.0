import React, { Component } from 'react';
import { Button, CardContent } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { FuseChipSelect } from '@fuse';
import Formsy from 'formsy-react';
import { TextFieldFormsy } from '@fuse';
import List from './list';
import { withRouter } from 'react-router-dom';
import { withTranslation, Translation } from 'react-i18next';
import env from '../../static';
import Request from '../../utils/Request';
import Add from '@material-ui/icons/Add';
import DeleteForever from '@material-ui/icons/DeleteForever';
class SalesForm extends Component {
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
	async componentDidUpdate() {
		const props = this.props;
		let url = env.customers.info;
		let urlProduct = env.products.info;
		//console.log("🚀 ~ file: SalesForm.js:96 ~ SalesForm ~ componentDidUpdate ~ props.state", props.state)
		try {
			if (props.state.customer.key !== '') {
				const response = await this.request.getById(
					url,
					props.state.customer.key
				);
				this.setState({
					dataCustomer: response.data,
				});
			}
			this.setState({ listInput: props.state.productOptions });
			// if (props.state.productOption.key !== '') {
			// 	const onProduct = await this.request.getById(
			// 		urlProduct,
			// 		props.state.productOption.key
			// 	);
			// 	this.setState({
			// 		productDataId: onProduct.data,
			// 	});
			// }
		} catch (error) {}
	}

	render() {
		const props = this.props;
		let CustomerOptions = props.state.customerList;
		const suggestionsCustomer = CustomerOptions.map((item) => ({
			key: item._id,
			value: item._id,
			label: `${item.name}`,
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
					<CardContent className='flex flex-col items-center justify-center p-32'>
						<Formsy
							onValidSubmit={props.handleSubmit}
							onValid={this.enableButton}
							onInvalid={this.disableButton}
							className='flex flex-col  w-full'>
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

							{this.state.dataCustomer !== '' && (
								<div>
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
												{this.state.dataCustomer.name}{' '}
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
												{this.state.dataCustomer.phone}{' '}
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
												{this.state.dataCustomer.email}{' '}
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
												{this.state.dataCustomer.address}{' '}
											</p>
										</div>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												borderBottom: '1px solid rgb(212, 212, 212)',
											}}>
											<p style={{ fontWeight: 'bold' }}>Type :</p>
											{this.state.dataCustomer.is_franchise ? (
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
											bottom: 0,
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
													borderBottom: '1px solid rgb(212, 212, 212)',
												}}>
												SubTotal : Dt
											</p>
										</div>
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
												Total : Dt
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
										{
											<Translation>
												{(t) => <div>{t('devis.addButton')}</div>}
											</Translation>
										}
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
