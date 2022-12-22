import React, { Component } from 'react';
import Request from '../../../utils/Request';
import Table from '../../sharedComponent/Table';
import { withSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';
import env from '../../../static';
import TabsCommandes from './addCountry';
import { Button, CardContent } from '@material-ui/core';
import EditCountry from './editCountry';
import SimpleModal from '../../sharedComponent/SimpleModal';
import 'react-image-lightbox/style.css';
import { withTranslation, Translation } from 'react-i18next';
class StockTable extends Component {
	request = new Request();

	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{
					title: (
						<Translation>
							{(t) => <div>{t('boutique.picture')}</div>}
						</Translation>
					),
					field: 'picture',
					render: (rowData) => (
						<img
							alt='country'
							src={`${env.staticFiles}${rowData.picture}`}
							style={{ width: 50, borderRadius: '50%' }}
						/>
					),
				},
				{
					title: (
						<Translation>
							{(t) => <div>{t('coutry.coutryName')}</div>}
						</Translation>
					),
					field: 'countryName',
					render: (rowData) => this.editCountryModal(rowData),
				},
				{ title: 'iso2', field: 'iso2' },
				{ title: 'iso3', field: 'iso3' },
				{
					title: (
						<Translation>
							{(t) => <div>{t('coutry.phoneCode')}</div>}
						</Translation>
					),
					field: 'phoneCode',
				},
				{
					title: (
						<Translation>
							{(t) => <div>{t('coutry.currency')}</div>}
						</Translation>
					),
					render: (rowData) => (
						<p>
							{this.props.i18n.language == 'en'
								? rowData.currency?.currencyEnglish
								: rowData.currency?.currencyFrancais}
						</p>
					),
				},
				{
					title: 'Action',

					field: 'action',

					render: (rowData) => (
						<div>
							{rowData.phoneCode == '966' && (
								<div>
									<Button
										variant='contained'
										className=' mx-auto mr-12'
										onClick={() => this.props.history.push('/country/region')}>
										region
									</Button>
									<Button
										onClick={() => this.props.history.push('/country/city')}
										variant='contained'
										className=' mx-auto '>
										City
									</Button>
								</div>
							)}

							{rowData.phoneCode == '216' && (
								<div>
									<Button
										onClick={() =>
											this.props.history.push('/country/gouvernorate')
										}
										variant='contained'
										className=' mx-auto mb-12'>
										governorate
									</Button>
									<Button
										onClick={() =>
											this.props.history.push('/country/delegation')
										}
										variant='contained'
										className=' mx-auto '>
										delegation
									</Button>
								</div>
							)}
						</div>
					),
				},
			],
			data: [],
			selctedRowlength: 0,
			tableRef: React.createRef(),
		};
		this.delete = this.delete.bind(this);
		this.fetchData = this.fetchData.bind(this);
		this.setStateOnDelete = this.setStateOnDelete.bind(this);

		this.editCountryModal = this.editCountryModal.bind(this);
	}

	editCountryModal(rowData) {
		return (
			<SimpleModal
				open={true}
				show={<EditCountry id={rowData._id} />}
				buttonText={rowData.countryName}
			/>
		);
	}
	fetchData(query) {
		return new Promise(async (resolve, reject) => {
			let url = env.country.list + '?';
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
			try {
				const result = await this.request.getAll(url);
				let dataList = [];
				result.data.data.forEach((element) => {
					console.log(
						'🚀 ~ file: countryTable.js:162 ~ StockTable ~ result.data.data.forEach ~ element',
						element
					);
					dataList.push({ ...element, id: element._id });
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
			}
		});
	}

	async delete(id) {
		try {
			const url = env.country.remove(id);
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
				countryButtonSelect={true}
				updated={false}
				deleted={localStorage.getItem('AdminOrTeam') == 'admin' ? true : false}
				title={
					<Translation>{(t) => <div>{t('coutry.country')}</div>}</Translation>
				}
				columns={this.state.columns}
				data={this.fetchData}
				delete={this.delete}
				setStateOnDelete={this.setStateOnDelete}
				type='country'
				state={this.state}
			/>
		);
	}
}
export default withTranslation()(withSnackbar(withRouter(StockTable)));
