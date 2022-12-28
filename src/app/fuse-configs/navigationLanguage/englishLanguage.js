const permissions = localStorage.getItem('permissions');
const user = localStorage.getItem('AdminOrTeam');
var englishLanguage = [];

let per = permissions;
// if (per.indexOf('calendar') >= 0) {
// 	englishLanguage.push({
// 		id: 'calendar-component',
// 		title: 'Calendar',
// 		type: 'item',
// 		icon: 'event_available',
// 		url: '/calendar',
// 	});
// }
// if (per.indexOf('reparations') >= 0) {
// 	englishLanguage.push(
// 		{
// 			id: 'reparations-component',
// 			title: 'Repairs',
// 			type: 'item',
// 			icon: 'settings',
// 			url: '/reparation',
// 		},
// 		{
// 			id: 'productReparation-component',
// 			title: 'Post reparation',
// 			type: 'item',
// 			icon: 'devices_other',
// 			url: '/productReparation',
// 		}
// 	);
// }
// if (per.indexOf('client') >= 0) {
// 	englishLanguage.push({
// 		id: 'client-component',
// 		title: 'Customers',
// 		type: 'item',
// 		icon: 'contact_mail',
// 		url: '/client',
// 	});
// }
// if (per.indexOf('clientDeleted') >= 0) {
// 	englishLanguage.push({
// 		id: 'customers-deleted-component',
// 		title: 'Customers deleted',
// 		type: 'item',
// 		icon: 'contact_mail',
// 		url: '/clientDeleted',
// 	});
// }
// if (per.indexOf('clientFb') >= 0) {
// 	englishLanguage.push({
// 		id: 'clientsFacebook-component',
// 		title: 'Facebook Clients',
// 		type: 'item',
// 		icon: 'person',
// 		url: '/clientFb',
// 	});
// }
// if (per.indexOf('specialities') >= 0) {
// 	englishLanguage.push({
// 		id: 'specialitie-component',
// 		title: 'Specialties',
// 		type: 'item',
// 		icon: 'person',
// 		url: '/specialitie',
// 	});
// }
// if (per.indexOf('boutique-dictionaire') >= 0) {
// 	englishLanguage.push({
// 		id: 'boutique-dictionary-component',
// 		title: 'Repair centers',
// 		type: 'item',
// 		icon: 'store',
// 		url: '/boutique-dictionaire',
// 	});
// }
// if (per.indexOf('boutiques') >= 0) {
// 	englishLanguage.push({
// 		id: 'Boutique-component',
// 		title: 'Shops',
// 		type: 'item',
// 		icon: 'business',
// 		url: '/boutique',
// 	});
// }
// if (per.indexOf('repairers') >= 0) {
// 	englishLanguage.push({
// 		id: 'repairers-component',
// 		title: 'Repairers',
// 		type: 'item',
// 		icon: 'supervisor_account',
// 		url: '/repairer',
// 	});
// }
// if (per.indexOf('deliveries') >= 0) {
// 	englishLanguage.push(
// 		{
// 			id: 'dilevery-component',
// 			title: 'Dileveries',
// 			type: 'item',
// 			icon: 'local_shipping',
// 			url: '/dilevery',
// 		},
// 		{
// 			id: 'planning-component',
// 			title: 'Schedules',
// 			type: 'item',
// 			icon: 'local_shipping',
// 			url: '/planning',
// 		},
// 		{
// 			id: 'suiviPlanning-component',
// 			title: 'Plan follow-up',
// 			type: 'item',
// 			icon: 'departure_board',
// 			url: '/suiviPlanning',
// 		}
// 	);
// }
// if (per.indexOf('devis') >= 0) {
// 	englishLanguage.push({
// 		id: 'devis-component',
// 		title: 'Quotations',
// 		type: 'item',
// 		icon: 'description',
// 		url: '/devis',
// 	});
// }
// if (per.indexOf('financial') >= 0) {
// 	englishLanguage.push(
// 		{
// 			id: 'financial-component',
// 			title: 'Financial',
// 			type: 'item',
// 			icon: 'monetization_on',
// 			url: '/financial',
// 		},
// 		{
// 			id: 'facture-component',
// 			title: 'Invoices',
// 			type: 'item',
// 			icon: 'database',
// 			url: '/facture',
// 		}
// 	);
// }
// if (per.indexOf('b2b') >= 0) {
// 	englishLanguage.push({
// 		id: 'b2b-component',
// 		title: 'B2B',
// 		type: 'item',
// 		icon: 'monetization_on',
// 		url: '/b2b',
// 	});
// }
// if (per.indexOf('stock') >= 0) {
// 	englishLanguage.push(
// 		{
// 			id: 'stock-component',
// 			title: 'Stock',
// 			type: 'item',
// 			icon: 'power_input',
// 			url: '/stock',
// 		},
// 		{
// 			id: 'commandes-component',
// 			title: 'Ordered',
// 			type: 'item',
// 			icon: 'view_list',
// 			url: '/commandes',
// 		}
// 	);
// }
// if (per.indexOf('providerAnswers') >= 0) {
// 	englishLanguage.push({
// 		id: 'providerAnswer-component',
// 		title: 'Supplier response',
// 		type: 'item',
// 		icon: 'face',
// 		url: '/providerAnswer',
// 	});
// }

