import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import PlanningTable from "./PlanningTableSuivi";
import TableHeader from "../sharedComponent/TableHeader";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

const SuiviPlanning = ({ classes, ...props }) => {
  return (
    <FusePageCarded
      classes={{
        root: classes.layoutRoot,
      }}
      content={
        <div className="p-24">
          <PlanningTable />
        </div>
      }
    />
  );
};

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(SuiviPlanning))
);
