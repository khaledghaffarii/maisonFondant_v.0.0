import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import B2BTable from "./B2BTable";
import { withRouter } from "react-router-dom";
const styles = theme => ({
  layoutRoot: {}
});

class B2B extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot
        }}
        content={
          <div className="p-24">
            <B2BTable />
          </div>
        }
      />
    );
  }
}
export default withStyles(styles, { withTheme: true })(withRouter(B2B));
