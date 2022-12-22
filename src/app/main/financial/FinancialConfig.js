import Financial from './Financial';
import EditFinancial from './EditFinancial';
import ArchiveFinancial from './ArchiveFinancial';
import DetailsFinancial from './DetailsFinancial';
export const FinancialConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/financial',
            component: Financial
        },
        
        {
            path     : '/editFinancial/:id',
            component : EditFinancial
        },
        {
            path     : '/archiveFinancial',
            component : ArchiveFinancial
        },
        {
            path     : '/detailsFinancial/:id',
            component : DetailsFinancial
        }
    ]
};

