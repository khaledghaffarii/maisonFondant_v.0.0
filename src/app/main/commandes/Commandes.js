import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import CommandesTable from "./CommandesTable";
import { withRouter } from "react-router-dom";
import TabsCommandes from "./TabsCommandes";
const styles = theme => ({
  layoutRoot: {}
});

class Commandes extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot
        }}
        content={
          <div className="p-24">
            {/* <CommandesTable /> */}
            <TabsCommandes/>
          </div>
        }
      />
    );
  }
}
export default withStyles(styles, { withTheme: true })(withRouter(Commandes));
