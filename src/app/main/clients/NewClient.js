import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { withTranslation, Translation } from 'react-i18next';
import { FusePageCarded } from '@fuse';
import FormHeader from '../sharedComponent/FormHeader';
import Request from '../../utils/Request';
import AuthHelperMethods from '../../services/AuthHelperMethods';
import ClientForm from './clientForm';
import env from '../../static';
import { withRouter } from 'react-router-dom';
const styles = (theme) => ({
	layoutRoot: {},
});
class NewClient extends Component {
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
			localite: '',
			codePostal: '',
			optionRegion: [],
			regionList: [],
			optionCity: [],
			cityList: [],
			gouvernorat: '',
			delegation: '',
			gouvernoratsOptions: [],
			delegationsOptions: [],
			email: '',
			username: '',
			password: '',
			file: '',
			phone: '',
			lang: '',
			localitesOptions: [],
			regionValidation: false,
			cityValidation: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.fileChangedHandler = this.fileChangedHandler.bind(this);
		this.handleChangeLocalite = this.handleChangeLocalite.bind(this);
		this.handleChipChangeCountry = this.handleChipChangeCountry.bind(this);

		this.handleChangeGouvernorat = this.handleChangeGouvernorat.bind(this);
		this.handleChangeDelegation = this.handleChangeDelegation.bind(this);
		this.handleChipChangeRegion = this.handleChipChangeRegion.bind(this);
		this.handleChipChangeCity = this.handleChipChangeCity.bind(this);
	}

	fileChangedHandler = (image) => {
		this.setState({ file: image });
	};
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

			const urlGouvernorats = env.gouvernorats.all;
			const gouvernorats = await this.request.getAll(urlGouvernorats);
			const urlRegion = env.region.all;
			const region = await this.request.getAll(urlRegion);
			const urlCity = env.city.all;
			const city = await this.request.getAll(urlCity);
			this.setState({
				listCountry: Country.data,
				gouvernoratsOptions: gouvernorats.data,
				optionRegion: region.data.data,
				// optionCity: city.data.data,
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
		// const url = env.city.info;
		// const response = await this.request.getById(url, this.state.regionList.key);
		// console.log(
		//   "🚀 ~ file: NewClient.js ~ line 120 ~ NewClient ~ handleChipChangeCity ~ response",
		//   response.data
		// );
		this.setState({
			cityList: value,
			cityValidation: true,
		});
	}
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
	handleChipChangeCountry(value) {
		this.setState((state) => {
			return {
				country: value,
				testCountry: value.value,
			};
		});
	}
	async handleChangeLocalite(value) {
		this.setState((state) => {
			return {
				localite: value,
			};
		});
		// try {
		//   const urlLocalite = env.localites.info;
		//   const data = {
		//     name: value.label,
		//   };

		//   const localite = await this.request.new(urlLocalite, data, false);

		//   this.setState({
		//     codePostal: localite.data.codePostal,
		//   });
		// } catch (e) {
		//   if (e.response) {
		//     this.props.enqueueSnackbar(e.response.data.message, {
		//       variant: "error",
		//     });
		//   } else {
		//     this.props.enqueueSnackbar(
		//       <Translation>
		//         {(t) => <div>{t("stock.edit.error")}</div>}
		//       </Translation>,
		//       {
		//         variant: "error",
		//       }
		//     );
		//   }
		// }
	}
	handleChangeCodePostal(value) {
		this.setState({
			codePostal: value,
		});
	}

	handleSubmit = async (e) => {
		//console.log("🚀 ~ file: NewClient.js:218 ~ NewClient ~ handleSubmit= ~ e", e)
		try {
			let form_data = new FormData();
			form_data.append('fname', this.state.fname);
			form_data.append('lname', this.state.lname);
			form_data.append('country', this.state.country.key);
			form_data.append('localite', this.state.localite);
			form_data.append('codePostal', this.state.codePostal);
			if (this.state.gouvernorat.value) {
				form_data.append('gouvernorat_tn', this.state.gouvernorat.value);
			}
			if (this.state.delegation.value) {
				form_data.append('delegation_tn', this.state.delegation.value);
			}
			if (this.state.regionList.value) {
				form_data.append('region', this.state.regionList.value);
			}
			if (this.state.cityList.value) {
				form_data.append('city', this.state.cityList.value);
			}
			form_data.append('email', this.state.email);
			form_data.append('username', this.state.username);
			form_data.append('password', this.state.password);
			form_data.append('lang', this.state.lang);
			if (this.state.file !== '') {
				form_data.append('file', this.state.file, this.state.file.name);
			}
			form_data.append('phone', this.state.phone);
			const url = env.clients.new;
			await this.request.new(url, form_data, true);
			this.props.enqueueSnackbar(
				<Translation>
					{(t) => <div>{t('stock.edit.success')}</div>}
				</Translation>,
				{
					variant: 'success',
				}
			);
			this.props.history.push('/client');
		} catch (err) {
			// console.log("🚀 ~ file: NewClient.js:256 ~ NewClient ~ handleSubmit= ~ err", err)
			if (err.response) {
				this.props.enqueueSnackbar('username or email already exist', {
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
								{(t) => <div>{t('customer.customerAddButtons')}</div>}
							</Translation>
						}
					/>
				}
				content={
					<ClientForm
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
						state={this.state}
						ButtonText={
							<Translation>{(t) => <div>{t('repairer.add')}</div>}</Translation>
						}
						fileChangedHandler={this.fileChangedHandler}
						handleChipChangeRegion={this.handleChipChangeRegion}
						handleChipChangeCity={this.handleChipChangeCity}
						handleChangeGouvernorat={this.handleChangeGouvernorat}
						handleChangeDelegation={this.handleChangeDelegation}
						handleChangeLocalite={this.handleChangeLocalite}
						handleChipChangeCountry={this.handleChipChangeCountry}
						showPassword={true}
					/>
				}
			/>
		);
	}
}

export default withTranslation()(
	withStyles(styles, { withTheme: true })(withSnackbar(withRouter(NewClient)))
);
