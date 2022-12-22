import Administrator from './Administrator';
import NewAdministrator from './NewAdministrator';
import EditAdministrator from './EditAdministrator';
import ArchiveAdministrator from './ArchiveAdministrator';
import detailsAdministrator from './DetailsAdministrator';
export const AdministratorConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/administrator',
            component: Administrator
        },
        {
            path     : '/newadministrator',
            component: NewAdministrator
        },
        {
            path     : '/editadministrator/:id',
            component : EditAdministrator
        },
        {
            path     : '/archiveAdmin',
            component : ArchiveAdministrator
        },
        {
            path : '/detailsAdministrator/:id',
            component: detailsAdministrator 
        }
    ]
};
