import Reparation from './Reparation';
import NewReparation from './NewReparation';
import EditReparation from './EditReparation';
import ArchiveReparation from './ArchiveReparation';
import DetailsReparation from './DetailsReparation';
export const ReparationConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/reparation',
            component: Reparation
        },
        {
            path     : '/newReparation',
            component: NewReparation
        },
        {
            path     : '/editReparation/:id',
            component : EditReparation
        },
        {
            path     : '/archiveReparation',
            component : ArchiveReparation
        },
        {
            path     : '/detailsReparation/:id',
            component : DetailsReparation
        }
    ]
};

