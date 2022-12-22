import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import CurrencyTable from "./CurrencyTable";
import TableHeader from "../../sharedComponent/TableHeader";
import { withRouter } from "react-router-dom";
const styles = (theme) => ({
  layoutRoot: {},
});

import { withTranslation, Translation } from "react-i18next";
class Stock extends Component {
  // t  =  useTranslation();
  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <TableHeader
            textHeader={
              <Translation>
                {(t) => <div>{t("currency.title")}</div>}
              </Translation>
            }
            addRoute="/currency/new"
            buttonText={
              <Translation>{(t) => <div>{t("currency.add")}</div>}</Translation>
            }
          />
        }
        content={
          <div className="p-24">
            <CurrencyTable />
          </div>
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(Stock))
);
