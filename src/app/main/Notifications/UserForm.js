import React, { Component } from "react";
import { Button, CardContent } from "@material-ui/core";
import { TextFieldFormsy } from "@fuse";
import { FuseAnimate } from "@fuse";
import Formsy from "formsy-react";
import SearchBar from "../sharedComponent/SearchBar";
import { withTranslation, Translation } from "react-i18next";
import { withRouter } from "react-router-dom";

class UserForm extends Component {
  render() {
    const props = this.props;

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
              <SearchBar
                name="Client"
                placeHolder="Saisie le nom du client"
                label={
                  <Translation>
                    {(t) => <div>{t("reparation.customer")}</div>}
                  </Translation>
                }
                suggestions={props.state.users}
                suggest={props.handleSuggestUser.bind(this)}
                select={props.handleSelect}
                state={props.state}
                render={(client) => (
                  <li
                    key={client._id}
                    indexkey={client._id}
                    onClick={() => props.handleSelect(client)}
                    style={{
                      padding: 10,
                      borderBottom: "1px solid #eee",
                      color: "rgb(58, 64, 78)",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: 15,
                    }}
                    data-id={client._id}
                  >
                    {client.fname} {client.lname} ({client.phone})
                  </li>
                )}
              />
              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.title}
                type="text"
                name="title"
                label={
                  <Translation>
                    {(t) => <div>{t("notification.notificationTitle")}</div>}
                  </Translation>
                }
                margin="normal"
                variant="outlined"
                onChange={props.handleChange}
                required
              />
              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.body}
                type="text"
                name="body"
                label={
                  <Translation>
                    {(t) => <div>{t("notification.notificatiobContent")}</div>}
                  </Translation>
                }
                margin="normal"
                variant="outlined"
                multiline
                rowsMax="4"
                onChange={props.handleChange}
                required
              />

              <Button
                variant="contained"
                color="primary"
                className="w-224 mx-auto mt-16"
                aria-label="Register"
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

export default withTranslation()(withRouter(UserForm));
