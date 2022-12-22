import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import ProviderAnswerTable from "./ProviderAnswerTable";
import TableHeader from "./TableHeader";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class ProviderAnswer extends Component {
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
              <Translation>
                {(t) => <div>{t("supplier.title")}</div>}
              </Translation>
            }
            addRoute="/newProviderAnswer"
            buttonText={
              <Translation>
                {(t) => <div>{t("supplier.button")}</div>}
              </Translation>
            }
            archive="/archiveProviderAnswer"
          />
        }
        content={
          <div className="p-24">
            <ProviderAnswerTable />
          </div>
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(ProviderAnswer))
);
