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
class ArchiveBoutique extends Component {
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
              alt="admin"
              src={`${env.staticFiles}${rowData.picture}`}
              style={{ width: 50, borderRadius: "50%" }}
            />
          )
        },
        { title: "name", field: "name" },
        { title: "specialities", field: "specialities" },
        { title: "adress", field: "adress" },
        { title: "location", field: "location" },
        { title: "phone", field: "phone" },
        { title: "worktime", field: "worktime" },
        { title: "facebookPage", field: "facebookPage" },
        { title: "website", field: "website" }
      ],
      data: [],
      selctedRowlength: 0
    };
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
  }

  async componentDidMount() {
    try {
      const url = env.boutiques.all;
      const response = await this.request.getAll(url);
      let data = [];
      response.data.forEach(element => {
        let specialities = [];
        element.specialities.forEach(elem => {
          specialities.push(elem.name);
          specialities.push(" , ");
        });
        data.push({
          _id: element._id,
          picture: element.picture,
          name: element.name,
          specialities: specialities,
          adress: element.adress,
          location: element.location.coordinates,
          phone: element.phone,
          worktime: element.workTime,
          facebookPage: element.facebookPage,
          website: element.website
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
        header={<FormHeader returnRoute="/boutique" title="Archive" />}
        content={
          <ArchiveTable
            title="Boutique"
            columns={this.state.columns}
            data={this.state.data}
            routeEdit="/editBoutique"
            setStateOnDelete={this.setStateOnDelete}
          />
        }
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(
  withSnackbar(withRouter(ArchiveBoutique))
);
