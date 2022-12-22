import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageCarded } from '@fuse';
import FormHeader from '../sharedComponent/FormHeader';
import Request from '../../utils/Request';
import AuthHelperMethods from '../../services/AuthHelperMethods';
import SpecialitieForm from './SpecialitieForm';
import env from '../../static';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import { withTranslation, Translation } from 'react-i18next';
const styles = (theme) => ({
	layoutRoot: {},
});

class NewSpecialitie extends Component {
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
		this.handleSubmit = this.handleSubmit.bind(this);
		this.fileChangedHandler = this.fileChangedHandler.bind(this);
	}

	fileChangedHandler = (event) => {
		this.setState({ file: event.target.files[0] });
	};

	handleChange(event) {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	}
	handleSubmit = async (e) => {
		try {
			const team = {
				name: this.state.name,
				nameAr: this.state.nameAr,
				nameFr: this.state.nameFr,
			};
			const url = env.specialities.new;
			await this.request.new(url, team, false);

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
						returnRoute='/specialitie'
						title={
							<Translation>
								{(t) => <div>{t('speciality.button')}</div>}
							</Translation>
						}
					/>
				}
				content={
					<SpecialitieForm
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
						state={this.state}
						ButtonText='ajouter'
						fileChangedHandler={this.fileChangedHandler}
					/>
				}
			/>
		);
	}
}

export default withTranslation()(
	withStyles(styles, { withTheme: true })(
		withSnackbar(withRouter(NewSpecialitie))
	)
);
