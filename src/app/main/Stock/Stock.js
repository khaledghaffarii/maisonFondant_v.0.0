import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import StockTable from "./StockTable";
import TableHeader from "../sharedComponent/TableHeader";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class Stock extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <TableHeader
            textHeader={this.props.t("stock.stockTitle")}
            addRoute="/stock/new"
            buttonText={this.props.t("stock.addNewStockButton")}
          />
        }
        content={
          <div className="p-24">
            <StockTable />
          </div>
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(Stock))
);
