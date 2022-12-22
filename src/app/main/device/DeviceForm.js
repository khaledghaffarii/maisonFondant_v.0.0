import React, { Component } from "react";
import { Button, CardContent } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { FuseChipSelect } from "@fuse";
import Formsy from "formsy-react";
import { TextFieldFormsy } from "@fuse";

import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
import CroppedImage from "app/main/sharedComponent/CroppedImage";
class DeviceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
    };
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.handleChipChangeValid = this.handleChipChangeValid.bind(this);
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
  handleChipChangeValid(value) {
    let t = false;
    value.map((data) => {
      switch ("") {
        case data.Piece:
          t = true;
          break;
        case data.Quantite:
          t = true;
          break;
        case data.Remise:
          t = true;
          break;
        case data.tva:
          t = true;
          break;
      }

      if (t == true) {
        this.setState({
          isFormValid: false,
        });
      } else {
        this.setState({
          isFormValid: true,
        });
      }
    });
  }
  handleChipChangeValid(value) {
    let t = false;
    value.map((data) => {
      switch ("") {
        case data.Piece:
          t = true;
          break;
        case data.Quantite:
          t = true;
          break;
        case data.Remise:
          t = true;
          break;
        case data.tva:
          t = true;
          break;
      }

      if (t == true) {
        this.setState({
          isFormValid: false,
        });
      } else {
        this.setState({
          isFormValid: true,
        });
      }
    });
  }

  render() {
    const props = this.props;
    const optionsCountry = props.state.listCountry;
		// console.log("optionsColor",optionsColor);
		const suggestionCountry = optionsCountry.map((item) => ({
			key: item._id,
			value: item._id,
			label: item.countryName,
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
              <CroppedImage fileChangedHandler={props.fileChangedHandler} />
              <FuseChipSelect
									className='w-full my-16'
									value={props.state.country}
									onChange={props.handleChipChangeCountry}
									placeholder='Select Country'
									textFieldProps={{
										label: 'Country',
										InputLabelProps: {
											shrink: true,
										},
										variant: 'outlined',
									}}
									options={suggestionCountry}
                  isMulti
								/>
              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.nameArabe}
                label={
                  <Translation>
                    {(t) => <div>{t("device.nameArabic")}</div>}
                  </Translation>
                }
                name="nameArabe"
                type="text"
                onChange={props.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                variant="outlined"
                required
              />
              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.nameFrench}
                label={
                  <Translation>
                    {(t) => <div>{t("device.nameFrench")}</div>}
                  </Translation>
                }
                name="nameFrench"
                type="text"
                onChange={props.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                variant="outlined"
                required
              />{" "}
              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.nameEnglish}
                label={
                  <Translation>
                    {(t) => <div>{t("device.nemEnglish")}</div>}
                  </Translation>
                }
                name="nameEnglish"
                type="text"
                onChange={props.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                variant="outlined"
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
                {this.props.ButtonText}
              </Button>
            </Formsy>
          </CardContent>
        </FuseAnimate>
      </div>
    );
  }
}
export default withTranslation()(withRouter(DeviceForm));
