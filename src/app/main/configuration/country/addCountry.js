import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageCarded } from '@fuse';
import { withSnackbar } from 'notistack';
import decode from 'jwt-decode';
import AuthHelperMethods from '../../../services/AuthHelperMethods';
import FormHeader from '../../sharedComponent/FormHeader';
import Request from '../../../utils/Request';
//import CountryForm from './CountryForm';
import env from '../../../static';
import { withRouter } from 'react-router-dom';
import CountryForm from './CountryForm';
import { withTranslation, Translation } from 'react-i18next';
const styles = (theme) => ({
	layoutRoot: {},
});
class NewDevis extends Component {
	Auth = new AuthHelperMethods();
	request = new Request();
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			countryName: '',
			currency: '',
			listCurrency: [],
			iso2: '',
			iso3: '',
			phoneCode: '',
			file: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.fileChangedHandler = this.fileChangedHandler.bind(this);

		this.handleChipChangeCurrency = this.handleChipChangeCurrency.bind(this);
	}

	fileChangedHandler = (image) => {
		this.setState({ file: image });
	};
	handleChipChangeCurrency(value) {
		this.setState((state) => {
			return {
				currency: value,
			};
		});
	}
	handleChange(event) {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	}

	handleSubmit = async (e) => {
		const { file, countryName, currency, iso2, iso3, phoneCode } = this.state;
		let data = {
			file: file,
			countryName: countryName,
			currency: currency.key,
			iso2: iso2,
			iso3: iso3,
			phoneCode: phoneCode,
		};
		let form_data = new FormData();
		form_data.append('countryName', this.state.countryName);
		form_data.append('currency', this.state.currency.key);
		form_data.append('iso2', this.state.iso2);
		form_data.append('iso3', this.state.iso3);
		form_data.append('phoneCode', this.state.phoneCode);
		if (this.state.file !== '') {
			form_data.append('file', this.state.file, this.state.file.name);
		}
		try {
			const url = env.country.new;
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

			window.location.reload(false);
		} catch (err) {
			console.log(
				'🚀 ~ file: addCountry.js:80 ~ NewDevis ~ handleSubmit= ~ err',
				err
			);
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
	};
	async componentDidMount() {
		try {
			const urlCurrency = env.currency.all;
			const Currency = await this.request.getAll(urlCurrency);
			this.setState({
				listCurrency: Currency.data,
			});
		} catch (e) {
			if (e.response) {
				this.props.enqueueSnackbar(e.response.data.message, {
					variant: 'error',
				});
			} else {
				this.props.enqueueSnackbar('error', {
					variant: 'error',
				});
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
				content={
					<CountryForm
						handleSubmit={this.handleSubmit}
						state={this.state}
						ButtonText={
							<Translation>{(t) => <div>{t('coutry.add')}</div>}</Translation>
						}
						handleChange={this.handleChange}
						fileChangedHandler={this.fileChangedHandler}
						handleChipChangeCurrency={this.handleChipChangeCurrency}
					/>
				}
			/>
		);
	}
}

export default withTranslation()(
	withStyles(styles, { withTheme: true })(withSnackbar(withRouter(NewDevis)))
);
