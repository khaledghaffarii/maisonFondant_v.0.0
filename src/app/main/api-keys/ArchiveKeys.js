import {withStyles} from '@material-ui/core/styles';

import React, { Component } from 'react';
import Request from '../../utils/Request';
import ArchiveTable from '../sharedComponent/ArchiveTable';
import {FusePageCarded} from '@fuse';
import { withSnackbar } from 'notistack';

import FormHeader from '../sharedComponent/FormHeader';
import env from '../../static';

import {
  withRouter
} from 'react-router-dom';
const styles = theme => ({
  layoutRoot: {}
}); 
class ArchiveClient extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'picture', field: 'picture', render: rowData => <img alt="client" src={`${env.staticFiles}${rowData.picture}`} style={{ width: 50, borderRadius: '50%' }} /> },
        { title: 'fname', field: 'fname' },
        { title: 'lname', field: 'lname' },
        { title: 'email', field: 'email' },
        { title: 'phone', field: 'phone' },
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
    const url = env.clients.all 
    const response = await this.request.getAll(url);
    let dataList = []
    response.data.forEach(element => {
      const adress = `gouvernorat: ${element.adress.gouvernorat} |delegation: ${element.adress.delegation} |localite: ${element.adress.localite} |codePostal: ${element.adress.codePostal}`
      dataList.push({
        '_id': element._id,
        'picture': element.picture,
        'fname': element.fname,
        "lname": element.lname,
        "adress": adress,
        "email": element.email,
        "username": element.username,
        "phone": element.phone
      })

    });
    this.setState({
      data: dataList
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
                     returnRoute='/client'
                     title= "Archive"

                    />
                                 
                }
                content={
                  <ArchiveTable
                  title="Clients"
                  columns={this.state.columns}
                  data={this.state.data}
                  routeEdit="/editclient"
                  setStateOnDelete={this.setStateOnDelete}
                />
                }
            />
      


    )
  }
}


export default withStyles(styles, {withTheme: true})(withSnackbar(withRouter(ArchiveClient)));
