import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import TableHeader from "../sharedComponent/TableHeader";
import { withRouter } from "react-router-dom";

import { withTranslation } from "react-i18next";

import GammeTable from "./GammeTable";
const styles = (theme) => ({
  layoutRoot: {},
});
class Gamme extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <TableHeader
            textHeader={this.props.t("gamme.title")}
            addRoute="/newGamme"
            buttonText={this.props.t("gamme.add")}
          />
        }
        content={
          <div className="p-24">
            <GammeTable />
          </div>
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(Gamme))
);
