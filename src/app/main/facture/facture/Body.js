import React from 'react';

import { Text, View, StyleSheet,Image } from '@react-pdf/renderer';

import Description from './Description';

const styles = StyleSheet.create({
  container1: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    padding: '10px',
  },
  container2: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    padding: '10px',
  },
  detailColumn1: {
    flexDirection: 'column',
  },
  detailColumn2: {
    marginLeft: '40px',
    width: '340px',
  },
  title: {
    fontSize: 14,
    marginTop: '30px',
  },
  sender: {
    fontSize: 12,
    justifySelf: 'flex-end',
  },
  detail: {
    fontSize: 12,
    marginBottom: '5px',
  },
});

export default (props) => (
  <View>
    <View style={styles.container1}>
      <View style={styles.detailColumn1}>
       
        <Text style={styles.sender}>Trustit</Text>
        <Text style={styles.sender}>Bloc B 4eme étage City 
Center Centre Urbain Nord - Tunisie</Text>
        <Text style={styles.sender}>27887889 / 99959797</Text>
        <Text style={styles.sender}>contact@trustit.tn</Text>
        <Text style={styles.title}>Destinataire</Text>
      </View>
      <View style={styles.detailColumn2}>
      <Image class="logo-icon" style={{width:"45%", height:"20%"}} src="assets/images/logos/LogoTrust.png" alt="logo"/>
                       
      </View>
    </View>
    <View style={styles.container2}>
      <Text style={styles.sender}>
        {props.prenom2} {props.nom2}
      </Text>
      <Text style={styles.sender}>{props.societe2}</Text>
      <Text style={styles.sender}>{props.adresse2}</Text>
      <Text style={styles.sender}>{props.cpville2}</Text>
      <Text style={styles.sender}>{props.telephone2}</Text>
      <Text style={styles.sender}>{props.email2}</Text>
    </View>
    <Description elements={props.elements} total={props.total} />
  </View>
);
