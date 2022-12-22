import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import RepairerTable from "./RepairerTable";
import TableHeader from "../sharedComponent/TableHeader";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class Repairer extends Component {
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
                {(t) => <div>{t("repairer.title")}</div>}
              </Translation>
            }
            addRoute="/newRepairer"
            buttonText={
              <Translation>
                {(t) => <div>{t("repairer.addButton")}</div>}
              </Translation>
            }
            archive="/archiveRepairer"
          />
        }
        content={
          <div className="p-24">
            <RepairerTable />
          </div>
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(Repairer))
);
