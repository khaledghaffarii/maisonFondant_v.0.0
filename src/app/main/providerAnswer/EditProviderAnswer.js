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
import ProviderAnswerForm from "./ProviderAnswerForm";
const styles = (theme) => ({
  layoutRoot: {},
});

class EditProviderAnswer extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      reference: "",
      detailsPanne: "",
      prixFournisseur: "",
      disponibilite: "",
      remarques: "",
      nomPiece: "",
      reparationId: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  fileChangedHandler = (event) => {
    this.setState({ file: event.target.files[0] });
  };
  handleChangeDisponibilite(event) {
    this.setState({
      disponibilite: event.target.value,
    });
  }
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
      const url = env.providersAnswer.update(this.props.match.params.id);
      const data = {
        detailsPanne: this.state.detailsPanne,
        prixFournisseur: this.state.prixFournisseur,
        disponibilite: this.state.disponibilite,
        remarques: this.state.remarques,
        nomPiece: this.state.nomPiece,
        reparation: this.state.reparationId,
      };
      await this.request.update(url, data, false);
      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );

      this.props.history.push("/providerAnswer");
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
      console.log(e);
    }
  }

  async componentDidMount() {
    try {
      const urlReparation = env.providersAnswer.info;
      const providerAnswer = await this.request.getById(
        urlReparation,
        this.props.match.params.id
      );
      this.setState({
        reference: providerAnswer.data.reparation.code,
        detailsPanne: providerAnswer.data.detailsPanne,
        prixFournisseur: providerAnswer.data.prixFournisseur,
        disponibilite: providerAnswer.data.disponibilite,
        remarques: providerAnswer.data.remarques,
        nomPiece: providerAnswer.data.nomPiece,
        reparationId: providerAnswer.data.reparation._id,
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
            returnRoute="/providerAnswer"
            title={
              <Translation>
                {(t) => <div>{t("supplier.updateResponseSupplier")}</div>}
              </Translation>
            }
          />
        }
        content={
          <ProviderAnswerForm
            handleChange={this.handleChange}
            handleSubmit={this.update}
            state={this.state}
            ButtonText={
              <Translation>
                {(t) => <div>{t("speciality.update.button")}</div>}
              </Translation>
            }
            fileChangedHandler={this.fileChangedHandler}
            handleChangeDisponibilite={this.handleChangeDisponibilite.bind(
              this
            )}
          />
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(EditProviderAnswer))
  )
);
