const permissions = localStorage.getItem('permissions');
const user = localStorage.getItem('AdminOrTeam');
var frenchLanguage = [];

// if (permissions) {
// let per = permissions;
// if (per.indexOf('calendar') >= 0 || user === 'admin') {
// 	frenchLanguage.push({
// 		id: 'calendar-component',
// 		title: 'Calendrier',
// 		type: 'item',
// 		icon: 'event_available',
// 		url: '/calendar',
// 	});
// }
// if (per.indexOf('reparations') >= 0 || user === 'admin') {
// 	frenchLanguage.push(
// 		{
// 			id: 'reparations-component',
// 			title: 'Réparations',
// 			type: 'item',
// 			icon: 'settings',
// 			url: '/reparation',
// 		},
// 		{
// 			id: 'productReparation-component',
// 			title: 'Post réparation',
// 			type: 'item',
// 			icon: 'devices_other',
// 			url: '/productReparation',
// 		}
// 	);
// }
// if (per.indexOf('client') >= 0 || user === 'admin') {
// 	frenchLanguage.push({
// 		id: 'client-component',
// 		title: 'Clients',
// 		type: 'item',
// 		icon: 'contact_mail',
// 		url: '/client',
// 	});
// }
// if (per.indexOf('clientDeleted') >= 0 || user === 'admin') {
// 	frenchLanguage.push({
// 		id: 'customers-deleted-component',
// 		title: 'Clients supprimés',
// 		type: 'item',
// 		icon: 'contact_mail',
// 		url: '/clientDeleted',
// 	});
// }
// if (per.indexOf('clientFb') >= 0 || user === 'admin') {
// 	frenchLanguage.push({
// 		id: 'clientsFacebook-component',
// 		title: 'Clients facebook',
// 		type: 'item',
// 		icon: 'person',
// 		url: '/clientFb',
// 	});
// }
// if (per.indexOf('specialities') >= 0 || user === 'admin') {
// 	frenchLanguage.push({
// 		id: 'specialitie-component',
// 		title: 'Specialtés',
// 		type: 'item',
// 		icon: 'person',
// 		url: '/specialitie',
// 	});
// }
// if (per.indexOf('boutique-dictionaire') >= 0 || user === 'admin') {
// 	frenchLanguage.push({
// 		id: 'boutique-dictionary-component',
// 		title: 'Centres de réparation',
// 		type: 'item',
// 		icon: 'store',
// 		url: '/boutique-dictionaire',
// 	});
// }
// if (per.indexOf('boutiques') >= 0 || user === 'admin') {
// 	frenchLanguage.push({
// 		id: 'Boutique-component',
// 		title: 'Boutiques',
// 		type: 'item',
// 		icon: 'business',
// 		url: '/boutique',
// 	});
// }
frenchLanguage.push(
	{
		id: 'configuration-component',
		title: 'Salse',
		type: 'group',
		icon: 'show_chart',
		children: [
			{
				id: 'admin-component',
				title: 'Historique des sorties',
				type: 'item',
				icon: 'supervisor',
				url: '/Widget2',
			},
			{
				id: 'state-component',
				title: 'Produit fini',
				type: 'item',
				icon: 'business',
				url: '/product',
			},
			{
				id: 'color_produit-component',
				title: 'Clients',
				type: 'item',
				icon: 'contact_mail',
				url: '/customer',
			},
			{
				id: 'devices-component',
				title: 'Ajout sortie vente',
				type: 'item',
				icon: 'shop',
				url: '/newSales',
			},
			{
				id: 'brands-component',
				title: 'Categorie des produits',
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
// if (per.indexOf('repairers') >= 0 || user === 'admin') {
// 	frenchLanguage.push({
// 		id: 'repairers-component',
// 		title: 'Réparateurs',
// 		type: 'item',
// 		icon: 'supervisor_account',
// 		url: '/repairer',
// 	});
// }
// if (per.indexOf('deliveries') >= 0 || user === 'admin') {
// 	frenchLanguage.push(
// 		{
// 			id: 'dilevery-component',
// 			title: 'Livraisons',
// 			type: 'item',
// 			icon: 'local_shipping',
// 			url: '/dilevery',
// 		},
// 		{
// 			id: 'planning-component',
// 			title: 'Livraison',
// 			type: 'item',
// 			icon: 'local_shipping',
// 			url: '/planning',
// 		},
// 		{
// 			id: 'suiviPlanning-component',
// 			title: 'Suivi Planning',
// 			type: 'item',
// 			icon: 'departure_board',
// 			url: '/suiviPlanning',
// 		}
// 	);
// }
// if (per.indexOf('devis') >= 0 || user === 'admin') {
// 	frenchLanguage.push({
// 		id: 'devis-component',
// 		title: 'Devis',
// 		type: 'item',
// 		icon: 'description',
// 		url: '/devis',
// 	});
// }
// if (per.indexOf('financial') >= 0 || user === 'admin') {
// 	frenchLanguage.push(
// 		{
// 			id: 'financial-component',
// 			title: 'finances',
// 			type: 'item',
// 			icon: 'monetization_on',
// 			url: '/financial',
// 		},
// 		{
// 			id: 'facture-component',
// 			title: 'Factures',
// 			type: 'item',
// 			icon: 'database',
// 			url: '/facture',
// 		}
// 	);
// }
// if (per.indexOf('b2b') >= 0 || user === 'admin') {
// 	frenchLanguage.push({
// 		id: 'b2b-component',
// 		title: 'B2B',
// 		type: 'item',
// 		icon: 'monetization_on',
// 		url: '/b2b',
// 	});
// }
// if (per.indexOf('stock') >= 0 || user === 'admin') {
// 	frenchLanguage.push(
// 		{
// 			id: 'stock-component',
// 			title: 'Stock',
// 			type: 'item',
// 			icon: 'power_input',
// 			url: '/stock',
// 		},
// 		{
// 			id: 'commandes-component',
// 			title: 'Commandes',
// 			type: 'item',
// 			icon: 'view_list',
// 			url: '/commandes',
// 		}
// 	);
// }
// if (per.indexOf('providerAnswers') >= 0 || user === 'admin') {
// 	frenchLanguage.push({
// 		id: 'providerAnswer-component',
// 		title: 'Réponses du fournisseur',
// 		type: 'item',
// 		icon: 'face',
// 		url: '/providerAnswer',
// 	});
// }

// if (per.indexOf('categories') >= 0 || user === 'admin') {
// 	frenchLanguage.push({
// 		id: 'categorie-component',
// 		title: 'Categories',
// 		type: 'item',
// 		icon: 'category',
// 		url: '/category',
// 	});
// }
// if (per.indexOf('products') >= 0 || user === 'admin') {
// 	frenchLanguage.push({
// 		id: 'product-component',
// 		title: 'Produits',
// 		type: 'item',
// 		icon: 'devices_other',
// 		url: '/product',
// 	});
// }
// if (per.indexOf('messages') >= 0 || user === 'admin') {
// 	frenchLanguage.push({
// 		id: 'messages-component',
// 		title: 'Messages',
// 		type: 'item',
// 		icon: 'show_chart',
// 		url: '/message',
// 	});
// }
// if (per.indexOf('notifications') >= 0 || user === 'admin') {
// 	frenchLanguage.push({
// 		id: 'notifications-component',
// 		title: 'Notifications',
// 		type: 'item',
// 		icon: 'show_chart',
// 		url: '/notify',
// 	});
// }
// if (per.indexOf('blogs') >= 0 || user === 'admin') {
// 	frenchLanguage.push({
// 		id: 'blog-component',
// 		title: 'Articles',
// 		type: 'item',
// 		icon: 'book',
// 		url: '/blog',
// 	});
// }
// if (user == 'admin') {
// 	frenchLanguage.push(
// 		{
// 			id: 'configuration-component',
// 			title: 'Configuration',
// 			type: 'group',
// 			icon: 'show_chart',
// 			children: [
// 				{
// 					id: 'state-component',
// 					title: 'Etats',
// 					type: 'item',
// 					icon: 'smartphone',
// 					url: '/etat',
// 				},
// 				{
// 					id: 'color_produit-component',
// 					title: 'Couleurs des produits',
// 					type: 'item',
// 					icon: 'color_lens',
// 					url: '/colorProduit',
// 				},
// 				{
// 					id: 'devices-component',
// 					title: 'Appareils',
// 					type: 'item',
// 					icon: 'devices_outlined',
// 					url: '/device',
// 				},
// 				{
// 					id: 'brands-component',
// 					title: 'Marques',
// 					type: 'item',
// 					icon: 'important_devices',
// 					url: '/brand',
// 				},
// 				{
// 					id: 'gammes-component',
// 					title: 'Gammes',
// 					type: 'item',
// 					icon: 'format_list',
// 					url: '/gamme',
// 				},
// 				{
// 					id: 'models-component',
// 					title: 'Modeles',
// 					type: 'item',
// 					icon: 'android',
// 					url: '/model',
// 				},
// 				{
// 					id: 'types-component',
// 					title: 'Types des réparations',
// 					type: 'item',
// 					icon: 'build',
// 					url: '/ReparationType',
// 				},
// 			],
// 		},
// 		{
// 			id: 'administrator-component',
// 			title: 'Administrateurs',
// 			type: 'item',
// 			icon: 'person',
// 			url: '/administrator',
// 		},
// 		{
// 			id: 'currency-component',
// 			title: 'Devises',
// 			type: 'item',
// 			icon: 'attach_money',
// 			url: '/currency',
// 		},
// 		{
// 			id: 'country-component',
// 			title: 'Pays',
// 			type: 'item',
// 			icon: 'flag',
// 			url: '/country',
// 		},
// 		{
// 			id: 'permission-component',
// 			title: 'Permissions',
// 			type: 'item',
// 			icon: 'security',
// 			url: '/permission',
// 		},
// 		{
// 			id: 'role-component',
// 			title: 'Roles',
// 			type: 'item',
// 			icon: 'lock',
// 			url: '/role',
// 		},
// 		{
// 			id: 'teams-component',
// 			title: 'Equipes',
// 			type: 'item',
// 			icon: 'group',
// 			url: '/team',
// 		},
// 		{
// 			id: 'team-member-component',
// 			title: "Membres d'équipes",
// 			type: 'item',
// 			icon: 'folder_shared',
// 			url: '/teamMember',
// 		},
// 		{
// 			id: 'keys-component',
// 			title: 'API Keys',
// 			type: 'item',
// 			icon: 'vpn_key',
// 			url: '/api-keys/list',
// 		},
// 		{
// 			id: 'lead-component',
// 			title: 'Lead',
// 			type: 'group',
// 			icon: 'show_chart',

// 			children: [
// 				{
// 					id: 'messages-component',
// 					title: 'Messages',
// 					type: 'item',
// 					icon: 'show_chart',
// 					url: '/message',
// 				},
// 				{
// 					id: 'contact-component',
// 					title: 'Contact',
// 					type: 'item',
// 					icon: 'phone',
// 					url: '/contact',
// 				},
// 			],
// 		},
// 		{
// 			id: 'statistique-component',
// 			title: 'Statistique',
// 			type: 'group',
// 			icon: 'show_chart',
// 			children: [
// 				{
// 					id: 'admin-component',
// 					title: 'Admin Board',
// 					type: 'item',
// 					icon: 'supervisor',
// 					url: '/Widget2',
// 				},
// 				{
// 					id: 'statistics-component',
// 					title: 'Statistics',
// 					type: 'item',
// 					icon: 'show_chart',
// 					url: '/Widget1',
// 				},
// 			],
// 		}
// 	);
// }
// }

export default frenchLanguage;
