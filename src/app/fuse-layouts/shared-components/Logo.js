import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import ENV from '../../static';
import logoImage from '../../../assets/logo2.png';
const useStyles = makeStyles((theme) => ({
	root: {
		'& .logo-icon': {
			width: 80,
			height: 60,
			transition: theme.transitions.create(['width', 'height'], {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeInOut,
			}),
		},
		'& .react-badge, & .logo-text': {
			transition: theme.transitions.create('opacity', {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeInOut,
			}),
		},
	},
	reactBadge: {
		backgroundColor: 'rgba(0,0,0,0.6)',
		color: '#61DAFB',
	},
}));

function Logo() {
	const classes = useStyles();
	//const logoImage = require('../../../assets/logo1.png');
	return (
		<div className={clsx(classes.root, 'flex items-center')}>
			<img className='logo-icon ' src={logoImage} alt='logo' />
		</div>
	);
}

export default Logo;
