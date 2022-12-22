import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";

import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import StockForm from "./StockForm";
import env from "../../static";
import { CircularProgress } from "@material-ui/core";
import { Tabs } from "@yazanaabed/react-tabs";
import { useDropzone } from "react-dropzone";
import { Button } from "@material-ui/core";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

const ImageManager = withSnackbar(
  ({ id, enqueueSnackbar, initialPictures }) => {
    const request = new Request();
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const [pictures, setPictures] = React.useState(initialPictures || []);

    React.useEffect(() => {
      if (initialPictures) {
        setPictures(initialPictures);
      }
    }, [initialPictures]);
    const removeFile = async (index) => {
      try {
        const url = env.stock.unlink_image;
        const response = await request.new(url, { id, index }, false);
        setPictures(response.data.pictures);
        enqueueSnackbar(this.props.t("stock.edit.success"), {
          variant: "success",
        });
      } catch (e) {
        if (e.response) {
          enqueueSnackbar(e.response.data.message, {
            variant: "error",
          });
        } else {
          enqueueSnackbar(this.props.t("stock.edit.error"), {
            variant: "error",
          });
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
        enqueueSnackbar(this.props.t("stock.edit.success"), {
          variant: "success",
        });
      } catch (e) {
        if (e.response) {
          enqueueSnackbar(e.response.data.message, {
            variant: "error",
          });
        } else {
          enqueueSnackbar(this.props.t("stock.edit.error"), {
            variant: "error",
          });
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
              {
                <Translation>
                  {(t) => <div>{t("stock.edit.file")}</div>}
                </Translation>
              }
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
              {
                <Translation>
                  {(t) => <div>{t("stock.edit.save")}</div>}
                </Translation>
              }
            </Button>
          </div>
        </section>
      </div>
    );
  }
);

class EditStock extends Component {
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
      pictures: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChipChangeRepairer = this.handleChipChangeRepairer.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleChipChangeRepairer(value) {
    this.setState({ postedBy: value });
  }
  handleChangeDescription(content) {
    this.setState({ content });
  }
  async update() {
    const { name, description, price, priceForClient, quantity, postedBy } =
      this.state;
    try {
      const url = env.stock.update(this.props.match.params.id);
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
      this.props.history.push("/stock");
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
  async componentDidMount() {
    try {
      const url = env.stock.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );
      const urlRepairers = env.repairers.all;
      const repairers = await this.request.getAll(urlRepairers);
      this.setState({
        repairerOptions: repairers.data,
        name: response.data.name,
        id: response.data._id,
        description: response.data.description,
        price: response.data.price,
        priceForClient: response.data.priceForClient,
        quantity: response.data.quantity,
        postedBy: {
          key: response.data.postedBy?._id,
          value: response.data.postedBy?._id,
          label: `${response.data.postedBy?.fname} ${response.data.postedBy?.lname}`,
        },
        pictures: response.data.pictures || [],
        loading: false,
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
            returnRoute="/stock"
            title={this.props.t("stock.edit.title")}
          />
        }
        content={
          this.state.loading ? (
            <div
              style={{
                flex: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress color="secondary" />
              <h1>{this.props.t("stock.edit.loading")}...</h1>
            </div>
          ) : (
            <Tabs
              activeTab={{
                id: "tab1",
              }}
            >
              <Tabs.Tab
                id="tab1"
                title={this.props.t("stock.edit.information")}
              >
                <div
                  style={{ padding: 20 }}
                  className="flex flex-col justify-center w-full"
                >
                  <div class="row">
                    <StockForm
                      showCover={this.state.showCover}
                      handleSubmit={this.update}
                      state={this.state}
                      ButtonText="Metter À jour"
                      handleChange={this.handleChange}
                      fileChangedHandler={this.fileChangedHandler}
                      handleChangeSelect={this.handleChangeSelect}
                      handleChangeDescription={this.handleChangeDescription}
                      handleChipChangeRepairer={this.handleChipChangeRepairer}
                    />
                  </div>
                </div>
              </Tabs.Tab>
              <Tabs.Tab id="tab2" title={this.props.t("stock.edit.imageList")}>
                <div
                  style={{ padding: 20 }}
                  className="flex flex-col justify-center w-full"
                >
                  <div class="row">
                    <ImageManager
                      id={this.state.id}
                      initialPictures={this.state.pictures}
                    />
                  </div>
                </div>
              </Tabs.Tab>
            </Tabs>
          )
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(withSnackbar(withRouter(EditStock)))
);
