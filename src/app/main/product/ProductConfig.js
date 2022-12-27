import Product from './Product';
import ProductEdit from './ProductEdit';
import ProductNew from './ProductNew';

export const ProductConfig = {
	settings: {
		layout: {
			config: {},
		},
	},
	routes: [
		{
			path: '/product',
			component: Product,
		},
		{
			path: '/newProduct',
			component: ProductNew,
		},
		{
			path: '/editProduct/:id',
			component: ProductEdit,
		},
	],
};
