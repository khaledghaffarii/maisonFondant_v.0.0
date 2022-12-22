import Facture from "./Facture";
import NewFacture from './NewFacture'
import EditFacture from './EditFacture'
import DetailsFacture  from './DetailsFacture'
import Imprimer  from './Imprimer'
export const FactureConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path     : '/facture/imprimer/:id',
      component : Imprimer
  },{
        path     : '/facture/edit/:id',
        component : EditFacture
    },
    {
        path     : '/facture/info/:id',
        component : DetailsFacture
    },
    {
        path     : '/facture/new',
        component: NewFacture
    }, {
      path: "/facture",
      component: Facture
    }
  ]
};
