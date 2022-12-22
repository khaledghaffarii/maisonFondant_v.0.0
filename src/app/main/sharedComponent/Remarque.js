import React from 'react';
import {
    AppBar,
    Avatar,
    List,
    ListItem,
    ListItemText,
    Typography
} from '@material-ui/core';
import Moment from 'react-moment';
import 'moment/locale/fr';
import env from '../../static';

function Remarque(props) {
    return (
        <AppBar className="card-footer flex flex-column p-16" position="static" color="default" elevation={0}>
            <div>{props.name}</div>
            <List>
                {props.remarqueList.map((remarque) => (
                    <div key={remarque._id}>
                        <ListItem className="px-0">
                            <Avatar src={`${remarque.owner ? `${env.staticFiles}${remarque.owner.picture}` : ''}`} className="mr-16" />
                            <ListItemText
                                primary={(
                                    <div>
                                        <Typography className="inline font-medium" color="initial" paragraph={false}>
                                            {`${remarque.owner ? `${remarque.owner.fname} ${remarque.owner.lname}` : ''}`}
                                        </Typography>
                                        <br/>
                                        <Moment format={'llll'} locale={'fr'}>{remarque.created_at}</Moment>
                                    </div>
                                )}
                                secondary={remarque.description}
                            />
                        </ListItem>
                    </div>
                ))}
            </List>
        </AppBar>
    )
}
export default Remarque;