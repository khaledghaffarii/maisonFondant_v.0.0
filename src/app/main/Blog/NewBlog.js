import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { FusePageCarded } from '@fuse';
import { withSnackbar } from 'notistack';

import FormHeader from '../sharedComponent/FormHeader';
import Request from '../../utils/Request';
import AuthHelperMethods from '../../services/AuthHelperMethods';
import BlogForm from './BlogForm';
import env from '../../static';
import { withRouter } from 'react-router-dom';
import { withTranslation, Translation } from 'react-i18next';
const styles = (theme) => ({
	layoutRoot: {},
});
class NewBlog extends Component {
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
			contentValue: '',
			displayOwnerName: '',
			postDate: new Date(),
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.fileChangedHandler = this.fileChangedHandler.bind(this);
		this.handleChangeSelect = this.handleChangeSelect.bind(this);
		this.handleChangeDescription = this.handleChangeDescription.bind(this);
		this.handleChipChangeCountry = this.handleChipChangeCountry.bind(this);
	}
	async componentDidMount() {
		try {
			const urlCountry = env.country.all;
			const Country = await this.request.getAll(urlCountry);
			Country.data.map((obj) => {
				if (obj._id == localStorage.getItem('country')) {
					this.setState({
						testCountry: obj.iso2,
					});
				}
			});
			this.setState({
				listCountry: Country.data,
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
	fileChangedHandler = (image) => {
		this.setState({ file: image });
	};
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
	handleChipChangeCountry(value) {
		this.setState((state) => {
			return {
				country: value,
				testCountry: value.value,
			};
		});
	}
	handleSubmit = async (e) => {
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
			const url = env.blog.new;
			await this.request.new(url, form_data, true);
			this.props.enqueueSnackbar(
				<Translation>
					{(t) => <div>{t('stock.edit.success')}</div>}
				</Translation>,
				{
					variant: 'success',
				}
			);
			this.props.history.push('/blog');
		} catch (err) {
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
	};
	handleChangeDescription(content) {
		this.setState({ content });
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
							<Translation>{(t) => <div>{t('blog.add')}</div>}</Translation>
						}
					/>
				}
				content={
					<BlogForm
						handleSubmit={this.handleSubmit}
						state={this.state}
						ButtonText={
							<Translation>{(t) => <div>{t('blog.add')}</div>}</Translation>
						}
						handleChange={this.handleChange}
						handleChipChangeCountry={this.handleChipChangeCountry}
						fileChangedHandler={this.fileChangedHandler}
						handleChangeSelect={this.handleChangeSelect}
						handleChangeDescription={this.handleChangeDescription}
					/>
				}
			/>
		);
	}
}

export default withTranslation()(
	withStyles(styles, { withTheme: true })(withSnackbar(withRouter(NewBlog)))
);
