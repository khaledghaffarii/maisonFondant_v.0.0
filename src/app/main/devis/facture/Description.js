import React from "react";

import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { withTranslation, Translation, useTranslation } from "react-i18next";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "stretch",
    margin: 20,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#112131",
    borderStyle: "solid",
    marginTop: 50,
  },
  detailColumn: {
    flexDirection: "column",
    borderRightWidth: 1,
    borderColor: "#112131",
    borderStyle: "solid",
    flexGrow: 9,
  },
  name: {
    fontSize: 24,
  },
  title: {
    fontSize: 14,
    justifySelf: "flex-end",
    marginTop: 10,
    margin: "auto",
    borderBottomWidth: 1,
    borderColor: "#112131",
    borderStyle: "solid",
    padding: "5px",
  },
  subtitle: {
    fontSize: 12,
    justifySelf: "flex-end",
    marginTop: 10,
    margin: "auto",
    padding: "5px",
  },
});

class Description extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.detailColumn}>
            <Text style={styles.title}>
              {this.props.t("devis.pieceDetails")}
            </Text>
            {this.props.devisList.map((element) => (
              <Text key={element.id} style={styles.subtitle}>
                {element.piece?.displayName}
              </Text>
            ))}
          </View>
          <View style={styles.detailColumn}>
            <Text style={styles.title}>{this.props.t("stock.price")}</Text>
            {this.props.devisList.map((element) => (
              <Text key={element.id} style={styles.subtitle}>
                {element.piece?.prix}
              </Text>
            ))}
          </View>
          <View style={styles.detailColumn}>
            <Text style={styles.title}> {this.props.t("stock.quantity")}</Text>
            {this.props.devisList.map((element) => (
              <Text key={element.id} style={styles.subtitle}>
                {element.quantite}
              </Text>
            ))}
          </View>
          <View style={styles.detailColumn}>
            <Text style={styles.title}>{this.props.t("print.discount")}</Text>
            {this.props.devisList.map((element) => (
              <Text key={element.id} style={styles.subtitle}>
                {element.remise + "%"}
              </Text>
            ))}
          </View>
          <View style={styles.detailColumn}>
            <Text style={styles.title}>TVA</Text>
            {this.props.devisList.map((element) => (
              <Text key={element.id} style={styles.subtitle}>
                {element.tva + "%"}
              </Text>
            ))}
          </View>

          <View style={styles.detailColumn}>
            <Text style={styles.title}>Total</Text>
            {this.props.devisList.map((element) => (
              <Text key={element.id} style={styles.subtitle}>
                {element.montant_tva}
              </Text>
            ))}
          </View>
        </View>

        {/*
        <View style={styles.container}>
          <View style={styles.detailColumn}>
            <Text style={styles.title}>Montant</Text>
            <Text style={styles.subtitle}>
                {this.props.montant_ht}
              </Text>
          </View>
       
          <View style={styles.detailColumn}>
            <Text style={styles.title}>Timber</Text>
            <Text style={styles.subtitle}>
          {this.props.timber}
              </Text>
           
          </View>
          <View style={styles.detailColumn}>
            <Text style={styles.title}>Total</Text>
            <Text style={styles.subtitle}>
          {this.props.montant_ttc}
              </Text>
             </View>
            </View>*/}
        <Text style={styles.title}>
          {" "}
          {this.props.t("print.balance")}: {this.props.montant_ttc} DT
        </Text>
      </View>
    );
  }
}

export default withTranslation()(Description);
