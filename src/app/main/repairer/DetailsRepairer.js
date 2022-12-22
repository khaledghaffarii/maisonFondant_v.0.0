import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { CardContent } from "@material-ui/core";
import { withSnackbar } from "notistack";
import { withTranslation, Translation } from "react-i18next";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import { TextFieldFormsy } from "@fuse";
import Formsy from "formsy-react";
import env from "../../static";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import { FuseAnimate } from "@fuse";
import { withRouter } from "react-router-dom";
const styles = (theme) => ({
  layoutRoot: {},
});

class DetailsRepairer extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      phone: "",
      boutiqueOptions: [],
      boutique: "",
    };
  }

  async componentDidMount() {
    try {
      const url = env.repairers.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );
      const urlboutique = env.boutiques.all;
      const boutiques = await this.request.getAll(urlboutique);
      this.setState({
        boutiqueOptions: boutiques.data,
      });
      this.setState({
        fname: response.data.fname,
        lname: response.data.lname,
        email: response.data.email,
        phone: response.data.phone,
        boutique: response.data.boutique.name,
        boutiqueOptions: boutiques.data,
      });
    } catch (e) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar("Erreur", {
          variant: "error",
        });
      }
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <FormHeader
            returnRoute="/Repairer"
            title={
              <Translation>
                {(t) => <div>{t("repairer.details")}</div>}
              </Translation>
            }
          />
        }
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
            <FuseAnimate animation="transition.expandIn">
              <CardContent className="flex flex-col items-center justify-center p-32">
                <Formsy className="flex flex-col justify-center w-full">
                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.fname}
                    label={
                      <Translation>
                        {(t) => <div>{t("repairer.firstName")}</div>}
                      </Translation>
                    }
                    name="fname"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.lname}
                    label={
                      <Translation>
                        {(t) => <div>{t("repairer.lastName")}</div>}
                      </Translation>
                    }
                    name="lname"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextFieldFormsy
                    className="mt-8 mb-16"
                    value={this.state.email}
                    label={
                      <Translation>
                        {(t) => <div>{t("repairer.email")}</div>}
                      </Translation>
                    }
                    type="email"
                    name="email"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextFieldFormsy
                    className="mt-8 mb-16"
                    value={this.state.phone}
                    label={
                      <Translation>
                        {(t) => <div>{t("repairer.phone")}</div>}
                      </Translation>
                    }
                    name="phone"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  <TextFieldFormsy
                    className="mt-8 mb-16"
                    value={this.state.boutique}
                    type="text"
                    name="boutique"
                    label={
                      <Translation>
                        {(t) => <div>{t("repairer.boutique")}</div>}
                      </Translation>
                    }
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Formsy>
              </CardContent>
            </FuseAnimate>
          </div>
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(DetailsRepairer))
  )
);
