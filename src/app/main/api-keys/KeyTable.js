
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { Button } from '@material-ui/core';

import Request from '../../utils/Request';
import Table from '../sharedComponent/Table';
import {
  withRouter
} from 'react-router-dom';
import env from '../../static';
import SimpleModal from '../sharedComponent/SimpleModal';
import Reparations from './Repartaions'
const styles = theme => ({
  layoutRoot: {}
});
class KeyTable extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'Client',  render: (rowData) => <p>{rowData.user?.fname} {rowData.user?.lname}</p>},
        { title: 'API Key', field: 'key' },
      ],
      data: [],
      selctedRowlength: 0,
      tableRef: React.createRef()


    }
    this.delete = this.delete.bind(this);
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
  }


  tableReparations(rowData) {
    return (
      <Reparations id={rowData._id} />
    )
  }
  reparations(rowData) {
    return (
      <SimpleModal
        showReparations={this.tableReparations(rowData)}
      />
    )
  }
  async blockClient(rowData){
    try{
      const url = env.clients.block(rowData._id);
      await this.request.new(url);
      this.state.tableRef.current.onQueryChange();
      this.props.enqueueSnackbar('Operation reussi avec succes',{ 
        variant: 'success',
      })
    }catch(e){
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: 'error',
        });
      } else {
        this.props.enqueueSnackbar('Erreur', {
          variant: 'error',
        });
      }
    }
  }
 block(rowData){
    return (
      <Button
      variant="contained"
      color="primary"
      className="w-224 mx-auto mt-16"
      onClick= {this.blockClient.bind(this, rowData)}
    >
        block
      </Button>
    )
  }
  fetchData(query) {
    return new Promise(async (resolve, reject) => {
      let url = env.keys.list + '?'
      url += 'page=' + (query.page + 1)
      url += '&count=' + query.pageSize;
      url += '&search=' + query.search;
      if (query.filters.length > 0) {
        query.filters.forEach(elem => {
          url += `&filters[]=${elem.column.field},${elem.value}`
        })
      }
      else {
        url += '&filters='
      }
      try {
        const result = await this.request.getAll(url);
        let dataList = []
        result.data.data.forEach(element => {
          dataList.push(element)
        });
        resolve({
          data: dataList,
          page: Number(result.data.page) - 1,
          totalCount: result.data.totalCount
        });
      } catch (e) {
        if (e.response) {
          this.props.enqueueSnackbar(e.response.data.message, {
            variant: 'error',
          });
        } else {
          this.props.enqueueSnackbar('Erreur', {
            variant: 'error',
          });
        }
        console.log(e)
      }
    })
  }

  async componentDidMount() {



  }
  async delete(id) {
    try {

      const url = env.clients.remove(id);
      await this.request.delete(url);
      this.state.tableRef.current.onQueryChange();
      this.props.enqueueSnackbar('Operation reussi avec succes',{ 
        variant: 'success',
      })
      
    } catch (e) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: 'error',
        });
      } else {
        this.props.enqueueSnackbar('Erreur', {
          variant: 'error',
        });
      }
    }
  }
  setStateOnDelete(data) {
    this.setState({
      ...this.state, data
    })
  }

  render() {

    return (

      <Table
        title="List des API Keys"
        columns={this.state.columns}
        data={this.fetchData.bind(this)}
        routeEdit="/api-keys/edit"
        delete={this.delete}
        setStateOnDelete={this.setStateOnDelete}
        state={this.state}
      />

    )
  }
}
export default withStyles(styles, { withTheme: true })(withSnackbar(withRouter(KeyTable)));


