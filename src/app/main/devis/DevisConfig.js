import Devis from "./Devis";
import NewDevis from './NewDevis'
import EditDevis from './EditDevis'
import DetailsDevis  from './DetailsDevis'
import Imprimer  from './Imprimer'
export const DevisConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path     : '/devis/imprimer/:id',
      component : Imprimer
  },
    {
        path     : '/devis/edit/:id',
        component : EditDevis
    },
    {
        path     : '/devis/info/:id',
        component : DetailsDevis
    },
    {
        path     : '/devis/new',
        component: NewDevis
    }, {
      path: "/devis",
      component: Devis
    }
  ]
};
