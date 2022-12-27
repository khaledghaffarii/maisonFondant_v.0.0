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
import CustomerForm from './CustomerForm';
const styles = (theme) => ({
	layoutRoot: {},
});

class CutomerEdit extends Component {
	Auth = new AuthHelperMethods();
	request = new Request();
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			name: '',
			phone: '',
			email: '',
			address: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.update = this.update.bind(this);
	}

	handleChange(event) {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	}

	async update(e) {
		const { name, email, phone, address } = this.state;
		let data = {
			name: name,
			email: email,
			phone: phone,
			address: address,
		};

		try {
			const url = env.customers.update(this.props.match.params.id);
			await this.request.update(url, data, false);
			this.props.enqueueSnackbar(
				<Translation>
					{(t) => <div>{t('stock.edit.success')}</div>}
				</Translation>,
				{
					variant: 'success',
				}
			);
			this.props.history.push('/customer');
		} catch (err) {
			if (e.response) {
				this.props.enqueueSnackbar(e.response.data.message, {
					variant: 'error',
				});
			} else {
				this.props.enqueueSnackbar(err.response.data.message, {
					variant: 'error',
				});
			}
			this.props.enqueueSnackbar(err.response.data.message, {
				variant: 'error',
			});
		}
	}

	async componentDidMount() {
		try {
			const url = env.customers.info;
			const response = await this.request.getById(
				url,
				this.props.match.params.id
			);
			this.setState({
				name: response.data.name,
				email: response.data.email,
				address: response.data.address,
				phone: response.data.phone,
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

	render() {
		const { classes } = this.props;

		return (
			<FusePageCarded
				classes={{
					root: classes.layoutRoot,
				}}
				header={
					<FormHeader
						returnRoute='/customer'
						title={
							<Translation>
								{(t) => <div>{t('Edit Customer')}</div>}
							</Translation>
						}
					/>
				}
				content={
					<CustomerForm
						handleSubmit={this.update}
						state={this.state}
						ButtonText={
							<Translation>
								{(t) => <div>{t('category.button')}</div>}
							</Translation>
						}
						handleChange={this.handleChange}
					/>
				}
			/>
		);
	}
}
export default withTranslation()(
	withStyles(styles, { withTheme: true })(withSnackbar(withRouter(CutomerEdit)))
);
