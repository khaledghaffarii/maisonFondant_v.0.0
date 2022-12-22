import { withStyles } from "@material-ui/core/styles";

import React, { Component } from "react";
import Request from "../../utils/Request";
import ArchiveTable from "../sharedComponent/ArchiveTable";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import env from "../../static";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
const styles = theme => ({
  layoutRoot: {}
});
class ArchiveTeam extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "name", field: "name" },
        { title: "description", field: "description" }
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
      const url = env.teams.all;
      const response = await this.request.getAll(url);
      this.setState({
        data: response.data
      });
    } catch (err) {
      alert(err.response.data.message);
    }
  }
  render() {
    const { classes } = this.props;

    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot
        }}
        header={<FormHeader returnRoute="/team" title="Archive" />}
        content={
          <ArchiveTable
            title="Teams"
            columns={this.state.columns}
            data={this.state.data}
            routeEdit="/editTeam"
            setStateOnDelete={this.setStateOnDelete}
          />
        }
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(
  withSnackbar(withRouter(ArchiveTeam))
);
