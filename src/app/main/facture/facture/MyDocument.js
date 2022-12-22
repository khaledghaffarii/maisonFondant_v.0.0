import React from 'react';
import { Page, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

import Header from './Header';
import Body from './Body';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    margin: 10,
    textAlign: 'center',
  },
});

function MyDocument(props) {
  return (
    <PDFViewer width="100%" height="800px">
      <Document>
        <Page size="A4" style={styles.page}>
          <Header date={props.date} />
          <Body
            nom1={props.nom1}
            prenom1={props.prenom1}
            societe1={props.societe1}
            adresse1={props.adresse1}
            cpville1={props.cpville1}
            telephone1={props.telephone1}
            email1={props.email1}
            nom2={props.nom2}
            prenom2={props.prenom2}
            societe2={props.societe2}
            adresse2={props.adresse2}
            cpville2={props.cpville2}
            telephone2={props.telephone2}
            email2={props.email2}
            description={props.description}
            quantity={props.quantity}
            price={props.price}
            serviceDescription={props.serviceDescription}
            conditions={props.conditions}
            elements={props.elements}
            total={props.total}
          />
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default MyDocument;
