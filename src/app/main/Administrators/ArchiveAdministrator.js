import {withStyles} from '@material-ui/core/styles';

import React, { Component } from 'react';
import Request from '../../utils/Request';
import ArchiveTable from '../sharedComponent/ArchiveTable';
import {FusePageCarded} from '@fuse';
import FormHeader from '../sharedComponent/FormHeader';
import env from '../../static';
import {
  withRouter
} from 'react-router-dom';
import { withSnackbar } from "notistack";

const styles = theme => ({
  layoutRoot: {}
}); 
class ArchiveAdministrator extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'picture', field: 'picture', render: rowData => <img alt = 'admin' src={`${env.staticFiles}${rowData.picture}`} style={{ width: 50, borderRadius: '50%' }} /> },
        { title: 'fname', field: 'fname' },
        { title: 'lname', field: 'lname' },
        { title: 'email', field: 'email' },
        { title: 'username', field: 'username' }
      ],
      data: [],
      selctedRowlength: 0

    }
    this.setStateOnDelete = this.setStateOnDelete.bind(this);

  }





  async componentDidMount() {
    try{
      const url = env.admin.all;
      const response = await this.request.getAll(url);
      this.setState({
        data: response.data
      })

    }catch(e){
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error"
        });
      } else {
        this.props.enqueueSnackbar("Erreur", {
          variant: "error"
        });
      }
    }
    
  }
  setStateOnDelete(data){
    this.setState({
      ...this.state, data
    })
  }
  render() {
    const {classes} = this.props;

    return (
      <FusePageCarded
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <FormHeader
                     returnRoute='/boutique'
                     title= "Archive"
                    />
                }
                content={
                  <ArchiveTable
                  title="Administrateurs"
                  columns={this.state.columns}
                  data={this.state.data}
                  routeEdit="/editadministrator"
                  setStateOnDelete={this.setStateOnDelete}
                />
                }
            />
      


    )
  }
}


export default withStyles(styles, {withTheme: true})(withSnackbar(withRouter(ArchiveAdministrator)));
