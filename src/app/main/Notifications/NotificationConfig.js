import Notification from './Notification';
export const NotificationConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/notify',
            component: Notification
        },
    ]
};
