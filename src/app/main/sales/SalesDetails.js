import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

import Request from '../../utils/Request';
import AuthHelperMethods from '../../services/AuthHelperMethods';
import { withRouter } from 'react-router-dom';
import { TextFieldFormsy } from '@fuse';
import MapComponent from '../sharedComponent/MapComponent';

import Formsy from 'formsy-react';
import { FusePageCarded } from '@fuse';
import FormHeader from '../sharedComponent/FormHeader';
import { FuseAnimate } from '@fuse';
import TimeField from 'react-simple-timefield';
import env from '../../static';
import { withTranslation, Translation } from 'react-i18next';
import logo from '../../../assets/logo.png';
import code from '../../../assets/code.jpg';
import ReactToPdf from 'react-to-pdf';
const ref = React.createRef();
const options = {
	orientation: 'landscape',
	unit: 'in',
	format: [1500, 1500],
};
const styles = (theme) => ({
	layoutRoot: {},
});

class SalesDetails extends Component {
	Auth = new AuthHelperMethods();
	request = new Request();
	constructor(props) {
		super(props);

		this.state = {
			id: '',
			showPdf: false,
			facture: false,
			customer_name: '',
			date: '',
			customer_adresse: '',
			totalPay: '',
			billed: true,
			delivery_note_sent: '',
			total_paid: '',
			product: [],
			customer_phone: '',
			customer_email: '',
		};
	}
	async componentDidMount() {
		try {
			const url = env.outputs.info;
			const response = await this.request.getById(
				url,
				this.props.match.params.id
			);

			const options = {
				day: 'numeric',
				month: 'short',
				year: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric',
			};
			const date = new Date(response.data.date);
			console.log(
				'🚀 ~ file: SalesDetails.js:72 ~ componentDidMount ~ response.data',
				response.data
			);
			const dateFormatter = date.toLocaleDateString('en-US', options);

			this.setState({
				id: response.data._id,
				product: response.data.products,
				customer_name: response.data.customer_name,
				date: dateFormatter.toString(),
				customer_adresse: response.data.customer_adresse,
				total_paid: response.data.total_paid,
				customer_phone: response.data.customer.phone,
				customer_email: response.data.customer.email,
			});
		} catch (e) {
			if (e.response) {
				this.props.enqueueSnackbar(e.response.data.message, {
					variant: 'error',
				});
			} else {
				this.props.enqueueSnackbar(
					<Translation>
						{(t) => <div>{t('stock.edit.error')}</div>}
					</Translation>,
					{
						variant: 'error',
					}
				);
			}
		}
	}
	render() {
		const { classes } = this.props;
		const formatter = this.state.total_paid.toLocaleString('ar-TN', {
			style: 'currency',
			currency: 'TND',
			minimumFractionDigits: 3,
		});

		return (
			<FusePageCarded
				classes={{
					root: classes.layoutRoot,
				}}
				header={
					<FormHeader
						returnRoute='/sales'
						title={
							<Translation>
								{(t) => <div>{t('Sales Details')}</div>}
							</Translation>
						}
					/>
				}
				content={
					<div className='p-16 sm:p-24 max-w-2xl'>
						<FuseAnimate animation='transition.expandIn'>
							<CardContent className='flex flex-col items-center justify-center p-32'>
								<div
									ref={ref}
									style={{
										width: '100%',
										height: '100%',
									}}>
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-between',
											margin: 50,
										}}>
										<img style={{ width: '15%', height: '15%' }} src={logo} />
										<div
											style={{
												border: '1px solid ',
												borderColor: '#eee',
												padding: 20,
												alignSelf: 'center',
											}}>
											<p
												style={{
													fontWeight: 'bold',
												}}>
												{this.state.date}{' '}
											</p>
											<p>num: 1231s5d189sd</p>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-between',
											marginBottom: 100,
										}}>
										<div>
											<h2>Company Name :</h2>
											<p>Maison fondant</p>
											<img
												style={{ width: '20%', height: '20%', marginTop: 35 }}
												src={code}
											/>
										</div>
										<div>
											<h2>Customer Name :</h2>
											<div
												style={{
													display: 'flex',
													flexDirection: 'row',
												}}>
												<p
													style={{
														fontWeight: 'bold',
														marginRight: 5,
													}}>
													Address :
												</p>
												<p>{this.state.customer_name} </p>
											</div>
											<div
												style={{
													display: 'flex',
													flexDirection: 'row',
												}}>
												<p
													style={{
														fontWeight: 'bold',
														marginRight: 5,
													}}>
													Phone Number :
												</p>
												<p> {this.state.customer_phone} </p>
											</div>
											<div
												style={{
													display: 'flex',
													flexDirection: 'row',
												}}>
												<p
													style={{
														fontWeight: 'bold',
														marginRight: 5,
													}}>
													{' '}
													Email :
												</p>
												<p> {this.state.customer_email} </p>
											</div>
										</div>
									</div>
									<div>
										<table
											style={{
												borderCollapse: 'collapse',
												width: '100%',
												marginBottom: 100,
											}}>
											<thead>
												<tr>
													<th
														style={{
															border: '1px solid #ddd',
															padding: '8px',
															textAlign: 'left',
															backgroundColor: '#4caf50',
															color: 'white',
														}}>
														Product
													</th>
													<th
														style={{
															border: '1px solid #ddd',
															padding: '8px',
															textAlign: 'left',
															backgroundColor: '#4caf50',
															color: 'white',
														}}>
														Price
													</th>
													<th
														style={{
															border: '1px solid #ddd',
															padding: '8px',
															textAlign: 'left',
															backgroundColor: '#4caf50',
															color: 'white',
														}}>
														Quantity
													</th>
												</tr>
											</thead>
											<tbody>
												{this.state.product.map((product, key) => (
													<tr
														key={key}
														style={{
															border: '1px solid #ddd',
															padding: '8px',
															textAlign: 'left',
														}}>
														<td
															style={{
																border: '1px solid #ddd',
																padding: '8px',
																textAlign: 'left',
															}}>
															{product.name}
														</td>
														<td
															style={{
																border: '1px solid #ddd',
																padding: '8px',
																textAlign: 'left',
															}}>
															${product.price}
														</td>
														<td
															style={{
																border: '1px solid #ddd',
																padding: '8px',
																textAlign: 'left',
															}}>
															{product.quantity}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
									<div
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
											width: '50%',
											marginBottom: 100,
										}}>
										<div style={{ position: 'absolute', right: 100 }}>
											<p style={{ fontWeight: 'bold', fontSize: 20 }}>
												{' '}
												Total TTC{' '}
											</p>
											<p style={{ fontSize: 25 }}>{formatter} </p>
										</div>
										<div>.</div>
									</div>
								</div>

								<ReactToPdf
									targetRef={ref}
									filename='facture.pdf'
									options={options}
									x={3.5}
									y={3.5}
									scale={1}>
									{({ toPdf }) => (
										<button
											onClick={toPdf}
											style={{
												backgroundColor: '#09223d',
												border: 'none',
												color: 'white',
												padding: '15px 32px',
												textAlign: 'center',
												textDecoration: 'none',
												display: 'inline-block',
												fontSize: '16px',
												margin: '4px 2px',
												cursor: 'pointer',
											}}>
											{' '}
											Generate Pdf
										</button>
									)}
								</ReactToPdf>
							</CardContent>
						</FuseAnimate>
					</div>
				}
			/>
		);
	}
}
export default withTranslation()(
	withStyles(styles, { withTheme: true })(
		withSnackbar(withRouter(SalesDetails))
	)
);
