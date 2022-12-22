import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import CategoryTable from "./CategoryTable";
import TableHeader from "../sharedComponent/TableHeader";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class Category extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <TableHeader
            textHeader={this.props.t("category.title")}
            addRoute="/newCategory"
            buttonText={this.props.t("category.addButton")}
            archive="/archiveCategory"
          />
        }
        content={
          <div className="p-24">
            <CategoryTable />
          </div>
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(Category))
);
