import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

import Request from '../../utils/Request';
import AuthHelperMethods from '../../services/AuthHelperMethods';
import { withRouter } from 'react-router-dom';
import { FusePageCarded } from '@fuse';
import FormHeader from '../sharedComponent/FormHeader';

import env from '../../static';
import { withTranslation, Translation } from 'react-i18next';
import ProductForm from './ProductForm';
const styles = (theme) => ({
	layoutRoot: {},
});

class ProductEdit extends Component {
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
		this.update = this.update.bind(this);
		this.fileChangedHandler = this.fileChangedHandler.bind(this);
		this.handleChipChangeCategory = this.handleChipChangeCategory.bind(this);
	}

	handleChipChangeCategory(value) {
		this.setState({
			category: value,
			categoryValidation: true,
		});
	}
	handleChange(event) {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	}
	fileChangedHandler = (image) => {
		this.setState({ file: image });
	};
	handleChangeSelect(event) {
		this.setState({
			disponibilite: event.target.value,
		});
	}

	async update(e) {
		const { file, name, price, quantity, category } = this.state;
		let data = {
			//file: file,
			name: name,
			quantity: quantity,
			price: price,
			category: category.key,
		};
		try {
			const url = env.products.update(this.props.match.params.id);
			await this.request.update(url, data, false);
			this.props.enqueueSnackbar(
				<Translation>
					{(t) => <div>{t('stock.edit.success')}</div>}
				</Translation>,
				{
					variant: 'success',
				}
			);
			this.props.history.push('/product');
		} catch (err) {
			console.log(
				'🚀 ~ file: ProductEdit.js:82 ~ ProductEdit ~ update ~ err',
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
			this.props.enqueueSnackbar(err.response.data.message, {
				variant: 'error',
			});
		}
	}

	async componentDidMount() {
		try {
			const url = env.products.info;
			const response = await this.request.getById(
				url,
				this.props.match.params.id
			);
			const urlCategories = env.categories.all;
			const urlCategory = await this.request.getAll(urlCategories);
			this.setState({
				optionCategory: urlCategory.data,
			});
			let category = [];
			console.log(
				'🚀 ~ file: ProductEdit.js:116 ~ ProductEdit ~ componentDidMount ~ response.data.category',
				response.data
			);
			if (response.data.category.length > 0) {
				response.data.category.forEach((elem) => {
					console.log(
						'🚀 ~ file: ProductEdit.js:117 ~ ProductEdit ~ response.data.category.forEach ~ elem',
						elem
					);
					category.push({
						key: elem._id,
						value: elem._id,
						name: elem.name,
					});
				});
			}
			this.setState({
				name: response.data.name,
				category: category,
				quantity: response.data.quantity,
				price: response.data.price,
			});
		} catch (e) {
			console.log(
				'🚀 ~ file: ProductEdit.js:126 ~ ProductEdit ~ componentDidMount ~ e',
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
				header={
					<FormHeader
						returnRoute='/product'
						title={
							<Translation>{(t) => <div>{t('Edit product')}</div>}</Translation>
						}
					/>
				}
				content={
					<ProductForm
						handleSubmit={this.update}
						state={this.state}
						ButtonText={
							<Translation>
								{(t) => <div>{t('category.button')}</div>}
							</Translation>
						}
						handleChipChangeCategory={this.handleChipChangeCategory}
						handleChange={this.handleChange}
						fileChangedHandler={this.fileChangedHandler}

						// handleChangeSelect={this.handleChangeSelect}
					/>
				}
			/>
		);
	}
}
export default withTranslation()(
	withStyles(styles, { withTheme: true })(withSnackbar(withRouter(ProductEdit)))
);
