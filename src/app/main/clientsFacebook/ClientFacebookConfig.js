import ClientFacebook from './ClientFacebook';
import NewClientFacebook from './NewClientFacebook';
import EditClientFacebook from './EditClientFacebook';
import ArchiveClientFacebook from './ArchiveClientFacebook';
import DetailsClientFacebook from './DetailsClientFacebook';
export const ClientFacebookConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/clientFb',
            component: ClientFacebook
        },
        {
            path     : '/newClientFb',
            component: NewClientFacebook
        },
        {
            path     : '/editClientFb/:id',
            component : EditClientFacebook
        },
        {
            path     : '/archiveClientFb',
            component : ArchiveClientFacebook
        },
        {
            path     : '/detailsClientFb/:id',
            component : DetailsClientFacebook
        }
        
    ]
};
