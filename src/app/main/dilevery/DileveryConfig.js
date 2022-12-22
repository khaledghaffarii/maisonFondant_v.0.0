import Dilevery from './Dilevery';
//import NewDilevery from './NewDilevery';
import EditDilevery from './EditDilevery';
import ArchiveDilevery from './ArchiveDilevery';
import DetailsDilevery from './DetailsDilevery';

import Plannings from './Plannings/planning'
import PrintPlanning from './Plannings/planningToPrint'
export const DileveryConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/dilevery',
            component: Dilevery
        },
     
        {
            path     : '/editDilevery/:id',
            component : EditDilevery
        },
        {
            path     : '/archiveDilevery',
            component : ArchiveDilevery
        },
        {
            path     : '/detailsDilevery/:id',
            component : DetailsDilevery
        }
        ,
        {
            path     : '/detailsPlanning',
            component : Plannings
        },
        {
            path     : '/printPlanning',
            component : PrintPlanning
        }
    ]
};

