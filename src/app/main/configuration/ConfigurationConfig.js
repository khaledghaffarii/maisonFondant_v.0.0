import Country from "./country/country";
import Etat from "./etat/Etat";
import NewEtat from "./etat/NewEtat";
import EditEtat from "./etat/EditEtat";
import Currency from "./currency/Currency";
import NewCurrency from "./currency/NewCurrency";
import EditCurrency from "./currency/EditCurrency";
import Color from "./ProductColor/Color";
import NewColor from "./ProductColor/NewColor";
import EditColor from "./ProductColor/EditColor";
import Region from "./country/ksa/region/Region";
import City from "./country/ksa/city/City";
import Gouvernorate from "./country/tunisia/gouverorate/Gouvernorate";
import Delegation from "./country/tunisia/delegation/Delegation";
export const ConfigurationConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/country/delegation",
      component: Delegation,
    },
    {
      path: "/country/gouvernorate",
      component: Gouvernorate,
    },
    {
      path: "/country/city",
      component: City,
    },
    {
      path: "/country/region",
      component: Region,
    },
    {
      path: "/country",
      component: Country,
    },
    {
      path: "/etat/new",
      component: NewEtat,
    },
    {
      path: "/etat/edit/:id",
      component: EditEtat,
    },
    {
      path: "/etat",
      component: Etat,
    },
    {
      path: "/currency/new",
      component: NewCurrency,
    },
    {
      path: "/currency/edit/:id",
      component: EditCurrency,
    },
    {
      path: "/currency",
      component: Currency,
    },
    {
      path: "/colorProduit/new",
      component: NewColor,
    },
    {
      path: "/colorProduit/edit/:id",
      component: EditColor,
    },
    {
      path: "/colorProduit",
      component: Color,
    },
  ],
};
