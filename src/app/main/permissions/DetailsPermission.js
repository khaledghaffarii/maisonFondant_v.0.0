import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { CardContent } from "@material-ui/core";
import { withSnackbar } from "notistack";

import Request from "../../utils/Request";
import env from "../../static";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import { TextFieldFormsy } from "@fuse";
import Formsy from "formsy-react";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import { FuseAnimate } from "@fuse";
import { withRouter } from "react-router-dom";
const styles = theme => ({
  layoutRoot: {}
});

class DetailsPermission extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      method: "ANY",
      route: "",
      description: ""
    };
  }
  async componentDidMount() {
    try {
      const url = env.permissions.info;

      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );
      this.setState({
        name: response.data.name,
        method: response.data.method,
        route: response.data.route,
        description: response.data.description
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
        header={
          <FormHeader returnRoute="/permission" title="details permission" />
        }
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
            <FuseAnimate animation="transition.expandIn">
              <CardContent className="flex flex-col items-center justify-center p-32">
                <Formsy className="flex flex-col justify-center w-full">
                  <TextFieldFormsy
                    className="mt-8 mb-16"
                    value={this.state.name}
                    type="text"
                    name="name"
                    label="Name"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.method}
                    type="text"
                    name="method"
                    label="method"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true
                    }}
                  />

                  <TextFieldFormsy
                    className="mt-8 mb-16"
                    type="text"
                    name="route"
                    label="Route"
                    value={this.state.route}
                    margin="normal"
                    InputProps={{
                      readOnly: true
                    }}
                    variant="outlined"
                  />
                  <TextFieldFormsy
                    className="mt-8 mb-16"
                    type="text"
                    name="description"
                    label="Description"
                    multiline
                    rows="4"
                    value={this.state.description}
                    InputProps={{
                      readOnly: true
                    }}
                    margin="normal"
                    variant="outlined"
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
  withSnackbar(withRouter(DetailsPermission))
);
