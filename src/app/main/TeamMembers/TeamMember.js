import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import TeamMemberTable from "./TeamMemberTable";
import TableHeader from "../sharedComponent/TableHeader";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class TeamMember extends Component {
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
                {(t) => <div>{t("teamMember.title")}</div>}
              </Translation>
            }
            addRoute="/newTeamMember"
            buttonText={
              <Translation>
                {(t) => <div>{t("teamMember.add")}</div>}
              </Translation>
            }
            archive="/archiveTeamMembers"
          />
        }
        content={
          <div className="p-24">
            <TeamMemberTable />
          </div>
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(TeamMember))
);
