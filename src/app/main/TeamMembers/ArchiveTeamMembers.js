import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";

import React, { Component } from "react";
import Request from "../../utils/Request";
import ArchiveTable from "../sharedComponent/ArchiveTable";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import env from "../../static";

import { withRouter } from "react-router-dom";
const styles = theme => ({
  layoutRoot: {}
});
class ArchiveTeamMembers extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "picture",
          field: "picture",
          render: rowData => (
            <img
              alt="img"
              src={`${env.staticFiles}${rowData.picture}`}
              style={{ width: 50, borderRadius: "50%" }}
            />
          )
        },
        { title: "fname", field: "fname" },
        { title: "lname", field: "lname" },
        { title: "email", field: "email" },
        { title: "phone", field: "phone" },
        { title: "role", field: "role" },
        { title: "username", field: "username" },
        { title: "team", field: "team" }
      ],
      data: [],
      selctedRowlength: 0
    };
    this.deleteAdministrator = this.deleteAdministrator.bind(this);
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
  }

  async componentDidMount() {
    try {
      const url = env.teamMembers.all;
      const response = await this.request.getAll(url);
      let data = [];
      response.data.forEach(element => {
        data.push({
          _id: element._id,
          fname: element.fname,
          lname: element.lname,
          email: element.email,
          phone: element.phone,
          role: element.role.name,
          username: element.username,
          team: element.team.name,
          picture: element.picture
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
  async deleteAdministrator(id) {
    try {
      const url = env.teamMembers.remove(id);
      await this.request.delete(url);
      this.props.enqueueSnackbar("Operation reussi avec succes", {
        variant: "success"
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
        header={<FormHeader returnRoute="/teamMember" title="Archive" />}
        content={
          <ArchiveTable
            title="Team members"
            columns={this.state.columns}
            data={this.state.data}
            routeEdit="/editTeamMember"
            setStateOnDelete={this.setStateOnDelete}
          />
        }
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(
  withSnackbar(withRouter(ArchiveTeamMembers))
);
