import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import PermissionTable from "./PermissionTable";
import TableHeader from "../sharedComponent/TableHeader";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class Permission extends Component {
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
                {(t) => <div>{t("permission.title")}</div>}
              </Translation>
            }
            addRoute="/newpermission"
            buttonText={
              <Translation>
                {(t) => <div>{t("permission.add")}</div>}
              </Translation>
            }
            archive="/archivePermission"
          />
        }
        content={
          <div className="p-24">
            <PermissionTable />
          </div>
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(Permission))
);
