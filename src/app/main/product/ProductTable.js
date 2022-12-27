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
				// {
				// 	title: (
				// 		<Translation>
				// 			{(t) => <div>{t('boutique.picture')}</div>}
				// 		</Translation>
				// 	),
				// 	field: 'image',
				// 	render: (rowData) => (
				// 		(
				// 			<img
				// 				alt='brand'
				// 				src={NoProduct}
				// 				style={{ width: 50, borderRadius: '50%' }}
				// 			/>
				// 		),
				// 		console.log(
				// 			'🚀 ~ file: ProductTable.js:41 ~ ProductTable ~ constructor ~ rowData',
				// 			rowData
				// 		)
				// 	),
				// },

				{
					title: 'Name',
					field: 'name',
				},
				{
					title: <Translation>{(t) => <div>{t('Quantity')}</div>}</Translation>,
					field: 'quantity',
				},
				{
					title: <Translation>{(t) => <div>{t('price')}</div>}</Translation>,
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

		//this.setStateOnDelete = this.setStateOnDelete.bind(this);
	}
	async componentDidMount() {
		let url = env.products.all;
		try {
			const result = await this.request.getAll(url);
			let dataList = [];
			let category = [];
			let categoriesValues = '';
			result.data.forEach((element) => {
				dataList.push({
					_id: element._id,
					image: element.image,
					name: element.name,
					quantity: element.quantity,
					price: element.price,
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
			this.state.tableRef.current.onQueryChange();

			this.props.enqueueSnackbar(
				<Translation>
					{(t) => <div>{t('stock.edit.success')}</div>}
				</Translation>,
				{
					variant: 'success',
				}
			);
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
	// setStateOnDelete(data) {
	// 	this.setState({
	// 		...this.state,
	// 		data,
	// 	});
	// }

	render() {
		return (
			<Table
				//deleted={localStorage.getItem('AdminOrTeam') == 'admin' ? false : false}
				title={this.props.t('Product')}
				columns={this.state.columns}
				data={this.state.data}
				routeEdit='/editProduct'
				delete={this.delete}
				//setStateOnDelete={this.setStateOnDelete}
				state={this.state}
			/>
		);
	}
}
export default withTranslation()(withSnackbar(withRouter(ProductTable)));
