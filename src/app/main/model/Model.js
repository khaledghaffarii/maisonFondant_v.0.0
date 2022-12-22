import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import TableHeader from "../sharedComponent/TableHeader";
import { withRouter } from "react-router-dom";

import { withTranslation } from "react-i18next";
import ModelTable from "./ModelTable";


const styles = (theme) => ({
  layoutRoot: {},
});
class Model extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <TableHeader
            textHeader={this.props.t("model.title")}
            addRoute="/newModel"
            buttonText={this.props.t("model.add")}
          />
        }
        content={
          <div className="p-24">
            <ModelTable />
          </div>
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(Model))
);
