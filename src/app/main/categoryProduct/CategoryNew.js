import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageCarded } from '@fuse';
import { withSnackbar } from 'notistack';
import AuthHelperMethods from '../../services/AuthHelperMethods';
import FormHeader from '../sharedComponent/FormHeader';
import Request from '../../utils/Request';
//import BrindForm from "./BrandForm";
import env from '../../static';
import { withRouter } from 'react-router-dom';
import { withTranslation, Translation } from 'react-i18next';
import CategoryForm from './CategoryForm';
const styles = (theme) => ({
	layoutRoot: {},
});
class CategoryNew extends Component {
	Auth = new AuthHelperMethods();
	request = new Request();
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			name: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	}

	handleSubmit = async (e) => {
		let form_data = new FormData();
		form_data.append('name', this.state.name);
		const { name } = this.state;
		let data = {
			name: name,
		};

		try {
			const url = env.categories.new;
			const response = await this.request.new(url, data, false);

			this.props.enqueueSnackbar(
				<Translation>
					{(t) => <div>{t('stock.edit.success')}</div>}
				</Translation>,
				{
					variant: 'success',
				}
			);
			this.setState({ id: response.data._id });
			this.props.history.push('/category');
		} catch (err) {
			console.log(
				'🚀 ~ file: CategoryNew.js:58 ~ CategoryNew ~ handleSubmit= ~ err',
				err
			);
			if (e.response) {
				this.props.enqueueSnackbar(e.response.data.message, {
					variant: 'error',
				});
			} else {
				this.props.enqueueSnackbar(err.response.data.message, {
					variant: 'error',
				});
			}
		}
	};

	async componentDidMount() {}

	render() {
		const { classes } = this.props;
		return (
			<FusePageCarded
				classes={{
					root: classes.layoutRoot,
				}}
				header={<FormHeader returnRoute='/category' title='Add Category' />}
				content={
					<CategoryForm
						handleSubmit={this.handleSubmit}
						state={this.state}
						ButtonText={
							<Translation>{(t) => <div>{t('Add Category')}</div>}</Translation>
						}
						handleChange={this.handleChange}
					/>
				}
			/>
		);
	}
}

export default withTranslation()(
	withStyles(styles, { withTheme: true })(withSnackbar(withRouter(CategoryNew)))
);
