import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import { withSnackbar } from "notistack";
import env from "../../static";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import TeamForm from "./TeamForm";
const styles = (theme) => ({
  layoutRoot: {},
});

class EditTeam extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      country: "",
      listCountry: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.handleChipChangeCountry = this.handleChipChangeCountry.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  handleChipChangeCountry(value) {
    this.setState((state) => {
      return {
        country: value,
      };
    });
  }
  fileChangedHandler = (event) => {
    this.setState({ file: event.target.files[0] });
  };

  fileChangedHandler = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  async update() {
    try {
      const team = {
        name: this.state.name,
        description: this.state.description,
        country: this.state.country.key,
      };
      const url = env.teams.update(this.props.match.params.id);
      await this.request.update(url, team, false);

      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
      this.props.history.push("/team");
    } catch (e) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar(
          <Translation>
            {(t) => <div>{t("stock.edit.success")}</div>}
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
      const url = env.teams.info;
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
        name: response.data.name,
        description: response.data.description,
        country: countryValue,
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
            returnRoute="/team"
            title={
              <Translation>{(t) => <div>{t("teams.update")}</div>}</Translation>
            }
          />
        }
        content={
          <TeamForm
            handleChange={this.handleChange}
            handleSubmit={this.update}
            state={this.state}
            ButtonText={
              <Translation>{(t) => <div>{t("teams.update")}</div>}</Translation>
            }
            fileChangedHandler={this.fileChangedHandler}
            handleChipChangeCountry={this.handleChipChangeCountry}
          />
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(withSnackbar(withRouter(EditTeam)))
);
