import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import BoutiqueTable from "./BoutiqueTable";
import TableHeader from "../sharedComponent/TableHeader";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
const styles = theme => ({
  layoutRoot: {}
});

class Boutique extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot
        }}
        header={
          <TableHeader
            textHeader={this.props.t("boutique.titleBoutique")}
            addRoute="/newBoutique"
            buttonText={this.props.t("boutique.addButton")}
            archive="/archiveBoutique"
          />
        }
        content={
          <div className="p-24">
            <BoutiqueTable />
          </div>
        }
      />
    );
  }
}

export default withTranslation()(withStyles(styles, { withTheme: true })(withRouter(Boutique)));
