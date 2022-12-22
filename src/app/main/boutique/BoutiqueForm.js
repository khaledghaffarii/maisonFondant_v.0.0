import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, CardContent } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import TimeField from "react-simple-timefield";
import { FuseChipSelect } from "@fuse";
import CroppedImage from "../sharedComponent/CroppedImage";
import MapComponent from "../sharedComponent/MapComponent";
import { TextFieldFormsy } from "@fuse";
import Formsy from "formsy-react";
import { withRouter } from "react-router-dom";
import { BOUTIQUE_STATE } from "../../static";
import { withTranslation, Translation } from "react-i18next";
class BoutiqueForm extends Component {
  constructor(props) {
    super(props);
    this.isFormValid = false;
    this.state = {
      isFormValid: false,
      finalFormValidation:
        this.isFormValid && this.props.state.specialitiesValidation,
    };
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.state) {
      this.setState({
        finalFormValidation:
          this.state.isFormValid && nextProps.state.specialitiesValidation,
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
  }

  render() {
    const props = this.props;
    const suggestionsTypeBoutique = [
      {
        key: 1,
        value: "REPAIRER",
        label: "REPAIRER"
      },
      {
        key: 3,
        value: "RELAY POINT",
        label: "RELAY POINT"
      }
    ];
    const suggestionsSpecialities = props.state.optionSpecialities.map(
      (item) => ({
        key: item._id,
        value: item._id,
        label: item.name,
      })
    );
    const boutiqueStates = [
      {
        key: 1,
        value: BOUTIQUE_STATE.ACTIVE_VISIBLE,
        label: (
          <Translation>
            {(t) => <div>{t("boutique.Etat_Boutique.ACTIVE_VISIBLE")}</div>}
          </Translation>
        ),
      },
      {
        key: 2,
        value: BOUTIQUE_STATE.ACTIVE_NOT_VISIBLE,
        label: (
          <Translation>
            {(t) => <div>{t("boutique.Etat_Boutique.ACTIVE_NOT_VISIBLE")}</div>}
          </Translation>
        ),
      },
      {
        key: 3,
        value: BOUTIQUE_STATE.NOT_ACTIVE,
        label: (
          <Translation>
            {(t) => <div>{t("boutique.Etat_Boutique.NOT_ACTIVE")}</div>}
          </Translation>
        ),
      },
      {
        key: 4,
        value: BOUTIQUE_STATE.SUSPENDED,
        label: (
          <Translation>
            {(t) => <div>{t("boutique.Etat_Boutique.SUSPENDED")}</div>}
          </Translation>
        ),
      },
      {
        key: 5,
        value: BOUTIQUE_STATE.UNDER_VERIFICATION,
        label: (
          <Translation>
            {(t) => <div>{t("boutique.Etat_Boutique.UNDER_VERIFICATION")}</div>}
          </Translation>
        ),
      },
    ];
    const suggestionsGouvernorat = props.state.gouvernoratsOptions.map(
			(item) => ({
				key: item._id,
				value: item._id,
				label: item.name_fr,
			})
		);
		const optionDelegation = props.state.delegationsOptions;
		const suggestionsDelegation = Object.values(optionDelegation).map(
			(item) => ({
				key: item._id,
				value: item._id,
				label: item.name_fr,
			})
		);
		const optionRegion = props.state.optionRegion;
		const suggestionRegion = Object.values(optionRegion).map((item) => ({
			key: item._id,
			value: item._id,
			label: `${item.name_en}`,
		}));
		const optionCity = props.state.optionCity;
		const suggestionCity = Object.values(optionCity).map((item) => ({
			key: item._id,
			value: item._id,
			label: `${item.name_en}`,
		}));
    const optionsCountry = props.state.listCountry;
    // console.log("optionsColor",optionsColor);
     const suggestionCountry = optionsCountry.map(item => ({
       key: item._id,
       value: item.iso2,
       label: item.countryName,
       
     }));
     const optionsMobility=props.state.optionMobility;
     const suggestionMobility = optionsMobility.map(item => ({
      key: item._id,
      value: item._id,
      label: item.nameEnglish,
      
    }));
    return (
      <div className="p-16 sm:p-24 max-w-2xl">
        <FuseAnimate animation="transition.expandIn">
          <CardContent className="flex flex-col items-center justify-center p-32">
            <Formsy
              name="registerForm"
              onValidSubmit={props.handleSubmit}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              className="flex flex-col justify-center w-full"
            >
              <CroppedImage fileChangedHandler={props.fileChangedHandler} />
              {console.log("props.state.addCountry",props.state.addCountry)}
              {props.state.addCountry?
            <FuseChipSelect
            className="w-full my-16"
            value={props.state.country}
            onChange={props.handleChipChangeCountry}
            placeholder="Select Country"
            textFieldProps={{
              label: <Translation>
                {(t) => <div>{t("coutry.country")}</div>}
              </Translation>,
              InputLabelProps: {
                shrink: true
              },
              variant: "outlined"
            }}
            options={suggestionCountry}
            />:""  
            
            }
              
      
              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                value={props.state.name}
                type="text"
                name="name"
                label={
                  <Translation>
                    {(t) => <div>{t("boutique.name")}</div>}
                  </Translation>
                }
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
                required
              /> {/*
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
              />*/}
              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.email}
                label={<Translation>{(t) => <div>{t("repairer.email")}</div>}</Translation>}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                onChange={props.handleChange}
                required
              />
              <TextFieldFormsy
                  className="mt-8 mb-16 "
                  value={props.state.companyId}
                  label={<Translation>{(t) => <div>{t("boutique.companyId")}</div>}</Translation>}
                  name="companyId"
                  type="text"
                  onChange={props.handleChange}
                  margin="normal"
                  variant="outlined"
                  required
                  />
                  <FuseChipSelect
              className="w-full my-16"
              value={props.state.serviceType}
              onChange={props.handleChipChangeOptionMobility}
              placeholder={
                <Translation>
                        {(t) => <div>{t("boutique.mobilite")}</div>}
                      </Translation>
              }
              textFieldProps={{
                label: (
                  <Translation>
                        {(t) => <div>{t("boutique.mobilite")}</div>}
                      </Translation>
                ),
                InputLabelProps: {
                  shrink: true,
                },
                variant: "outlined",
              }}
              options={suggestionMobility}
              isMulti
            />
               <FuseChipSelect
            className="w-full my-16"
            value={props.state.typeBoutique}
            onChange={props.handleChipChangeTypeBoutique}
            placeholder="Select type boutique"
            textFieldProps={{
              label: <Translation>
              {(t) => <div>{t("boutique.typeBoutique")}</div>}
            </Translation>,
              InputLabelProps: {
                shrink: true
              },
              variant: "outlined"
            }}
            options={suggestionsTypeBoutique}
            isMulti
            />
             <TextFieldFormsy
                  className="mt-8 mb-16 "
                  value={props.state.yearsExperience}
                  label={<Translation>
                    {(t) => <div>{t("boutique.yearsExperience")}</div>}
                  </Translation>}
                  name="yearsExperience"
                  type="text"
                  onChange={props.handleChange}
                  margin="normal"
                  variant="outlined"
                  required
                  />
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.etat}
                onChange={props.handleEtatChange}
                placeholder={
                  <Translation>
                    {(t) => (
                      <div>{t("boutique.Etat_Boutique.titleOption")}</div>
                    )}
                  </Translation>
                }
                textFieldProps={{
                  label: (
                    <Translation>
                      {(t) => <div>{t("boutique.Etat_Boutique.title")}</div>}
                    </Translation>
                  ),
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={boutiqueStates}
              />
            
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.specialities}
                onChange={props.handleChipChange}
                placeholder={
                  <Translation>
                    {(t) => <div>{t("boutique.speciality.titleOption")}</div>}
                  </Translation>
                }
                textFieldProps={{
                  label: (
                    <Translation>
                      {(t) => <div>{t("boutique.speciality.title")}</div>}
                    </Translation>
                  ),
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestionsSpecialities}
                isMulti
              />
              {props.state.testCountry == 'SA' ? (
								<>
									<FuseChipSelect
										className='w-full my-16'
										value={props.state.regionList}
										onChange={props.handleChipChangeRegion}
										placeholder='Select  region'
										textFieldProps={{
											label: (
												<Translation>
													{(t) => <div>{t('region.region')}</div>}
												</Translation>
											),
											InputLabelProps: {
												shrink: true,
											},
											variant: 'outlined',
										}}
										options={suggestionRegion}
									/>
									<FuseChipSelect
										className='w-full my-16'
										value={props.state.cityList}
										onChange={props.handleChipChangeCity}
										placeholder='Select city'
										textFieldProps={{
											label: (
												<Translation>
													{(t) => <div>{t('city.city')}</div>}
												</Translation>
											),
											InputLabelProps: {
												shrink: true,
											},
											variant: 'outlined',
										}}
										options={suggestionCity}
									/>
								</>
							) : props.state.testCountry == 'TN' ? (
								<>
									<FuseChipSelect
										className='w-full my-16'
										value={props.state.gouvernorat}
										onChange={props.handleChangeGouvernorat}
										placeholder='Select  gouvernorat'
										textFieldProps={{
											label: (
												<Translation>
													{(t) => <div>{t('customer.governorates')}</div>}
												</Translation>
											),
											InputLabelProps: {
												shrink: true,
											},
											variant: 'outlined',
										}}
										options={suggestionsGouvernorat}
									/>
									<FuseChipSelect
										className='w-full my-16'
										value={props.state.delegation}
										placeholder='Select delegation'
										textFieldProps={{
											label: (
												<Translation>
													{(t) => <div>{t('customer.delegation')}</div>}
												</Translation>
											),
											InputLabelProps: {
												shrink: true,
											},
											variant: 'outlined',
										}}
										onChange={props.handleChangeDelegation}
										options={suggestionsDelegation}
										required
									/>
									{/* <FuseChipSelect
                    className="w-full my-16"
                    value={props.state.localite}
                    onChange={props.handleChangeLocalite}
                    placeholder="Select localite"
                    textFieldProps={{
                      label: (
                        <Translation>
                          {(t) => <div>{t("customer.locality")}</div>}
                        </Translation>
                      ),
                      InputLabelProps: {
                        shrink: true,
                      },
                      variant: "outlined",
                    }}
                    options={suggestionsLocalite}
                    required
                  /> */}
								</>
							) : (
								''
							)}

              <div
                style={{
                  position: "relative",
                  height: "450px",
                }}
              >
                <MapComponent
                  className="mt-8 mb-16"
                  setLocation={props.setLocation}
                  state={props.state}
                />
              </div>
              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.phone}
                label={
                  <Translation>
                    {(t) => <div>{t("boutique.phone")}</div>}
                  </Translation>
                }
                name="phone"
                type="number"
                validations={{
                  minLength: 8,
                  maxLength: 8,
                }}
                validationErrors={{
                  minLength: (
                    <Translation>
                      {(t) => <div>{t("boutique.errors.phone.minLength")}</div>}
                    </Translation>
                  ),
                  maxLength: (
                    <Translation>
                      {(t) => <div>{t("boutique.errors.phone.maxLength")}</div>}
                    </Translation>
                  ),
                }}
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
                required
              />
              <div style={{ marginRight: 20 }} className="w-full my-16">
                <TimeField
                  value={props.state.startWork}
                  onChange={props.onTimeChangeStartWork}
                  input={
                    <TextField
                      label={
                        <Translation>
                          {(t) => <div>{t("boutique.startTime")}</div>}
                        </Translation>
                      }
                      className="w-full my-16"
                      value={props.state.startWork}
                      variant="outlined"
                    />
                  }
                />
              </div>
              <div style={{ marginRight: 20 }} className="w-full my-16">
                <TimeField
                  value={props.state.endWork}
                  onChange={props.onTimeChangeEndWork}
                  input={
                    <TextField
                      label={
                        <Translation>
                          {(t) => <div>{t("boutique.endTime")}</div>}
                        </Translation>
                      }
                      className="w-full my-16"
                      value={props.state.endWork}
                      variant="outlined"
                    />
                  }
                />
              </div>
              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.facebookPage}
                label={
                  <Translation>
                    {(t) => <div>{t("boutique.facebook")}</div>}
                  </Translation>
                }
                name="facebookPage"
                type="text"
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.website}
                label={
                  <Translation>
                    {(t) => <div>{t("boutique.website")}</div>}
                  </Translation>
                }
                name="website"
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
              />
              <Button
                variant="contained"
                color="primary"
                className="w-224 mx-auto mt-16"
                aria-label="Register"
                disabled={!this.state.finalFormValidation}
                type="submit"
              >
                {
                  <Translation>
                    {(t) => <div>{t("boutique.add")}</div>}
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

export default withTranslation()(withRouter(BoutiqueForm));
