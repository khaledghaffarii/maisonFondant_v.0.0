/* eslint-disable no-unused-vars */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse';

import { ProductConfig } from './../main/product/ProductConfig';
import { CategoryConfig } from 'app/main/categoryProduct/CategoryConfig';
import { CustomerConfig } from 'app/main/customer/CustomerConfig';
import { SalesConfig } from 'app/main/sales/SalesConfig';
import { RecipeConfig } from 'app/main/Recipe/RecipeConfig';
const routeConfigs = [
	ProductConfig,
	CategoryConfig,
	CustomerConfig,
	SalesConfig,
	RecipeConfig,
];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to='/sales' />,
	},
];

export default routes;
