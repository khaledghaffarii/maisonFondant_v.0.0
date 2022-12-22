import Keys from './Key';
import NewKey from './NewKey';
import EditClient from './EditKey';
import ArchiveCleint from './ArchiveKeys';
import DetailsClient from './DetailsKey'
export const KeyConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/api-keys/list',
            component: Keys
        },
        {
            path     : '/api-keys/new',
            component: NewKey
        },
        {
            path     : '/api-keys/edit/:id',
            component : EditClient
        },
        {
            path     : '/detailsClient/:id',
            component : DetailsClient
        }
    ]
};
