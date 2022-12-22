import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { CardContent } from "@material-ui/core";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import { withSnackbar } from "notistack";

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

class GammeDetails extends Component {
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
    };
  }
  async componentDidMount() {
    try {
      const url = env.gamme.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );
      console.log(
        "🚀 ~ file: BrandDetails.js ~ line 41 ~ BrandDetails ~ componentDidMount ~ response.data)",
        response.data
      );
      if (response.data.brandList && response.data.deviceList) {
        this.setState({
          name: response.data.name,
          brand: response.data.brandList.name,
          file: response.data.picture,
          device: response.data.deviceList["nameEnglish"],
        });
      } else if (response.data.brandList && !response.data.deviceList) {
        this.setState({
          name: response.data.name,
          device: " No option",
          brand: response.data.brandList.name,
          file: response.data.picture,
        });
      } else if (!response.data.brandList && response.data.deviceList) {
        this.setState({
          name: response.data.name,
          device: response.data.deviceList["nameEnglish"],
          brand: " No option",
          file: response.data.picture,
        });
      } else {
        this.setState({
          name: response.data.name,
          device: " No option",
          brand: " No option",
          file: response.data.picture,
        });
      }
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
            returnRoute="/gamme"
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
    withSnackbar(withRouter(GammeDetails))
  )
);
