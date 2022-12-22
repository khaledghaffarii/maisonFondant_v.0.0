import React, { Component } from "react";
import { Button, CardContent } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { FuseChipSelect } from "@fuse";
import Formsy from "formsy-react";
import CroppedImage from "../sharedComponent/CroppedImage";
import { TextFieldFormsy } from "@fuse";

import { withRouter } from "react-router-dom";
import env from "../../static";
import axios from "axios";
import { withTranslation, Translation } from "react-i18next";
class StockForm extends Component {
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
    const suggestionsRepairer = props.state.repairerOptions.map((item) => ({
      key: item._id,
      value: item._id,
      label: `${item.fname} ${item.lname}`,
    }));
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
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.postedBy}
                onChange={props.handleChipChangeRepairer}
                placeholder="Select reparateur"
                textFieldProps={{
                  label: (
                    <Translation>
                      {(t) => <div>{t("stock.repairer")}</div>}
                    </Translation>
                  ),
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestionsRepairer}
              />
              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                value={props.state.name}
                label={
                  <Translation>
                    {(t) => <div>{t("stock.pieceName")}</div>}
                  </Translation>
                }
                name="name"
                type="text"
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                label={
                  <Translation>
                    {(t) => <div>{t("stock.description")}</div>}
                  </Translation>
                }
                name="description"
                type="text"
                multiline
                rowsMax="5"
                rows={5}
                value={props.state.description}
                onChange={props.handleChange}
                margin="normal"
                helperText="décrivez votre pièce en occasion"
                variant="outlined"
                required
              />
              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.price}
                label={
                  <Translation>
                    {(t) => <div>{t("stock.price")}</div>}
                  </Translation>
                }
                type="number"
                name="price"
                onChange={props.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                variant="outlined"
                oninput="this.setCustomValidity('')"
                oninvalid="this.setCustomValidity('Enter User Name Here')"
                required
              />
              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.priceForClient}
                label={
                  <Translation>
                    {(t) => <div>{t("stock.customerPrice")}</div>}
                  </Translation>
                }
                type="number"
                name="priceForClient"
                onChange={props.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                variant="outlined"
                oninput="this.setCustomValidity('')"
                oninvalid="this.setCustomValidity('Enter User Name Here')"
                required
              />
              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.quantity}
                label={
                  <Translation>
                    {(t) => <div>{t("stock.addQuantity")}</div>}
                  </Translation>
                }
                type="number"
                name="quantity"
                onChange={props.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                variant="outlined"
                oninput="this.setCustomValidity('')"
                oninvalid="this.setCustomValidity('Enter User Name Here')"
                required
              />
              <Button
                variant="contained"
                color="primary"
                className="w-224 mx-auto mt-16"
                aria-label="Register"
                disabled={!this.state.isFormValid}
                type="submit"
              >
                {this.props.t("stock.addButton")}
              </Button>
            </Formsy>
          </CardContent>
        </FuseAnimate>
      </div>
    );
  }
}
export default withTranslation()(withRouter(StockForm));
