import React, { Component } from "react";
import Request from "../../utils/Request";
import Table from "../sharedComponent/Table";
import { withSnackbar } from "notistack";

import { withRouter } from "react-router-dom";
import env from "../../static";
import { Button } from "@material-ui/core";
import Moment from "react-moment";
import fr from "moment/locale/fr";
import { withTranslation, Translation } from "react-i18next";
class CategoryTable extends Component {
  request = new Request();
  replay(email) {
    window.location.href = `mailto:${email}?subject=Support+TrustiT`;
  }
  async traiter(id) {
    try {
      const result = await this.request.update(
        env.messages.update(id),
        { traiter: true },
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
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: (
            <Translation>
              {(t) => <div>{t("reparation.customer")}</div>}
            </Translation>
          ),
          render: (rowData) => (
            <div>
              <p>
                {this.props.t("customer.faceboock.customer.name")}:{" "}
                {rowData.nom}
              </p>
              <p>
                <a href={`mailto:${rowData.email}`}>{rowData.email}</a>
              </p>
              <p>
                {" "}
                {this.props.t("customer.faceboock.customerInformation.phone")}:
                {rowData.phone}
              </p>
            </div>
          ),
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("message.message")}</div>}
            </Translation>
          ),
          field: "message",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("reparation.creationDate")}</div>}
            </Translation>
          ),
          render: (rowData) => (
            <Moment format={"llll"} locale={"fr"}>
              {rowData.created_at}
            </Moment>
          ),
          type: "date",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("commandes.action")}</div>}
            </Translation>
          ),
          render: (rowData) => (
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={this.replay.bind(this, rowData.email)}
              >
                {this.props.t("message.sendMail")}
              </Button>
              {rowData.traiter ? (
                <div />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.traiter.bind(this, rowData._id)}
                >
                  {this.props.t("message.prossedMessage")}
                </Button>
              )}
            </div>
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

  fetchData(query) {
    return new Promise(async (resolve, reject) => {
      let url = env.messages.list + "?";
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
          let parentValue = "";
          if (element.parent) {
            parentValue = element.parent.name;
          } else {
            parentValue = "pas de parent";
          }

          dataList.push({
            ...element,
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
    });
  }
  async componentDidMount() {}
  async delete(event, rowId) {
    try {
      const url = env.messages.remove;
      await this.request.new(
        url,
        rowId.map((row) => row._id)
      );
      this.state.tableRef.current.onQueryChange();

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
        this.props.enqueueSnackbar(e.message, {
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
        rewriteAction={true}
        actions={[
          (rowData) => ({
            tooltip: "Remove All Selected Requests",
            icon: "delete",
            onClick: this.delete,
          }),
        ]}
        title={this.props.t("message.title")}
        columns={this.state.columns}
        data={this.fetchData.bind(this)}
        delete={this.delete}
        state={this.state}
        rowStyle={(rowData) =>
          rowData.traiter
            ? { background: "#00ff7526" }
            : { background: "#ff000024" }
        }
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(CategoryTable)));
