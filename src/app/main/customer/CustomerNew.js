import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageCarded } from '@fuse';
import { withSnackbar } from 'notistack';
import decode from 'jwt-decode';
import AuthHelperMethods from '../../services/AuthHelperMethods';
import FormHeader from '../sharedComponent/FormHeader';
import Request from '../../utils/Request';

import env from '../../static';
import { withRouter } from 'react-router-dom';
import { withTranslation, Translation } from 'react-i18next';
import CustomerForm from './CustomerForm';
const styles = (theme) => ({
	layoutRoot: {},
});
class CustomerNew extends Component {
	Auth = new AuthHelperMethods();
	request = new Request();
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			name: '',
			phone: '',
			email: '',
			address: "",
			
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
	handleSubmit = async (e) => {
		const { name, email, phone, address } = this.state;
		let data = {
			name: name,
			email: email,
			phone: phone,
			address: address,
		};
		try {
			const url = env.customers.new;
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
			this.props.history.push('/customer');
		} catch (err) {
			console.log(
				'🚀 ~ file: CustomerNew.js:66 ~ CustomerNew ~ handleSubmit= ~ err',
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
						title={this.props.t('Add Customer')}
					/>
				}
				content={
					<CustomerForm
						handleSubmit={this.handleSubmit}
						handleChipChangeCategory={this.handleChipChangeCategory}
						state={this.state}
						ButtonText={
							<Translation>{(t) => <div>{t('Add Customer')}</div>}</Translation>
						}
						handleChange={this.handleChange}
						fileChangedHandler={this.fileChangedHandler}
					/>
				}
			/>
		);
	}
}

export default withTranslation()(
	withStyles(styles, { withTheme: true })(withSnackbar(withRouter(CustomerNew)))
);
