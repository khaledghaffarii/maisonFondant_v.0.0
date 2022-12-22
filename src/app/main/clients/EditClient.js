import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

import Request from '../../utils/Request';
import AuthHelperMethods from '../../services/AuthHelperMethods';
import { withRouter } from 'react-router-dom';
import env from '../../static';
import { FusePageCarded } from '@fuse';
import FormHeader from '../sharedComponent/FormHeader';
import ClientForm from './clientForm';
import { withTranslation, Translation } from 'react-i18next';
const styles = (theme) => ({
	layoutRoot: {},
});

class EditClient extends Component {
	Auth = new AuthHelperMethods();
	request = new Request();
	constructor(props) {
		super(props);
		this.state = {
			fname: '',
			lname: '',
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
			gouvernorat: '',
			delegation: '',
			localite: '',
			codePostal: '',
			optionRegion: [],
			regionList: [],
			optionCity: [],
			cityList: [],
			email: '',
			username: '',
			password: '',
			file: '',
			phone: '',
			lang: '',
			gouvernoratsOptions: [],
			delegationsOptions: [],
			localitesOptions: [],
			regionValidation: false,
			cityValidation: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.update = this.update.bind(this);
		this.fileChangedHandler = this.fileChangedHandler.bind(this);
		this.handleChangeGouvernorat = this.handleChangeGouvernorat.bind(this);
		this.handleChangeDelegation = this.handleChangeDelegation.bind(this);
		this.handleChangeLocalite = this.handleChangeLocalite.bind(this);
		this.handleChipChangeCountry = this.handleChipChangeCountry.bind(this);
		this.handleChipChangeRegion = this.handleChipChangeRegion.bind(this);
		this.handleChipChangeCity = this.handleChipChangeCity.bind(this);
	}
	handleChange(event) {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
		if (name === 'fname' || name === 'lname') {
			this.generateUserName(name, value);
		}
	}
	async handleChipChangeRegion(value) {
		this.setState((state) => {
			return {
				regionList: value,
				regionValidation: true,
			};
		});
		const url = env.city.info;
		const response = await this.request.getById(url, value.key);
		this.setState({
			optionCity: response.data,
			cityValidation: true,
		});
	}
	async handleChipChangeCity(value) {
		this.setState({
			cityList: value,
			cityValidation: true,
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
	fileChangedHandler = (image) => {
		this.setState({ file: image });
	};
	async handleChangeGouvernorat(value) {
		this.setState((state) => {
			return {
				gouvernorat: value,
			};
		});

		const url = env.delegation.info;
		const data = {
			name: value.key,
		};

		const response = await this.request.getById(url, value.key);

		this.setState({
			delegationsOptions: response.data,
		});
	}
	async handleChangeDelegation(value) {
		this.setState((state) => {
			return {
				delegation: value,
			};
		});
	}

	async handleChangeLocalite(value) {
		this.setState((state) => {
			return {
				localite: value,
			};
		});
		try {
			const urlLocalite = env.localites.info;
			const data = {
				name: value.label,
			};

			const localite = await this.request.new(urlLocalite, data, false);
			this.setState({
				codePostal: localite.data.codePostal,
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

	async update() {
		try {
			let form_data = new FormData();
			form_data.append('fname', this.state.fname);
			form_data.append('lname', this.state.lname);
			form_data.append('country', this.state.country.key);
			form_data.append('gouvernorat_tn', this.state.gouvernorat.value);
			console.log(
				'🚀 ~ file: EditClient.js:171 ~ EditClient ~ update ~ this.state.gouvernorat.value',
				this.state.gouvernorat.value
			);
			form_data.append('delegation_tn', this.state.delegation.value);
			console.log(
				'🚀 ~ file: EditClient.js:173 ~ EditClient ~ update ~ this.state.delegation.value',
				this.state.delegation.value
			);
			form_data.append('region', this.state.regionList.value);
			form_data.append('city', this.state.cityList.value);
			form_data.append('localite', this.state.localite);
			form_data.append('codePostal', this.state.codePostal);
			form_data.append('email', this.state.email);
			form_data.append('username', this.state.username);
			form_data.append('lang', this.state.lang);
			if (this.state.password !== '') {
				form_data.append('password', this.state.password);
			}
			if (this.state.file !== '') {
				form_data.append('file', this.state.file, this.state.file.name);
			}
			form_data.append('phone', this.state.phone);
			const url = env.clients.update(this.props.match.params.id);
			await this.request.update(url, form_data, true);

			this.props.enqueueSnackbar(
				<Translation>
					{(t) => <div>{t('stock.edit.success')}</div>}
				</Translation>,
				{
					variant: 'success',
				}
			);

			this.props.history.push('/client');
		} catch (e) {
			console.log('🚀 ~ file: EditClient.js:213 ~ EditClient ~ update ~ e', e);
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
			const url = env.clients.info;
			const response = await this.request.getById(
				url,
				this.props.match.params?.id
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
			console.log(
				'🚀 ~ file: EditClient.js:251 ~ EditClient ~ componentDidMount ~ response.data.country.phoneCode',
				response.data.country.phoneCode
			);
			if (response.data.country.phoneCode == '216') {
				if (response.data.gouvernorat_tn) {
					const urlDelegation = env.delegation.info;
					const responseDelegation = await this.request.getById(
						urlDelegation,
						response.data.gouvernorat_tn?._id
					);
					console.log(
						'🚀 ~ file: EditClient.js:259 ~ EditClient ~ componentDidMount ~ responseDelegation',
						response.data.gouvernorat_tn
					);
					this.setState({
						delegationsOptions: responseDelegation.data,
						gouvernorat: response.data.gouvernorat_tn
							? {
									key: response.data.gouvernorat_tn?._id,
									value: response.data.gouvernorat_tn?._id,
									label: response.data.gouvernorat_tn.name_fr,
							  }
							: '',
						delegation: response.data.delegation_tn
							? {
									key: response.data.delegation_tn?._id,
									value: response.data.delegation_tn?._id,
									label: response.data.delegation_tn.name_fr,
							  }
							: '',
					});
				}
			} else {
				const urlRegion = env.region.all;
				const region = await this.request.getAll(urlRegion);
				const urlCity = env.city.all;
				//const city = await this.request.getAll(urlCity);

				const urlOneCity = env.city.info;
				const responseCity = await this.request.getById(
					urlOneCity,
					response.data.region._id
				);
				this.setState({
					optionRegion: region.data.data,
					//optionCity: city.data.data,
					optionCity: responseCity.data,
					regionList: response.data.region
						? {
								key: response.data.region._id,
								value: response.data.region._id,
								label: response.data.region.name_en,
						  }
						: '',
					cityList: response.data.city
						? {
								key: response.data.city._id,
								value: response.data.city._id,
								label: response.data.city.name_en,
						  }
						: '',
				});
				console.log(
					'🚀 ~ file: EditClient.js:310 ~ EditClient ~ componentDidMount ~ regionList',
					this.state.regionList
				);
			}

			this.setState({
				fname: response.data.fname,
				lname: response.data.lname,
				country: response.data.country
					? {
							key: response.data.country._id,
							value: response.data.country._id,
							label: response.data.country.countryName,
					  }
					: '',
				listCountry: Country.data,

				localite: response.data.adress?.localite,

				codePostal: response.data.adress ? response.data.adress.codePostal : '',
				email: response.data.email,
				username: response.data.username,
				phone: response.data.phone,
				lang: response.data.lang,
			});

			const urlGouvernorats = env.gouvernorats.all;
			const gouvernorats = await this.request.getAll(urlGouvernorats);
			const urlRegion = env.region.all;
			const region = await this.request.getAll(urlRegion);
			this.setState({
				optionRegion: region.data.data,
				gouvernoratsOptions: gouvernorats.data,
			});
		} catch (e) {
			console.log(
				'🚀 ~ file: EditClient.js:354 ~ EditClient ~ componentDidMount ~ e',
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
	}
	generateUserName = (name, value) => {
		let username =
			name === 'fname' ? value + this.state.lname : this.state.fname + value;
		this.checkUserName(username);
	};
	async checkUserName(username) {
		try {
			const url = env.clients.searchUserName;
			const data = { username };
			await this.request.new(url, data, false);
			this.setState({
				username,
			});
		} catch (e) {
			username = username + Math.floor(Math.random() * 1000);
			this.checkUserName(username);
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
						returnRoute='/client'
						title={
							<Translation>
								{(t) => <div>{t('commandes.customerUpdate')}</div>}
							</Translation>
						}
					/>
				}
				content={
					<ClientForm
						handleChipChangeRegion={this.handleChipChangeRegion}
						handleChipChangeCity={this.handleChipChangeCity}
						handleChange={this.handleChange}
						handleSubmit={this.update}
						state={this.state}
						ButtonText='modifier'
						fileChangedHandler={this.fileChangedHandler}
						handleChangeGouvernorat={this.handleChangeGouvernorat}
						handleChangeDelegation={this.handleChangeDelegation}
						handleChipChangeCountry={this.handleChipChangeCountry}
						handleChangeLocalite={this.handleChangeLocalite}
						showPassword={false}
					/>
				}
			/>
		);
	}
}
export default withTranslation()(
	withStyles(styles, { withTheme: true })(withSnackbar(withRouter(EditClient)))
);
