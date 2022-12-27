import Sales from './Sales';
import SalesNew from './SalesNew';

export const SalesConfig = {
	settings: {
		layout: {
			config: {},
		},
	},
	routes: [
		{
			path: '/sales',
			component: Sales,
		},
		{
			path: '/newSales',
			component: SalesNew,
		},
		// {
		// 	path: '/editProduct/:id',
		// 	component: ProductEdit,
		// },
	],
};
