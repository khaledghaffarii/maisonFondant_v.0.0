import React, { Component } from 'react';
import Request from '../../utils/Request';
import Table from '../sharedComponent/Table';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';

import env from '../../static';
import { CircularProgress } from '@material-ui/core';
import { withTranslation, Translation } from 'react-i18next';
class ProductReparationTable extends Component {
	request = new Request();
	constructor(props) {
		super(props);

		const userType = localStorage.getItem('AdminOrTeam');
		this.state = {
			columns: [
				{
					title: (
						<Translation>{(t) => <div>{t('product.image')}</div>}</Translation>
					),
					field: 'picture',
					render: (rowData) => (
						<img
							alt='product'
							src={`${env.staticFiles}${rowData.picture}`}
							style={{ width: 50, borderRadius: '50%' }}
						/>
					),
				},
				{
					title: (
						<Translation>
							{(t) => <div>{t('reparationType.reparationType')}</div>}
						</Translation>
					),
					render: (rowData) => <span>{rowData.typeReparation?.name}</span>,
				},
				{
					title: (
						<Translation>{(t) => <div>{t('brind.brind')}</div>}</Translation>
					),
					render: (rowData) => <span>{rowData.device?.nameEnglish}</span>,
				},
				{
					title: (
						<Translation>{(t) => <div>{t('device.device')}</div>}</Translation>
					),
					render: (rowData) => <span>{rowData.brand?.name}</span>,
				},
				{
					title: (
						<Translation>{(t) => <div>{t('model.Model')}</div>}</Translation>
					),
					render: (rowData) => <span>{rowData.model?.name}</span>,
				},
				{
					title: (
						<Translation>{(t) => <div>{t('product.price')}</div>}</Translation>
					),
					field: 'prix',
				},
				{
					title: (
						<Translation>
							{(t) => <div>{t('product.supplierPrice')}</div>}
						</Translation>
					),
					field: 'prixFournisseur',
				},
				{
					title: (
						<Translation>
							{(t) => <div>{t('product.disponibility.title')}</div>}
						</Translation>
					),
					field: 'disponibilite',
				},
				userType == 'admin'
					? {
							title: (
								<Translation>
									{(t) => <div>{t('coutry.country')}</div>}
								</Translation>
							),
							render: (rowData) => <span>{rowData.country?.iso3}</span>,
					  }
					: {},
				{
					title: (
						<Translation>{(t) => <div>{t('color.color')}</div>}</Translation>
					),
					render: (rowData) => (
						<span>
							{rowData.colorList.map((colorList) => (
								<div
									style={{
										backgroundColor: `${colorList.codeColor}`,
										borderRadius: '50%',
										display: 'inline-block',
										height: 30,
										width: 30,
									}}
								/>
							))}
						</span>
					),
				},
				{
					title: (
						<Translation>
							{(t) => <div>{t('product.description')}</div>}
						</Translation>
					),
					field: 'description',
				},
				{
					title: (
						<Translation>{(t) => <div>{t('product.tags')}</div>}</Translation>
					),
					field: 'tags',
				},
			],
			data: [],
			selctedRowlength: 0,
			tableRef: React.createRef(),
		};
		this.delete = this.delete.bind(this);
		this.setStateOnDelete = this.setStateOnDelete.bind(this);
		this.downloadAllProduct = this.downloadAllProduct.bind(this);
	}
	fetchData(query) {
		return new Promise(async (resolve, reject) => {
			let url = env.productsReparation.list + '?';
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
				console.log("result",result);
				let dataList = [];
				result.data.data.forEach((element) => {
					let parentValue = '';
					if (element.parent) {
						parentValue = element.parent.name;
					} else {
						parentValue = (
							<Translation>
								{(t) => <div>{t('category.parent.noParents')}</div>}
							</Translation>
						);
					}

					dataList.push({
						_id: element._id,
						picture: element.typeReparation?.picture,
						typeReparation: element.typeReparation,
						device: element.device,
						model: element.model,
						brand: element.brand,
						prix: element.prix,
						prixFournisseur: element.prixFournisseur,
						colorList: element.colorList,
						disponibilite: element.disponibilite,
						description: element.description,
						descriptionArabe: element.descriptionArabe,
						descriptionEnglish: element.descriptionEnglish,
						tags: element.tags,
						country: element.country,
					});
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
	async componentDidMount() {}
	async delete(id) {
		try {
			const url = env.productsReparation.remove(id);
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
	async downloadAllProduct(event, rowData) {
		try {
			this.setState({ loading: true });
			const result = await this.request.new(
				env.products.exports,
				rowData,
				false
			);
			this.setState({ loading: false });
			this.props.enqueueSnackbar(
				<Translation>
					{(t) => <div>{t('stock.edit.success')}</div>}
				</Translation>,
				{
					variant: 'success',
				}
			);
			const url = result.data.url;
			window.open(`${env.staticFiles}${url}`, '_blank');
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
		const actions = [
			{
				icon: 'cloud_download',
				tooltip: 'Exporter porduits',
				isFreeAction: true,
				onClick: this.downloadAllProduct,
			},
		];
		return this.state.loading ? (
			<div
				style={{
					flex: 1,
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<CircularProgress color='secondary' />
				<h1>
					<Translation>
						{(t) => <div>{t('stock.edit.loading')}</div>}
					</Translation>
				</h1>
			</div>
		) : (
			<Table
				deleted={localStorage.getItem('AdminOrTeam') == 'admin' ? true : false}
				title={
					<Translation>{(t) => <div>{t('product.produit')}</div>}</Translation>
				}
				columns={this.state.columns}
				data={this.fetchData.bind(this)}
				routeEdit='/editProductReparation'
				delete={this.delete}
				setStateOnDelete={this.setStateOnDelete}
				state={this.state}
				actions={actions}
			/>
		);
	}
}
export default withTranslation()(
	withSnackbar(withRouter(ProductReparationTable))
);
