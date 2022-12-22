import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import { FusePageCarded } from "@fuse";
import { withSnackbar } from "notistack";
import { withTranslation, Translation } from "react-i18next";
import FormHeader from "../sharedComponent/FormHeader";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import env from "../../static";
import TeamMemberForm from "./TeamMemberForm";
import { withRouter } from "react-router-dom";
const styles = (theme) => ({
  layoutRoot: {},
});

class NewTeamMember extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      listCountry: [],
      country: "",
      email: "",
      phone: "",
      role: "",
      optionRoles: [],
      roleValidation: false,
      file: "",
      username: "",
      password: "",
      team: "",
      optionTeams: [],
      teamValidation: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.handleChipChangeRole = this.handleChipChangeRole.bind(this);
    this.handleChipChangeCountry = this.handleChipChangeCountry.bind(this);
    this.handleChipChangeTeam = this.handleChipChangeTeam.bind(this);
    this.handleGeneratePassword = this.handleGeneratePassword.bind(this);
  }

  fileChangedHandler = (image) => {
    this.setState({ file: image });
  };

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  async handleChipChangeCountry(value) {
    this.setState((state) => {
      return {
        country: value,
      };
    });
    var urlteam = env.teams.all;
    urlteam += "?country=" + value.key;
    const teams = await this.request.getAll(urlteam);
    console.log("teams", teams);
    this.setState({
      optionTeams: teams.data,
    });
  }
  handleSubmit = async (e) => {
    try {
      let form_data = new FormData();
      form_data.append("fname", this.state.fname);
      form_data.append("lname", this.state.lname);
      form_data.append("country", this.state.country.key);
      form_data.append("email", this.state.email);
      form_data.append("phone", this.state.phone);
      form_data.append("role", this.state.role.key);
      if (this.state.file !== "") {
        form_data.append("file", this.state.file, this.state.file.name);
      }
      form_data.append("username", this.state.username);
      form_data.append("password", this.state.password);
      form_data.append("team", this.state.team.key);

      const url = env.teamMembers.new;
      await this.request.new(url, form_data, true);

      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );

      this.props.history.push("/teamMember");
    } catch (e) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar(
          <Translation>
            {(t) => <div>{t("stock.edit.error")}</div>}
          </Translation>,
          {
            variant: "error",
          }
        );
      }
    }
  };

  handleChipChangeRole(value) {
    this.setState({
      role: value,
      roleValidation: value !== "" ? true : false,
    });
  }

  handleGeneratePassword = async (e) => {
    try {
      var chars =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      var string_length = 8;
      var randomstring = "";
      for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
      }
      this.setState({
        password: randomstring,
      });
    } catch (e) {
      this.props.enqueueSnackbar(
        <Translation>{(t) => <div>{t("stock.edit.error")}</div>}</Translation>,
        {
          variant: "error",
        }
      );
    }
  };

  handleChipChangeTeam(value) {
    this.setState({
      team: value,
      teamValidation: value !== "" ? true : false,
    });
  }
  async componentDidMount() {
    try {
      const url = env.roles.all;
      const roles = await this.request.getAll(url);

      const urlCountry = env.country.all;
      const Country = await this.request.getAll(urlCountry);

      this.setState({
        optionRoles: roles.data,
        listCountry: Country.data,
      });
    } catch (e) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar(
          <Translation>
            {(t) => <div>{t("stock.edit.error")}</div>}
          </Translation>,
          {
            variant: "error",
          }
        );
      }
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <FormHeader
            returnRoute="/teamMember"
            title={
              <Translation>
                {(t) => <div>{t("teamMember.add")}</div>}
              </Translation>
            }
          />
        }
        content={
          <TeamMemberForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            state={this.state}
            ButtonText={
              <Translation>
                {(t) => <div>{t("teamMember.add")}</div>}
              </Translation>
            }
            fileChangedHandler={this.fileChangedHandler}
            handleChipChangeRole={this.handleChipChangeRole}
            handleChipChangeTeam={this.handleChipChangeTeam}
            handleChipChangeCountry={this.handleChipChangeCountry}
            handleGeneratePassword={this.handleGeneratePassword}
            showPassword={true}
          />
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(NewTeamMember))
  )
);
