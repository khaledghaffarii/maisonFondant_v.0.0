import {withStyles} from '@material-ui/core/styles';

import React, { Component } from 'react';
import Request from '../../utils/Request';
import ArchiveTable from '../sharedComponent/ArchiveTable';
import {FusePageCarded} from '@fuse';
import { withSnackbar } from 'notistack';

import FormHeader from '../sharedComponent/FormHeader';
import env from '../../static'

import {
  withRouter
} from 'react-router-dom';
const styles = theme => ({
  layoutRoot: {}
}); 
class ArchiveFinancial extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'category', field: 'category' },
        { title: 'etat', field: 'etat' },
        { title: 'prix', field: 'prix' },
        { title: 'avance', field: 'avance' },
        { title: 'detailsPanne', field: 'detailsPanne' },
        { title: 'couleurAppareil', field: 'couleurAppareil' },
        { title: 'centreDepot', field: 'centreDepot' },
        { title: 'centreService', field: 'centreService' },
        { title: 'numeroSerie', field: 'numeroSerie' },
        { title: 'repairer', field: 'repairer' },
        { title: 'client', field: 'client' },
           ],
      data: [],
      selctedRowlength: 0

    }
    this.setStateOnDelete = this.setStateOnDelete.bind(this);

  }
  async componentDidMount() {
    try{
      const url = env.reparations.all
      const response = await this.request.getAll(url);
      let data = []
      response.data.forEach(element => {
        let categoryValue = '';
        if(element.category !== null){
          categoryValue = element.category.name
        }
        else {
          categoryValue = 'pas de category';
        }
        let centreDepotValue = '';
        if(element.centreDepot !== null){
          centreDepotValue = element.centreDepot.name
        }
        else {
          centreDepotValue = 'pas de centre de depot';
        }
        let centreServiceValue = '';
        if(element.centreService !== null){
          centreServiceValue = element.centreService.name
        }
        else {
          centreServiceValue = 'pas de centre de service';
        }
        let repairerValue = '';
        if(element.repairer !== null){
          repairerValue = element.repairer.fname
        }
        else {
          repairerValue = 'pas de repairer';
        }
        let clientValue = '';
        if(element.owner !== null){
          clientValue = element.owner.fname
        }
        else {
          clientValue = 'pas de client';
        }
          data.push({
          '_id': element._id,
          'category':categoryValue,
          'etat': element.etat,
          'prix': element.prix,
          'avance': element.avance,
          'detailsPanne':element.detailsPanne,
          'couleurAppareil': element.couleurAppareil,
          'centreDepot': centreDepotValue,
          'centreService':centreServiceValue,
          'numeroSerie':element.numeroSerie,
          'repairer': repairerValue,
          'client':clientValue
          })
      });
      this.setState({
        data: data
     })
     
this.props.enqueueSnackbar('Operation reussi avec succes',{ 
  variant: 'success',
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
                     returnRoute='/financial'
                     title= "Archive"

                    />
                                 
                }
                content={
                  <ArchiveTable
                  title="Financials"
                  columns={this.state.columns}
                  data={this.state.data}
                  routeEdit="/editFinancial"
                  setStateOnDelete={this.setStateOnDelete}
                />
                }
            />
    
    )
  }
}
export default withStyles(styles, {withTheme: true})(withSnackbar(withRouter(ArchiveFinancial)));
