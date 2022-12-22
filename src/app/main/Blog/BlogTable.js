import React, { Component } from 'react';
import Request from '../../utils/Request';
import Table from '../sharedComponent/Table';
import { withSnackbar } from 'notistack';

import { withRouter } from 'react-router-dom';
import env from '../../static';
import TabsComments from './TabsComments';
import SimpleModal from '../sharedComponent/SimpleModal';
import { withTranslation, Translation } from 'react-i18next';
class BlogTable extends Component {
	request = new Request();

	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{
					title: (
						<Translation>{(t) => <div>{t('blog.picture')}</div>}</Translation>
					),
					field: 'cover',
					render: (rowData) => (
						<img
							alt='blog'
							src={`${env.staticFiles}${rowData.cover}`}
							style={{ width: 50, borderRadius: '50%' }}
						/>
					),
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
							{(t) => <div>{t('blog.titleTable')}</div>}
						</Translation>
					),
					field: 'title',
				},
				{
					title: 'Language',
					field: 'lang',
					render: (rowData) =>
						rowData.lang === 'fr'
							? 'Français'
							: rowData.lang === 'en'
							? 'English'
							: 'العربیة',
				},
				{ title: 'Description', field: 'description' },
				{
					title: (
						<Translation>{(t) => <div>{t('blog.Comment')}</div>}</Translation>
					),
					field: 'comments',
					render: this.commentsModal.bind(this),
				},
				{
					title: (
						<Translation>{(t) => <div>{t('form.tags')}</div>}</Translation>
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
		this.commentsModal = this.commentsModal.bind(this);
	}

	commentsModal(rowData) {
		return (
			<SimpleModal
				badgeContent={
					(rowData.comments || []).length > 0
						? rowData.comments.filter(
								(comment) => !comment.validated && !comment.rejected
						  ).length
						: 0
				}
				showReparations={<TabsComments comments={rowData.comments || []} />}
			/>
		);
	}
	fetchData(query) {
		return new Promise(async (resolve, reject) => {
			let url = env.blog.list + '?';
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
				result.data.blogs.forEach((element) => {
					dataList.push(element);
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
			const url = env.blog.remove(id);
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
					<Translation>{(t) => <div>{t('items.items')}</div>}</Translation>
				}
				columns={this.state.columns}
				data={this.fetchData.bind(this)}
				routeEdit='/editBlog'
				delete={this.delete}
				setStateOnDelete={this.setStateOnDelete}
				showMore='/detailsBlog'
				state={this.state}
			/>
		);
	}
}
export default withTranslation()(withSnackbar(withRouter(BlogTable)));
