import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import TableHeader from "../sharedComponent/TableHeader";
import { withRouter } from "react-router-dom";

import { withTranslation } from "react-i18next";
import ReparationTypeTable from "./ReparationTypeTable";



const styles = (theme) => ({
  layoutRoot: {},
});
class ReparationType extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <TableHeader
            textHeader={this.props.t("reparationType.title")}
            addRoute="/newReparationType"
            buttonText={this.props.t("reparationType.add")}
          />
        }
        content={
          <div className="p-24">
           <ReparationTypeTable/>
          </div>
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(ReparationType))
);
