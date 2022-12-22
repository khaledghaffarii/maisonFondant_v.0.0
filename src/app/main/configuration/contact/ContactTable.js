import React, { Component } from 'react';
import Request from '../../../utils/Request';
import Table from '../../sharedComponent/Table';
import { withSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';
import env from '../../../static';
//import TabsCommandes from "../../TabsCommandes";

import 'react-image-lightbox/style.css';
import { withTranslation, Translation } from 'react-i18next';
class ContactTable extends Component {
	request = new Request();

	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{
					title: (
						<Translation>{(t) => <div>{t('boutique.phone')}</div>}</Translation>
					),
					field: 'numberPhone',
				},
				{
					title: (
						<Translation>{(t) => <div>{t('contact.lang')}</div>}</Translation>
					),
					field: 'lang',
				},
			],
			data: [],
			selctedRowlength: 0,
			tableRef: React.createRef(),
		};

		this.fetchData = this.fetchData.bind(this);
	}

	fetchData(query) {
		return new Promise(async (resolve, reject) => {
			let url = env.contact.list + '?';
			// url += 'page=' + (query.page + 1);
			// url += '&count=' + query.pageSize;
			// url += '&search=' + query.search;
			if (query.filters.length > 0) {
				query.filters.forEach((elem) => {
					url += `&filters[]=${elem.column.field},${elem.value}`;
				});
			} else {
				url;
				// += '&filters=';
			}
			try {
				const result = await this.request.getAll(url);
				let dataList = [];
				console.log(
					'🚀 ~ file: ContactTable.js:55 ~ ContactTable ~ returnnewPromise ~ dataList',
					dataList
				);

				result.data.data.forEach((element) => {
					dataList.push({
						_id: element._id,
						numberPhone: element.numberPhone,
						lang: element.lang,
					});
				});

				resolve({
					data: dataList,
					page: Number(result.data.page) - 1,
					totalCount: result.data.totalCount,
				});
			} catch (e) {
				console.log(
					'🚀 ~ file: ContactTable.js:70 ~ ContactTable ~ returnnewPromise ~ e',
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
		});
	}

	render() {
		return (
			<Table
				title={this.props.t('contact.contact')}
				columns={this.state.columns}
				data={this.fetchData}
				state={this.state}
			/>
		);
	}
}
export default withTranslation()(withSnackbar(withRouter(ContactTable)));
