import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { CardContent } from "@material-ui/core";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import { withSnackbar } from "notistack";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Formsy from "formsy-react";
import { TextFieldFormsy } from "@fuse";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import { FuseAnimate } from "@fuse";
import env from "../../static";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class ModelDetails extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      file: "",
      brandList: [],
      brand: "",
      deviceList: [],
      device: "",
      colorList: [],
      color: "",
      codeColor: "",
      gammeList: [],
      gamme: "",
    };
  }
  async componentDidMount() {
    try {
      const url = env.model.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );

      Object.keys(response.data.colorList).forEach((key) => {
        this.setState({
          color: response.data.colorList[key].nameColorEnglish,
          codeColor: response.data.colorList[key].codeColor,
        });
      });
      this.setState({
        name: response.data.name,
        brand: response.data.brandList.name,
        file: response.data.picture,
        device: response.data.deviceList["nameEnglish"],
        gamme: response.data.gammeList["name"],
      });
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
            returnRoute="/model"
            title={
              <Translation>
                {(t) => <div>{t("gamme.gammeDetails")}</div>}
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
                    value={this.state.device}
                    label={
                      <Translation>
                        {(t) => <div>{t("device.device")}</div>}
                      </Translation>
                    }
                    name="device"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextFieldFormsy
                    className="mt-8 mb-16 "
                    value={this.state.brand}
                    label={
                      <Translation>
                        {(t) => <div>{t("brind.brind")}</div>}
                      </Translation>
                    }
                    name="brand"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextFieldFormsy
                    className="mt-8 mb-16 "
                    value={this.state.gamme}
                    label={
                      <Translation>
                        {(t) => <div>{t("gamme.range")}</div>}
                      </Translation>
                    }
                    name="gamme"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  {/* <TextFieldFormsy
                    className="mt-8 mb-16 "
                    value={this.state.color}
                    label={
                      <Translation>
                        {(t) => <div>{t("model.nameColor")}</div>}
                      </Translation>
                    }
                    name="color"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  /> */}

                  <Grid container alignItems="flex-start">
                    <Grid item xs={1}>
                     
                       <div
                        style={{
                          backgroundColor: `${this.state.codeColor}`,
                          borderRadius: "50%",
                          display: "inline-block",
                          margin: 20,
                          height: "40px",
                          width: "40px",
                        }}
                      />
                    </Grid>
                    <Grid item xs={9}>
                     
                      <TextFieldFormsy
                        className="w-full my-16"
                        value={this.state.color}
                        label={
                          <Translation>
                            {(t) => <div>{t("model.nameColor")}</div>}
                          </Translation>
                        }
                        name="color"
                        type="text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                        required
                      />
                    </Grid>
                  </Grid>
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
    withSnackbar(withRouter(ModelDetails))
  )
);
