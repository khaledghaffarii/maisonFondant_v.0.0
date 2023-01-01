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
          <Header numero={props.numero} />
                
          <Body
          fname={props.fname}
          lname={props.fname}
          adress={props.adress}
          email={props.email}
          phone={props.phone}
          tva={props.tva}
          montant_ht={props.montant_ht}
          timber={props.timber}
          montant_ttc={props.montant_ttc}
          devisList={props.devisList}
          />
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default MyDocument;
