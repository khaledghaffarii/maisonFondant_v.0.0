import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { Button } from '@material-ui/core';
import { withTranslation, Translation } from 'react-i18next';
import Request from '../../utils/Request';
import Table from '../sharedComponent/Table';
import { withRouter } from 'react-router-dom';
import env from '../../static';
import SimpleModal from '../sharedComponent/SimpleModal';
import Reparations from './Repartaions';
import { isNull } from 'lodash';
const styles = (theme) => ({
	layoutRoot: {},
});
class ClientTable extends Component {
	request = new Request();
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{
					title: (
						<Translation>{(t) => <div>{t('customer.image')}</div>}</Translation>
					),
					field: 'picture',
					render: (rowData) => (
						<img
							alt='client'
							src={`${env.staticFiles}${rowData.picture}`}
							style={{ width: 50, borderRadius: '50%' }}
						/>
					),
				},
				{
					title: (
						<Translation>
							{(t) => <div>{t('customer.firstName')}</div>}
						</Translation>
					),
					field: 'fname',
				},
				{
					title: (
						<Translation>
							{(t) => <div>{t('customer.lastName')}</div>}
						</Translation>
					),
					field: 'lname',
				},
				localStorage.getItem('AdminOrTeam') == 'admin'
					? {
							title: (
								<Translation>
									{(t) => <div>{t('coutry.country')}</div>}
								</Translation>
							),
							field: 'country.countryName',
							hidden: false,
					  }
					: {
							title: (
								<Translation>
									{(t) => <div>{t('coutry.country')}</div>}
								</Translation>
							),
							field: 'country.countryName',
							hidden: true,
					  },
				{
					title: (
						<Translation>
							{(t) => <div>{t('customer.faceboock.customer.address')}</div>}
						</Translation>
					),
					field: ' ',
					render: (rowData) =>
						rowData.region?.name_en ? (
							<span>
								{rowData.region?.name_en} - {rowData.city?.name_en}
							</span>
						) : (
							<span>
								{rowData.gouvernorat_tn?.name_fr} -
								{rowData.delegation_tn?.name_fr}
							</span>
						),
				},
				{
					title: (
						<Translation>{(t) => <div>{t('contact.lang')}</div>}</Translation>
					),
					field: 'lang',
				},
				{
					title: (
						<Translation>{(t) => <div>{t('customer.email')}</div>}</Translation>
					),
					field: 'email',
				},
				{
					title: (
						<Translation>{(t) => <div>{t('customer.phone')}</div>}</Translation>
					),
					field: 'phone',
				},
				{
					title: (
						<Translation>
							{(t) => <div>{t('customer.reparation')}</div>}
						</Translation>
					),
					field: 'showReparations',
					render: (rowData) => this.reparations(rowData),
				},
				{
					title: (
						<Translation>
							{(t) => <div>{t('customer.blocking')}</div>}
						</Translation>
					),
					field: 'block',
					render: (rowData) => this.block(rowData),
				},
			],
			data: [],
			selctedRowlength: 0,
			tableRef: React.createRef(),
		};
		this.delete = this.delete.bind(this);
		this.setStateOnDelete = this.setStateOnDelete.bind(this);
	}
	tableReparations(rowData) {
		return <Reparations id={rowData._id} />;
	}
	reparations(rowData) {
		return <SimpleModal showReparations={this.tableReparations(rowData)} />;
	}
	async blockClient(rowData) {
		try {
			const url = env.clients.block(rowData._id);
			await this.request.new(url);
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
	block(rowData) {
		return (
			<Button
				variant='contained'
				color='primary'
				className='w-224 mx-auto mt-16'
				onClick={this.blockClient.bind(this, rowData)}>
				<Translation>{(t) => <div>{t('customer.block')}</div>}</Translation>
			</Button>
		);
	}
	fetchData(query) {
		return new Promise(async (resolve, reject) => {
			let url = env.clients.list + '?';
			url += 'page=' + (query.page + 1);
			url += '&count=' + query.pageSize;
			url += '&search=' + query.search;
			if (query.filters.length > 0) {
				query.filters.forEach((elem) => {
					url += `&filters[]=${elem.column.field},${elem.value}`;
				});
			} else {
				url += '&filters=';
			}
			const userType = await localStorage.getItem('AdminOrTeam');
			const userCountry = await localStorage.getItem('country');

			if (userType == 'team') {
				url += '&country=' + userCountry;
			}
			try {
				const result = await this.request.getAll(url);
				let dataList = [];
				result.data.data.forEach((element) => {
					// console.log("🚀 ~ file: ClientTable.js:197 ~ ClientTable ~ result.data.data.forEach ~ element", element)
					let adress;
					if (element.adress) {
						adress = `gouvernorat: ${element.adress.gouvernorat} |delegation: ${element.adress.delegation} |localite: ${element.adress.localite} |codePostal: ${element.adress.codePostal}`;
					}
					if (element.country) {
						dataList.push({
							_id: element._id,
							picture: element.picture,
							fname: element.fname,
							lname: element.lname,
							adress: adress,
							email: element.email,
							username: element.username,
							phone: element.phone,
							country: element.country,
							region: element.region,
							city: element.city,
							gouvernorat_tn: element.gouvernorat_tn,
							delegation_tn: element.delegation_tn,
							lang: element.lang,
						});
					} else {
						dataList.push({
							_id: element._id,
							picture: element.picture,
							fname: element.fname,
							lname: element.lname,
							adress: adress,
							email: element.email,
							username: element.username,
							phone: element.phone,
							region: element.region,
							city: element.city,
							gouvernorat_tn: element.gouvernorat_tn,
							delegation_tn: element.delegation_tn,
							lang: element.lang,
						});
					}
				});
				resolve({
					data: dataList,
					page: Number(result.data.page) - 1,
					totalCount: result.data.totalCount,
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
				console.log(e);
			}
		});
	}
	async componentDidMount() {}
	async delete(id) {
		try {
			const url = env.clients.remove(id);
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
	setStateOnDelete(data) {
		this.setState({
			...this.state,
			data,
		});
	}
	render() {
		return (
			<Table
				deleted={localStorage.getItem('AdminOrTeam') == 'admin' ? true : false}
				title={this.props.t('customer.customer')}
				columns={this.state.columns}
				data={this.fetchData.bind(this)}
				routeEdit='/editclient'
				delete={this.delete}
				setStateOnDelete={this.setStateOnDelete}
				showMore='/detailsClient'
				state={this.state}
			/>
		);
	}
}
export default withTranslation()(
	withStyles(styles, { withTheme: true })(withSnackbar(withRouter(ClientTable)))
);
