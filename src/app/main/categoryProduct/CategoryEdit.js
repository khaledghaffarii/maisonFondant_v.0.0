import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

import Request from '../../utils/Request';
import AuthHelperMethods from '../../services/AuthHelperMethods';
import { withRouter } from 'react-router-dom';
import { FusePageCarded } from '@fuse';
import FormHeader from '../sharedComponent/FormHeader';

import env from '../../static';
import { withTranslation, Translation } from 'react-i18next';
import CategoryForm from './CategoryForm';

const styles = (theme) => ({
	layoutRoot: {},
});

class CategoryEdit extends Component {
	Auth = new AuthHelperMethods();
	request = new Request();
	constructor(props) {
		super(props);
		this.state = {
			name: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.update = this.update.bind(this);
		this.handleChipChangeParent = this.handleChipChangeParent.bind(this);
	}

	handleChipChangeParent(value) {
		this.setState({
			parent: value,
			parentValidation: value !== '' ? true : false,
		});
	}
	handleChipChangeCountry(value) {
		this.setState((state) => {
			return {
				country: value,
			};
		});
	}
	handleChange(event) {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	}
	fileChangedHandler = (image) => {
		this.setState({ file: image });
	};
	handleChangeSelect(event) {
		this.setState({
			disponibilite: event.target.value,
		});
	}
	async update(e) {
		const { name } = this.state;
		let data = {
			name: name,
		};

		try {
			const url = env.categories.update(this.props.match.params.id);
			await this.request.update(url, data, false);
			this.props.enqueueSnackbar(
				<Translation>
					{(t) => <div>{t('stock.edit.success')}</div>}
				</Translation>,
				{
					variant: 'success',
				}
			);
			this.props.history.push('/category');
		} catch (err) {
			// if (e.response) {
			// 	this.props.enqueueSnackbar(e.response.data.message, {
			// 		variant: 'error',
			// 	});
			// } else {
			// 	this.props.enqueueSnackbar(err.response.data.message, {
			// 		variant: 'error',
			// 	});
			// }
		}
	}

	async componentDidMount() {
		try {
			const url = env.categories.info;
			const response = await this.request.getById(
				url,
				this.props.match.params.id
			);
			this.setState({
				name: response.data.name,
			});
		} catch (e) {
			console.log(
				'🚀 ~ file: CategoryEdit.js:106 ~ CategoryEdit ~ componentDidMount ~ e',
				e
			);
			// if (e.response) {
			// 	this.props.enqueueSnackbar(e.response.data.message, {
			// 		variant: 'error',
			// 	});
			// } else {
			// 	this.props.enqueueSnackbar(
			// 		<Translation>
			// 			{(t) => <div>{t('stock.edit.error')}</div>}
			// 		</Translation>,
			// 		{
			// 			variant: 'error',
			// 		}
			// 	);
			// }
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
						returnRoute='/category'
						title={
							<Translation>
								{(t) => <div>{t('Edit Category')}</div>}
							</Translation>
						}
					/>
				}
				content={
					<CategoryForm
						handleSubmit={this.update}
						state={this.state}
						ButtonText={
							<Translation>
								{(t) => <div>{t('category.button')}</div>}
							</Translation>
						}
						handleChange={this.handleChange}
						handleChipChangeParent={this.handleChipChangeParent}
					/>
				}
			/>
		);
	}
}
export default withTranslation()(
	withStyles(styles, { withTheme: true })(
		withSnackbar(withRouter(CategoryEdit))
	)
);
