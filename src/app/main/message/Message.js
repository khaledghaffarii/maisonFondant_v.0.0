import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import MessageTable from "./MessageTable";
import { withRouter } from "react-router-dom";
const styles = theme => ({
  layoutRoot: {}
});

class Message extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot
        }}
        content={
          <div className="p-24">
            <MessageTable />
          </div>
        }
      />
    );
  }
}
export default withStyles(styles, { withTheme: true })(withRouter(Message));
