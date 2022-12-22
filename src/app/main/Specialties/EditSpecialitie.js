import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Request from '../../utils/Request';
import AuthHelperMethods from '../../services/AuthHelperMethods';
import { FusePageCarded } from '@fuse';
import { withSnackbar } from 'notistack';

import FormHeader from '../sharedComponent/FormHeader';
import SpecialitieForm from './SpecialitieForm';
import env from '../../static';
import { withRouter } from 'react-router-dom';
import { withTranslation, Translation } from 'react-i18next';
const styles = (theme) => ({
	layoutRoot: {},
});

class EditSpecialitie extends Component {
	Auth = new AuthHelperMethods();
	request = new Request();
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			nameAr: '',
			nameFr: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.update = this.update.bind(this);
		this.fileChangedHandler = this.fileChangedHandler.bind(this);
	}
	handleChange(event) {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	}
	fileChangedHandler = (event) => {
		this.setState({ file: event.target.files[0] });
	};

	fileChangedHandler = (event) => {
		event.preventDefault();
		let reader = new FileReader();
		let file = event.target.files[0];
		reader.onloadend = () => {
			this.setState({
				file: file,
				imagePreviewUrl: reader.result,
			});
		};
		reader.readAsDataURL(event.target.files[0]);
	};

	async update() {
		try {
			const specialitie = {
				name: this.state.name,
				nameAr: this.state.nameAr,
				nameFr: this.state.nameFr,
			};
			const url = env.specialities.update(this.props.match.params.id);
			await this.request.update(url, specialitie, false);

			this.props.enqueueSnackbar(
				<Translation>
					{(t) => <div>{t('stock.edit.success')}</div>}
				</Translation>,
				{
					variant: 'success',
				}
			);

			this.props.history.push('/specialitie');
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
			const url = env.specialities.info;
			const response = await this.request.getById(
				url,
				this.props.match.params.id
			);
			this.setState({
				name: response.data.name,
				nameAr: response.data.nameAr,
				nameFr: response.data.nameFr,
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
						returnRoute='/specialitie'
						title={
							<Translation>
								{(t) => <div>{t('speciality.update.title')}</div>}
							</Translation>
						}
					/>
				}
				content={
					<SpecialitieForm
						handleChange={this.handleChange}
						handleSubmit={this.update}
						state={this.state}
						ButtonText={
							<Translation>
								{(t) => <div>{t('speciality.update.button')}</div>}
							</Translation>
						}
						fileChangedHandler={this.fileChangedHandler}
					/>
				}
			/>
		);
	}
}
export default withTranslation()(
	withStyles(styles, { withTheme: true })(
		withSnackbar(withRouter(EditSpecialitie))
	)
);
