/* eslint-disable no-unused-vars */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse';
import { ExampleConfig } from 'app/main/example/ExampleConfig';
import { TeamConfig } from 'app/main/teams/TeamConfig';
import { RoleConfig } from 'app/main/roles/RoleConfig';
import { PermissionConfig } from 'app/main/permissions/PermissionConfig';
import { ClientConfig } from 'app/main/clients/ClientConfig';
import { ClientDeletedConfig } from 'app/main/clientsDeleted/ClientDeletedConfig';
import { LoginConfig } from 'app/main/login/LoginConfig';
import { SpecialitieConfig } from 'app/main/Specialties/SpecialitieConfig';
import { TeamMemberConfig } from 'app/main/TeamMembers/TeamMemberConfig';
import { BoutiqueConfig } from 'app/main/boutique/BoutiqueConfig';
import { CategoryConfig } from 'app/main/categories/CategoryConfig';
import { RepairerConfig } from 'app/main/repairer/RepairerConfig';
import { ReparationConfig } from 'app/main/reparations/ReparationConfig';
import { CalendarAppConfig } from 'app/main/calendar/CalendarAppConfig';
import { ClientFacebookConfig } from 'app/main/clientsFacebook/ClientFacebookConfig';
import { DileveryConfig } from 'app/main/dilevery/DileveryConfig';
import { PlanningConfig } from 'app/main/planning/PlanningConfig';
import { StatistiqueConfig } from 'app/main/statistique/StatistiqueConfig';
import { ProviderConfig } from 'app/main/provider/ProviderConfig';
import { FinancialConfig } from 'app/main/financial/FinancialConfig';
import { ProductConfig } from 'app/main/Products/ProductConfig';
import { ProviderAnswerConfig } from 'app/main/providerAnswer/ProviderAnswerConfig';
import { MessageConfig } from 'app/main/message/MessageConfig';
import { B2BConfig } from 'app/main/b2b/B2BConfig';
import { BlogConfig } from 'app/main/Blog/BlogConfig';
import { NotificationConfig } from 'app/main/Notifications/NotificationConfig';
import { BoutiqueDictionaryConfig } from 'app/main/boutiqueDictionary/BoutiqueConfig';
import { DevisConfig } from 'app/main/devis/DevisConfig';
import { FactureConfig } from 'app/main/facture/FactureConfig';
import { StockConfig } from 'app/main/Stock/StockConfig';
import { CommandesConfig } from 'app/main/commandes/CommandesConfig';
import { ConfigurationConfig } from 'app/main/configuration/ConfigurationConfig';
import { KeyConfig } from 'app/main/api-keys/KeyConfig';
import { BrandConfig } from 'app/main/brand/BrandConfig';
import { DeviceConfig } from 'app/main/device/DeviceConfig';
import { GammeConfig } from 'app/main/gamme/GammeConfig';
import { ModelConfig } from 'app/main/model/ModelConfig';
import { ReparationTypeConfig } from 'app/main/reparationType/ReparationTypeConfig';

import { ProductReparationConfig } from 'app/main/productReparation/ProductReparationConfig';
import { ContactConfig } from 'app/main/configuration/contact/ContactConfig';
const routeConfigs = [
	KeyConfig,
	PermissionConfig,
	TeamConfig,
	RoleConfig,
	ClientConfig,
	ClientDeletedConfig,
	LoginConfig,
	SpecialitieConfig,
	TeamMemberConfig,
	BoutiqueConfig,
	CategoryConfig,
	RepairerConfig,
	ReparationConfig,
	CalendarAppConfig,
	ClientFacebookConfig,
	ConfigurationConfig,
	DileveryConfig,
	PlanningConfig,
	StatistiqueConfig,
	ProviderConfig,
	FinancialConfig,
	ProductConfig,
	ProviderAnswerConfig,
	MessageConfig,
	B2BConfig,
	NotificationConfig,
	BoutiqueDictionaryConfig,
	DevisConfig,
	FactureConfig,
	BlogConfig,
	StockConfig,
	CommandesConfig,
	BrandConfig,
	DeviceConfig,
	GammeConfig,
	ModelConfig,
	ReparationTypeConfig,
	ProductReparationConfig,
	ContactConfig,
];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to='/Widget2' />,
	},
];

export default routes;
