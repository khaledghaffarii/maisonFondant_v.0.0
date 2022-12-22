import {withStyles} from '@material-ui/core/styles';

import React, { Component } from 'react';
import Request from '../../utils/Request';
import ArchiveTable from '../sharedComponent/ArchiveTable';
import {FusePageCarded} from '@fuse';
import FormHeader from '../sharedComponent/FormHeader';
import env from '../../static';
import { withSnackbar } from 'notistack';


import {
  withRouter
} from 'react-router-dom';
const styles = theme => ({
  layoutRoot: {}
}); 
class ArchiveClientFacebook extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'picture', field: 'picture', render: rowData => <img alt ='client' src={`${env.staticFiles}${rowData.picture}`} style={{width: 50, borderRadius: '50%'}}/>},
        { title: 'fname', field: 'fname' },
        { title: 'lname', field: 'lname' },
        { title: 'adress', field: 'adress'},
        { title: 'email', field: 'email' },
        { title: 'username', field: 'username'},
        { title: 'phone', field: 'phone' }
      ],
      data: [],
      selctedRowlength: 0

    }
    this.setStateOnDelete = this.setStateOnDelete.bind(this);

    
  }

  setStateOnDelete(data){
    this.setState({
      ...this.state, data
    })
  }


  async componentDidMount() {
    try{
      
    const url = env.clientFacebook.all
    const response = await this.request.getAll(url);
    this.setState({
      data: response.data
    })
    }catch(e){
      
if(e.response) {
  this.props.enqueueSnackbar(e.response.data.message, { 
      variant: 'error',
  });
}else {
  this.props.enqueueSnackbar('Erreur',{ 
      variant: 'error',
  });
}

    }
 
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
                     returnRoute='/clientFb'
                     title= "Archive"

                    />
                                 
                }
                content={
                  <ArchiveTable
                  title="Clients"
                  columns={this.state.columns}
                  data={this.state.data}
                  routeEdit="/editClientFb"
                  setStateOnDelete={this.setStateOnDelete}
                />
                }
            />
      


    )
  }
}


export default withStyles(styles, {withTheme: true})(withSnackbar(withRouter(ArchiveClientFacebook)));
