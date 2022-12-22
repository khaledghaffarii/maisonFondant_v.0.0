import Stock from './Stock';
import NewStock from './NewStock'
import EditStock from './EditStock'
import DetailsStock  from './DetailsStock'

export const StockConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/stock/new',
            component: NewStock
        },
        {
            path     : '/stock/edit/:id',
            component : EditStock
        },
        {
            path     : '/stock/info/:id',
            component : DetailsStock
        },
        {
            path     : '/stock',
            component: Stock
        }
    ]
};

