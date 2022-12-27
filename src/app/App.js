/* eslint-disable no-unused-vars */
import React from 'react';
import { FuseAuthorization, FuseLayout, FuseTheme } from '@fuse';
import Provider from 'react-redux/es/components/Provider';
import { Router, withRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import env from './static';
import { useTranslation } from 'react-i18next';
import jssExtend from 'jss-extend';
import history from '@history';
import { Auth } from './auth';
import store from './store';
import AppContext from './AppContext';
import routes from './fuse-configs/routesConfig';
import { create } from 'jss';
import {
	StylesProvider,
	jssPreset,
	createGenerateClassName,
} from '@material-ui/styles';

import withAuth from './services/withAuth';
import socketIO from 'socket.io-client';
import { useState } from 'react';
//const socket = socketIO.connect(env.globalUrl);
//console.log("socket",socket);
const jss = create({
	...jssPreset(),
	plugins: [...jssPreset().plugins, jssExtend()],
	insertionPoint: document.getElementById('jss-insertion-point'),
});

const generateClassName = createGenerateClassName();

const App = () => {
	const test = 'hello';
	const [list, setFinalList] = useState([]);
	const finalList = { list, setFinalList };
	useTranslation();
	return (
		<AppContext.Provider
			value={{
				finalList,
				routes,
			}}>
			<StylesProvider jss={jss} generateClassName={generateClassName}>
				<Provider store={store}>
					<SnackbarProvider
						maxSnack={3}
						dense={false}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}>
						<Router history={history} forceRefresh={true}>
							<FuseTheme>
								<FuseLayout />
							</FuseTheme>
						</Router>
					</SnackbarProvider>
				</Provider>
			</StylesProvider>
		</AppContext.Provider>
	);
};

//export default App;
export default withAuth(App);
