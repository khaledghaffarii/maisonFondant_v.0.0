import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Request from "../../../utils/Request";
import AuthHelperMethods from "../../../services/AuthHelperMethods";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";
import { FusePageCarded } from "@fuse";
import FormHeader from "../../sharedComponent/FormHeader";
import EtatForm from "./ColorForm";
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
      nameColorFrancais: "",
      nameColorArabe: "",
      nameColorEnglish: "",
      codeColor: "",
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
    const { nameColorFrancais, nameColorArabe, nameColorEnglish, codeColor } =
      this.state;
    try {
      const url = env.productColor.update(this.props.match.params.id);
      const response = await this.request.new(
        url,
        { nameColorFrancais, nameColorArabe, nameColorEnglish, codeColor },
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
      this.props.history.push("/colorProduit");
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
      const url = env.productColor.info;
      const colors = await this.request.getById(
        url,
        this.props.match.params.id
      );

      this.setState({
        id: colors.data._id,
        nameColorFrancais: colors.data.nameColorFrancais,
        nameColorArabe: colors.data.nameColorArabe,
        nameColorEnglish: colors.data.nameColorEnglish,
        codeColor: colors.data.codeColor,
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
            returnRoute="/colorProduit"
            title={
              <Translation>{(t) => <div>{t("color.update")}</div>}</Translation>
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
              <Tabs.Tab id="tab1">
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
                          {(t) => <div>{t("color.update")}</div>}
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
