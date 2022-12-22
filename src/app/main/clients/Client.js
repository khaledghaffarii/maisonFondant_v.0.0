import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import ClientTable from "./ClientTable";
import TableHeader from "../sharedComponent/TableHeader";
import { withSnackbar } from "notistack";
import { withTranslation, Translation } from "react-i18next";
import { withRouter } from "react-router-dom";
const styles = (theme) => ({
  layoutRoot: {},
});

class Client extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <TableHeader
            textHeader={this.props.t("customer.customerTitle")}
            addRoute="/newclient"
            buttonText={this.props.t("customer.customerAddButtons")}
            archive="/archiveClient"
            showBlock={true}
            block="/blockedClient"
          />
        }
        content={
          <div className="p-24">
            <ClientTable />
          </div>
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withSnackbar(withRouter(Client)))
);
