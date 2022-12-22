import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Request from "../../utils/Request";
import Table from "../sharedComponent/Table";
import { Button } from "@material-ui/core";
import env from "../../static";
import { withSnackbar } from "notistack";
import decode from "jwt-decode";
import { withRouter } from "react-router-dom";
import CodeComponent from "./CodeComponent";
import RemarqueComponent from "./RemarqueComponent";
import moment from "moment";
import Moment from "react-moment";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class ClientFacebookTable extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        //{ title: 'confirmer', field: 'confirmer', render: rowData => this.buttonConfirmer(rowData) },
        {
          title: (
            <Translation>
              {(t) => <div>{t("customer.faceboock.code")}</div>}
            </Translation>
          ),
          field: "code",
          render: (rowData) => rowData.code,
        },

        {
          title: (
            <Translation>
              {(t) => <div>{t("customer.faceboock.customer.title")}</div>}
            </Translation>
          ),
          field: "name",
          render: (rowData) => (
            <div>
              <p>
                {this.props.t("customer.faceboock.customer.name")}:{" "}
                {rowData.name.name}
              </p>
              <p>
                {this.props.t("customer.faceboock.customer.email")}:{" "}
                {rowData.name.email}{" "}
              </p>
              <p>
                {this.props.t("customer.faceboock.customerInformation.phone")}:
                {rowData.name.phone}
              </p>
              <p>
                {this.props.t("customer.faceboock.customerInformation.address")}
                : {rowData.name.adress}
              </p>
            </div>
          ),
        },
        {
          title: (
            <Translation>
              {(t) => (
                <div>{t("customer.faceboock.panneIformation.title")}</div>
              )}
            </Translation>
          ),
          field: "panne",
          render: (rowData) => (
            <div>
              <p>
                {this.props.t(
                  "customer.faceboock.reparationInformation.device"
                )}
                : {rowData.panne.appareil}
              </p>
              <p>
                {this.props.t("customer.faceboock.panneIformation.panneSource")}
                : {rowData.panne.nature}
              </p>
            </div>
          ),
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("customer.faceboock.notice")}</div>}
            </Translation>
          ),
          field: "remarque",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("customer.faceboock.status")}</div>}
            </Translation>
          ),
          field: "status",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("customer.faceboock.action.title")}</div>}
            </Translation>
          ),
          render: (rowData) => (
            <div>
              {rowData.traited ? (
                <p>
                  {this.props.t("customer.faceboock.action.customerTreated")}
                </p>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.traiter.bind(this, rowData._id)}
                >
                  {this.props.t("customer.faceboock.action.customerTreated")}
                </Button>
              )}
            </div>
          ),
        },
        {
          title: "Link",
          field: "link",
          render: (rowData) => (
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={this.link.bind(this, rowData, this.props)}
              >
                {this.props.t("customer.faceboock.link")}
              </Button>
              <a
                class="MuiButtonBase-root MuiButton-root MuiButton-containedPrimary MuiButton-contained"
                style={{ color: "white", margin: 5 }}
                href={`mailto:?subject=Devis TrustiT&body=Bonjour,%0D%0Amerci de nous donner votre devis avec la meilleur offre de prix et la disponibilité pour ce produit : http://team.trustit.tn/formProvider/${rowData._id}%0D%0ACordialement Equipe TrustiT`}
              >
                Email
              </a>
            </div>
          ),
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("customer.faceboock.creationDate")}</div>}
            </Translation>
          ),
          field: "created_at",
          type: "date",
          render: (rowData) =>
            props.i18n.language === "en" ? (
              <Moment format={"llll"} locale={"en"}>
                {rowData.created_at}
              </Moment>
            ) : (
              <Moment format={"llll"} locale={"fr"}>
                {rowData.created_at}
              </Moment>
            ),
        },
      ],
      data: [],
      selctedRowlength: 0,
      tableRef: React.createRef(),
    };
    this.delete = this.delete.bind(this);
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
  }
  async traiter(id) {
    try {
      const user = decode(localStorage.getItem("id_token"));
      const result = await this.request.update(
        env.clientFacebook.update(id),
        { traited: true, updatedBy: user.id },
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
  link(rowData, props) {
    props.history.push("/formProvider/" + rowData._id);
  }
  fetchData(query) {
    return new Promise(async (resolve, reject) => {
      let url = env.clientFacebook.list + "?";
      url += "page=" + (query.page + 1);
      url += "&count=" + query.pageSize;
      url += "&search=" + query.search;
      if (query.filters.length > 0) {
        query.filters.forEach((elem) => {
          url += `&filters[]=${elem.column.field},${elem.value}`;
        });
      } else {
        url += "&filters=";
      }
      try {
        const result = await this.request.getAll(url);
        let dataList = [];
        result.data.data.forEach((element) => {
          dataList.push({
            _id: element._id,
            code: (
              <CodeComponent
                key={element._id}
                currentCode={element.code}
                locked={element.locked}
                _id={element._id}
              />
            ),
            name: {
              name: element.name,
              adress: element.adress,
              email: element.email,
              phone: element.phone,
            },
            panne: {
              nature: element.panne,
              appareil: element.modele,
            },
            status: element.status,
            remarque: (
              <RemarqueComponent
                key={element._id}
                currentRemarque={element.remarque}
                locked={element.locked}
                _id={element._id}
              />
            ),

            traited: element.traited ? true : false,
            created_at: element.created_at,
          });
        });
        resolve({
          data: dataList,
          page: Number(result.data.page) - 1,
          totalCount: result.data.totalCount,
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
    });
  }

  async componentDidMount() {}
  async delete(id) {
    try {
      const url = env.clientFacebook.remove(id);
      await this.request.update(url, { id }, false);
      this.state.tableRef.current.onQueryChange();

      this.props.enqueueSnackbar("Operation reussi avec succes", {
        variant: "success",
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
  setStateOnDelete(data) {
    this.setState({
      ...this.state,
      data,
    });
  }

  render() {
    return (
      <Table
        deleted={localStorage.getItem("AdminOrTeam") == "admin" ? true : false}
        title={this.props.t("customer.faceboock.customer.title")}
        columns={this.state.columns}
        data={this.fetchData.bind(this)}
        routeEdit="/editClientFb"
        delete={this.delete}
        setStateOnDelete={this.setStateOnDelete}
        showMore="/detailsClientFb"
        state={this.state}
        rowStyle={(rowData) =>
          rowData.traited
            ? { background: "#00ff7526" }
            : { background: "#ff000024" }
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(ClientFacebookTable))
  )
);
