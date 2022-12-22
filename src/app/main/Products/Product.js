import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import ProductTable from "./ProductTable";
import TableHeader from "../sharedComponent/TableHeader";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class Product extends Component {
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
            addRoute="/newProduct"
            buttonText={this.props.t("product.addButton")}
            archive="/archiveProduct"
            useNewHeader={true}
          />
        }
        content={
          <div className="p-24">
            <ProductTable />
          </div>
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(Product))
);
