import Recipe from './Recipe';

export const RecipeConfig = {
	settings: {
		layout: {
			config: {},
		},
	},
	routes: [
		{
			path: '/recipe',
			component: Recipe,
		},
		// {
		// 	path: '/newProduct',
		// 	component: ProductNew,
		// },
		// {
		// 	path: '/editProduct/:id',
		// 	component: ProductEdit,
		// },
	],
};
