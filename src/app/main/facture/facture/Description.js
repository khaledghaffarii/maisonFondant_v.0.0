import React from 'react';

import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    margin: 20,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#112131',
    borderStyle: 'solid',
    marginTop: 50,
  },
  detailColumn: {
    flexDirection: 'column',
    borderRightWidth: 1,
    borderColor: '#112131',
    borderStyle: 'solid',
    flexGrow: 9,
  },
  name: {
    fontSize: 24,
  },
  title: {
    fontSize: 14,
    justifySelf: 'flex-end',
    marginTop: 10,
    margin: 'auto',
    borderBottomWidth: 1,
    borderColor: '#112131',
    borderStyle: 'solid',
    padding: '5px',
  },
  subtitle: {
    fontSize: 12,
    justifySelf: 'flex-end',
    marginTop: 10,
    margin: 'auto',
    padding: '5px',
  },
});

class Description extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.detailColumn}>
            <Text style={styles.title}>Description</Text>
            {this.props.elements.map((element) => (
              <Text key={element.id} style={styles.subtitle}>
                {element.description}
              </Text>
            ))}
          </View>
          <View style={styles.detailColumn}>
            <Text style={styles.title}>Quantité</Text>
            {this.props.elements.map((element) => (
              <Text key={element.id} style={styles.subtitle}>
                {element.quantity}
              </Text>
            ))}
          </View>
          <View style={styles.detailColumn}>
            <Text style={styles.title}>Prix Unitaire</Text>
            {this.props.elements.map((element) => (
              <Text key={element.id} style={styles.subtitle}>
                {element.price}
              </Text>
            ))}
          </View>
          <View style={styles.detailColumn}>
            <Text style={styles.title}>Total</Text>
            {this.props.elements.map((element) => (
              <Text key={element.id} style={styles.subtitle}>
                {element.price * element.quantity}
              </Text>
            ))}
          </View>
        </View>
        <Text style={styles.title}> Solde du : {this.props.total} €</Text>
      </View>
    );
  }
}

export default Description;
