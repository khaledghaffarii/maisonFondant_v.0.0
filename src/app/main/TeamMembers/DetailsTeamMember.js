import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { CardContent } from "@material-ui/core";
import { withSnackbar } from "notistack";

import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import { TextFieldFormsy } from "@fuse";
import Formsy from "formsy-react";
import env from "../../static";

import { withRouter } from "react-router-dom";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import { FuseAnimate } from "@fuse";

const styles = theme => ({
  layoutRoot: {}
});

class DetailsTeamMember extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      phone: "",
      role: "",
      file: "",
      username: "",
      password: "",
      team: "",
      picture: ""
    };
  }

  async componentDidMount() {
    try {
      const url = env.teamMembers.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );
      this.setState({
        fname: response.data.fname,
        lname: response.data.lname,
        email: response.data.email,
        phone: response.data.phone,
        role: response.data.role.name,
        username: response.data.username,
        team: response.data.team.name,
        picture: response.data.picture
      });

      const urlRole = env.roles.all;
      const roles = await this.request.getAll(urlRole);
      this.setState({
        optionRoles: roles.data
      });

      const urlteam = env.teams.all;
      const teams = await this.request.getAll(urlteam);
      this.setState({
        optionTeams: teams.data
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
          <FormHeader
            returnRoute="/teamMember"
            title="details membre d'équipe "
          />
        }
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
            <FuseAnimate animation="transition.expandIn">
              <CardContent className="flex flex-col items-center justify-center p-32">
                <Formsy
                  name="registerForm"
                  className="flex flex-col justify-center w-full"
                >
                  <img
                    alt="Crop"
                    style={{ maxWidth: "100%" }}
                    src={`${env.staticFiles}${this.state.picture}`}
                  />

                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.fname}
                    type="text"
                    name="fname"
                    label="Fname"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.lname}
                    type="text"
                    name="lname"
                    label="Lname"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true
                    }}
                  />

                  <TextFieldFormsy
                    className="mt-8 mb-16"
                    value={this.state.email}
                    type="email"
                    name="email"
                    label="Email"
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true
                    }}
                  />

                  <TextFieldFormsy
                    className="mt-8 mb-16"
                    value={this.state.phone}
                    type="text"
                    label="Phone"
                    name="phone"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.role}
                    type="text"
                    name="role"
                    label="role"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true
                    }}
                  />

                  <TextFieldFormsy
                    className="mt-8 mb-16"
                    value={this.state.username}
                    type="text"
                    name="username"
                    label="Username"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true
                    }}
                  />

                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.team}
                    type="text"
                    name="team"
                    label="team"
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
  withSnackbar(withRouter(DetailsTeamMember))
);
