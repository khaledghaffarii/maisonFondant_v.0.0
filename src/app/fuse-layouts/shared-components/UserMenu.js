/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
	Avatar,
	Button,
	Icon,
	ListItemIcon,
	ListItemText,
	Popover,
	MenuItem,
	Typography,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from 'app/auth/store/actions';
import { Link } from 'react-router-dom';
import AuthHelpersMethod from '../../../app/services/AuthHelperMethods';
import ENV from '../../static';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { withTranslation, Translation } from 'react-i18next';
import profile from '../../../assets/profile.jpg';
import Logo from './Logo';
function UserMenu(props) {
	const Auth = new AuthHelpersMethod();
	const { t } = useTranslation();
	const dispatch = useDispatch();
	// const user = useSelector(({ auth }) => auth.user);
	// const data = Auth.getDataLogin();

	const [userMenu, setUserMenu] = useState(null);

	const userMenuClick = (event) => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};

	return (
		<React.Fragment>
			<LanguageSwitcher />

			<Button className='h-64' onClick={userMenuClick}>
				{/* {data.picture ? (
          <Avatar
            className=""
            alt="user photo"
            src={`${
              data.picture
                ? ENV.staticFiles + data.picture
                : ENV.staticFiles + "/profiles/no-profile.png"
            }`}
          />
        ) : (
          <Avatar className="">{data.name}</Avatar>
        )} */}
				<Avatar className='' alt='user photo' src={profile} />
				<div className='hidden md:flex flex-col ml-12 items-start'>
					<Typography component='span' className='normal-case font-600 flex'>
						{/* {data.name} */}
						Bilal ben jbara
					</Typography>
					<Typography className='text-11 capitalize' color='textSecondary'>
						{/* {user.role.toString()} */}
					</Typography>
				</div>

				<Icon className='text-16 ml-12 hidden sm:flex' variant='action'>
					keyboard_arrow_down
				</Icon>
			</Button>

			<Popover
				open={Boolean(userMenu)}
				anchorEl={userMenu}
				onClose={userMenuClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				classes={{
					paper: 'py-8',
				}}>
				<React.Fragment>
					<MenuItem
						component={Link}
						to='/login'
						onClick={() => {
							// Auth.logout();
							// console.log('deconn');
							// userMenuClose();
						}}>
						<ListItemIcon className='min-w-40'>
							<Icon>lock</Icon>
						</ListItemIcon>
						<ListItemText
							className='pl-0'
							primary={
								<Translation>
									{(t) => <div>{t('form.logout')}</div>}
								</Translation>
							}
						/>
					</MenuItem>
				</React.Fragment>
				{/* {!user.role || user.role.length === 0 ? (
					<React.Fragment>
						<MenuItem
							component={Link}
							to='/login'
							onClick={() => {
								Auth.logout();
								console.log('deconn');
								userMenuClose();
							}}>
							<ListItemIcon className='min-w-40'>
								<Icon>lock</Icon>
							</ListItemIcon>
							<ListItemText
								className='pl-0'
								primary={
									<Translation>
										{(t) => <div>{t('form.logout')}</div>}
									</Translation>
								}
							/>
						</MenuItem>
					</React.Fragment>
				) : (
					<React.Fragment>
						<MenuItem
							component={Link}
							to='/pages/profile'
							onClick={userMenuClose}>
							<ListItemIcon className='min-w-40'>
								<Icon>account_circle</Icon>
							</ListItemIcon>
							<ListItemText className='pl-0' primary='My Profile' />
						</MenuItem>
						<MenuItem component={Link} to='/apps/mail' onClick={userMenuClose}>
							<ListItemIcon className='min-w-40'>
								<Icon>mail</Icon>
							</ListItemIcon>
							<ListItemText className='pl-0' primary='Inbox' />
						</MenuItem>
						<MenuItem
							onClick={() => {
								Auth.logout();
								userMenuClose();
							}}>
							<ListItemIcon className='min-w-40'>
								<Icon>exit_to_app</Icon>
							</ListItemIcon>
							<ListItemText className='pl-0' primary='Logout' />
						</MenuItem>
					</React.Fragment>
				)} */}
			</Popover>
		</React.Fragment>
	);
}

export default withTranslation()(UserMenu);
