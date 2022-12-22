import React, { Component } from "react";
import { Button, CardContent } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { FuseChipSelect } from "@fuse";
import Formsy from "formsy-react";
import CroppedImage from "../sharedComponent/CroppedImage";
import { TextFieldFormsy } from "@fuse";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
class CategoryForm extends Component {
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

    const optionsParent = props.state.optionParent;
    const suggestionParent = optionsParent.map((item) => ({
      key: item._id,
      value: item._id,
      label: item.name,
    }));
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
   // console.log("optionsColor",optionsColor);
    const suggestionCountry = optionsCountry.map(item => ({
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
              <TextFieldFormsy
                className="mt-8 mb-16 "
                value={props.state.name}
                label={
                  <Translation>
                    {(t) => <div>{t("category.name")}</div>}
                  </Translation>
                }
                name="name"
                type="text"
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
                required
              />

               <TextFieldFormsy
                                className="mt-8 mb-16 "
                                value={props.state.nameArabe}
                                label="Name en arabe"
                                name="nameArabe"
                                type="text"
                                onChange={props.handleChange}
                                margin="normal"
                                variant="outlined"
                                required
                            />
                            <TextFieldFormsy
                                className="mt-8 mb-16 "
                                value={props.state.nameEnglish}
                                label="Name en english"
                                name="nameEnglish"
                                type="text"
                                onChange={props.handleChange}
                                margin="normal"
                                variant="outlined"
                                required
                            />
                           

              <FuseChipSelect
                className="w-full my-16"
                value={props.state.parent}
                onChange={props.handleChipChangeParent}
                placeholder={
                  <Translation>
                    {(t) => <div>{t("category.parent.parnetOption")}</div>}
                  </Translation>
                }
                textFieldProps={{
                  label: (
                    <Translation>
                      {(t) => <div>{t("category.parent.title")}</div>}
                    </Translation>
                  ),
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestionParent}
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
              <TextFieldFormsy
                className="mt-8 mb-16 "
                value={props.state.description}
                label={
                  <Translation>
                    {(t) => <div>{t("category.description")}</div>}
                  </Translation>
                }
                name="description"
                type="text"
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
                required
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
                    {(t) => <div>{t("category.tags")}</div>}
                  </Translation>
                }
                name="tags"
                type="text"
                onChange={props.handleChange}
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
                <Translation>
                  {(t) => <div>{t("category.add")}</div>}
                </Translation>
              </Button>
            </Formsy>
          </CardContent>
        </FuseAnimate>
      </div>
    );
  }
}
export default withTranslation()(withRouter(CategoryForm));
