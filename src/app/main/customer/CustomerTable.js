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
class CustomerTable extends Component {
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
					title: 'Email',
					field: 'email',
				},
				{
					title: 'Phone',
					field: 'phone',
				},
				{
					title: 'Address',
					field: 'address',
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
		let url = env.customers.all;
		try {
			const result = await this.request.getAll(url);
			let dataList = [];
			result.data.forEach((element) => {
				dataList.push({
					_id: element._id,
					name: element.name,
					phone: element.phone,
					email: element.email,
					address: element.address,
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
			const url = env.customers.remove(id);
			await this.request.delete(url);
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
				title={this.props.t('Customer')}
				columns={this.state.columns}
				data={this.state.data}
				routeEdit='/editCustomer'
				state={this.state}
				delete={this.delete}
				setStateOnDelete={this.setStateOnDelete}
			/>
		);
	}
}
export default withTranslation()(withSnackbar(withRouter(CustomerTable)));
