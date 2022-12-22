import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import TeamTable from "./TeamTable";
import TableHeader from "../sharedComponent/TableHeader";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class Team extends Component {
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
              <Translation>{(t) => <div>{t("teams.title")}</div>}</Translation>
            }
            addRoute="/newteam"
            buttonText={
              <Translation>{(t) => <div>{t("teams.add")}</div>}</Translation>
            }
            archive="/archiveTeam"
          />
        }
        content={
          <div className="p-24">
            <TeamTable />
          </div>
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(Team))
);
