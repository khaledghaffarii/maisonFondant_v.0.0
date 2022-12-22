import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { CardContent } from "@material-ui/core";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import env from "../../static";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";

import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import { FuseAnimate } from "@fuse";
import Formsy from "formsy-react";
import { TextFieldFormsy } from "@fuse";
const styles = theme => ({
  layoutRoot: {}
});

class DetailsRole extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      options: [],
      permissions: []
    };
  }

  async componentDidMount() {
    try {
      const url = env.roles.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );
      const urlPermission = env.permissions.all;
      const permissionsLoaded = await this.request.getAll(urlPermission);

      let permissions = [];
      response.data.permissions.forEach(elem => {
        permissions.push(elem.name);
      });
      this.setState({
        name: response.data.name,
        permissions: permissions,
        options: permissionsLoaded.data
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
        header={<FormHeader returnRoute="/role" title="details role" />}
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
            <FuseAnimate animation="transition.expandIn">
              <CardContent className="flex flex-col items-center justify-center p-32">
                <Formsy className="flex flex-col justify-center w-full">
                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.name}
                    type="text"
                    name="name"
                    label="name"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <TextFieldFormsy
                    className="mt-8 mb-16"
                    value={this.state.permissions}
                    type="text"
                    name="permissions"
                    label="permissions"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Formsy>
              </CardContent>
            </FuseAnimate>
          </div>
        }
      />
    );
  }
}
export default withStyles(styles, { withTheme: true })(
  withSnackbar(withRouter(DetailsRole))
);
