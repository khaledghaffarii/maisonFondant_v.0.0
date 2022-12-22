import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import ArchiveTable from "../sharedComponent/ArchiveTable";
import { FusePageCarded } from "@fuse";
import { withSnackbar } from "notistack";

import FormHeader from "../sharedComponent/FormHeader";
import env from "../../static";
import Request from "../../utils/Request";

import { withRouter } from "react-router-dom";
const styles = theme => ({
  layoutRoot: {}
});
class ArchivePermission extends Component {
  request = new Request();
  // permission = new Permission();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "Name", field: "name" },
        { title: "Method", field: "method" },
        { title: "Route", field: "route" },
        { title: "Description", field: "description" }
      ],
      data: [],
      selctedRowlength: 0
    };
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
  }

  setStateOnDelete(data) {
    this.setState({
      ...this.state,
      data
    });
  }
  async componentDidMount() {
    try {
      const url = env.permissions.all;
      const response = await this.request.getAll(url);
      this.setState({
        data: response.data
      });
    } catch (e) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error"
        });
      } else {
        this.props.enqueueSnackbar("Erreur", {
          variant: "error"
        });
      }
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot
        }}
        header={<FormHeader returnRoute="/permission" title="Archive" />}
        content={
          <ArchiveTable
            title="Permissions"
            columns={this.state.columns}
            data={this.state.data}
            routeEdit="/editpermission"
            setStateOnDelete={this.setStateOnDelete}
          />
        }
      />
    );
  }
}
export default withStyles(styles, { withTheme: true })(
  withSnackbar(withRouter(ArchivePermission))
);
