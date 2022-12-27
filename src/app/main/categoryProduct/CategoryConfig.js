import Category from './Category';
import CategoryEdit from './CategoryEdit';
import NewCategory from './CategoryNew';
export const CategoryConfig = {
	settings: {
		layout: {
			config: {},
		},
	},
	routes: [
		{
			path: '/category',
			component: Category,
		},
		{
			path: '/newCategory',
			component: NewCategory,
		},
		{
			path: '/editCategory/:id',
			component: CategoryEdit,
		},
	],
};
