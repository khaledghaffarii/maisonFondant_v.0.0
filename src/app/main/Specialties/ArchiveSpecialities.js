import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import Request from "../../utils/Request";
import ArchiveTable from "../sharedComponent/ArchiveTable";
import { FusePageCarded } from "@fuse";
import { withSnackbar } from "notistack";

import FormHeader from "../sharedComponent/FormHeader";
import env from "../../static";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});
class ArchiveSpecialities extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: (
            <Translation>
              {(t) => <div>{t("speciality.name")}</div>}
            </Translation>
          ),
          field: "name",
        },
      ],
      data: [],
      selctedRowlength: 0,
    };
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
  }

  async componentDidMount() {
    try {
      const url = env.specialities.all;
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
        this.props.enqueueSnackbar(
          <Translation>
            {(t) => <div>{t("stock.edit.error")}</div>}
          </Translation>,
          {
            variant: "error",
          }
        );
      }
    }
  }
  setStateOnDelete(data) {
    this.setState({
      ...this.state,
      data,
    });
  }
  render() {
    const { classes } = this.props;

    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={<FormHeader returnRoute="/specialitie" title="Archive" />}
        content={
          <ArchiveTable
            title={
              <Translation>
                {(t) => <div>{t("speciality.speciality")}</div>}
              </Translation>
            }
            columns={this.state.columns}
            data={this.state.data}
            routeEdit="/editSpecialitie"
            setStateOnDelete={this.setStateOnDelete}
          />
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(ArchiveSpecialities))
  )
);
