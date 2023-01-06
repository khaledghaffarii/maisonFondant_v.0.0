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
import Moment from 'react-moment';
class SalesTable extends Component {
	request = new Request();
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{
					title: 'Customer',
					render: (rowData) => (
						<div>
							<p>{rowData.customer_name} </p>
							{rowData.billed ? (
								<p style={{ color: 'green' }}>Billed</p>
							) : (
								<p style={{ color: 'red' }}>Not billed</p>
							)}
						</div>
					),
					field: 'customer_name',
				},
				{
					title: 'Location',
					field: 'customer_adresse',
				},

				// {
				// 	title: 'Status',
				// 	render: (rowData) => (
				// 		<div>
				// 			{rowData.billed ? (
				// 				<p style={{ color: 'green' }}>Billed</p>
				// 			) : (
				// 				<p style={{ color: 'red' }}>No billed</p>
				// 			)}
				// 		</div>
				// 	),
				// 	field: 'billed',
				// },
				// {
				// 	title: 'Delivery',
				// 	render: (rowData) => (
				// 		<div>
				// 			{rowData.delivery_note_sent ? (
				// 				<p style={{ color: 'green' }}>Delivered </p>
				// 			) : (
				// 				<p style={{ color: 'red' }}>Not delivered </p>
				// 			)}
				// 		</div>
				// 	),
				// 	field: 'delivery_note_sent',
				// },
				{
					title: 'Order date',
					render: (rowData) => (
						<Moment format={'llll'} locale={'fr'}>
							{rowData.date}
						</Moment>
					),
					field: 'date',
				},
				{
					title: 'Total',
					render: (rowData) => (
						<div>
							{rowData.billed ? (
								<p style={{ color: 'green' }}>{rowData.total_paid} DT</p>
							) : (
								<p style={{ color: 'red' }}>{rowData.total_paid} DT</p>
							)}
						</div>
					),
					field: 'total_paid',
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
		let url = env.outputs.all;
		try {
			const result = await this.request.getAll(url);
			let dataList = [];
			result.data.forEach((element) => {
				dataList.push({
					_id: element._id,
					customer_name: element.customer_name,
					date: element.date,
					customer_adresse: element.customer_adresse,
					totalPay: element.total_paid,
					billed: element.billed,
					delivery_note_sent: element.delivery_note_sent,
					total_paid: element.total_paid,
				});
			});

			return this.setState({
				data: dataList.reverse(),
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
			const url = env.outputs.remove(id);
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
				sales={true}
				//deleted={localStorage.getItem('AdminOrTeam') == 'admin' ? false : false}
				title={this.props.t('Output Sales')}
				columns={this.state.columns}
				data={this.state.data}
				routeEdit='/editSales'
				delete={this.delete}
				setStateOnDelete={this.setStateOnDelete}
				state={this.state}
				showMore='/detailsSales'
			/>
		);
	}
}
export default withTranslation()(withSnackbar(withRouter(SalesTable)));
