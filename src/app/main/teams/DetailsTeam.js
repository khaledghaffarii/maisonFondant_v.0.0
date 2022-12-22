import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { CardContent } from "@material-ui/core";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import { TextFieldFormsy } from "@fuse";
import Formsy from "formsy-react";
import { withSnackbar } from "notistack";

import { withRouter } from "react-router-dom";
import env from "../../static";

import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import { FuseAnimate } from "@fuse";
const styles = theme => ({
  layoutRoot: {}
});

class DetailsTeam extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: ""
    };
  }

  async componentDidMount() {
    try {
      const url = env.teams.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );
      this.setState({
        name: response.data.name,
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
        header={<FormHeader returnRoute="/team" title="details equipe " />}
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
                    label="Name"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.description}
                    type="text"
                    name="description"
                    label="Description"
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
  withSnackbar(withRouter(DetailsTeam))
);
