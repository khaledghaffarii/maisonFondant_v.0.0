import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import BlogTable from "./BlogTable";
import TableHeader from "../sharedComponent/TableHeader";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class Blog extends Component {
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
              <Translation>{(t) => <div>{t("blog.title")}</div>}</Translation>
            }
            addRoute="/newBlog"
            buttonText={
              <Translation>{(t) => <div>{t("blog.add")}</div>}</Translation>
            }
            archive="/archiveBlog"
          />
        }
        content={
          <div className="p-24">
            <BlogTable />
          </div>
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(Blog))
);
