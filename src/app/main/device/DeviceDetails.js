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

class DeviceDetails extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      nameArabe: "",
      nameFrench: "",
      nameEnglish: "",

      file: "",
    };
  }
  async componentDidMount() {
    try {
      const url = env.device.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );
     

      this.setState({
        nameArabe: response.data.nameArabe,

        nameFrench: response.data.nameFrench,
        nameEnglish: response.data.nameEnglish,

        file: response.data.picture,
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
            returnRoute="/device"
            title={
              <Translation>
                {(t) => <div>{t("device.deviceDetails")}</div>}
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
                    value={this.state.nameArabe}
                    label={
                      <Translation>
                        {(t) => <div>{t("device.nameArabic")}</div>}
                      </Translation>
                    }
                    name="nameArabe"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextFieldFormsy
                    className="mt-8 mb-16"
                    value={this.state.nameFrench}
                    label={
                      <Translation>
                        {(t) => <div>{t("device.nameFrench")}</div>}
                      </Translation>
                    }
                    name="nameFrench"
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                    required
                  />{" "}
                  <TextFieldFormsy
                    className="mt-8 mb-16"
                    value={this.state.nameEnglish}
                    label={
                      <Translation>
                        {(t) => <div>{t("device.nemEnglish")}</div>}
                      </Translation>
                    }
                    name="nameEnglish"
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                    required
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
    withSnackbar(withRouter(DeviceDetails))
  )
);
