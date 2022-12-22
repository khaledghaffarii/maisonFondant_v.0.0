import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, CardContent } from "@material-ui/core";
import moment from "moment";
import { FuseAnimate } from "@fuse";
import { FuseChipSelect } from "@fuse";
import { TextFieldFormsy } from "@fuse";
import TimeField from "react-simple-timefield";
//import RightDrawer from "./RightDrawer";
import DateTimePicker from "react-datetime-picker";
import Remarque from "../sharedComponent/Remarque";

//import SearchBar from "../sharedComponent/SearchBar";
import Formsy from "formsy-react";
import { withRouter } from "react-router-dom";
import { Tabs } from "@yazanaabed/react-tabs";
import { REP_STATES, REP_LABELS,STATES_REPARATION } from "../../static";
import { withTranslation, Translation } from "react-i18next";
class ReparationForm extends Component {
  //const { classes } = props;
  constructor(props) {
    super(props);
    this.isFormValid = false;
    this.state = {
      isFormValid: false,
      finalFormValidation: false,
      editAddress: false,
    };
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.state) {
      this.setState({
        finalFormValidation:
          this.isFormValid &&
        //  nextProps.state.productID !== "" &&
          nextProps.state.etatValidation &&
          nextProps.state.clientValidation,
      });
    }
    this.isFormValid = true;
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
    const optionsCountry = props.state.listCountry;
    // console.log("optionsColor",optionsColor);
     const suggestionCountry = optionsCountry.map(item => ({
       key: item._id,
       value: item._id,
       label: item.countryName,
       
     }));
    const suggestionsCentreDepot = props.state.centreDepotOptions.map(
      (item) => ({
        key: item._id,
        value: item._id,
        label: item.name,
      })
    );

