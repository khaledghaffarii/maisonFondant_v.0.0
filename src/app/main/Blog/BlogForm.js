import React, { Component } from 'react';
import { Button, CardContent } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { FuseChipSelect } from '@fuse';
import Formsy from 'formsy-react';
import CroppedImage from '../sharedComponent/CroppedImage';
import { TextFieldFormsy } from '@fuse';
import { withRouter } from 'react-router-dom';
import env from '../../static';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/js/plugins.pkgd.min.js';
import axios from 'axios';
import { withTranslation, Translation } from 'react-i18next';
class BlogForm extends Component {
	constructor(props) {
		super(props);
		window.froalaImageName = '';
		this.state = {
			isFormValid: false,
			imageName: '',
		};
		this.disableButton = this.disableButton.bind(this);
		this.enableButton = this.enableButton.bind(this);
	}

	disableButton() {
		this.setState({
			isFormValid: false,
		});
	}
	enableButton() {
		this.setState({
			isFormValid: true,
		});
	}

	render() {
		const props = this.props;
		const optionsCountry = props.state.listCountry;
		const suggestionCountry = optionsCountry.map((item) => ({
			key: item._id,
			value: item.iso2,
			label: item.countryName,
		}));

		return (
			<div className='p-16 sm:p-24 max-w-2xl'>
				<FuseAnimate animation='transition.expandIn'>
					<CardContent className='flex flex-col items-center justify-center p-32'>
						<Formsy
							onValidSubmit={props.handleSubmit}
							onValid={this.enableButton}
							onInvalid={this.disableButton}
							className='flex flex-col justify-center w-full'>
							{props.state.cover && props.state.showCover ? (
								<img
									alt='blog'
									src={`${env.staticFiles}${props.state.cover}`}
									style={{ width: 250, alignSelf: 'center' }}
								/>
							) : (
								''
							)}
							<CroppedImage fileChangedHandler={props.fileChangedHandler} />
							<TextFieldFormsy
								className='mt-8 mb-16 '
								value={props.state.displayOwnerName}
								label={
									<Translation>
										{(t) => <div>{t('blog.author')}</div>}
									</Translation>
								}
								name='displayOwnerName'
								type='text'
								onChange={props.handleChange}
								margin='normal'
								variant='outlined'
								required
							/>
							{localStorage.getItem('AdminOrTeam') == 'admin' ? (
								<FuseChipSelect
									className='w-full my-16'
									value={props.state.country}
									onChange={props.handleChipChangeCountry}
									placeholder='Select Country'
									textFieldProps={{
										label: 'Country',
										InputLabelProps: {
											shrink: true,
										},
										variant: 'outlined',
									}}
									options={suggestionCountry}
								/>
							) : (
								''
							)}
							<TextFieldFormsy
								className='mt-8 mb-16 '
								value={props.state.title}
								label={
									<Translation>
										{(t) => <div>{t('blog.titleTable')}</div>}
									</Translation>
								}
								name='title'
								type='text'
								onChange={props.handleChange}
								margin='normal'
								variant='outlined'
								required
							/>
							<FuseChipSelect
								className='w-full my-16'
								value={props.state.lang}
								onChange={props.handleChangeSelect}
								placeholder={
									<Translation>
										{(t) => <div>{t('blog.select')}</div>}
									</Translation>
								}
								textFieldProps={{
									label: 'lang',
									InputLabelProps: {
										shrink: true,
									},
									variant: 'outlined',
								}}
								options={[
									{ key: 0, label: 'Français', value: 'fr' },
									{ key: 1, label: 'English', value: 'en' },
									{ key: 2, label: 'العربیة', value: 'ar' },
								]}
							/>
							<TextFieldFormsy
								className='mt-8 mb-16 '
								value={props.state.description}
								label='description'
								name='description'
								type='text'
								onChange={props.handleChange}
								margin='normal'
								variant='outlined'
								required
							/>

							<FroalaEditor
								tag='textarea'
								config={{
									key: 'AV:4~?3xROKLJKYHROLDXDR@d2YYGR_Bc1A8@5@4:1B2D2F2F1?1?2A3@1C1',
									placeholderText: 'Edit Your Content Here!',
									charCounterCount: false,
									// Set max image size to 5MB.
									imageMaxSize: 5 * 1024 * 1024,
									// Allow to upload PNG and JPG.
									imageAllowedTypes: ['jpeg', 'jpg', 'png'],

									imageManagerLoadMethod: 'POST',
									imageManagerLoadURL: env.blog.gallery,
									imageManagerLoadParams: {
										token: localStorage.getItem('id_token'),
									},
									imageManagerDeleteMethod: 'POST',
									imageManagerDeleteURL: env.blog.removeGallery,
									imageManagerDeleteParams: {
										token: localStorage.getItem('id_token'),
									},
									events: {
										'image.beforeUpload': function (images, editor) {
											const data = new FormData();
											data.append('file', images[0]);
											axios
												.post(env.blog.upload, data, {
													headers: {
														accept: 'application/json',
														'x-auth-token': localStorage.getItem('id_token'),
														'Accept-Language': 'en-US,en;q=0.8',
														'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
													},
												})
												.then((res) => {
													this.image.insert(
														env.staticFiles + res.data.link,
														null,
														null,
														this.image.get()
													);
												})
												.catch((err) => {
													console.log(err);
												});
											return false;
										},
									},
								}}
								model={props.state.content}
								onModelChange={props.handleChangeDescription}
							/>
							<TextFieldFormsy
								className='mt-8 mb-16 '
								value={props.state.tags}
								label={
									<Translation>
										{(t) => <div>{t('form.tags')}</div>}
									</Translation>
								}
								name='tags'
								type='text'
								onChange={props.handleChange}
								margin='normal'
								variant='outlined'
								required
							/>
							<TextFieldFormsy
								className='mt-8 mb-16 '
								value={props.state.postDate}
								label='Date'
								name='postDate'
								type='date'
								onChange={props.handleChange}
								margin='normal'
								variant='outlined'
							/>
							<Button
								variant='contained'
								color='primary'
								className='w-224 mx-auto mt-16'
								aria-label='Register'
								disabled={!this.state.isFormValid}
								type='submit'>
								{props.ButtonText}
							</Button>
						</Formsy>
					</CardContent>
				</FuseAnimate>
			</div>
		);
	}
}
export default withTranslation()(withRouter(BlogForm));
