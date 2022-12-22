import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import DileveryTable from "./DileveryTable";
import TableHeader from "../sharedComponent/TableHeader";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class Dilevery extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <TableHeader
            textHeader={
              <Translation>
                {(t) => <div>{t("reparation.deliveryTitle")}</div>}
              </Translation>
            }
            addRoute="/newDilevery"
            buttonText="Ajouter une nouvelle reparation"
            archive="/archiveDilevery"
          />
        }
        content={
          <div className="p-24">
            <DileveryTable />
          </div>
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(Dilevery))
);
