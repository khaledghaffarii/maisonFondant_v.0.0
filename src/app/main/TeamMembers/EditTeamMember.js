import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import env from "../../static";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";
import { withTranslation, Translation } from "react-i18next";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import TeamMemberForm from "./TeamMemberForm";

const styles = (theme) => ({
  layoutRoot: {},
});
//
class EditTeamMember extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      country: "",
      email: "",
      phone: "",
      role: "",
      optionRoles: [],
      listCountry: [],
      roleValidation: false,

      file: "",
      username: "",
      password: "",
      team: "",
      optionTeams: [],
      teamValidation: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.handleChipChangeRole = this.handleChipChangeRole.bind(this);
    this.handleChipChangeTeam = this.handleChipChangeTeam.bind(this);
    this.handleChipChangeCountry = this.handleChipChangeCountry.bind(this);
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

  handleChipChangeRole(value) {
    this.setState({
      role: value,
      roleValidation: value !== "" ? true : false,
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
  handleChipChangeTeam(value) {
    this.setState({
      team: value,
      teamValidation: value !== "" ? true : false,
    });
  }
  async update(e, data, newData) {
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
      if (this.state.password !== "") {
        form_data.append("password", this.state.password);
      }
      form_data.append("team", this.state.team.key);

      const url = env.teamMembers.update(this.props.match.params.id);
      await this.request.update(url, form_data, true);

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
  }

  async componentDidMount() {
    try {
      const url = env.teamMembers.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );

      const urlCountry = env.country.all;
      const Country = await this.request.getAll(urlCountry);
      let countryValue;
      if (response.data.country) {
        countryValue = {
          key: response.data.country._id,
          value: response.data.country._id,
          label: response.data.country.countryName,
        };
      } else {
        countryValue = "";
      }

      this.setState({
        fname: response.data.fname,
        lname: response.data.lname,
        email: response.data.email,
        phone: response.data.phone,
        country: countryValue,
        listCountry: Country.data,
        role: {
          key: response.data.role._id,
          value: response.data.role._id,
          label: response.data.role.name,
        },
        username: response.data.username,
        team: {
          key: response.data.team._id,
          value: response.data.team._id,
          label: response.data.team.name,
        },
      });

      const urlRole = env.roles.all;
      const roles = await this.request.getAll(urlRole);
      this.setState({
        optionRoles: roles.data,
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
                {(t) => <div>{t("teamMember.update")}</div>}
              </Translation>
            }
          />
        }
        content={
          <TeamMemberForm
            handleChange={this.handleChange}
            handleSubmit={this.update}
            state={this.state}
            ButtonText={
              <Translation>
                {(t) => <div>{t("teamMember.update")}</div>}
              </Translation>
            }
            fileChangedHandler={this.fileChangedHandler}
            handleChipChangeRole={this.handleChipChangeRole}
            handleChipChangeTeam={this.handleChipChangeTeam}
            handleChipChangeCountry={this.handleChipChangeCountry}
            showPassword={false}
          />
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(EditTeamMember))
  )
);
