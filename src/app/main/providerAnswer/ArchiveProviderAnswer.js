import { withStyles } from "@material-ui/core/styles";

import React, { Component } from "react";
import Request from "../../utils/Request";
import ArchiveTable from "../sharedComponent/ArchiveTable";
import { FusePageCarded } from "@fuse";
import { withSnackbar } from "notistack";
import { withTranslation, Translation } from "react-i18next";
import FormHeader from "../sharedComponent/FormHeader";
import env from "../../static";

import { withRouter } from "react-router-dom";
const styles = (theme) => ({
  layoutRoot: {},
});
class ArchiveProviderAnswer extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title:   <Translation>
          {(t) => <div>{t("supplier.name")}</div>}
        </Translation>, field: "name" },
        { title: <Translation>
          {(t) => <div>{t("supplier.description")}</div>}
        </Translation>,  field: "description" },
      ],
      data: [],
      selctedRowlength: 0,
    };
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
  }

  setStateOnDelete(data) {
    this.setState({
      ...this.state,
      data,
    });
  }

  async componentDidMount() {
    try {
      const url = env.teams.all;
      const response = await this.request.getAll(url);
      this.setState({
        data: response.data,
      });
    } catch (e) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar("Erreur", {
          variant: "error",
        });
      }
    }
  }
  render() {
    const { classes } = this.props;

    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={<FormHeader returnRoute="/providerAnswer" title="Archive" />}
        content={
          <ArchiveTable
            title={
              <Translation>
                {(t) => <div>{t("supplier.responseSupplier")}</div>}
              </Translation>
            }
            columns={this.state.columns}
            data={this.state.data}
            routeEdit="/editProviderAnswer"
            setStateOnDelete={this.setStateOnDelete}
          />
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(ArchiveProviderAnswer))
  )
);
