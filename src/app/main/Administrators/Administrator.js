import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageCarded} from '@fuse';
import AdministratorTable from './AdministratorTable';
import TableHeader from '../sharedComponent/TableHeader';
import {
    withRouter
  } from 'react-router-dom';
const styles = theme => ({
    layoutRoot: {}
});

class Administrator extends Component {

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
                    textHeader="La liste des administrateurs"
                    addRoute="/newadministrator"
                    buttonText = "Ajouter un nouveau administrateur"
                    archive="archiveAdmin"
                    />
                }
        
                content={
                    <div className="p-24">                 
                        <AdministratorTable 
                        />     
                    </div>
                }
            />
        )
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(Administrator));