import { withStyles } from "@material-ui/core/styles";

import React, { Component } from "react";
import Request from "../../utils/Request";
import ArchiveTable from "../sharedComponent/ArchiveTable";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import env from "../../static";

import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";

const styles = theme => ({
  layoutRoot: {}
});
class ArchiveRole extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "name", field: "name" },
        { title: "permissions", field: "permissions" }
      ],
      data: [],
      selctedRowlength: 0
    };
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
  }

  async componentDidMount() {
    try {
      const url = env.roles.all;
      const response = await this.request.getAll(url);
      let data = [];
      response.data.forEach(element => {
        let permissions = [];
        element.permissions.forEach(elem => {
          permissions.push(elem.name);
          permissions.push(" , ");
        });
        data.push({
          _id: element._id,
          name: element.name,
          permissions: permissions
        });
      });
      this.setState({
        data: data
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
  setStateOnDelete(data) {
    this.setState({
      ...this.state,
      data
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot
        }}
        header={<FormHeader returnRoute="/role" title="Archive" />}
        content={
          <ArchiveTable
            title="Roles"
            columns={this.state.columns}
            data={this.state.data}
            routeEdit="/editrole"
            setStateOnDelete={this.setStateOnDelete}
          />
        }
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(
  withSnackbar(withRouter(ArchiveRole))
);
