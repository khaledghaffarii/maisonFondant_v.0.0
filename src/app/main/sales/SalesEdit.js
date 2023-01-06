import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageCarded } from '@fuse';
import { withSnackbar } from 'notistack';
import decode from 'jwt-decode';
import AuthHelperMethods from '../../services/AuthHelperMethods';
import FormHeader from '../sharedComponent/FormHeader';
import Request from '../../utils/Request';

import env from '../../static';
import { withRouter } from 'react-router-dom';
import { withTranslation, Translation } from 'react-i18next';
import SalesForm from './SalesForm';
import { useContext } from 'react';
import AppContext from 'app/AppContext';
const styles = (theme) => ({
	layoutRoot: {},
});
class SalesEdit extends Component {
	static contextType = AppContext;
	Auth = new AuthHelperMethods();
	request = new Request();
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			customerList: [],
			customer: '',
			billed: false,
			productList: [],
			productOption: '',
			total_paid: 0,
			valueKey: '',
			delivery_note_sent: false,
			update: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChipChangeProduct = this.handleChipChangeProduct.bind(this);
		this.handleChipChangeCustomer = this.handleChipChangeCustomer.bind(this);
		this.handleChipChangeIndexProduct =
			this.handleChipChangeIndexProduct.bind(this);
	}

	fileChangedHandler = (image) => {
		this.setState({ file: image });
	};
	handleChipChangeCustomer(value) {
		this.setState({
			customer: value,
		});
	}
	handleChipChangeProduct(value) {
		this.setState({
			productOption: value,
		});
	}
	handleChipChangeIndexProduct(index, value) {
		// console.log(
		// 	'🚀 ~ file: SalesNew.js:55 ~ SalesNew ~ handleChipChangeIndexProduct ~ value',
		// 	value
		// );

		this.setState({
			valueKey: index,
			productOption: value,
		});
	}
	handleChange(event) {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	}
	handleSubmit = async (e) => {
		const contextData = this.context;
		const { customer, billed, total_paid, delivery_note_sent } = this.state;
		let data = {
			customer: customer.key,
			products: contextData.finalList.list,
			billed: billed,
			customer_name: customer.label,
			customer_adresse: customer.address,
			total_paid: total_paid,
			delivery_note_sent: delivery_note_sent,
		};

		try {
			const url = env.outputs.update(this.props.match.params.id);
			const response = await this.request.update(url, data, false);
			this.props.enqueueSnackbar(
				<Translation>
					{(t) => <div>{t('stock.edit.success')}</div>}
				</Translation>,
				{
					variant: 'success',
				}
			);
			this.setState({ id: response.data._id });
			this.props.history.push('/sales');
		} catch (err) {
			console.log(
				'🚀 ~ file: ProductNew.js:85 ~ ProductNew ~ handleSubmit= ~ err',
				err
			);
			// if (e.response) {
			// 	// this.props.enqueueSnackbar(e.response.data.message, {
			// 	// 	variant: 'error',
			// 	// });
			// } else {
			// 	// this.props.enqueueSnackbar(err.response.data.message, {
			// 	// 	variant: 'error',
			// 	// });
		}
	};
	async componentDidMount() {
		try {
			const urlSales = env.outputs.info;
			const response = await this.request.getById(
				urlSales,
				this.props.match.params.id
			);
			const urlCustomer = env.customers.all;
			const responseCustomer = await this.request.getAll(urlCustomer);

			this.setState({
				customerList: responseCustomer.data,
			});
			this.setState({
				update: true,
			});
			console.log(
				'🚀 ~ file: SalesEdit.js:127 ~ SalesEdit ~ componentDidMount ~ response.data',
				response.data.total_paid
			);
			this.setState({
				customer: {
					key: response.data.customer._id,
					value: response.data.customer._id,
					label: response.data.customer.name,
					address: response.data.customer.address,
					phone: response.data.customer.phone,
					email: response.data.customer.email,
					is_franchise: response.data.customer.is_franchise,
					is_mall: response.data.customer.is_mall,
				},
			});
			const urlProduct = env.products.all;
			const responseProduct = await this.request.getAll(urlProduct);
			this.setState({
				productList: responseProduct.data,
			});
			let products = [];
			if (response.data.products.length > 0) {
				response.data.products.forEach((elem) => {
					products.push({
						key: elem.product_id,
						value: elem.product_id,
						label: elem.name,
						price: elem.price,
						quantity: elem.quantity,
					});
				});
			}
			this.setState({
				productOption: products,
			});
			this.setState({
				total_paid: response.data.total_paid,
			});
			//console.log('this.state.productOption', this.state.productOption);
			// const urlProduct = env.products.all;
			// const responseProduct = await this.request.getAll(urlProduct);
			// this.setState({
			// 	productList: responseProduct.data,
			// });
		} catch (e) {
			console.log('🚀 ~ file: SalesEdit.js:178 ~ componentDidMount ~ e', e);

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
		return (
			<FusePageCarded
				classes={{
					root: classes.layoutRoot,
				}}
				content={
					<SalesForm
						handleSubmit={this.handleSubmit}
						handleChipChangeCustomer={this.handleChipChangeCustomer}
						handleChipChangeProduct={this.handleChipChangeProduct}
						handleChipChangeIndexProduct={this.handleChipChangeIndexProduct}
						state={this.state}
						ButtonText={
							<Translation>{(t) => <div>{t('Edit')}</div>}</Translation>
						}
						handleChange={this.handleChange}
						fileChangedHandler={this.fileChangedHandler}
					/>
				}
			/>
		);
	}
}

export default withTranslation()(
	withStyles(styles, { withTheme: true })(withSnackbar(withRouter(SalesEdit)))
);
