
import React, { Component } from 'react';
import Request from '../../utils/Request';
import Table from '../sharedComponent/Table';
import { withSnackbar } from 'notistack';

import env from '../../static';
import {
  withRouter
} from 'react-router-dom';

class ReparationTable extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'category', field: 'category' },
        { title: 'etat', field: 'etat' },
        { title: 'prix', field: 'prix' },
        { title: 'couleurAppareil', field: 'couleurAppareil' },
        { title: 'centreDepot', field: 'centreDepot' },
        { title: 'centreRecuperation', field: 'centreRecuperation' },
        { title: 'repairer', field: 'repairer' },
        { title: 'client', field: 'client' },
      ],
      data: [],
      selctedRowlength: 0,
      tableRef: React.createRef()

    }
    this.delete = this.delete.bind(this);
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
  }





  async componentDidMount() {
    try {
      const url = `${env.clients.reparations(this.props.id)}`
      const response = await this.request.getAll(url);
      let data = []
      response.data.forEach(element => {
        let categoryValue = '';
        if (element.category !== null) {
          categoryValue = element.category.name
        }
        else {
          categoryValue = 'pas de category';
        }

        let centreDepotValue = '';
        if (element.centreDepot !== null) {
          centreDepotValue = element.centreDepot.name
        }
        else {
          centreDepotValue = 'pas de centre de depot';
        }
        let centreServiceValue = '';
        if (element.centreService !== null) {
          centreServiceValue = element.centreService.name
        }
        else {
          centreServiceValue = 'pas de centre de service';
        }
        let centreRecuperationValue = '';
        if (element.centreRecuperation !== null) {
          centreRecuperationValue = element.centreRecuperation.name
        }
        else {
          centreRecuperationValue = 'pas de centre de service';
        }

        let repairerValue = '';
        if (element.repairer !== null) {
          repairerValue = element.repairer.fname
        }
        else {
          repairerValue = 'pas de repairer';
        }
        let clientValue = '';
        if (element.owner !== null) {
          clientValue = element.owner.fname
        }
        else {
          clientValue = 'pas de client';
        }
        data.push({
          '_id': element._id,
          'category': categoryValue,
          'etat': element.etat,
          'prix': element.prix,
          'prixPiece': element.prixPiece,
          'avance': element.avance,
          'detailsPanne': element.detailsPanne,
          'couleurAppareil': element.couleurAppareil,
          'centreDepot': centreDepotValue,
          'centreService': centreServiceValue,
          'centreRecuperation': centreRecuperationValue,
          'numeroSerie': element.numeroSerie,
          'repairer': repairerValue,
          'client': clientValue
        })
      });
      this.setState({
        data: data
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
  async delete(id) {
    try {
      const url = env.reparations.delete(id);
      await this.request.delete(url);

      this.props.enqueueSnackbar('Operation reussi avec succes', {
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
        title="Reparations"
        columns={this.state.columns}
        data={this.state.data}
        routeEdit="/editReparation"
        delete={this.delete}
        setStateOnDelete={this.setStateOnDelete}
        showMore="/detailsReparation"
        state={this.state}

      />

    )
  }
}
export default withSnackbar(withRouter(ReparationTable));


