import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Request from '../../utils/Request';
import AuthHelperMethods from '../../services/AuthHelperMethods';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';

import { FusePageCarded } from '@fuse';
import FormHeader from '../sharedComponent/FormHeader';
import BlogForm from './BlogForm';
import env from '../../static';
import { CircularProgress } from '@material-ui/core';
import moment from 'moment';
import { withTranslation, Translation } from 'react-i18next';
const styles = (theme) => ({
	layoutRoot: {},
});
class EditBlog extends Component {
	Auth = new AuthHelperMethods();
	request = new Request();
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			testCountry: '',
			country:
				localStorage.getItem('AdminOrTeam') == 'admin'
					? ''
					: {
							key: localStorage.getItem('country'),
							value: localStorage.getItem('country'),
							label: localStorage.getItem('country'),
					  },
			listCountry: [],
			lang: '',
			description: '',
			content: '',
			tags: '',
			file: '',
			loading: false,
			showCover: true,
			displayOwnerName: '',
			postDate: new Date(),
		};
		this.handleChange = this.handleChange.bind(this);
		this.fileChangedHandler = this.fileChangedHandler.bind(this);
		this.handleChangeSelect = this.handleChangeSelect.bind(this);
		this.handleChangeDescription = this.handleChangeDescription.bind(this);
		this.handleChipChangeCountry = this.handleChipChangeCountry.bind(this);
		this.update = this.update.bind(this);
	}
	fileChangedHandler = (image) => {
		this.setState({ file: image, showCover: false });
	};
	handleChipChangeCountry(value) {
		this.setState((state) => {
			return {
				country: value,
				testCountry: value.value,
			};
		});
	}
	handleChange(event) {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	}

	handleChangeSelect(event) {
		this.setState({
			lang: event,
		});
	}
	handleChangeDescription(content) {
		this.setState({ content });
	}
	async update() {
		let form_data = new FormData();
		const {
			displayOwnerName,
			title,
			description,
			content,
			tags,
			lang,
			postDate,
		} = this.state;
		form_data.append('title', title);
		form_data.append('country', this.state.country.key);
		form_data.append('description', description);
		form_data.append('content', content);
		form_data.append('tags', tags);
		form_data.append('lang', lang.value);
		form_data.append('displayOwnerName', displayOwnerName);
		form_data.append('postDate', postDate);
		if (this.state.file !== '') {
			form_data.append('file', this.state.file, this.state.file.name);
		}
		try {
			const url = env.blog.update(this.props.match.params.id);
			await this.request.update(url, form_data, false);
			this.props.enqueueSnackbar(
				<Translation>
					{(t) => <div>{t('stock.edit.success')}</div>}
				</Translation>,
				{
					variant: 'success',
				}
			);
			this.props.history.push('/blog');
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
	async componentDidMount() {
		try {
			const url = env.blog.info;
			const response = await this.request.getById(
				url,
				this.props.match.params.id
			);
			const urlCountry = env.country.all;
			const Country = await this.request.getAll(urlCountry);
			Country.data.map((obj) => {
				if (obj._id == response.data.country?._id) {
					this.setState({
						testCountry: obj.iso2,
					});
				}
			});
			this.setState({
				title: response.data.title,
				country: response.data.country
					? {
							key: response.data.country._id,
							value: response.data.country._id,
							label: response.data.country.countryName,
					  }
					: '',
				listCountry: Country.data,
				lang: {
					key: -1,
					value: response.data.lang,
					label:
						response.data.lang === 'fr'
							? 'Français'
							: response.data.lang === 'en'
							? 'English'
							: 'العربیة',
				},
				description: response.data.description,
				content: response.data.content,
				tags: response.data.tags,
				cover: response.data.cover,
				displayOwnerName: response.data.displayOwnerName || 'admin',
				postDate: moment.utc(response.data.created_at).format('YYYY-MM-DD'),
				loading: false,
			});
		} catch (e) {
			console.log(
				'🚀 ~ file: EditBlog.js ~ line 179 ~ EditBlog ~ componentDidMount ~ e',
				e.response
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
	}

	render() {
		const { classes } = this.props;

		return (
			<FusePageCarded
				classes={{
					root: classes.layoutRoot,
				}}
				header={
					<FormHeader
						returnRoute='/blog'
						title={
							<Translation>{(t) => <div>{t('blog.update')}</div>}</Translation>
						}
					/>
				}
				content={
					this.state.loading ? (
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
								{' '}
								<Translation>
									{(t) => <div>{t('stock.edit.loading')}</div>}
								</Translation>
							</h1>
						</div>
					) : (
						<BlogForm
							showCover={this.state.showCover}
							handleSubmit={this.update}
							state={this.state}
							ButtonText={
								<Translation>
									{(t) => <div>{t('blog.update')}</div>}
								</Translation>
							}
							handleChipChangeCountry={this.handleChipChangeCountry}
							handleChange={this.handleChange}
							fileChangedHandler={this.fileChangedHandler}
							handleChangeSelect={this.handleChangeSelect}
							handleChangeDescription={this.handleChangeDescription}
						/>
					)
				}
			/>
		);
	}
}
export default withTranslation()(
	withStyles(styles, { withTheme: true })(withSnackbar(withRouter(EditBlog)))
);
