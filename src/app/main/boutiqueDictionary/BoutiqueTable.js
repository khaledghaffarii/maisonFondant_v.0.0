
import React, { Component } from 'react';
import Request from '../../utils/Request';
import { withSnackbar } from 'notistack';
import { withTranslation,Translation  } from "react-i18next";
import Table from '../sharedComponent/Table';
import {
  withRouter
} from 'react-router-dom';

import env from '../../static';
import BotuiqueState from './BoutiqueState';

class BoutiqueTable extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: <Translation>{(t) => (
          <div>
           
              {t("boutique.picture")}
            
            
          </div>
        )}</Translation>, field: 'picture', render: rowData => <img alt='boutique' src={`${env.staticFiles}${rowData.picture}`} style={{ width: 50, borderRadius: '50%' }} /> },
        { title:  <Translation>{(t) => (
          <div>
           
              {t("boutique.name")}
            
            
          </div>
        )}</Translation>, field: 'name', render: rowData => (<p>{rowData.name}</p>) },
        {
          title: 'Etat Boutique', field: 'etat', render: element => (<BotuiqueState disabled={true} id={element._id} etat={element.etat}/>)
        },
        { title: 'specialities', field: 'specialities' },
        { title: 'phone', field: 'phone' }
      ],
      data: [],
      selctedRowlength: 0,
      tableRef: React.createRef()
    }
    this.delete = this.delete.bind(this);
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
  }

  fetchData(query) {
    return new Promise(async (resolve, reject) => {
      let url = env.boutiques.list + '?'
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
      
      const userCountry = localStorage.getItem("country");
      
      url += "&country=" + userCountry;
      try {
        const result = await this.request.getAll(url);
        let dataList = []
        result.data.data.forEach(element => {
          let specialities = [];
          element.specialities.forEach(elem => {
            specialities.push(elem.name)
            specialities.push(' , ');
          })
          let specialitiesValue = '';
          if (element.specialities.length > 0) {
            specialitiesValue = specialities
          }
          else {
            specialitiesValue = 'pas de specialite';
          }
          dataList.push({
            '_id': element._id,
            'picture': element.picture,
            'name': element.name,
            'specialities': specialitiesValue,
            'adress': element.adress,
            'location': element.location.coordinates,
            'phone': element.phone,
            'etat': element.etat,
          })
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

      }

    })
  }
  async componentDidMount() {
  }
  async delete(id) {
  }
  setStateOnDelete(data) {
    this.setState({
      ...this.state, data
    })
  }

  render() {

    return (

      <Table
        readOnely={true}
        title={this.props.t("boutique.boutique")}
        columns={this.state.columns}
        data={this.fetchData.bind(this)}
        showMore="/detailsBoutique"
        state={this.state}
        rewriteAction={true}
        actions={[]}
        exportButton={false}
      />

    )
  }
}
export default withTranslation()(withSnackbar(withRouter(BoutiqueTable)));


