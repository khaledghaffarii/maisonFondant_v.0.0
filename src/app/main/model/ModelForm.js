import React, { Component } from "react";
import { Button, CardContent } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { FuseChipSelect } from "@fuse";
import Formsy from "formsy-react";
import { TextFieldFormsy } from "@fuse";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
import CroppedImage from "app/main/sharedComponent/CroppedImage";
class ModelForm extends Component {
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
    
    const optionsCountry = props.state.listCountry;
		// console.log("optionsColor",optionsColor);
		const suggestionCountry = optionsCountry.map((item) => ({
			key: item._id,
			value: item._id,
			label: item.countryName,
		}));
    const optionsBrand = props.state.brandList;

    const suggestionBrand = Object.values(optionsBrand).map((item) => ({
      key: item._id,
      value: item._id,
      label: `${item.name}`,
    }));
    const optionsDevice = props.state.deviceList;

    const suggestionDevice = Object.values(optionsDevice).map((item) => ({
      key: item._id,
      value: item._id,
      label: `${item.nameEnglish}`,
    }));
    const optionsGamme = props.state.gammeList;

    const suggestionGamme = Object.values(optionsGamme).map((item) => ({
      key: item._id,
      value: item._id,
      label: `${item.name}`,
    }));
    const optionsColor = props.state.colorList;
  
    const suggestionColor = optionsColor.map(item => ({
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
                value={props.state.name}
                label={
                  <Translation>
                    {(t) => <div>{t("customer.faceboock.customer.name")}</div>}
                  </Translation>
                }
                name="name"
                type="text"
                onChange={props.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                variant="outlined"
                required
              />
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.color}
                onChange={props.handleChipChangeColor}
                placeholder={props.state.color}
                textFieldProps={{
                  label: (
                    <Translation>
                      {(t) => <div>{t("model.nameColor")}</div>}
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
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.device}
                onChange={props.handleChipChangeDevice}
                placeholder={props.state.device.nameEnglish}
                textFieldProps={{
                  label: "Device",
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestionDevice}
              />
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.brand}
                onChange={props.handleChipChangeBrand}
                placeholder={props.state.brand.name}
                textFieldProps={{
                  label: "Brand",
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestionBrand}
              />
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.gamme}
                onChange={props.handleChipChangeGamme}
                placeholder={props.state.gamme?.name}
                textFieldProps={{
                  label: (
                    <Translation>
                      {(t) => <div>{t("gamme.range")}</div>}
                    </Translation>
                  ),
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestionGamme}
              />
                <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.description}
                label={
                  <Translation>
                    {(t) => <div>{t("stock.description")}</div>}
                  </Translation>
                }
                name="description"
                type="text"
                onChange={props.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                variant="outlined"
                required
                rows="4" multiline
              />
              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.tags}
                label={
                  <Translation>
                    {(t) => <div>{t("brind.tags")}</div>}
                  </Translation>
                }
                name="tags"
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
export default withTranslation()(withRouter(ModelForm));
