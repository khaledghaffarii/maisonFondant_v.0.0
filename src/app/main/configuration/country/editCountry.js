import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Request from '../../../utils/Request';
import AuthHelperMethods from '../../../services/AuthHelperMethods';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import { withTranslation, Translation } from 'react-i18next';
import { FusePageCarded } from '@fuse';
import CountryForm from './CountryForm';
import env from '../../../static';
const styles = (theme) => ({
	layoutRoot: {},
});
class EditCountry extends Component {
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
		this.update = this.update.bind(this);
		this.fileChangedHandler = this.fileChangedHandler.bind(this);
		this.handleChipChangeCurrency = this.handleChipChangeCurrency.bind(this);
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
	handleChipChangeCurrency(value) {
		this.setState((state) => {
			return {
				currency: value,
			};
		});
	}

	async update() {
		const { countryName, currency, iso2, iso3, phoneCode } = this.state;
		try {
			let data = {
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
			const url = env.country.update(this.props.id);
			await this.request.new(url, data, false);
			this.props.enqueueSnackbar(
				<Translation>
					{(t) => <div>{t('stock.edit.success')}</div>}
				</Translation>,
				{
					variant: 'success',
				}
			);
			this.props.history.push('/country');
			window.location.reload(false);
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
	}
	async componentDidMount() {
		try {
			const url = env.country.info;
			const country = await this.request.getById(url, this.props.id);
			const urlCurrency = env.currency.all;
			const Currency = await this.request.getAll(urlCurrency);
			let currencyValue;
			if (country.data.currency) {
				currencyValue = {
					key: country.data.currency._id,
					value: country.data.currency._id,
					label: country.data.currency.currencyEnglish,
				};
			} else {
				currencyValue = '';
			}
			this.setState({
				id: country.data._id,
				countryName: country.data.countryName,
				listCurrency: Currency.data,
				currency: currencyValue,
				iso2: country.data.iso2,
				iso3: country.data.iso3,
				phoneCode: country.data.phoneCode,
				loading: false,
			});
		} catch (e) {
			if (e.response) {
				this.props.enqueueSnackbar(e.response.data.message, {
					variant: 'error',
				});
			} else {
				console.log(e);
				this.props.enqueueSnackbar('Erreur', {
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
						showCover={this.state.showCover}
						handleSubmit={this.update}
						state={this.state}
						ButtonText={
							<Translation>
								{(t) => <div>{t('coutry.update')}</div>}
							</Translation>
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
	withStyles(styles, { withTheme: true })(withSnackbar(withRouter(EditCountry)))
);
