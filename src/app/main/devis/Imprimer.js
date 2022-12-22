import React, { Component } from 'react';
//import faker from 'faker';
import env from '../../static';
import MyDocument from './facture/MyDocument';
//import AddElements from './elements/AddElements';
//import InputForm from './InputForm';
//import Elements from './elements/Elements';
import { v4 as uuidv4 } from 'uuid';
import Request from '../../utils/Request';
//import { formatDate, roundPrice } from '../utils';
//import NewFacture from './Imprimer';

const INITIAL_STATE = {
  numero:0,
  fname:"",
  lname:"",
  adress:"",
  email:"",
  phone:"",
  tva:0,
  montant_ht:0,
  timber:0,
  montant_ttc:0,
  devisList:{}
  
};

class Imprimer extends Component {
  state = INITIAL_STATE;
   list={};
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  request = new Request();
  async componentDidMount() {
    try {
        const url = env.devis.info;
        const devis = await this.request.getById(url, this.props.match.params.id);
       
        this.setState({
          numero:devis.data.numero,
          fname:devis.data.owner.fname,
          lname:devis.data.owner.lname,
          adress:devis.data.owner.adress,
          email:devis.data.owner.email,
          phone:devis.data.owner.phone,        
          tva:devis.data.tva,
          montant_ht:devis.data.montant_ht,
          timber:devis.data.timber,
          montant_ttc:devis.data.montant_ttc,
          devisList:devis.data.listPieces
      });
      
        
    }   
    catch (e) {
        if (e.response) {
            
        } else {
            console.log(e)
           
        }

    }
}
  
  
  
  render() {
    const divStyle = {
      margin: 'auto',
      display: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      width: 'auto',
    };

    return ( 
      this.state.devisList.length>0?<MyDocument
      numero={this.state.numero}
      fname={this.state.fname}
      lname={this.state.lname}
      adress={this.state.adress}
      email={this.state.email}
      phone={this.state.phone}
      tva={this.state.tva}
      montant_ht={this.state.montant_ht}
      timber={this.state.timber}
      montant_ttc={this.state.montant_ttc}
      devisList={this.state.devisList}
      />:''
             
          
      );
  }
}

export default Imprimer;
