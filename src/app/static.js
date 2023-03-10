let user = localStorage.getItem('AdminOrTeam');
// const globalUrl = 'https://api.gesteasyapp.com/';
// const baseUrl = 'https://api.gesteasyapp.com/';
const globalUrl = 'http://34.198.216.160:8000/';
const baseUrl = 'http://34.198.216.160:8000/';

module.exports = {
	globalUrl,
	baseUrl,

	products: {
		all: baseUrl + 'products',
		new: baseUrl + 'products',
		remove: (id) => `${baseUrl}products/${id}`,
		update: (id) => `${baseUrl}products/${id}`,
		info: baseUrl + 'products',
	},
	categories: {
		all: baseUrl + 'categories',
		new: baseUrl + 'categories',
		remove: (id) => `${baseUrl}categories/${id}`,
		update: (id) => `${baseUrl}categories/${id}`,
		info: baseUrl + 'categories',
	},
	customers: {
		all: baseUrl + 'customers',
		new: baseUrl + 'customers',
		remove: (id) => `${baseUrl}customers/${id}`,
		update: (id) => `${baseUrl}customers/${id}`,
		info: baseUrl + 'customers',
	},
	outputs: {
		all: baseUrl + 'outputs',
		new: baseUrl + 'outputs',
		remove: (id) => `${baseUrl}outputs/${id}`,
		update: (id) => `${baseUrl}outputs/${id}`,
		info: baseUrl + 'outputs',
		year: baseUrl + 'outputs/yearly_recipe?year=2022',
		month: baseUrl + 'outputs/monthly_recipe?year=2022&month=12',
		quarter: baseUrl + 'outputs/monthly_recipe?year=2022&quarter=4',
		total: baseUrl + 'outputs/compute_total',
	},
};
