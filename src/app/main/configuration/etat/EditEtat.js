import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Request from "../../../utils/Request";
import AuthHelperMethods from "../../../services/AuthHelperMethods";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";
import { FusePageCarded } from "@fuse";
import FormHeader from "../../sharedComponent/FormHeader";
import EtatForm from "./EtatForm";
import env from "../../../static";
import { CircularProgress } from "@material-ui/core";
import { Tabs } from "@yazanaabed/react-tabs";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});
class EditDevis extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      etatFrancais: "",
      etatArabe: "",
      etatEnglish: "",
      descriptionFrancais: "",
      descriptionArabe: "",
      descriptionEnglish: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  async update() {
    const {
      etatFrancais,
      etatArabe,
      etatEnglish,
      descriptionFrancais,
      descriptionArabe,
      descriptionEnglish,
    } = this.state;
    try {
      const url = env.etat.update(this.props.match.params.id);
      const response = await this.request.new(
        url,
        {
          etatFrancais,
          etatArabe,
          etatEnglish,
          descriptionFrancais,
          descriptionArabe,
          descriptionEnglish,
        },
        false
      );
      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
      this.props.history.push("/etat");
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
      const url = env.etat.info;
      const etats = await this.request.getById(url, this.props.match.params.id);

      this.setState({
        etatFrancais: etats.data.etatFrancais,
        id: etats.data._id,
        etatArabe: etats.data.etatArabe,
        etatEnglish: etats.data.etatEnglish,
        descriptionFrancais: etats.data.descriptionFrancais,
        descriptionArabe: etats.data.descriptionArabe,
        descriptionEnglish: etats.data.descriptionEnglish,
        loading: false,
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
            returnRoute="/etat"
            title={
              <Translation>{(t) => <div>{t("state.update")}</div>}</Translation>
            }
          />
        }
        content={
          this.state.loading ? (
            <div
              style={{
                flex: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress color="secondary" />
              <h1>
                {" "}
                <Translation>
                  {(t) => <div>{t("stock.edit.loading")}</div>}
                </Translation>
              </h1>
            </div>
          ) : (
            <Tabs
              activeTab={{
                id: "tab1",
              }}
            >
              <Tabs.Tab
                id="tab1"
                title={
                  <Translation>
                    {(t) => <div>{t("state.update")}</div>}
                  </Translation>
                }
              >
                <div
                  style={{ padding: 20 }}
                  className="flex flex-col justify-center w-full"
                >
                  <div class="row">
                    <EtatForm
                      showCover={this.state.showCover}
                      handleSubmit={this.update}
                      state={this.state}
                      ButtonText={
                        <Translation>
                          {(t) => <div>{t("state.update")}</div>}
                        </Translation>
                      }
                      handleChange={this.handleChange}
                      id={this.props.match.params.id}
                    />
                  </div>
                </div>
              </Tabs.Tab>
            </Tabs>
          )
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(withSnackbar(withRouter(EditDevis)))
);
