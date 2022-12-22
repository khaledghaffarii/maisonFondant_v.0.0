import React, { Component } from "react";
import { Button, CardContent } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { FuseChipSelect } from "@fuse";
import { withRouter } from "react-router-dom";
import { TextFieldFormsy } from "@fuse";
import Formsy from "formsy-react";
import { withTranslation, Translation } from "react-i18next";
//
class RepairerForm extends Component {
  constructor(props) {
    super(props);
    this.isFormValid = false;
    this.state = {
      isFormValid: false,
      finalFormValidation: false,
    };
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.state) {
      this.setState({
        finalFormValidation:
          this.state.isFormValid &&
          nextProps.state.boutiqueValidation &&
          nextProps.state.etatValidation,
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
    const options = props.state.boutiqueOptions;
    const suggestions = options.map((item) => ({
      key: item._id,
      value: item._id,
      label: item.name,
    }));
    const suggestionsEtat = [
      {
        key: 1,
        value: 1,
        label: "vérifié"
      },
      {
        key: 2,
        value: 2,
        label: "non vérifié"
      },
      {
        key: 3,
        value: 3,
        label: "suspendu"
      },
      {
        key: 4,
        value: 4,
        label: "exclu"
      }
    ];
    const optionsCountry = props.state.listCountry;
    // console.log("optionsColor",optionsColor);
     const suggestionCountry = optionsCountry.map(item => ({
       key: item._id,
       value: item.iso2,
       label: item.countryName,
       
     }));
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
		// const suggestionsLocalite = props.state.localitesOptions.map((item) => ({
		//   key: item._id,
		//   value: item._id,
		//   label: item.name,
		// }));
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
            {localStorage.getItem('AdminOrTeam') == 'admin'?<FuseChipSelect
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
            />:""}
              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                value={props.state.fname}
                label={
                  <Translation>
                    {(t) => <div>{t("repairer.firstName")}</div>}
                  </Translation>
                }
                name="fname"
                type="text"
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
                required
              />
              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                value={props.state.lname}
                label={
                  <Translation>
                    {(t) => <div>{t("repairer.lastName")}</div>}
                  </Translation>
                }
                name="lname"
                type="text"
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
                required
              />
              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.email}
                label={
                  <Translation>
                    {(t) => <div>{t("repairer.email")}</div>}
                  </Translation>
                }
                type="email"
                name="email"
                validations="isEmail"
                validationError={props.state.email != "" ? (
                  <Translation>
                    {(t) => <div>{t("customer.errors.email")}</div>}
                  </Translation>
                ) : (
                  ""
                )}
                autoComplete="email"
                margin="normal"
                variant="outlined"
                onChange={props.handleChange}
                required
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

							
              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                value={props.state.id}
                label={
                  <Translation>
                    {(t) => <div>{t("repairer.id")}</div>}
                  </Translation>
                }
                name="id"
                type="text"
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
                required
              />

              {props.showPassword && (
                <TextFieldFormsy
                  className="mt-8 mb-16"
                  value={props.state.password}
                  label={
                    <Translation>
                      {(t) => <div>{t("customer.password")}</div>}
                    </Translation>
                  }
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  validations={{
                    minLength: 6,
                  }}
                  validationErrors={{
                    minLength: (
                      <Translation>
                        {(t) => <div>{t("customer.errors.password")}</div>}
                      </Translation>
                    ),
                  }}
                  margin="normal"
                  variant="outlined"
                  onChange={props.handleChange}
                  required={props.updatePassword}
                />
              )}

              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.phone}
                label={
                  <Translation>
                    {(t) => <div>{t("repairer.phone")}</div>}
                  </Translation>
                }
                name="phone"
                type="text"
                validations={{
                  minLength: 8,
                }}
                validationErrors={{
                  minLength: (
                    <Translation>
                      {(t) => <div>{t("customer.errors.phone.minLength")}</div>}
                    </Translation>
                  ),
                }}
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
                required
              />

              <FuseChipSelect
                className="w-full my-16"
                value={props.state.boutique}
                onChange={props.handleChipChange}
                placeholder={
                  <Translation>
                    {(t) => <div>{t("repairer.selectShop")}</div>}
                  </Translation>
                }
                textFieldProps={{
                  label: (
                    <Translation>
                      {(t) => <div>{t("repairer.boutique")}</div>}
                    </Translation>
                  ),
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestions}
              />
              <FuseChipSelect
                className="mt-8 mb-16"
                value={props.state.etat}
                onChange={props.handleChipChangeEtat}
                required
                placeholder={
                  <Translation>
                    {(t) => <div>{t("repairer.selectMethod")}</div>}
                  </Translation>
                }
                textFieldProps={{
                  label: (
                    <Translation>
                      {(t) => <div>{t("repairer.method")}</div>}
                    </Translation>
                  ),
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestionsEtat}
              />

              <Button
                variant="contained"
                color="primary"
                className="w-224 mx-auto mt-16"
                aria-label="Register"
                disabled={props.updatePassword?!this.state.finalFormValidation:props.updatePassword}
                type="submit"
              >
                <Translation>
                  {(t) => <div>{t("speciality.update.button")}</div>}
                </Translation>
              </Button>
            </Formsy>
          </CardContent>
        </FuseAnimate>
      </div>
    );
  }
}

export default withTranslation()(withRouter(RepairerForm));
