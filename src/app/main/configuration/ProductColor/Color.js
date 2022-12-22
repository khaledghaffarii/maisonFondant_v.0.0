import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import EtatTable from "./ColorTable";
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
              <Translation>{(t) => <div>{t("color.title")}</div>}</Translation>
            }
            addRoute="/colorProduit/new"
            buttonText={
              <Translation>{(t) => <div>{t("color.add")}</div>}</Translation>
            }
          />
        }
        content={
          <div className="p-24">
            <EtatTable />
          </div>
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(Stock))
);
