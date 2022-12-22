
import React, { Component } from 'react';
import Request from '../../utils/Request';
import Table from '../sharedComponent/Table';
import {
  withRouter
} from 'react-router-dom';
import env from '../../static';
import { withSnackbar } from "notistack";

class AdministratorTable extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'picture', field: 'picture', render: rowData => <img alt ='admin'src={`${env.staticFiles}${rowData.picture}`} style={{width: 50, borderRadius: '50%'}}/>},
        { title: 'fname', field: 'fname' },
        { title: 'lname', field: 'lname' },
        { title: 'email', field: 'email' },
        { title: 'username', field: 'username' }
      ],
      data: [],
      selctedRowlength: 0,
      tableRef: React.createRef()


    }
    this.deleteAdministrator = this.deleteAdministrator.bind(this);
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
  }

  async componentDidMount() {
    try{
      const url = env.admin.all;
     const response = await this.request.getAll(url);
      this.setState({
        data: response.data
      })
 
    }catch(err){
      console.log(err);
    }
    
  }
  async deleteAdministrator(id) {
    try{
      const url = env.admin.remove(id);
      const response = await this.request.delete(url);
      this.props.enqueueSnackbar("Operation reussi avec succes", {
        variant: "success"
      });
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

    return (

        <Table 
        title = "Administrateurs"
        columns = {this.state.columns}
        data = {this.state.data}
        routeEdit ="/editadministrator"
        delete = {this.deleteAdministrator}
        setStateOnDelete = {this.setStateOnDelete}
        showMore="/detailsAdministrator"
        state={this.state}

        />
     
    )
  }
}
export default withSnackbar(withRouter(AdministratorTable));


