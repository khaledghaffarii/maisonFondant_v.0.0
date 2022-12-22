import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import TableHeader from "../../../../sharedComponent/TableHeader";
import { withTranslation, Translation } from "react-i18next";
import { withRouter } from "react-router-dom";
import GouvernorateTable from "./GouvernorateTable";

const styles = (theme) => ({
  layoutRoot: {},
});

class Gouvernorate extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <TableHeader
            addRoute="/country"
            textHeader={this.props.t("Gouvernorate.title")}
            buttonText={this.props.t("coutry.country")}
          />
        }
        content={
          <div className="p-24">
            <TableHeader name="gouvernorate" />
            <GouvernorateTable />
          </div>
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(Gouvernorate))
);
