import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import CountryTable from "./countryTable";
import TableHeader from "../../sharedComponent/TableHeader";
import AddCountry from "./addCountry";
import { withTranslation, Translation } from "react-i18next";
import { withRouter } from "react-router-dom";
const styles = (theme) => ({
  layoutRoot: {},
});

class Stock extends Component {
  // t  =  useTranslation();
  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        content={
          <div className="p-24">
            <TableHeader
              textHeader={
                <Translation>
                  {(t) => <div>{t("coutry.title")}</div>}
                </Translation>
              }
              name="country"
              buttonText={
                <Translation>{(t) => <div>{t("coutry.add")}</div>}</Translation>
              }
              show={<AddCountry />}
            />
            <CountryTable />
          </div>
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(Stock))
);
