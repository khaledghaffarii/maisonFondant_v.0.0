import React, { Component } from 'react';
import Request from '../../utils/Request';
import Table from '../sharedComponent/Table';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';

import env from '../../static';
import { withTranslation, Translation } from 'react-i18next';
class SpecialitieTable extends Component {
	request = new Request();
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{
					title: (
						<Translation>
							{(t) => <div>{t('city.nameEnglish')}</div>}
						</Translation>
					),
					field: 'name',
				},
				{
					title: (
						<Translation>
							{(t) => <div>{t('Gouvernorate.nameFrench')}</div>}
						</Translation>
					),
					field: 'nameFr',
				},
				{
					title: (
						<Translation>{(t) => <div>{t('city.nameArabe')}</div>}</Translation>
					),
					field: 'nameAr',
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
			let url = env.specialities.list + '?';
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

				resolve({
					data: result.data,
					page: Number(result.data.page) - 1,
					totalCount: result.data.totalCount,
				});
			} catch (e) {
				if (e.response) {
					this.props.enqueueSnackbar(e.response.data.message, {
						variant: 'error',
					});
				} else {
					this.props.enqueueSnackbar('Erreur', {
						variant: 'error',
					});
				}
			}
		});
	}

	async componentDidMount() {
		try {
			const url = env.specialities.all;
			const response = await this.request.getAll(url);
			this.setState({
				data: response.data,
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
			const url = env.specialities.remove(id);
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
				title={
					<Translation>
						{(t) => <div>{t('speciality.speciality')}</div>}
					</Translation>
				}
				columns={this.state.columns}
				data={this.fetchData.bind(this)}
				routeEdit='/editSpecialitie'
				delete={this.delete}
				setStateOnDelete={this.setStateOnDelete}
				showMore='/detailsSpecialitie'
				state={this.state}
			/>
		);
	}
}
export default withTranslation()(withSnackbar(withRouter(SpecialitieTable)));
