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
class ArchiveRepairer extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "fname", field: "fname" },
        { title: "lname", field: "lname" },
        { title: "email", field: "email" },
        { title: "phone", field: "phone" },
        { title: "boutique", field: "boutique" }
      ],
      data: [],
      selctedRowlength: 0
    };
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
  }

  async componentDidMount() {
    try {
      const url = env.repairers.all;
      const response = await this.request.getAll(url);
      let data = [];
      response.data.forEach(element => {
        data.push({
          _id: element._id,
          fname: element.fname,
          lname: element.lname,
          email: element.email,
          phone: element.phone,
          boutique: element.boutique.name
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
        header={<FormHeader returnRoute="/repairer" title="Archive" />}
        content={
          <ArchiveTable
            title="Repairer"
            columns={this.state.columns}
            data={this.state.data}
            routeEdit="/editRepairer"
            setStateOnDelete={this.setStateOnDelete}
          />
        }
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(
  withSnackbar(withRouter(ArchiveRepairer))
);
