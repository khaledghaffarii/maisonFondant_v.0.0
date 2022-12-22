import React, { Component } from "react";
import Request from "../../utils/Request";
import Table from "../sharedComponent/Table";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import env from "../../static";
import TabsCommandes from "./TabsCommandes";
import SimpleModal from "../sharedComponent/SimpleModal";
import "react-image-lightbox/style.css";
import { withTranslation, Translation } from "react-i18next";
class StockTable extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: (
            <Translation>{(t) => <div>{t("invoice.number")}</div>}</Translation>
          ),
          field: "numero",
        },
        {
          title: (
            <Translation>{(t) => <div>{t("invoice.reparation")}</div>}</Translation>
          ),
          field: "reparation",
          render: (rowData) => (
            <a href={`/facture/edit/${rowData._id}`}>
              {rowData.reparation.map((reparation) => (
                <>{reparation.code + " "}</>
              ))}
            </a>
          ),
        },
        { title:(
          <Translation>{(t) => <div>{t("invoice.tva")}</div>}</Translation>
        ), field: "tva" },
        { title: (
          <Translation>{(t) => <div>{t("invoice.stamp")}</div>}</Translation>
        ), field: "timber" },
        { title: (
          <Translation>{(t) => <div>{t("invoice.preTaxeAmount")}</div>}</Translation>
        ), field: "montant_ht" },
        { title:(
          <Translation>{(t) => <div>{t("invoice.totalAmount")}</div>}</Translation>
        ), field: "montant_ttc" },
        { title: (
          <Translation>{(t) => <div>{t("invoice.pieceList")}</div>}</Translation>
        ),field: "listPieces" },
        { title: (
          <Translation>{(t) => <div>{t("invoice.notice")}</div>}</Translation>
        ), field: "remarque" },
        { title: (
          <Translation>{(t) => <div>{t("invoice.state")}</div>}</Translation>
        ), field: "etat" },
        {
          title: (
            <Translation>{(t) => <div>{t("invoice.customer")}</div>}</Translation>
          ),
          field: "owner",
          render: (rowData) => (
            <p>
              {" "}
              {rowData.owner
                ? rowData.owner.fname + " " + rowData.owner.lname
                : ""}
            </p>
          ),
        },
        {
          title: (
            <Translation>{(t) => <div>{t("devis.print")}</div>}</Translation>
          ),
          field: "Imprimer",
          render: (rowData) => (
            <a href={`/facture/imprimer/${rowData._id}`}>Imprimer</a>
          ),
        },
      ],
      data: [],
      selctedRowlength: 0,
      tableRef: React.createRef(),
    };
    this.delete = this.delete.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
    this.commentsModal = this.commandesModal.bind(this);
  }
  commandesModal(rowData, list) {
    return (
      <SimpleModal
        list={list._id}
        badgeContent={
          (rowData.orders || []).length > 0
            ? rowData.orders.filter((order) => order.status == "En Attente")
                .length
            : 0
        }
        showReparations={<TabsCommandes orders={rowData.orders} />}
      />
    );
  }
  fetchData(query) {
    return new Promise(async (resolve, reject) => {
      let url = env.devis.list + "?";
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
          dataList.push({ ...element, id: element._id });
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
  async delete(id) {
    try {
      const url = env.devis.remove(id);
      await this.request.delete(url);
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
        title="Facture"
        columns={this.state.columns}
        data={this.fetchData}
        routeEdit="/facture/edit"
        delete={this.delete}
        setStateOnDelete={this.setStateOnDelete}
        showMore="/facture/info"
        state={this.state}
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(StockTable)));
