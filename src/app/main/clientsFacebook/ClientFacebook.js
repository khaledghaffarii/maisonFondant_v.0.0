import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import ClientFacebookTable from "./ClientFacebookTable";
import TableHeader from "../sharedComponent/TableHeader";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class ClientFacebook extends Component {
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
            addRoute="/newClientFb"
            buttonText={this.props.t("customer.customerAddButtons")}
            archive="/archiveClientFb"
          />
        }
        content={
          <div className="p-24">
            <ClientFacebookTable />
          </div>
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(ClientFacebook))
);
