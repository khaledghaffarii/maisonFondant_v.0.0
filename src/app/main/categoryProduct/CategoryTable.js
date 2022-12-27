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
class CategoryTable extends Component {
	request = new Request();

	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{
					title: 'Name',
					field: 'name',
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
		let url = env.categories.all;
		try {
			const result = await this.request.getAll(url);

			let dataList = [];
			let category = [];
			let categoriesValues = '';
			result.data.forEach((element) => {
				dataList.push({
					_id: element._id,
					name: element.name,
				});
			});
			console.log(
				'🚀 ~ file: ProductTable.js:91 ~ ProductTable ~ fetchData= ~ dataList',
				dataList
			);
			return this.setState({
				data: dataList,
			});
		} catch (e) {
			console.log(
				'🚀 ~ file: ProductTable.js:100 ~ ProductTable ~ returnnewPromise ~ e',
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

	async delete(id) {
		try {
			const url = env.categories.remove(id);
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
			console.log(
				'🚀 ~ file: ProductTable.js:152 ~ ProductTable ~ delete ~ e',
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
	// setStateOnDelete(data) {
	// 	this.setState({
	// 		...this.state,
	// 		data,
	// 	});
	// }

	render() {
		console.log(
			'🚀 ~ file: ProductTable.js:162 ~ ProductTable ~ render ~ this.state.data',
			this.state.data
		);
		return (
			<Table
				//deleted={localStorage.getItem('AdminOrTeam') == 'admin' ? false : false}
				title={this.props.t('Category')}
				columns={this.state.columns}
				data={this.state.data}
				routeEdit='/editCategory'
				delete={this.delete}
				//setStateOnDelete={this.setStateOnDelete}
				showMore='/deviceDetails'
				state={this.state}
			/>
		);
	}
}
export default withTranslation()(withSnackbar(withRouter(CategoryTable)));
