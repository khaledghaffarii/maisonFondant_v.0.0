import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import TableHeader from "../sharedComponent/TableHeader";
import { withRouter } from "react-router-dom";

import { withTranslation } from "react-i18next";
import DeviceTable from "./DeviceTable";
const styles = (theme) => ({
  layoutRoot: {},
});
class Device extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <TableHeader
            textHeader={this.props.t("device.title")}
            addRoute="/newDevice"
            buttonText={this.props.t("device.add")}
          />
        }
        content={
          <div className="p-24">
            <DeviceTable />
          </div>
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(Device))
);
