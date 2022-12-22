import React from 'react';

import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
    margin: 20,
    height: 60,
  },
  detailColumn: {
    flexDirection: 'column',
    flexGrow: 9,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 12,
    justifySelf: 'flex-end',
    marginTop: 10,
  },
});

export default ({ date }) => (
  <View style={styles.container}>
    <View style={styles.detailColumn}>
      <Text style={styles.name}>
        Facture #{Math.floor(Math.random() * 1000000)}
      </Text>
      <Text style={styles.subtitle}>Date de facturation : {  new Date().toLocaleString()}</Text>
    </View>
  </View>
);
