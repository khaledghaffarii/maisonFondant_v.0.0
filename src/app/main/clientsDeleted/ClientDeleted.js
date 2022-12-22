import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import ClientDeletedTable from "./ClientDeletedTable";
import { withSnackbar } from "notistack";
import { withTranslation, Translation } from "react-i18next";
import { withRouter } from "react-router-dom";
const styles = (theme) => ({
  layoutRoot: {},
});

class ClientDeleted extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
      
        content={
          <div className="p-24">
            <ClientDeletedTable />
          </div>
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withSnackbar(withRouter(ClientDeleted)))
);
