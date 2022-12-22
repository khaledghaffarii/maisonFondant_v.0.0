import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import TableHeader from "../sharedComponent/TableHeader";
import { withRouter } from "react-router-dom";
import BrindTable from "./BrandTble";
const styles = (theme) => ({
  layoutRoot: {},
});

import { withTranslation } from "react-i18next";
class Brand extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <TableHeader
            textHeader={this.props.t("brind.title")}
            addRoute="/newBrand"
            buttonText={this.props.t("brind.add")}
          />
        }
        content={
          <div className="p-24">
            <BrindTable />
          </div>
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(Brand))
);
