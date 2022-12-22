import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import RoleTable from "./RoleTable";
import TableHeader from "../sharedComponent/TableHeader";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class Role extends Component {
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
              <Translation>{(t) => <div>{t("role.title")}</div>}</Translation>
            }
            addRoute="/newrole"
            buttonText={
              <Translation>{(t) => <div>{t("role.add")}</div>}</Translation>
            }
            archive="/archiveRole"
          />
        }
        content={
          <div className="p-24">
            <RoleTable />
          </div>
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(Role))
);
