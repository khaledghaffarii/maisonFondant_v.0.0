import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageCarded} from '@fuse';
import DevisTable from './DevisTable'
import TableHeader from '../sharedComponent/TableHeader';
import {
    withRouter
} from 'react-router-dom';
const styles = theme => ({
    layoutRoot: {}
});

import { withTranslation  } from "react-i18next";
class Stock extends Component {
     // t  =  useTranslation();
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
                        textHeader={this.props.t("devis.titleList")}
                        addRoute="/devis/new"
                        buttonText = {this.props.t("devis.addDevisTitle")}
                    />
                }
                content={
                    <div className="p-24">
                        <DevisTable />  
                    </div>
                }
            />
        )
    }
}
export default withTranslation ()(withStyles(styles, {withTheme: true})(withRouter(Stock)));