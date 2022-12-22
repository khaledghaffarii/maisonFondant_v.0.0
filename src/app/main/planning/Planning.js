import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import PlanningTable from "./PlanningTable";
import TableHeader from "../sharedComponent/TableHeader";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

const Planning = ({ classes, ...props }) => {
  return (
    <FusePageCarded
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <TableHeader
          textHeader={
            <Translation>
              {(t) => <div>{t("plannings.title")}</div>}
            </Translation>
          }
          addRoute="/newPlanning"
          buttonText={
            <Translation>
              {(t) => <div>{t("plannings.addButton")}</div>}
            </Translation>
          }
          archive="/archiveTeam"
        />
      }
      content={
        <div className="p-24">
          <PlanningTable />
        </div>
      }
    />
  );
};

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(Planning))
);