// if (per.indexOf('categories') >= 0) {
// 	englishLanguage.push({
// 		id: 'categorie-component',
// 		title: 'Categories',
// 		type: 'item',
// 		icon: 'category',
// 		url: '/category',
// 	});
// }
// if (per.indexOf('products') >= 0) {
// 	englishLanguage.push({
// 		id: 'product-component',
// 		title: 'Products',
// 		type: 'item',
// 		icon: 'devices_other',
// 		url: '/product',
// 	});
// }
// if (per.indexOf('messages') >= 0) {
// 	englishLanguage.push({
// 		id: 'messages-component',
// 		title: 'Messages',
// 		type: 'item',
// 		icon: 'show_chart',
// 		url: '/message',
// 	});
// }
// if (per.indexOf('notifications') >= 0) {
// 	englishLanguage.push({
// 		id: 'notifications-component',
// 		title: 'Notifications',
// 		type: 'item',
// 		icon: 'show_chart',
// 		url: '/notify',
// 	});
// }
// if (per.indexOf('blogs') >= 0) {
// 	englishLanguage.push({
// 		id: 'blog-component',
// 		title: 'Blogs',
// 		type: 'item',
// 		icon: 'book',
// 		url: '/blog',
// 	});
// }

englishLanguage.push(
	{
		id: 'configuration-component',
		title: 'Salse',
		type: 'group',
		icon: 'show_chart',
		children: [
			{
				id: 'admin-component',
				title: 'History outputs',
				type: 'item',
				icon: 'supervisor',
				url: '/Widget2',
			},
			{
				id: 'state-component',
				title: 'Final product',
				type: 'item',
				icon: 'business',
				url: '/product',
			},
			{
				id: 'color_produit-component',
				title: 'Customers',
				type: 'item',
				icon: 'contact_mail',
				url: '/customer',
			},
			{
				id: 'devices-component',
				title: 'Add Sales outputs',
				type: 'item',
				icon: 'shop',
				url: '/newSales',
			},
			{
				id: 'brands-component',
				title: 'Category of product',
				type: 'item',
				icon: 'category',
				url: '/category',
			},
			// {
			// 	id: 'gammes-component',
			// 	title: 'Ranges',
			// 	type: 'item',
			// 	icon: 'format_list',
			// 	url: '/gamme',
			// },
			// {
			// 	id: 'models-component',
			// 	title: 'Models',
			// 	type: 'item',
			// 	icon: 'android',
			// 	url: '/model',
			// },
			// {
			// 	id: 'types-component',
			// 	title: 'Repair types',
			// 	type: 'item',
			// 	icon: 'build',
			// 	url: '/ReparationType',
			// },
		],
	}
	// {
	// 	id: 'administrator-component',
	// 	title: 'Administrators',
	// 	type: 'item',
	// 	icon: 'person',
	// 	url: '/administrator',
	// },
	// {
	// 	id: 'currency-component',
	// 	title: 'Currencies',
	// 	type: 'item',
	// 	icon: 'attach_money',
	// 	url: '/currency',
	// },
	// {
	// 	id: 'country-component',
	// 	title: 'Countries',
	// 	type: 'item',
	// 	icon: 'flag',
	// 	url: '/country',
	// },
	// {
	// 	id: 'permission-component',
	// 	title: 'Permissions',
	// 	type: 'item',
	// 	icon: 'security',
	// 	url: '/permission',
	// },
	// {
	// 	id: 'role-component',
	// 	title: 'Roles',
	// 	type: 'item',
	// 	icon: 'lock',
	// 	url: '/role',
	// },
	// {
	// 	id: 'teams-component',
	// 	title: 'Teams',
	// 	type: 'item',
	// 	icon: 'group',
	// 	url: '/team',
	// },
	// {
	// 	id: 'team-member-component',
	// 	title: 'Team Members',
	// 	type: 'item',
	// 	icon: 'folder_shared',
	// 	url: '/teamMember',
	// },
	// {
	// 	id: 'keys-component',
	// 	title: 'API Keys',
	// 	type: 'item',
	// 	icon: 'vpn_key',
	// 	url: '/api-keys/list',
	// },
	// {
	// 	id: 'lead-component',
	// 	title: 'Lead',
	// 	type: 'group',
	// 	icon: 'show_chart',

	// 	children: [
	// 		{
	// 			id: 'messages-component',
	// 			title: 'Messages',
	// 			type: 'item',
	// 			icon: 'show_chart',
	// 			url: '/message',
	// 		},
	// 		{
	// 			id: 'contact-component',
	// 			title: 'Contact',
	// 			type: 'item',
	// 			icon: 'show_chart',
	// 			url: '/contact',
	// 		},
	// 	],
	// },
	// {
	// 	id: 'statistique-component',
	// 	title: 'Statisticals',
	// 	type: 'group',
	// 	icon: 'show_chart',
	// 	children: [
	// 		{
	// 			id: 'admin-component',
	// 			title: 'Admin Board',
	// 			type: 'item',
	// 			icon: 'supervisor',
	// 			url: '/Widget2',
	// 		},
	// 		{
	// 			id: 'statistics-component',
	// 			title: 'Statistics',
	// 			type: 'item',
	// 			icon: 'show_chart',
	// 			url: '/Widget1',
	// 		},
	// 	],
	// }
);

export default englishLanguage;
