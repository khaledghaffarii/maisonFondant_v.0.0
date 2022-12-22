import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, CardContent } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { TextFieldFormsy, RadioGroupFormsy } from "@fuse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Formsy from "formsy-react";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});
class ProviderAnswerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
    };
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }
  disableButton() {
    this.setState({
      isFormValid: false,
    });
  }
  enableButton() {
    this.setState({
      isFormValid: true,
    });
  }
  render() {
    const props = this.props;
    return (
      <div className="p-16 sm:p-24 max-w-2xl">
        <FuseAnimate animation="transition.expandIn">
          <CardContent className="flex flex-col items-center justify-center p-32">
            <Formsy
              onValidSubmit={props.handleSubmit}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              className="flex flex-col justify-center w-full"
            >
              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                value={props.state.reference}
                type="text"
                name="reference"
                label={
                  <Translation>
                    {(t) => <div>{t("plannings.reference")}</div>}
                  </Translation>
                }
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                value={props.state.detailsPanne}
                type="text"
                name="detailsPanne"
                label={
                  <Translation>
                    {(t) => <div>{t("reparation.panneDetails")}</div>}
                  </Translation>
                }
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                value={props.state.nomPiece}
                type="text"
                name="nomPiece"
                label={
                  <Translation>
                    {(t) => <div>{t("supplier.pieceName")}</div>}
                  </Translation>
                }
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
                required
              />
              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                value={props.state.prixFournisseur}
                type="text"
                name="prixFournisseur"
                label={
                  <Translation>
                    {(t) => <div>{t("supplier.supplierPrice")}</div>}
                  </Translation>
                }
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
                required
              />

              <RadioGroupFormsy
                className="my-16"
                name="Disponibilite"
                label={
                  <Translation>
                    {(t) => <div>{t("supplier.disponibility")}</div>}
                  </Translation>
                }
                value={props.state.disponibilite}
                onChange={props.handleChangeDisponibilite}
                required
              >
                <FormControlLabel
                  value="disponible"
                  control={<Radio color="primary" />}
                  label={
                    <Translation>
                      {(t) => (
                        <div>
                          {t(
                            "customer.faceboock.requestSupplier.disponibility.yes"
                          )}
                        </div>
                      )}
                    </Translation>
                  }
                />
                <FormControlLabel
                  value="non disponible"
                  control={<Radio color="primary" />}
                  label={
                    <Translation>
                      {(t) => (
                        <div>
                          {t(
                            "customer.faceboock.requestSupplier.disponibility.no"
                          )}
                        </div>
                      )}
                    </Translation>
                  }
                />
              </RadioGroupFormsy>
              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                value={props.state.remarques}
                type="text"
                name="remarques"
                label={
                  <Translation>
                    {(t) => <div>{t("reparation.notice")}</div>}
                  </Translation>
                }
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
              />
              <Button
                variant="contained"
                color="primary"
                className="w-224 mx-auto mt-16"
                aria-label="Register"
                type="submit"
                disabled={!this.state.isFormValid}
              >
                {props.ButtonText}
              </Button>
            </Formsy>
          </CardContent>
        </FuseAnimate>
      </div>
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(ProviderAnswerForm))
);
