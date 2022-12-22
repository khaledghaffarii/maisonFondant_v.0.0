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

class CommandesTable extends Component {
  request = new Request();

  replay(email) {
    window.location.href = `mailto:${email}?subject=B2B+TrustiT`;
  }
  async traiter(id) {
    try {
      const result = await this.request.update(
        env.b2b.update(id),
        { traiter: true },
        false
      );
      
      this.props.enqueueSnackbar("B2B mis à jour", {
        variant: "success",
      });
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
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: (
            <Translation>
              {(t) => <div>{t("commandes.orderCode")}</div>}
            </Translation>
          ),
          field: "code",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("commandes.requestedPiece")}</div>}
            </Translation>
          ),
          render: (rowData) =>
            rowData.piece?._id ? (
              <div>
                <p style={{ padding: 0, margin: 0 }}>
                  <b>
                    {" "}
                    <Translation>
                      {(t) => <div>{t("commandes.pieceName")}</div>}
                    </Translation>
                    :
                  </b>{" "}
                  {rowData.piece.name}
                </p>
                <p style={{ padding: 0, margin: 0 }}>
                  <b>
                    {" "}
                    <Translation>
                      {(t) => <div>{t("commandes.repairerName")}</div>}
                    </Translation>
                    :
                  </b>{" "}
                  {rowData.piece.postedBy.fname} {rowData.piece.postedBy.lname}
                </p>
                <p style={{ padding: 0, margin: 0 }}>
                  <b>
                    <Translation>
                      {(t) => <div>{t("commandes.price")}</div>}
                    </Translation>
                    :
                  </b>{" "}
                  {rowData.piece.price}
                </p>
                <p style={{ padding: 0, margin: 0 }}>
                  <b>
                    <Translation>
                      {(t) => <div>{t("commandes.dispoQuantity")}</div>}
                    </Translation>
                    :
                  </b>{" "}
                  {rowData.piece.quantity}
                </p>
              </div>
            ) : (
              <div>-</div>
            ),
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("commandes.repairer")}</div>}
            </Translation>
          ),
          render: (rowData) => (
            <div>
              <p style={{ padding: 0, margin: 0 }}>
                <b>
                  {" "}
                  <Translation>
                    {(t) => <div>{t("commandes.nameRepairer")}</div>}
                  </Translation>
                  :
                </b>{" "}
                {rowData.orderBy.fname} {rowData.orderBy.lname}
              </p>
              <p style={{ padding: 0, margin: 0 }}>
                <b>
                  <Translation>
                    {(t) => <div>{t("commandes.emailRepairer")}</div>}
                  </Translation>
                  :
                </b>{" "}
                {rowData.orderBy.email}
              </p>
              <p style={{ padding: 0, margin: 0 }}>
                <b>
                  <Translation>
                    {(t) => <div>{t("commandes.phoneRepairer")}</div>}
                  </Translation>
                  :
                </b>{" "}
                {rowData.orderBy.phone}
              </p>
            </div>
          ),
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("commandes.requestedQuantity")}</div>}
            </Translation>
          ),
          render: (rowData) => <p>{rowData.quantity}</p>,
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("commandes.orderDate")}</div>}
            </Translation>
          ),

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
              {rowData.traiter ? (
                <Button
                  onClick={() => {
                    annulOrder(rowData._id);
                  }}
                  variant="contained"
                  color="primary"
                  style={{ background: "gray", marginTop: 10, width: "100%" }}
                >
                  <Translation>
                    {(t) => <div>{t("commandes.CancelButton")}</div>}
                  </Translation>
                  ,
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      acceptOne(rowData._id);
                    }}
                    disabled={rowData.quantity > rowData.piece.quantity}
                    variant="contained"
                    color="primary"
                    style={{
                      background:
                        rowData.quantity > rowData.piece.quantity
                          ? "#1C1A1F30"
                          : "green",
                      marginTop: 10,
                      width: "100%",
                    }}
                  >
                    <Translation>
                      {(t) => <div>{t("commandes.submitButton")}</div>}
                    </Translation>
                  </Button>
                  <br />
                  <Button
                    onClick={() => {
                      rejectOne(rowData._id);
                    }}
                    style={{ background: "red", marginTop: 10, width: "100%" }}
                    variant="contained"
                    color="secondary"
                  >
                    <Translation>
                      {(t) => <div>{t("commandes.CancelButton")}</div>}
                    </Translation>
                  </Button>
                </>
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
    this.acceptOne = this.acceptOne.bind(this);
    this.rejectOne = this.rejectOne.bind(this);
  }

  fetchData(query) {
    return new Promise(async (resolve, reject) => {
      let url = env.stock.list_commandes + "?";
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
          this.props.enqueueSnackbar(e.message, {
            variant: "error",
          });
        }
      }
    });
  }
  async componentDidMount() {}
  async delete(event, rowId) {
    try {
      const url = env.stock.remove_order;
      await this.request.new(
        url,
        rowId.map((row) => row._id)
      );
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

  async rejectOne(order_id) {
    try {
      const url = env.stock.reject_order;
      await this.request.new(url, { id: order_id });
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
        this.props.enqueueSnackbar(e.message, {
          variant: "error",
        });
      }
    }
  }

  async acceptOne(order_id) {
    try {
      const url = env.stock.accept_order;
      await this.request.new(url, { id: order_id });
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
        this.props.enqueueSnackbar(e.message, {
          variant: "error",
        });
      }
    }
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
        title={this.props.t("commandes.orderTilte")}
        columns={this.state.columns}
        data={this.fetchData.bind(this)}
        delete={this.delete}
        state={this.state}
        rowStyle={(rowData) =>
          rowData.traiter
            ? {
                background:
                  rowData.status == "Accepté" ? "#00ff7526" : "#ff000024",
              }
            : { background: "#f39c1225" }
        }
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(CommandesTable)));