    const suggestionsCentreRecuperation =
      props.state.centreRecuperationOptions.map((item) => ({
        key: item._id,
        value: item._id,
        label: item.name,
      }));
    const suggestionsRepairer = props.state.repairerOptions.map((item) => ({
      key: item._id,
      value: item._id,
      label: `${item.fname} ${item.lname}`,
    }));
    const suggestionsClient = props.state.clientOptions.map((item) => ({
      key: item._id,
      value: item._id,
      label: `${item.fname} ${item.lname} ${item.phone}`,
    }));
    const suggestionsGouvernorat = props.state.gouvernoratsOptions.map(
      (item) => ({
        key: item._id,
        value: item._id,
        label: item.name,
      })
    );
    const suggestionsDelegation = props.state.delegationsOptions.map(
      (item) => ({
        key: item._id,
        value: item._id,
        label: item.name,
      })
    );
    const suggestionsLocalite = props.state.localitesOptions.map((item) => ({
      key: item._id,
      value: item._id,
      label: item.name,
    }));
    let i = 0;
    const suggestionsEtat = Object.keys(STATES_REPARATION).map((key) => {
      i++;
      return {
        key: i,
        value: STATES_REPARATION[key].VALUE,
        label: STATES_REPARATION[key].LABEL_FR,
      };
    });
    const optionsListModel = props.state.listModel;
    const suggestionListModel = optionsListModel.map((item) => ({
      key: item._id,
      value: item.colorList,
      label: item.name+ "("+item.deviceList?.nameEnglish+")",
    }));
    const optionsBrandList = props.state.brandList;
    //console.log("optionsBrandList", optionsBrandList);
    const suggestionListBrand = optionsBrandList.map((item) => ({
      key: item._id,
      value: item._id,
      label: item.name,
    }));
    
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
    const optionsListReparation = props.state.listReparation;
    const suggestionListReparation = optionsListReparation.map(
      (item) => ({
        key: item._id,
        value: item._id,
        label: item.typeReparation?.name+ "("+item.device?.nameEnglish+")",
      })
    );
    let extraData;
    if (props.state.showExtraData) {
      extraData = this.state.editAddress ? (
        <div>
          
          <FuseChipSelect
            className="w-full my-16"
            value={props.state.gouvernorat}
            onChange={props.handleChangeGouvernorat}
            placeholder="Select Gouvernorat"
            textFieldProps={{
              label: "Gouvenorats",
              InputLabelProps: {
                shrink: true,
              },
              variant: "outlined",
            }}
            options={suggestionsGouvernorat}
          />
          <FuseChipSelect
            className="w-full my-16"
            value={props.state.delegation}
            placeholder="Select delegation"
            textFieldProps={{
              label: "Delegation",
              InputLabelProps: {
                shrink: true,
              },
              variant: "outlined",
            }}
            onChange={props.handleChangeDelegation}
            options={suggestionsDelegation}
            required
          />
          <FuseChipSelect
            className="w-full my-16"
            value={props.state.localite}
            onChange={props.handleChangeLocalite}
            placeholder="Select localite"
            textFieldProps={{
              label: "Localite",
              InputLabelProps: {
                shrink: true,
              },
              variant: "outlined",
            }}
            options={suggestionsLocalite}
            required
          />
          <TextFieldFormsy
            className="mt-8 mb-16 mr-8"
            value={props.state.codePostal}
            type="text"
            name="codePostal"
            label="codePostal"
            onChange={props.handleChange}
            margin="normal"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            required
          />
          <TextFieldFormsy
            className="w-full my-16"
            value={props.state.indication}
            type="text"
            name="indication"
            label="indication"
            onChange={props.handleChange}
            margin="normal"
            variant="outlined"
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "#8080803d",
            padding: 29,
            fontSize: 15,
          }}
        >
          <a
            style={{ alignSelf: "flex-end" }}
            href="#"
            target={"_blank"}
            onClick={() => this.setState({ editAddress: true })}
          >
            {" "}
            <Translation>
              {(t) => <div>{t("category.button")}</div>}
            </Translation>
          </a>
          <div style={{ margin: 5 }}>
            <b>{props.state.indication}</b>
            <p>
              {[
                props.state.delegation
                  ? props.state.delegation.label
                  : undefined,
                props.state.localite ? props.state.localite.label : undefined,
              ].join(", ")}
            </p>
            <p>
              {[
                props.state.gouvernorat
                  ? props.state.gouvernorat.label
                  : undefined,
                props.state.codePostal,
              ].join(", ")}
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className="p-16 sm:p-24">
        <FuseAnimate animation="transition.expandIn">
          <CardContent className="flex flex-col items-center justify-center p-32">
            <Formsy
              onValidSubmit={props.handleSubmit}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              className="flex flex-col justify-center w-full"
            >
              <Tabs
                activeTab={{
                  id: "tab1",
                }}
              >
                <Tabs.Tab
                  id="tab1"
                  title={
                    <Translation>
                      {(t) => (
                        <div>{t("reparation.repairInformation.title")}</div>
                      )}
                    </Translation>
                  }
                >
                  <div
                    style={{ padding: 20 }}
                    className="flex flex-col justify-center w-full"
                  >
                    <div class="row">
                    {props.state.testCountry?
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
                
              />:""}
              
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
              
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.reparationProduct}
                onChange={props.handleChipChangeReparation}
                placeholder={
                  ""
                }
                textFieldProps={{
                  label: "select repair",
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
               options={suggestionListReparation}
                required
              />
                     
                    </div>
                    <FuseChipSelect
                      className="w-full my-16"
                      value={props.state.etat}
                      onChange={props.handleChangeEtat}
                      placeholder="Select etat"
                      textFieldProps={{
                        label: (
                          <Translation>
                            {(t) => (
                              <div>
                                {t("reparation.repairInformation.status.title")}
                              </div>
                            )}
                          </Translation>
                        ),
                        InputLabelProps: {
                          shrink: true,
                        },
                        variant: "outlined",
                        required: true,
                      }}
                      options={suggestionsEtat}
                      required
                      isDisabled={props.state.locked}
                    />
                    <TextFieldFormsy
                      className="mt-8 mb-16 mr-8"
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t("reparation.repairInformation.panneDetails")}
                            </div>
                          )}
                        </Translation>
                      }
                      name="detailsPanne"
                      type="text"
                      multiline
                      rowsMax="4"
                      value={props.state.detailsPanne}
                      onChange={props.handleChange}
                      margin="normal"
                      helperText="ecrire les details de la panne"
                      variant="outlined"
                      disabled={props.state.locked}
                    />
                    <TextFieldFormsy
                      className="mt-8 mb-16 mr-8"
                      value={props.state.difficulty}
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t(
                                "reparation.repairInformation.difficulttyReparation"
                              )}
                            </div>
                          )}
                        </Translation>
                      }
                      name="difficulty"
                      type="text"
                      onChange={props.handleChange}
                      margin="normal"
                      variant="outlined"
                      disabled={props.state.locked}
                    />
                    <TextFieldFormsy
                      className="mt-8 mb-16 mr-8"
                      value={props.state.coupon}
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t("reparation.repairInformation.discountCoupon")}
                            </div>
                          )}
                        </Translation>
                      }
                      name="coupon"
                      type="text"
                      onChange={props.handleChange}
                      margin="normal"
                      variant="outlined"
                      disabled={props.state.locked}
                    />
                    <section className="w-full my-16">
                      <div style={{ marginRight: 20 }} className="w-full my-16">
                        <TimeField
                          value={props.state.estimatedTimeReparation}
                          onChange={props.onTimeChangeReparation}
                          input={
                            <TextField
                              label={
                                <Translation>
                                  {(t) => (
                                    <div>
                                      {t(
                                        "reparation.repairInformation.estimated"
                                      )}
                                    </div>
                                  )}
                                </Translation>
                              }
                              className="w-full my-16"
                              value={props.state.estimatedTimeReparation}
                              variant="outlined"
                              disabled={props.state.locked}
                            />
                          }
                          disabled={props.state.locked}
                        />
                      </div>
                    </section>
                    <FuseChipSelect
                      className="w-full my-16"
                      value={props.state.disponibleA}
                      onChange={props.handleChipChangeDisponibilite}
                      placeholder="Select disponibilite"
                      textFieldProps={{
                        label: (
                          <Translation>
                            {(t) => (
                              <div>
                                {t("reparation.repairInformation.availability")}
                              </div>
                            )}
                          </Translation>
                        ),
                        InputLabelProps: {
                          shrink: true,
                        },
                        variant: "outlined",
                      }}
                      options={suggestionsCentreDepot}
                      required
                      disabled={props.state.locked}
                    />
                    <section className="w-full my-16">
                      <section>
                        <Translation>
                          {(t) => (
                            <div>
                              {t(
                                "reparation.repairInformation.customerCallback"
                              )}
                            </div>
                          )}
                        </Translation>
                        ,
                      </section>
                      <div style={{ marginRight: 20 }} className="w-full my-16">
                        <DateTimePicker
                          onChange={props.handleChangeRappelTime}
                          value={props.state.rappelDate}
                          disabled={props.state.locked}
                        />
                      </div>
                    </section>
                  </div>
                </Tabs.Tab>
                <Tabs.Tab
                  id="tab2"
                  title={
                    <Translation>
                      {(t) => (
                        <div>{t("reparation.deviceInformation.title")}</div>
                      )}
                    </Translation>
                  }
                >
                  <div
                    style={{ padding: 20 }}
                    className="flex flex-col justify-center w-full"
                  >
                    <TextFieldFormsy
                      className="mt-8 mb-16 mr-8"
                      value={props.state.numeroSerie}
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t("reparation.deviceInformation.serialNumber")}
                            </div>
                          )}
                        </Translation>
                      }
                      name="numeroSerie"
                      type="text"
                      onChange={props.handleChange}
                      margin="normal"
                      variant="outlined"
                      disabled={props.state.locked}
                    />
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
                 
                />
                  </div>
                </Tabs.Tab>
                <Tabs.Tab
                  id="tab3"
                  title={
                    <Translation>
                      {(t) => (
                        <div>
                          {t("reparation.customerInformationLogistics.title")}
                        </div>
                      )}
                    </Translation>
                  }
                >
                  <div
                    style={{ padding: 20 }}
                    className="flex flex-col justify-center w-full"
                  >

                    <TextField
                      className="mt-8 mb-16 mr-8"
                      // format={'dd/mm/yyyy'}
                      //value={props.state.dateLivraison}
                      label={
                        <Translation>
                          {(t) => <div>{t("reparation.deliveryDate")}</div>}
                        </Translation>
                      }
                      name="dateLivraison"
                      value={moment(props.state.dateLivraison).format(
                        "YYYY-MM-DD"
                      )}
                      type="date"
                      onChange={props.handleChange}
                      margin="normal"
                      variant="outlined"
                      disabled={props.state.locked}
                    />

                    {props.ShowEdit ? (
                      <div
                        style={{
                          display: "flex",
                          background: "#8080803d",
                          padding: 29,
                          fontSize: 15,
                        }}
                      >
                        <div style={{ margin: 5 }}>
                          <b>{props.state.client.name}</b>
                          <p>
                            <a href={`mailto:${props.state.client.email}`}>
                              {props.state.client.email}
                            </a>
                          </p>
                          <p>{props.state.client.phone}</p>
                          <p>
                            {props.state.client.adress
                              ? `${
                                  props.state.client.adress.address
                                    ? props.state.client.adress.address
                                    : ""
                                }, ${
                                  props.state.client.localite
                                    ? props.state.client.localite
                                    : ""
                                }\r\n${
                                  props.state.client.adress.delegation
                                    ? props.state.client.adress.delegation
                                    : ""
                                }\r\n${
                                  props.state.client.adress.gouvernorat
                                    ? props.state.client.adress.gouvernorat
                                    : ""
                                } ${
                                  props.state.client.adress.codePostal
                                    ? props.state.client.adress.codePostal
                                    : ""
                                }`
                              : ""}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <FuseChipSelect
                        isDisabled={props.state.locked}
                        className="w-full my-16"
                        value={props.state.client}
                        onChange={props.handleChipChangeClient}
                        placeholder="Select client"
                        textFieldProps={{
                          label: (
                            <Translation>
                              {(t) => <div>{t("reparation.customer")}</div>}
                            </Translation>
                          ),
                          InputLabelProps: {
                            shrink: true,
                          },
                          variant: "outlined",
                          required: true,
                        }}
                        options={suggestionsClient}
                        required
                      />
                    )}
                    <FuseChipSelect
                      className="w-full my-16"
                      isDisabled={props.state.locked}
                      value={props.state.centreDepot}
                      onChange={props.handleChipChangeCentreDepot}
                      placeholder={
                        <Translation>
                          {(t) => <div>{t("reparation.depositCenter")}</div>}
                        </Translation>
                      }
                      textFieldProps={{
                        label: (
                          <Translation>
                            {(t) => <div>{t("reparation.depositCenter")}</div>}
                          </Translation>
                        ),
                        InputLabelProps: {
                          shrink: true,
                        },
                        variant: "outlined",
                      }}
                      options={suggestionsCentreDepot}
                      required
                    />

                    {props.state.centreDepot.label ===
                    "Récupération à domicile" ? (
                      extraData
                    ) : (
                      <div />
                    )}

                    <FuseChipSelect
                      className="w-full my-16"
                      isDisabled={props.state.locked}
                      value={props.state.centreService}
                      onChange={props.handleChipChangeCentreService}
                      placeholder={
                        <Translation>
                          {(t) => <div>{t("reparation.seviceCenter")}</div>}
                        </Translation>
                      }
                      textFieldProps={{
                        label: (
                          <Translation>
                            {(t) => <div>{t("reparation.seviceCenter")}</div>}
                          </Translation>
                        ),
                        InputLabelProps: {
                          shrink: true,
                        },
                        variant: "outlined",
                      }}
                      options={suggestionsCentreRecuperation}
                      required
                    />

                    <FuseChipSelect
                      className="w-full my-16"
                      isDisabled={props.state.locked}
                      value={props.state.repairer}
                      onChange={props.handleChipChangeRepairer}
                      placeholder={
                        <Translation>
                          {(t) => <div>{t("reparation.repairer")}</div>}
                        </Translation>
                      }
                      textFieldProps={{
                        label: (
                          <Translation>
                            {(t) => <div>{t("reparation.repairer")}</div>}
                          </Translation>
                        ),
                        InputLabelProps: {
                          shrink: true,
                        },
                        variant: "outlined",
                      }}
                      options={suggestionsRepairer}
                      required
                    />
                    <FuseChipSelect
                      isDisabled={props.state.locked}
                      className="w-full my-16"
                      value={props.state.centreRecuperation}
                      onChange={props.handleChipChangeCentreRecuperation}
                      placeholder={
                        <Translation>
                          {(t) => <div>{t("reparation.recoveryCenter")}</div>}
                        </Translation>
                      }
                      textFieldProps={{
                        label: (
                          <Translation>
                            {(t) => <div>{t("reparation.recoveryCenter")}</div>}
                          </Translation>
                        ),
                        InputLabelProps: {
                          shrink: true,
                        },
                        variant: "outlined",
                      }}
                      options={suggestionsCentreRecuperation}
                      required
                    />
                    {props.state.centreRecuperation.label ===
                    "Livraison à domicile" ? (
                      extraData
                    ) : (
                      <div />
                    )}
                  </div>
                </Tabs.Tab>
                <Tabs.Tab
                  id="tab4"
                  title={
                    <Translation>
                      {(t) => (
                        <div>{t("reparation.financialInformation.title")}</div>
                      )}
                    </Translation>
                  }
                >
                  <div
                    style={{ padding: 20 }}
                    className="flex flex-col justify-center w-full"
                  >
                    <TextFieldFormsy
                      disabled={props.state.locked}
                      className="mt-8 mb-16"
                      value={props.state.prix}
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t(
                                "reparation.financialInformation.customerPrice"
                              )}
                            </div>
                          )}
                        </Translation>
                      }
                      type="number"
                      name="prix"
                      onChange={props.handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                      variant="outlined"
                      required
                    />
                    <TextFieldFormsy
                      disabled={props.state.locked}
                      className="mt-8 mb-16"
                      value={props.state.prixPiece}
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t(
                                "reparation.financialInformation.supplierPrice"
                              )}
                            </div>
                          )}
                        </Translation>
                      }
                      type="number"
                      name="prixPiece"
                      onChange={props.handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextFieldFormsy
                      disabled={props.state.locked}
                      className="mt-8 mb-16"
                      type="number"
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t(
                                "reparation.financialInformation.advancePayment"
                              )}
                            </div>
                          )}
                        </Translation>
                      }
                      name="avance"
                      value={props.state.avance}
                      onChange={props.handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                      variant="outlined"
                    />
                  </div>
                </Tabs.Tab>
                <Tabs.Tab
                  id="tab5"
                  title={
                    <Translation>
                      {(t) => <div>{t("reparation.internalRemark.title")}</div>}
                    </Translation>
                  }
                >
                  <div
                    style={{ padding: 20 }}
                    className="flex flex-col justify-center w-full"
                  >
                    {props.ShowEdit &&
                      (props.state.remarqueAcquisitionList.length > 0 ? (
                        <Remarque
                          remarqueList={props.state.remarqueAcquisitionList}
                          name={"Remarque Acquisition"}
                        />
                      ) : null)}

                    <TextField
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t("reparation.internalRemark.remarkAcquisition")}
                            </div>
                          )}
                        </Translation>
                      }
                      name="remarqueAcquisition"
                      value={props.state.remarqueAcquisition}
                      onChange={props.handleChange}
                      multiline
                      rows="4"
                      className="mt-8 mb-16 mr-8"
                      margin="normal"
                      variant="outlined"
                      disabled={props.state.locked}
                    />
                    {props.ShowEdit &&
                      (props.state.remarqueSuiviList.length > 0 ? (
                        <Remarque
                          remarqueList={props.state.remarqueSuiviList}
                          name={"Remarque Suivi"}
                        />
                      ) : null)}
                    <TextFieldFormsy
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t("reparation.internalRemark.remarkfollowed")}
                            </div>
                          )}
                        </Translation>
                      }
                      name="remarqueSuivi"
                      value={props.state.remarqueSuivi}
                      onChange={props.handleChange}
                      multiline
                      rows="4"
                      className="mt-8 mb-16 mr-8"
                      margin="normal"
                      variant="outlined"
                      disabled={props.state.locked}
                    />
                    {props.ShowEdit &&
                      (props.state.remarqueSatisfactionList.length > 0 ? (
                        <Remarque
                          remarqueList={props.state.remarqueSatisfactionList}
                          name={"Remarque Satisfaction"}
                        />
                      ) : null)}
                    <TextFieldFormsy
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t(
                                "reparation.internalRemark.remarkSatisfaction"
                              )}
                            </div>
                          )}
                        </Translation>
                      }
                      name="remarqueSatisfaction"
                      value={props.state.remarqueSatisfaction}
                      onChange={props.handleChange}
                      multiline
                      rows="4"
                      className="mt-8 mb-16 mr-8"
                      margin="normal"
                      variant="outlined"
                      disabled={props.state.locked}
                    />
                    {props.ShowEdit &&
                      (props.state.remarqueEquipeList.length > 0 ? (
                        <Remarque
                          remarqueList={props.state.remarqueEquipeList}
                          name={"Remarque Equipe"}
                        />
                      ) : null)}

                    <TextFieldFormsy
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t("reparation.internalRemark.remarkTeam")}
                            </div>
                          )}
                        </Translation>
                      }
                      name="remarqueEquipe"
                      value={props.state.remarqueEquipe}
                      onChange={props.handleChange}
                      multiline
                      rows="4"
                      className="mt-8 mb-16 mr-8"
                      margin="normal"
                      variant="outlined"
                      disabled={props.state.locked}
                    />
                  </div>
                </Tabs.Tab>
                <Tabs.Tab
                  id="tab6"
                  title={
                    <Translation>
                      {(t) => (
                        <div>
                          {t("reparation.customerRemark.customerRemark")}
                        </div>
                      )}
                    </Translation>
                  }
                >
                  <div
                    style={{ padding: 20 }}
                    className="flex flex-col justify-center w-full"
                  >
                    {props.ShowEdit &&
                      (props.state.remarqueClientList.length > 0 ? (
                        <Remarque
                          remarqueList={props.state.remarqueClientList}
                          name={"remarque Client"}
                        />
                      ) : null)}

                    <TextFieldFormsy
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t("reparation.customerRemark.customerRemark")}
                            </div>
                          )}
                        </Translation>
                      }
                      name="remarqueClient"
                      value={props.state.remarqueClient}
                      onChange={props.handleChange}
                      multiline
                      rows="4"
                      className="mt-8 mb-16 mr-8"
                      margin="normal"
                      variant="outlined"
                      disabled={props.state.locked}
                    />
                    {props.ShowEdit &&
                      (props.state.remarqueTrustitList.length > 0 ? (
                        <Remarque
                          remarqueList={props.state.remarqueTrustitList}
                          name={"Diagnostique TrustiT"}
                        />
                      ) : null)}

                    <TextFieldFormsy
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t("reparation.customerRemark.diagnostic")}
                            </div>
                          )}
                        </Translation>
                      }
                      name="remarqueTrustit"
                      value={props.state.remarqueTrustit}
                      onChange={props.handleChange}
                      multiline
                      rows="4"
                      className="mt-8 mb-16 mr-8"
                      margin="normal"
                      variant="outlined"
                      disabled={props.state.locked}
                    />
                  </div>
                </Tabs.Tab>
              </Tabs>
              <Button
                variant="contained"
                color="primary"
                className="w-224 mx-auto mt-16"
                aria-label="Register"
                disabled={!this.state.finalFormValidation || props.state.locked}
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

export default withTranslation()(withRouter(ReparationForm));
