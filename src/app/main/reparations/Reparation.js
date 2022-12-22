import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import ReparationTable from "./ReparationTable";
import TableHeader from "../sharedComponent/TableHeader";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
import TabsReparations from "./TabsReparations";
const styles = (theme) => ({
  layoutRoot: {},
});

class Reparation extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <TableHeader
            textHeader={this.props.t("reparation.title")}
            addRoute="/newReparation"
            buttonText={
              <Translation>
                {(t) => <div>{t("reparation.addButton")}</div>}
              </Translation>
            }
            archive="/archiveReparation"
            addRoutedevis="/devis/new"
          />
        }
        content={
          <div className="p-24">
            {/* <ReparationTable /> */}
            <TabsReparations/>
          </div>
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(Reparation))
);
