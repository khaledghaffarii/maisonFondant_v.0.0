import React, { Component } from "react";
import { Button, CardContent, FormControlLabel } from "@material-ui/core";
import { FuseAnimate, RadioGroupFormsy, FuseChipSelect } from "@fuse";
import Formsy from "formsy-react";
import { withRouter } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import { withTranslation, Translation } from "react-i18next";
import { TextFieldFormsy } from "@fuse";
import { Tabs } from "@yazanaabed/react-tabs";

class ClientFacebookForm extends Component {
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
      <div className="p-16 sm:p-24 ">
        <FuseAnimate animation="transition.expandIn">
          <CardContent className="flex flex-col items-center justify-center p-32">
            <Formsy
              name="registerForm"
              className="flex flex-col justify-center w-full"
              onValidSubmit={props.handleSubmit}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
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
                        <div>
                          {t("customer.faceboock.customerInformation.title")}
                        </div>
                      )}
                    </Translation>
                  }
                >
                  <div
                    style={{ padding: 20 }}
                    className="flex max-w-2xl flex-col justify-center w-full"
                  >
                    <TextFieldFormsy
                      className="mt-8 mb-16 mr-8"
                      value={props.state.name}
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t("customer.faceboock.customerInformation.name")}
                            </div>
                          )}
                        </Translation>
                      }
                      name="name"
                      type="text"
                      onChange={props.handleChange}
                      margin="normal"
                      variant="outlined"
                    />
                    {/* <TextFieldFormsy
                                            className="mt-8 mb-16 mr-8"
                                            value={props.state.lastName}
                                            label="Prénom"
                                            name="lastName"
                                            type="text"
                                            onChange={props.handleChange}
                                            margin="normal"
                                            variant="outlined"
                                        /> */}
                    <TextFieldFormsy
                      className="mt-8 mb-16 mr-8"
                      value={props.state.email}
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t(
                                "customer.faceboock.customerInformation.email"
                              )}
                            </div>
                          )}
                        </Translation>
                      }
                      name="email"
                      type="text"
                      onChange={props.handleChange}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextFieldFormsy
                      className="mt-8 mb-16"
                      value={props.state.phone}
                      type="number"
                      name="phone"
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t(
                                "customer.faceboock.customerInformation.phone"
                              )}
                            </div>
                          )}
                        </Translation>
                      }
                      validations={{
                        minLength: 8,
                        maxLength: 8,
                      }}
                      validationErrors={{
                        minLength: "Min character length is 8",
                        maxLength: "Max character length is 8",
                      }}
                      onChange={props.handleChange}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextFieldFormsy
                      className="mt-8 mb-16 mr-8"
                      value={props.state.adress}
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t(
                                "customer.faceboock.customerInformation.address"
                              )}
                            </div>
                          )}
                        </Translation>
                      }
                      name="adress"
                      type="text"
                      multiline
                      rowsMax="4"
                      onChange={props.handleChange}
                      margin="normal"
                      variant="outlined"
                    />
                  </div>
                </Tabs.Tab>
                <Tabs.Tab
                  id="tab2"
                  title={
                    <Translation>
                      {(t) => (
                        <div>
                          {t("customer.faceboock.reparationInformation.title")}
                        </div>
                      )}
                    </Translation>
                  }
                >
                  <div
                    style={{ padding: 20 }}
                    className="flex max-w-2xl flex-col justify-center w-full"
                  >
                    <TextFieldFormsy
                      className="mt-8 mb-16 "
                      value={props.state.code}
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t(
                                "customer.faceboock.reparationInformation.code"
                              )}
                            </div>
                          )}
                        </Translation>
                      }
                      name="code"
                      type="text"
                      onChange={props.handleChange}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextFieldFormsy
                      className="mt-8 mb-16 "
                      value={props.state.modele}
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t(
                                "customer.faceboock.reparationInformation.device"
                              )}
                            </div>
                          )}
                        </Translation>
                      }
                      name="modele"
                      type="text"
                      onChange={props.handleChange}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextFieldFormsy
                      className="mt-8 mb-16 "
                      value={props.state.panne}
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t(
                                "customer.faceboock.reparationInformation.panneDetails"
                              )}
                            </div>
                          )}
                        </Translation>
                      }
                      name="panne"
                      type="text"
                      onChange={props.handleChange}
                      margin="normal"
                      variant="outlined"
                    />
                    <FuseChipSelect
                      className="w-full my-16"
                      value={props.state.status}
                      onChange={props.handleStatusChange}
                      placeholder="-"
                      textFieldProps={{
                        label: (
                          <Translation>
                            {(t) => (
                              <div>
                                {t(
                                  "customer.faceboock.reparationInformation.status.title"
                                )}
                              </div>
                            )}
                          </Translation>
                        ),
                        InputLabelProps: {
                          shrink: true,
                        },
                        variant: "outlined",
                      }}
                      options={[
                        {
                          key: "status_0",
                          value: 0,
                          label: (
                            <Translation>
                              {(t) => (
                                <div>
                                  {t(
                                    "customer.faceboock.reparationInformation.status.treated"
                                  )}
                                </div>
                              )}
                            </Translation>
                          ),
                        },
                        {
                          key: "status_1",
                          value: 1,
                          label: (
                            <Translation>
                              {(t) => (
                                <div>
                                  {t(
                                    "customer.faceboock.reparationInformation.status.noTreated"
                                  )}
                                </div>
                              )}
                            </Translation>
                          ),
                        },
                      ]}
                    />
                    <TextFieldFormsy
                      className="mt-8 mb-16 "
                      value={props.state.category}
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t(
                                "customer.faceboock.reparationInformation.category"
                              )}
                            </div>
                          )}
                        </Translation>
                      }
                      name="category"
                      type="text"
                      onChange={props.handleChange}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextFieldFormsy
                      className="mt-8 mb-16 "
                      value={props.state.remarque}
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t(
                                "customer.faceboock.reparationInformation.notice"
                              )}
                            </div>
                          )}
                        </Translation>
                      }
                      name="remarque"
                      type="text"
                      onChange={props.handleChange}
                      margin="normal"
                      variant="outlined"
                    />
                  </div>
                </Tabs.Tab>
                <Tabs.Tab
                  id="tab3"
                  title={
                    <Translation>
                      {(t) => (
                        <div>
                          {t("customer.faceboock.requestSupplier.title")}
                        </div>
                      )}
                    </Translation>
                  }
                >
                  <div
                    style={{ padding: 20 }}
                    className="flex max-w-2xl flex-col justify-center w-full"
                  >
                    <TextFieldFormsy
                      className="mt-8 mb-16 "
                      value={props.state.remarque}
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t(
                                "customer.faceboock.requestSupplier.noticeTeams"
                              )}
                            </div>
                          )}
                        </Translation>
                      }
                      name="remarque"
                      type="text"
                      onChange={props.handleChange}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextFieldFormsy
                      className="mt-8 mb-16 "
                      value={props.state.note}
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t(
                                "customer.faceboock.requestSupplier.supplierNote"
                              )}
                            </div>
                          )}
                        </Translation>
                      }
                      name="note"
                      type="text"
                      onChange={props.handleChange}
                      margin="normal"
                      variant="outlined"
                    />
                    <RadioGroupFormsy
                      className="my-16"
                      name="disponibilite"
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t(
                                "customer.faceboock.requestSupplier.disponibility.title"
                              )}
                            </div>
                          )}
                        </Translation>
                      }
                      value={props.state.disponibilite}
                      onChange={props.handleChangeDisponibilite}
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
                      className="mt-8 mb-16 "
                      value={props.state.prixpiece}
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t(
                                "customer.faceboock.requestSupplier.piecePrice"
                              )}
                            </div>
                          )}
                        </Translation>
                      }
                      name="prixpiece"
                      type="text"
                      onChange={props.handleChange}
                      margin="normal"
                      variant="outlined"
                    />
                  </div>
                </Tabs.Tab>
              </Tabs>

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

export default withTranslation()(withRouter(ClientFacebookForm));
