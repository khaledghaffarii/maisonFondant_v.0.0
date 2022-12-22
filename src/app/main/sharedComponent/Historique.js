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

function Historique(props) {
    return (
        <AppBar className="card-footer flex flex-column p-16" position="static" color="default" elevation={0}>
            <div>{props.name}</div>
            <List>
                {props.historiqueList.map((historique) => (
                    historique.etat?
                    <div key={historique._id}>
                        <ListItem className="px-0">
                            <Avatar src={`${historique.teamMember ? `${env.staticFiles}${historique.teamMember.picture}` :historique.repairer ? `${env.staticFiles}${historique.repairer.picture}`:''}`} className="mr-16" />
                            <ListItemText
                                primary={(
                                    <div>
                                        <Typography className="inline font-medium" color="initial" paragraph={false}>
                                            {`${historique.teamMember ? `${historique.teamMember.fname} ${historique.teamMember.lname}` :historique.repairer ? `${historique.repairer.fname} ${historique.repairer.lname}` : ''}`}
                                        </Typography>
                                        <br/>
                                        <Moment format={'llll'} locale={'fr'}>{historique.created_at}</Moment>
                                    </div>
                                )}
                                secondary={historique.etat}
                            />
                        </ListItem>
                    </div>:null
                ))}
            </List>
        </AppBar>
    )
}
export default Historique;