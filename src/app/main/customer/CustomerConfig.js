import Customer from './Customer';
import CustomerEdit from './CustomerEdit';
import CustomerNew from './CustomerNew';

export const CustomerConfig = {
	settings: {
		layout: {
			config: {},
		},
	},
	routes: [
		{
			path: '/customer',
			component: Customer,
		},
		{
			path: '/newCastomer',
			component: CustomerNew,
		},
		{
			path: '/editCustomer/:id',
			component: CustomerEdit,
		},
	],
};
