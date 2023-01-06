import React, { Component } from 'react';
import Request from '../../utils/Request';
import Table from '../sharedComponent/Table';
import { withSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';
import env from '../../static';
//import TabsCommandes from "../../TabsCommandes";
import SimpleModal from '../sharedComponent/SimpleModal';
import 'react-image-lightbox/style.css';
import { withTranslation, Translation } from 'react-i18next';
import NoProduct from '../../../assets/no-product.png';
class ProductTable extends Component {
	request = new Request();

	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{
					title: 'Name',
					field: 'name',
				},
				{
					title: 'Quantity',
					field: 'quantity',
				},
				{
					title: 'Price',
					field: 'price',
				},
				{
					title: 'Category',
					field: 'category',
				},
			],
			data: [],
			selctedRowlength: 0,
			tableRef: React.createRef(),
		};
		this.delete = this.delete.bind(this);
		this.setStateOnDelete = this.setStateOnDelete.bind(this);
	}
	async componentDidMount() {
		let url = env.products.all;
		try {
			const result = await this.request.getAll(url);
			let dataList = [];
			let category = [];
			let categoriesValues = '';
			result.data.forEach((element) => {
				const formattedTotalPrice = element.price
					.toFixed(1)
					.toLocaleString('fr-TN', {
						style: 'currency',
						currency: 'TND',
					});
				dataList.push({
					_id: element._id,
					image: element.image,
					name: element.name,
					quantity: element.quantity,
					price: formattedTotalPrice,
					category: element.category.name,
				});
			});

			return this.setState({
				data: dataList,
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

	async delete(id) {
		try {
			const url = env.products.remove(id);
			await this.request.delete(url);
			//this.state.tableRef.current.onQueryChange();

			this.props.enqueueSnackbar(
				<Translation>
					{(t) => <div>{t('stock.edit.success')}</div>}
				</Translation>,
				{
					variant: 'success',
				}
			);
			window.location.reload();
		} catch (e) {
			console.log(
				'🚀 ~ file: ProductTable.js:104 ~ ProductTable ~ delete ~ e',
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
	setStateOnDelete(data) {
		this.setState({
			...this.state,
			data,
		});
	}

	render() {
		return (
			<Table
				//deleted={localStorage.getItem('AdminOrTeam') == 'admin' ? false : false}
				title={this.props.t('Product')}
				columns={this.state.columns}
				data={this.state.data}
				routeEdit='/editProduct'
				delete={this.delete}
				setStateOnDelete={this.setStateOnDelete}
				state={this.state}
			/>
		);
	}
}
export default withTranslation()(withSnackbar(withRouter(ProductTable)));
