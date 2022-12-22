import React, { Component } from 'react';
//import faker from 'faker';

import MyDocument from './facture/MyDocument';
//import AddElements from './elements/AddElements';
//import InputForm from './InputForm';
//import Elements from './elements/Elements';
import { v4 as uuidv4 } from 'uuid';

//import { formatDate, roundPrice } from '../utils';
//import NewFacture from './Imprimer';

const INITIAL_STATE = {
  date: "10/02/1999",
  nom1: "faker.name.lastName()",
  prenom1: "faker.name.firstName()",
  societe1: "faker.company.companyName()",
  adresse1: "faker.address.streetAddress()",
  cpville1: "faker.address.zipCode() + ' ' + faker.address.city()",
  telephone1: "faker.phone.phoneNumber()",
  email1: "faker.internet.email()",
  nom2: "faker.name.lastName()",
  prenom2: "faker.name.firstName()",
  societe2: "faker.company.companyName()",
  adresse2: "faker.address.streetAddress()",
  cpville2: "faker.address.zipCode() + ' ' + faker.address.city()",
  telephone2: "faker.phone.phoneNumber()",
  email2: "faker.internet.email()",
  description: "faker.commerce.product()",
  quantity: "faker.random.number()",
  serviceDescription: "faker.commerce.productDescription()",
  conditions: 'Par chèque dans les 15 prochains jours',
  elements: [
    {
      id: 1,
      description:" faker.commerce.product()",
      quantity: 5,
      price: 4,
    },
    {
      id: 2,
      description: "faker.commerce.product()",
      quantity: 10,
      price: 2,
    },
    {
      id: 3,
      description: "faker.commerce.product()",
      quantity: 30,
      price: 5,
    },
  ],
  total: 190,
};

class Imprimer extends Component {
  state = INITIAL_STATE;

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  addElements = (elementState) => {
    const newElement = {
      id: uuidv4(),
      description: elementState.description,
      quantity: elementState.quantity,
      price: elementState.price,
    };
    this.setState({
      elements: [...this.state.elements, newElement],
      total: 5,
    });
  };

  handleInputChange = (input) => {
    const {
      date,
      nom1,
      prenom1,
      societe1,
      adresse1,
      cpville1,
      telephone1,
      email1,
      nom2,
      prenom2,
      societe2,
      adresse2,
      cpville2,
      telephone2,
      email2,
      serviceDescription,
      conditions,
    } = input;

    this.setState({
      date: date,
      nom1: nom1,
      prenom1: prenom1,
      societe1: societe1,
      adresse1: adresse1,
      cpville1: cpville1,
      telephone1: telephone1,
      email1: email1,
      nom2: nom2,
      prenom2: prenom2,
      societe2: societe2,
      adresse2: adresse2,
      cpville2: cpville2,
      telephone2: telephone2,
      email2: email2,
      serviceDescription: serviceDescription,
      conditions: conditions,
    });
  };

  delElement = (id) => {
    const elementQuantity = this.state.elements.find(
      (element) => element.id === id
    ).quantity;
    const elementPrice = this.state.elements.find(
      (element) => element.id === id
    ).price;
    this.setState({
      elements: [
        ...this.state.elements.filter((elements) => elements.id !== id),
      ],
      total: 5,
    });
  };

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
             <MyDocument
              date={this.state.date}
              nom1={this.state.nom1}
              prenom1={this.state.prenom1}
              societe1={this.state.societe1}
              adresse1={this.state.adresse1}
              cpville1={this.state.cpville1}
              telephone1={this.state.telephone1}
              email1={this.state.email1}
              nom2={this.state.nom2}
              prenom2={this.state.prenom2}
              societe2={this.state.societe2}
              adresse2={this.state.adresse2}
              cpville2={this.state.cpville2}
              telephone2={this.state.telephone2}
              email2={this.state.email2}
              serviceDescription={this.state.serviceDescription}
              conditions={this.state.conditions}
              elements={this.state.elements}
              total={this.state.total}
            />
          
      );
  }
}

export default Imprimer;
