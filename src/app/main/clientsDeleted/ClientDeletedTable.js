import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { withTranslation, Translation } from 'react-i18next';
import Request from '../../utils/Request';
import Table from '../sharedComponent/Table';
import { withRouter } from 'react-router-dom';
import env from '../../static';
import { isNull } from 'lodash';
const styles = (theme) => ({
	layoutRoot: {},
});
class ClientDeletedTable extends Component {
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
						rowData.region ? (
							<span>
								{rowData.region.name_en} - {rowData.city?.name_en}
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
			],
			data: [],
			selctedRowlength: 0,
			tableRef: React.createRef(),
		};
	}
	fetchData(query) {
		return new Promise(async (resolve, reject) => {
			let url = env.clients.listDeletedClient + '?';
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
							email: element.emailDeleted,
							username: element.username,
							phone: element.phone,
							country: element.country,
							region: element.region,
							city: element.city,
							gouvernorat_tn: element.gouvernorat_tn,
							delegation_tn: element.delegation_tn,
						});
					} else {
						dataList.push({
							_id: element._id,
							picture: element.picture,
							fname: element.fname,
							lname: element.lname,
							adress: adress,
							email: element.emailDeleted,
							username: element.username,
							phone: element.phone,
							region: element.region,
							city: element.city,
							gouvernorat_tn: element.gouvernorat_tn,
							delegation_tn: element.delegation_tn,
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
	
	render() {
		return (
			<Table
				deleted={false}
				title={this.props.t('customer.customer')}
				columns={this.state.columns}
				data={this.fetchData.bind(this)}
				state={this.state}
			/>
		);
	}
}
export default withTranslation()(
	withStyles(styles, { withTheme: true })(withSnackbar(withRouter(ClientDeletedTable)))
);
