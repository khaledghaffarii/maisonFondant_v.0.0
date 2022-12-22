import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { FusePageCarded } from "@fuse";
import { withSnackbar } from "notistack";
import { useDropzone } from "react-dropzone";

import FormHeader from "../sharedComponent/FormHeader";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import StockForm from "./StockForm";
import env from "../../static";
import { withRouter } from "react-router-dom";
import { withTranslation, useTranslation, Translation } from "react-i18next";
import CroppedImage from "../sharedComponent/CroppedImage";

const styles = (theme) => ({
  layoutRoot: {},
});
const ImageManager = withSnackbar(({ id, enqueueSnackbar }) => {
  const { t } = useTranslation();
  const request = new Request();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const [pictures, setPictures] = React.useState([]);
  const removeFile = async (index) => {
    try {
      const url = env.stock.unlink_image;
      const response = await request.new(url, { id, index }, false);
      setPictures(response.data.pictures);
      enqueueSnackbar(t("stock.edit.success"), {
        variant: "success",
      });
    } catch (e) {
      if (e.response) {
        enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        enqueueSnackbar(
          <Translation>
            {(t) => <div>{t("stock.edit.error")}</div>}
          </Translation>,
          {
            variant: "error",
          }
        );
      }
    }
  };
  const files = pictures.map((file, index) => (
    <div style={{ position: "relative" }}>
      <img
        src={`https://statics.trustit.tn${file}`}
        style={{
          width: 120,
          height: 120,
          borderRadius: 10,
          border: "5px solid #1C1A1F20",
          margin: 10,
        }}
      />
      <i
        onClick={() => removeFile(index)}
        style={{
          fontSize: 15,
          padding: "10px 14px",
          color: "#FFF",
          background: "#e74c3c",
          borderRadius: 24,
          cursor: "pointer",
          position: "absolute",
          top: -10,
          right: -10,
        }}
        class="fa fa-trash-o"
        aria-hidden="true"
      ></i>
    </div>
  ));
  const uploadFile = async (file) => {
    let form_data = new FormData();
    form_data.append("file", file, file.name);
    form_data.append("id", id);
    try {
      const url = env.stock.link_image;
      const response = await request.new(url, form_data, true);
      setPictures(response.data.pictures);
      enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
    } catch (e) {
      if (e.response) {
        enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        enqueueSnackbar(
          <Translation>
            {(t) => <div>{t("stock.edit.error")}</div>}
          </Translation>,
          {
            variant: "error",
          }
        );
      }
    }
  };
  React.useEffect(() => {
    for (const file of acceptedFiles) {
      uploadFile(file);
    }
  }, [acceptedFiles]);

  return (
    <div style={{ padding: 30 }}>
      <section className="container">
        <aside>
          <h4>
            {" "}
            <Translation>
              {(t) => <div>{t("stock.edit.file")}</div>}
            </Translation>
          </h4>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {files}
          </div>
        </aside>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>
            {" "}
            <Translation>
              {(t) => <div>{t("stock.edit.drag")}</div>}
            </Translation>
            
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 30,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            className="w-224 mx-auto mt-16"
            aria-label="Enregistrer"
            onClick={() => {
              window.location = "/stock";
            }}
          >
            <Translation>{(t) => <div>{t("stock.save")}</div>}</Translation>
          </Button>
        </div>
      </section>
    </div>
  );
});
class NewStock extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: "",
      description: "",
      price: 0,
      priceForClient: 0,
      quantity: 0,
      postedBy: {},
      repairerOptions: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChipChangeRepairer = this.handleChipChangeRepairer.bind(this);
  }
  fileChangedHandler = (image) => {
    this.setState({ file: image });
  };
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleChangeSelect(event) {
    this.setState({
      lang: event,
    });
  }
  handleChipChangeRepairer(value) {
    this.setState({ postedBy: value });
  }
  handleSubmit = async (e) => {
    const { name, description, price, priceForClient, quantity, postedBy } =
      this.state;
    try {
      const url = env.stock.new;
      const response = await this.request.new(
        url,
        {
          name,
          description,
          price,
          priceForClient,
          quantity,
          postedBy: postedBy.value,
        },
        false
      );
      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
      this.setState({ id: response.data._id });
    } catch (err) {
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
  };
  handleChangeDescription(content) {
    this.setState({ content });
  }
  async componentDidMount() {
    const urlRepairers = env.repairers.all;
    const repairers = await this.request.getAll(urlRepairers);
    this.setState({ repairerOptions: repairers.data });
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
            returnRoute="/stock"
            title={this.props.t("stock.addNewStockButton")}
          />
        }
        content={
          this.state.id ? (
            <ImageManager id={this.state.id} />
          ) : (
            <StockForm
              handleSubmit={this.handleSubmit}
              state={this.state}
              ButtonText="Ajouter"
              handleChange={this.handleChange}
              fileChangedHandler={this.fileChangedHandler}
              handleChangeSelect={this.handleChangeSelect}
              handleChangeDescription={this.handleChangeDescription}
              handleChipChangeRepairer={this.handleChipChangeRepairer}
            />
          )
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withSnackbar(withRouter(NewStock)))
);
