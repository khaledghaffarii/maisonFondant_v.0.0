import Sales from './Sales';
import SalesDetails from './SalesDetails';
import SalesEdit from './SalesEdit';
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
		{
			path: '/editSales/:id',
			component: SalesEdit,
		},
		{
			path: '/detailsSales/:id',
			component: SalesDetails,
		},
	],
};
