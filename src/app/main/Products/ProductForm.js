import React, { Component } from "react";
import { Button, CardContent, MenuItem } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { FuseChipSelect } from "@fuse";
import Formsy from "formsy-react";
import CroppedImage from "../sharedComponent/CroppedImage";
import { TextFieldFormsy, SelectFormsy } from "@fuse";
import { withRouter } from "react-router-dom";

import { withTranslation, Translation } from "react-i18next";

class ProductForm extends Component {
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
     const suggestionColor = optionsColor.map(item => ({
       key: item._id,
       value: item._id,
       label: <p style={{}}><b style={{fontSize: "1.6em"}}>{item.nameColorEnglish}</b><b  style={{ 
         backgroundColor: `${item.codeColor}`,
         borderRadius: "50%",
         display: "inline-block", height:"19px", width:"19px", margin: "0px 0px 0px 10px"}}></b></p>,
       
     }));
    const optionsCountry = props.state.listCountry;
     const suggestionCountry = optionsCountry.map(item => ({
       key: item._id,
       value: item._id,
       label: item.countryName,
       
     }));
    const optionsParent = props.state.optionParent;
    const suggestionParent = optionsParent.map((item) => ({
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
              <CroppedImage fileChangedHandler={props.fileChangedHandler} />
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.country}
                onChange={props.handleChipChangeCountry}
                placeholder="Select Country"
                textFieldProps={{
                  label: "Country",
                  InputLabelProps: {
                    shrink: true
                  },
                  variant: "outlined"
                }}
                options={suggestionCountry}
                
              />
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.country}
                onChange={props.handleChipChangeCountry}
                placeholder="Select type de réparation"
                textFieldProps={{
                  label: "Type de réparation",
                  InputLabelProps: {
                    shrink: true
                  },
                  variant: "outlined"
                }}
                options={suggestionCountry}
                
              />
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.country}
                onChange={props.handleChipChangeCountry}
                placeholder="Select Device"
                textFieldProps={{
                  label: "Device",
                  InputLabelProps: {
                    shrink: true
                  },
                  variant: "outlined"
                }}
                options={suggestionCountry}
                
              /> 
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.country}
                onChange={props.handleChipChangeCountry}
                placeholder="Select model"
                textFieldProps={{
                  label: "model",
                  InputLabelProps: {
                    shrink: true
                  },
                  variant: "outlined"
                }}
                options={suggestionCountry}
                
              />
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.color}
                onChange={props.handleChipChangeColor}
                placeholder="Select Color"
                textFieldProps={{
                  label: "Color",
                  InputLabelProps: {
                    shrink: true
                  },
                  variant: "outlined"
                }}
                options={suggestionColor}
                isMulti
              />
              
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
                 label="Description en arabe"
                 name="descriptionArabe"
                 type="text"
                 onChange={props.handleChange}
                 margin="normal"
                 variant="outlined"

             />
              <TextFieldFormsy
                 className="mt-8 mb-16 "
                 value={props.state.descriptionEnglish}
                 label="Description en english"
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
                //disabled={!this.state.finalFormValidation}
                type="submit"
              >
                {
                  <Translation>
                    {(t) => <div>{t("speciality.update.button")}</div>}
                  </Translation>
                }
              </Button>
            </Formsy>
          </CardContent>
        </FuseAnimate>
      </div>
    );
  }
}
export default withTranslation()(withRouter(ProductForm));
