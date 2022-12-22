import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import ProductReparationTable from "./ProductReparationTable";
import TableHeader from "../sharedComponent/TableHeader";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class ProductReparation extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <TableHeader
            textHeader={this.props.t("product.title")}
            addRoute="/newProductReparation"
            buttonText={this.props.t("product.addButton")}
            
          />
        }
        content={
          <div className="p-24">
            <ProductReparationTable />
          </div>
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(ProductReparation))
);
