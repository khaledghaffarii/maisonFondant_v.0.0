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
import ProductForm from './ProductForm';
const styles = (theme) => ({
	layoutRoot: {},
});
class ProductNew extends Component {
	Auth = new AuthHelperMethods();
	request = new Request();
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			file: '',
			name: '',
			quantity: '',
			price: '',
			category: [],
			optionCategory: [],
			categoryValidation: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.fileChangedHandler = this.fileChangedHandler.bind(this);
		this.handleChipChangeCategory = this.handleChipChangeCategory.bind(this);
	}
	fileChangedHandler = (image) => {
		this.setState({ file: image });
	};
	handleChipChangeCategory(value) {
		this.setState({
			category: value,
			//categoryValidation: true,
		});
	}
	handleChange(event) {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	}
	handleSubmit = async (e) => {
		let form_data = new FormData();
		//form_data.append('name', this.state.name);
		if (this.state.file !== '') {
			form_data.append('file', this.state.file, this.state.file.name);
		}
		// let category = [];
		// Object.values(this.state.category).forEach((elem) => {
		// 	category.push(elem.value);
		// 	console.log(
		// 		'🚀 ~ file: ProductNew.js:58 ~ ProductNew ~ Object.values ~ elem.value',
		// 		elem.value
		// 	);
		// });
		const { name, price, quantity, category } = this.state;

		let data = {
			name: name,
			quantity: quantity,
			price: price,
			category: category.key,
		};
		try {
			const url = env.products.new;
			const response = await this.request.new(url, data, false);
			this.props.enqueueSnackbar(
				<Translation>
					{(t) => <div>{t('stock.edit.success')}</div>}
				</Translation>,
				{
					variant: 'success',
				}
			);
			this.setState({ id: response.data._id });
			this.props.history.push('/product');
		} catch (err) {
			console.log(
				'🚀 ~ file: ProductNew.js:85 ~ ProductNew ~ handleSubmit= ~ err',
				err
			);
			if (e.response) {
				this.props.enqueueSnackbar(e.response.data.message, {
					variant: 'error',
				});
			} else {
				this.props.enqueueSnackbar(err.response.data.message, {
					variant: 'error',
				});
			}
		}
	};

	async componentDidMount() {
		try {
			const urlCategories = env.categories.all;
			const response = await this.request.getAll(urlCategories);
			this.setState({
				optionCategory: response.data,
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
		return (
			<FusePageCarded
				classes={{
					root: classes.layoutRoot,
				}}
				header={
					<FormHeader
						returnRoute='/product'
						title={this.props.t('Add Product')}
					/>
				}
				content={
					<ProductForm
						handleSubmit={this.handleSubmit}
						handleChipChangeCategory={this.handleChipChangeCategory}
						state={this.state}
						ButtonText={
							<Translation>{(t) => <div>{t('Add Product')}</div>}</Translation>
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
	withStyles(styles, { withTheme: true })(withSnackbar(withRouter(ProductNew)))
);
