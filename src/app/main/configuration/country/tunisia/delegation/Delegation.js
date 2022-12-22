import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import TableHeader from "../../../../sharedComponent/TableHeader";
import { withTranslation, Translation } from "react-i18next";
import { withRouter } from "react-router-dom";
import DelegationTable from "./DelegationTable";


const styles = (theme) => ({
  layoutRoot: {},
});

class Delegation extends Component {
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
            textHeader={this.props.t("Delegation.title")}
            buttonText={this.props.t("coutry.country")}
          />
        }
        content={
          <div className="p-24">
            <TableHeader name="Delegation" />
            <DelegationTable />
          </div>
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(Delegation))
);
