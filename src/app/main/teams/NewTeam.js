import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import { withTranslation, Translation } from "react-i18next";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import TeamForm from "./TeamForm";
import { withRouter } from "react-router-dom";
import env from "../../static";

const styles = (theme) => ({
  layoutRoot: {},
});

class NewTeam extends Component {
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.handleChipChangeCountry = this.handleChipChangeCountry.bind(this);
  }

  fileChangedHandler = (event) => {
    this.setState({ file: event.target.files[0] });
  };
  handleChipChangeCountry(value) {
    this.setState((state) => {
      return {
        country: value,
      };
    });
  }
  async componentDidMount() {
    try {
      const urlCountry = env.country.all;
      const Country = await this.request.getAll(urlCountry);
      this.setState({
        listCountry: Country.data,
      });
    } catch (e) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar("error", {
          variant: "error",
        });
      }
    }
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit = async (e) => {
    try {
      const team = {
        name: this.state.name,
        description: this.state.description,
        country: this.state.country.key,
      };
      const url = env.teams.new;
      await this.request.new(url, team, false);
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
            {(t) => <div>{t("stock.edit.error")}</div>}
          </Translation>,
          {
            variant: "error",
          }
        );
      }
    }
  };

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
              <Translation>{(t) => <div>{t("teams.add")}</div>}</Translation>
            }
          />
        }
        content={
          <TeamForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            state={this.state}
            ButtonText={
              <Translation>{(t) => <div>{t("teams.add")}</div>}</Translation>
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
  withStyles(styles, { withTheme: true })(withSnackbar(withRouter(NewTeam)))
);
