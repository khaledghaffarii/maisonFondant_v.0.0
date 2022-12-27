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
class SalesNew extends Component {
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
			total_paid: '',
			valueKey: '',
			delivery_note_sent: false,
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
		console.log(
			'🚀 ~ file: SalesNew.js:55 ~ SalesNew ~ handleChipChangeIndexProduct ~ value',
			value
		);

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
		console.log(
			'🚀 ~ file: SalesNew.js:120 ~ SalesNew ~ componentDidMount ~ contextData',
			contextData
		);
		// const { customer, billed, productOption, total_paid, delivery_note_sent } =
		// 	this.state;
		// let data = {
		// 	customerList: customer,
		// 	productList: productOption,
		// 	billed: billed,
		// 	total_paid: total_paid,
		// 	delivery_note_sent: delivery_note_sent,
		// };
		// try {
		// 	const url = env.outputs.new;
		// 	const response = await this.request.new(url, data, false);
		// 	this.props.enqueueSnackbar(
		// 		<Translation>
		// 			{(t) => <div>{t('stock.edit.success')}</div>}
		// 		</Translation>,
		// 		{
		// 			variant: 'success',
		// 		}
		// 	);
		// 	this.setState({ id: response.data._id });
		// 	this.props.history.push('/sales');
		// } catch (err) {
		// 	console.log(
		// 		'🚀 ~ file: ProductNew.js:85 ~ ProductNew ~ handleSubmit= ~ err',
		// 		err
		// 	);
		// 	if (e.response) {
		// 		this.props.enqueueSnackbar(e.response.data.message, {
		// 			variant: 'error',
		// 		});
		// 	} else {
		// 		this.props.enqueueSnackbar(err.response.data.message, {
		// 			variant: 'error',
		// 		});
		// 	}
		// }
	};

	async componentDidMount() {
		try {
			const urlCustomer = env.customers.all;
			const responseCustomer = await this.request.getAll(urlCustomer);
			this.setState({
				customerList: responseCustomer.data,
			});
			const urlProduct = env.products.all;
			const responseProduct = await this.request.getAll(urlProduct);
			this.setState({
				productList: responseProduct.data,
			});
		} catch (e) {
			console.log(
				'🚀 ~ file: SalesNew.js:117 ~ SalesNew ~ componentDidMount ~ e',
				e
			);
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
							<Translation>{(t) => <div>{t('Add order')}</div>}</Translation>
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
	withStyles(styles, { withTheme: true })(withSnackbar(withRouter(SalesNew)))
);