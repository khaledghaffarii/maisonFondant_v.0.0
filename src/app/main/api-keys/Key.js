import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageCarded} from '@fuse';
import KeyTable from './KeyTable';
import TableHeader from '../sharedComponent/TableHeader';
import { withSnackbar } from 'notistack';

import {
    withRouter
  } from 'react-router-dom';
const styles = theme => ({
    layoutRoot: {}
});

class Keys extends Component {

    render()
    {
        const {classes} = this.props;
        return (
            <FusePageCarded
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <TableHeader 
                    textHeader="List des API Keys"
                    addRoute="/api-keys/new"
                    buttonText = "Ajouter un Nouveau Clés"
                    />
                }
        
                content={
                    <div className="p-24">
                        
                        <KeyTable />
                        
                        
                    </div>
                }
            />
        )
    }
}

export default withStyles(styles, {withTheme: true})(withSnackbar(withRouter(Keys)));