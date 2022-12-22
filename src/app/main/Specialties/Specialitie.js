import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import SpecialitieTable from "./SpecialitieTable";
import TableHeader from "../sharedComponent/TableHeader";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class Specialitie extends Component {
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
                {(t) => <div>{t("speciality.title")}</div>}
              </Translation>
            }
            addRoute="/newSpecialitie"
            buttonText={
              <Translation>
                {(t) => <div>{t("speciality.button")}</div>}
              </Translation>
            }
            archive="/archiveSpecialities"
          />
        }
        content={
          <div className="p-24">
            <SpecialitieTable />
          </div>
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(Specialitie))
);
