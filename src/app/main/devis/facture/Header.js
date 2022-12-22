import React from "react";

import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { withTranslation, Translation, useTranslation } from "react-i18next";
const Header = (props) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      borderBottomWidth: 2,
      borderBottomColor: "#112131",
      borderBottomStyle: "solid",
      alignItems: "stretch",
      margin: 20,
      height: 60,
    },
    detailColumn: {
      flexDirection: "column",
      flexGrow: 9,
      textTransform: "uppercase",
    },
    name: {
      fontSize: 24,
    },
    subtitle: {
      fontSize: 12,
      justifySelf: "flex-end",
      marginTop: 10,
    },
  });
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.detailColumn}>
        <Text style={styles.name}>
          
          {t("devis.quotes")}: {props.numero}
        </Text>
        <Text style={styles.subtitle}>
          {t("print.quotationDate")}: {new Date().toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

export default withTranslation()(Header);
