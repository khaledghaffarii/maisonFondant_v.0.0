import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageCarded} from '@fuse';
import FinancialTable from './FinancialTable';
import TableHeader from '../sharedComponent/TableHeader';
import {
    withRouter
  } from 'react-router-dom';
const styles = theme => ({
    layoutRoot: {}
});

class Financial extends Component {

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
                    textHeader="Finances"
                    addRoute="/newFinancial"
                    buttonText = "Ajouter une nouvelle reparation"
                    archive = "/archiveFinancial"
                    />
                }
        
                content={
                    <div className="p-24">
                        
                        <FinancialTable />
                        
                        
                    </div>
                }
            />
        )
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(Financial));