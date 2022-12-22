import React, { Component } from "react";
import { Button, CardContent, MenuItem } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { FuseChipSelect } from "@fuse";
import Formsy from "formsy-react";
import CroppedImage from "../sharedComponent/CroppedImage";
import { TextFieldFormsy, SelectFormsy } from "@fuse";
import { withRouter } from "react-router-dom";

import { withTranslation, Translation } from "react-i18next";

class ProductFormReparation extends Component {
  constructor(props) {
    super(props);
    this.isFormValid = false;
    this.state = {
      isFormValid: false,
      finalFormValidation: this.isFormValid && props.state.parentValidation,
    };
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.state) {
      this.setState({
        finalFormValidation:
          this.state.isFormValid && nextProps.state.parentValidation,
      });
    }
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
    this.isFormValid = true;
  }

  render() {
    const props = this.props;
    const optionsColor = props.state.listColor;
    // console.log("optionsColor",optionsColor);
    const suggestionColor = optionsColor.map((item) => ({
      key: item._id,
      value: item._id,
      label: (
        <p style={{}}>
          <b style={{ fontSize: "1.6em" }}>{item.nameColorEnglish}</b>
          <b
            style={{
              backgroundColor: `${item.codeColor}`,
              borderRadius: "50%",
              display: "inline-block",
              height: "19px",
              width: "19px",
              margin: "0px 0px 0px 10px",
            }}
          ></b>
        </p>
      ),
    }));
    const optionsCountry = props.state.listCountry;
    const suggestionCountry = optionsCountry.map((item) => ({
      key: item._id,
      value: item._id,
      label: item.countryName,
    }));
    const optionsListTypeReparation = props.state.listTypeReparation;
    const suggestionListTypeReparation = optionsListTypeReparation.map(
      (item) => ({
        key: item._id,
        value: item.color,
        label: item.name,
      })
    );
    const optionsListDevice = props.state.listDevice;
    const suggestionListDevice = optionsListDevice.map((item) => ({
      key: item._id,
      value: item._id,
      label: item.nameEnglish,
    }));
    const optionsListModel = props.state.listModel;
    const suggestionListModel = optionsListModel.map((item) => ({
      key: item._id,
      value: item.colorList,
      label: item.name,
    }));
    const optionsBrandList = props.state.brandList;
    console.log("optionsBrandList", optionsBrandList);
    const suggestionListBrand = optionsBrandList.map((item) => ({
      key: item._id,
      value: item._id,
      label: item.name,
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
              {props.state.addCountry ? (
                <FuseChipSelect
                  className="w-full my-16"
                  value={props.state.country}
                  onChange={props.handleChipChangeCountry}
                  placeholder="Select Country"
                  textFieldProps={{
                    label: "Country",
                    InputLabelProps: {
                      shrink: true,
                    },
                    variant: "outlined",
                  }}
                  options={suggestionCountry}
                  required
                />
              ) : (
                ""
              )}

              <FuseChipSelect
                className="w-full my-16"
                value={props.state.typeReparation}
                onChange={props.handleChipChangeTypeReparation}
                placeholder={
                  <Translation>
                    {(t) => <div>{t("reparationType.reparationType")}</div>}
                  </Translation>
                }
                textFieldProps={{
                  label: "Type de réparation",
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestionListTypeReparation}
                required
              />
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.device}
                onChange={props.handleChipChangeDevice}
                placeholder="Select Device"
                textFieldProps={{
                  label: (
                    <Translation>
                      {(t) => <div>{t("device.device")}</div>}
                    </Translation>
                  ),
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestionListDevice}
                required
              />
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.brand}
                onChange={props.handleChipChangeBrand}
                placeholder="Select brand"
                textFieldProps={{
                  label: (
                    <Translation>
                      {(t) => <div>{t("brind.brind")}</div>}
                    </Translation>
                  ),
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestionListBrand}
                required
              />
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.model}
                onChange={props.handleChipChangeModel}
                placeholder="Select model"
                textFieldProps={{
                  label: (
                    <Translation>
                      {(t) => <div>{t("model.Model")}</div>}
                    </Translation>
                  ),
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestionListModel}
                required
              />
              {props.state.testAddColor ? (
                <FuseChipSelect
                  className="w-full my-16"
                  value={props.state.colorList}
                  onChange={props.handleChipChangeColor}
                  placeholder="Select Color"
                  textFieldProps={{
                    label: (
                      <Translation>
                        {(t) => <div>{t("color.color")}</div>}
                      </Translation>
                    ),
                    InputLabelProps: {
                      shrink: true,
                    },
                    variant: "outlined",
                  }}
                  options={suggestionColor}
                  isMulti
                />
              ) : (
                ""
              )}

              <SelectFormsy
                className="mt-8 mb-16"
                name="disponibilite"
                label={
                  <Translation>
                    {(t) => <div>{t("product.disponibility.title")}</div>}
                  </Translation>
                }
                value={props.state.disponibilite}
                variant="outlined"
                required
                onChange={props.handleChangeSelect}
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="disponible">
                  {
                    <Translation>
                      {(t) => <div>{t("product.disponibility.yes")}</div>}
                    </Translation>
                  }
                </MenuItem>
                <MenuItem value="non disponible">
                  {
                    <Translation>
                      {(t) => <div>{t("product.disponibility.no")}</div>}
                    </Translation>
                  }
                </MenuItem>
              </SelectFormsy>

              <TextFieldFormsy
                className="mt-8 mb-16 "
                value={props.state.prix}
                label={
                  <Translation>
                    {(t) => <div>{t("product.customerPrice")}</div>}
                  </Translation>
                }
                name="prix"
                type="number"
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
                required
              />
              <TextFieldFormsy
                className="mt-8 mb-16 "
                value={props.state.prixFournisseur}
                label={
                  <Translation>
                    {(t) => <div>{t("product.supplierPrice")}</div>}
                  </Translation>
                }
                name="prixFournisseur"
                type="number"
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
                required
              />
              <TextFieldFormsy
                className="mt-8 mb-16 "
                value={props.state.description}
                label={
                  <Translation>
                    {(t) => <div>{t("product.description")}</div>}
                  </Translation>
                }
                name="description"
                type="text"
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextFieldFormsy
                className="mt-8 mb-16 "
                value={props.state.descriptionArabe}
                label={
                  <Translation>
                    {(t) => <div>{t("state.arabicDescription")}</div>}
                  </Translation>
                }
                name="descriptionArabe"
                type="text"
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextFieldFormsy
                className="mt-8 mb-16 "
                value={props.state.descriptionEnglish}
                label={
                  <Translation>
                    {(t) => <div>{t("state.englishDescription")}</div>}
                  </Translation>
                }
                name="descriptionEnglish"
                type="text"
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextFieldFormsy
                className="mt-8 mb-16 "
                value={props.state.tags}
                label={
                  <Translation>
                    {(t) => <div>{t("product.tags")}</div>}
                  </Translation>
                }
                name="tags"
                type="text"
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
              />

              <Button
                variant="contained"
                color="primary"
                className="w-224 mx-auto mt-16"
                aria-label="Register"
                disabled={!this.state.isFormValid}
                type="submit"
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
export default withTranslation()(withRouter(ProductFormReparation));
