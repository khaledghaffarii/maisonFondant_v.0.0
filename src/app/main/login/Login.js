/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Card, CardContent, Typography, Tabs, Tab } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { FuseAnimate } from '@fuse';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import JWTLoginForm from './tabs/JWTLoginForm';
import T from '../../textes';
const useStyles = makeStyles((theme) => ({
	root: {
		background:
			'linear-gradient(to right, ' +
			theme.palette.primary.dark +
			' 0%, ' +
			darken(theme.palette.primary.dark, 0.9) +
			' 100%)',
		color: theme.palette.primary.contrastText,
	},
}));

function Login() {
	const classes = useStyles();

	return (
		<div
			className={clsx(
				classes.root,
				'flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0'
			)}>
			<div className='flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left'>
				<FuseAnimate animation='transition.expandIn'>
					<img
						className=' content-center '
						src='assets/images/logos/logo2.png'
						alt='logo'
					/>
				</FuseAnimate>
				<FuseAnimate animation='transition.slideUpIn' delay={300}>
					<Typography variant='h3' color='inherit' className='font-light'>
						{T.LOGIN_TITLE}
					</Typography>
				</FuseAnimate>
			</div>

			<FuseAnimate animation={{ translateX: [0, '100%'] }}>
				<Card className='w-full max-w-400 mx-auto m-16 md:m-0' square>
					<CardContent className='flex flex-col items-center justify-center p-32 md:p-48 '>
						<Typography
							variant='h6'
							className='text-center md:w-full mb-48 font-mono'>
							<img
								className='w-52 self-center'
								src='assets/images/logos/logo2.png'
								alt='logo'
							/>
							{T.LOGIN_HEADER}
						</Typography>
						<JWTLoginForm />
					</CardContent>
				</Card>
			</FuseAnimate>
		</div>
	);
}

export default Login;
