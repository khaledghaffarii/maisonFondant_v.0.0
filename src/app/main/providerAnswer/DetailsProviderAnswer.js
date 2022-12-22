import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { CardContent } from "@material-ui/core";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import { TextFieldFormsy } from "@fuse";
import Formsy from "formsy-react";
import { withSnackbar } from "notistack";
import { withTranslation, Translation } from "react-i18next";
import { withRouter } from "react-router-dom";
import env from "../../static";

import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import { FuseAnimate } from "@fuse";
const styles = (theme) => ({
  layoutRoot: {},
});

class DetailsProviderAnswer extends Component {
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
                {(t) => <div>{t("supplier.sipplierDetails")}</div>}
              </Translation>
            }
          />
        }
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
            <FuseAnimate animation="transition.expandIn">
              <CardContent className="flex flex-col items-center justify-center p-32">
                <Formsy className="flex flex-col justify-center w-full">
                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.reference}
                    type="text"
                    name="reference"
                    label={
                      <Translation>
                        {(t) => <div>{t("plannings.reference")}</div>}
                      </Translation>
                    }
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.detailsPanne}
                    type="text"
                    name="detailsPanne"
                    label={
                      <Translation>
                        {(t) => <div>{t("reparation.panneDetails")}</div>}
                      </Translation>
                    }
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.nomPiece}
                    type="text"
                    name="nomPiece"
                    label={
                      <Translation>
                        {(t) => <div>{t("supplier.pieceName")}</div>}
                      </Translation>
                    }
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.prixFournisseur}
                    type="text"
                    name="prixFournisseur"
                    label={
                      <Translation>
                        {(t) => <div>{t("supplier.supplierPrice")}</div>}
                      </Translation>
                    }
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.disponibilite}
                    type="text"
                    name="disponibilite"
                    label={
                      <Translation>
                        {(t) => <div>{t("supplier.disponibility")}</div>}
                      </Translation>
                    }
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.remarques}
                    type="text"
                    name="remarques"
                    label={
                      <Translation>
                        {(t) => <div>{t("reparation.notice")}</div>}
                      </Translation>
                    }
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
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
export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(DetailsProviderAnswer))
  )
);
