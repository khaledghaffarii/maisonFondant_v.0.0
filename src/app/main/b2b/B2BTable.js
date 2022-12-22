import React, { Component } from 'react';
import Request from '../../utils/Request';
import Table from '../sharedComponent/Table';
import { withSnackbar } from 'notistack';

import { withRouter } from 'react-router-dom';
import env from '../../static';
import { Button } from '@material-ui/core';
import Moment from 'react-moment';
import fr from 'moment/locale/fr';
import { withTranslation, Translation } from 'react-i18next';
class B2BTable extends Component {
	request = new Request();
	replay(email) {
		window.location.href = `mailto:${email}?subject=B2B+TrustiT`;
	}
	async traiter(id) {
		try {
			const result = await this.request.update(
				env.b2b.update(id),
				{ traiter: true },
				false
			);
			console.log(result);
			this.props.enqueueSnackbar(
				<Translation>{(t) => <div>{t('B2B.update')}</div>}</Translation>,
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
				this.props.enqueueSnackbar(e.message, {
					variant: 'error',
				});
			}
		}
	}
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{
					title: 'Personne du contact',
					render: (rowData) => (
						<div>
							<p>
								<Translation>
									{(t) => <div>{t('stock.fullName')}</div>}
								</Translation>
								: {rowData.nom} {rowData.prenom}
							</p>
							<p>Position: {rowData.position}</p>
							<p>
								<a href={`mailto:${rowData.email}`}>{rowData.email}</a>
							</p>
							<p>
								{' '}
								<Translation>
									{(t) => <div>{t('boutique.phone')}</div>}
								</Translation>
								: {rowData.phone}
							</p>
						</div>
					),
				},
				{
					title: (
						<Translation>{(t) => <div>{t('coutry.country')}</div>}</Translation>
					),
					field: 'country.countryName',
					hidden: false,
				},
				{
					title: 'Entreprise',
					render: (rowData) => (
						<div>
							<p>
								{' '}
								<Translation>
									{(t) => <div>{t('B2B.companyName')}</div>}
								</Translation>
								: {rowData.nomEntreprise}
							</p>
							<p>
								<Translation>
									{(t) => <div>{t('B2B.UniqueIdentifier')}</div>}
								</Translation>
								: {rowData.identifientUnique}
							</p>
						</div>
					),
				},
				{
					title: (
						<Translation>
							{(t) => <div>{t('B2B.autherEmail')}</div>}
						</Translation>
					),
					field: 'autreEmail',
				},
				{
					title: <Translation>{(t) => <div>{t('B2B.need')}</div>}</Translation>,
					field: 'besoin',
				},
				{
					title: 'Cupon',
					field: 'cupon',
					render: (rowData) => (rowData.cupon ? rowData.cupon : '-'),
				},
				{
					title: (
						<Translation>
							{(t) => <div>{t('reparation.creationDate')}</div>}
						</Translation>
					),
					render: (rowData) => (
						<Moment format={'llll'} locale={'fr'}>
							{rowData.created_at}
						</Moment>
					),
					type: 'date',
				},
				{
					title: 'Actions',
					render: (rowData) => (
						<div>
							<Button
								variant='contained'
								color='primary'
								onClick={this.replay.bind(this, rowData.email)}>
								<Translation>
									{(t) => <div>{t('message.sendMail')}</div>}
								</Translation>
							</Button>
							{rowData.traiter ? (
								<div />
							) : (
								<Button
									variant='contained'
									color='primary'
									onClick={this.traiter.bind(this, rowData._id)}>
									<Translation>
										{(t) => <div>{t('B2B.treatedNotice')}</div>}
									</Translation>
								</Button>
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
		this.setStateOnDelete = this.setStateOnDelete.bind(this);
	}

	fetchData(query) {
		return new Promise(async (resolve, reject) => {
			let url = env.b2b.list + '?';
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
					dataList.push({
						...element,
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
					this.props.enqueueSnackbar(e.message, {
						variant: 'error',
					});
				}
			}
		});
	}
	async componentDidMount() {}
	async delete(event, rowId) {
		try {
			const url = env.b2b.remove;
			await this.request.new(
				url,
				rowId.map((row) => row._id)
			);
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
				this.props.enqueueSnackbar(e.message, {
					variant: 'error',
				});
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
				rewriteAction={true}
				actions={[
					(rowData) => ({
						tooltip: 'Remove All Selected Requests',
						icon: 'delete',
						onClick: this.delete,
					}),
				]}
				title='Requetes B2B'
				columns={this.state.columns}
				data={this.fetchData.bind(this)}
				state={this.state}
				rowStyle={(rowData) =>
					rowData.traiter
						? { background: '#00ff7526' }
						: { background: '#ff000024' }
				}
			/>
		);
	}
}
export default withTranslation()(withSnackbar(withRouter(B2BTable)));
