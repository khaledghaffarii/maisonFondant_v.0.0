import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { CardContent } from "@material-ui/core";
import { withSnackbar } from "notistack";
import { withTranslation, Translation } from "react-i18next";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import { withRouter } from "react-router-dom";
import Formsy from "formsy-react";
import { TextFieldFormsy } from "@fuse";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import { FuseAnimate } from "@fuse";
import env from "../../static";
const styles = (theme) => ({
  layoutRoot: {},
});

class DetailsProduct extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      prix: 0,
      parent: "",
      optionParent: [],
      couleur: "",
      disponibilite: "",
      file: "",
      show: false,
    };
  }
  async componentDidMount() {
    try {
      const url = env.products.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );
      const urlParent = env.products.all;
      const parent = await this.request.getAll(urlParent);
      let parentValue;
      if (response.data.parent) {
        parentValue = response.data.parent.name;
      } else {
        parentValue = "";
      }
      this.setState({
        name: response.data.name,
        prix: response.data.prix,
        parent: parentValue,
        optionParent: parent.data,
        couleur: response.data.couleur,
        disponibilite: response.data.disponibilite,
        file: response.data.picture,
      });

      response.data.prix > 0
        ? this.setState({ show: true })
        : this.setState({ show: false });
    } catch (e) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar(
          <Translation>
            {(t) => <div>{t("stock.edit.error")}</div>}
          </Translation>,
          {
            variant: "error",
          }
        );
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
            returnRoute="/product"
            title={
              <Translation>
                {(t) => <div>{t("product.details")}</div>}
              </Translation>
            }
          />
        }
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
            <FuseAnimate animation="transition.expandIn">
              <CardContent className="flex flex-col items-center justify-center p-32">
                <Formsy className="flex flex-col justify-center w-full">
                  <img
                    alt="Crop"
                    style={{ maxWidth: "100%" }}
                    src={`${env.staticFiles}${this.state.file}`}
                  />

                  <TextFieldFormsy
                    className="mt-8 mb-16 "
                    value={this.state.name}
                    label={
                      <Translation>
                        {(t) => <div>{t("category.name")}</div>}
                      </Translation>
                    }
                    name="name"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextFieldFormsy
                    className="mt-8 mb-16 "
                    value={this.state.prix}
                    label={
                      <Translation>
                        {(t) => <div>{t("product.price")}</div>}
                      </Translation>
                    }
                    name="prix"
                    type="number"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextFieldFormsy
                    className="mt-8 mb-16 "
                    value={this.state.parent}
                    label={
                      <Translation>
                        {(t) => <div>{t("product.parent.title")}</div>}
                      </Translation>
                    }
                    name="parent"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  {this.state.show ? (
                    <TextFieldFormsy
                      className="mt-8 mb-16 "
                      value={this.state.couleur}
                      label={
                        <Translation>
                          {(t) => <div>{t("product.color")}</div>}
                        </Translation>
                      }
                      name="couleur"
                      type="text"
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  ) : null}
                  {this.state.show ? (
                    <TextFieldFormsy
                      className="mt-8 mb-16 "
                      value={this.state.disponibilite}
                      label={
                        <Translation>
                          {(t) => <div>{t("product.disponibility.title")}</div>}
                        </Translation>
                      }
                      name="disponibilite"
                      type="text"
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  ) : null}
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
    withSnackbar(withRouter(DetailsProduct))
  )
);
