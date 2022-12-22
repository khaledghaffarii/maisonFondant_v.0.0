import { withStyles } from "@material-ui/core/styles";

import React, { Component } from "react";
import Request from "../../utils/Request";
import ArchiveTable from "../sharedComponent/ArchiveTable";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import env from "../../static";
import { withSnackbar } from "notistack";
import Table from "../sharedComponent/Table";
import moment from "moment";
import StateComponent from "./StateComponent";
import SimpleModal from "../sharedComponent/SimpleModal";
import TabsRemarques from "./TabsRemarques";
import { withTranslation, Translation, useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
const styles = (theme) => ({
  layoutRoot: {},
});
class ArchiveReparation extends Component {
  request = new Request();
  token = localStorage.getItem("id_token");
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: [],
      selctedRowlength: 0,
      tableRef: React.createRef(),
    };
    this.delete = this.delete.bind(this);
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
    this.exportsReparation = this.exportsReparation.bind(this);
    this.remarquesModal = this.remarquesModal.bind(this);
    this.restoreReparations = this.restoreReparations.bind(this);
  }
  fetchData(query) {
    return new Promise(async (resolve, reject) => {
      let url = env.reparations.archive + "?";
      url += "page=" + (query.page + 1);
      url += "&count=" + query.pageSize;
      url += "&search=" + query.search;
      if (query.filters.length > 0) {
        query.filters.forEach((elem) => {
          url += `&filters[]=${elem.column.field},${
            elem.column.field === "created_at" ||
            elem.column.field === "date depot" ||
            elem.column.field === "date recuperation"
              ? moment(elem.value).format("DD/MM/YYYY")
              : elem.value
          }`;
        });
      } else {
        url += "&filters=";
      }
      try {
        let dataList = [];
        let page;
        let totalCount;
        url += "&team=NONE";
        const response = await this.request.getAll(url);
        page = Number(response.data.page) - 1;
        totalCount = response.data.totalCount;
        response.data.data.forEach((element) => {
          dataList.push({
            _id: element._id,
            code: element.code,
            Panne: element.category
              ? element.category && element.category.displayName
                ? element.category.displayName
                : element.category.name
              : "Category non Specifié",
            etat: <StateComponent etat={element.etat} _id={element._id} />,
            prix: element.prix > 0 ? element.prix : "Aprés Diagnostic",
            prixPiece: element.prixPiece,
            avance: element.avance,
            detailsPanne: element.detailsPanne,
            centreDepot: element.centreDepot ? element.centreDepot.name : "",
            centreService: element.centreService
              ? element.centreService.name
              : "",
            centreRecuperation: element.centreRecuperation
              ? element.centreRecuperation.name
              : "",
            estimatedTimeReparation: element.estimatedTimeReparation,
            estimatedTimeLivraison: element.estimatedTimeLivraison,
            repairer: element.repairer
              ? element.repairer
              : { fname: "None Spécifié" },
            owner: element.owner,
            remarqueAcquisition: element.remarqueAcquisition,
            remarqueClient: element.remarqueClient,
            remarqueEquipe: element.remarqueEquipe,
            remarqueSatisfaction: element.remarqueSatisfaction,
            remarqueSuivi: element.remarqueSuivi,
            remarqueTrustit: element.remarqueTrustit,
            created_at: element.created_at
              ? moment(element.created_at).format("DD-MM-YYYY")
              : "",
          });
        });
        resolve({
          data: dataList,
          page: page,
          totalCount: totalCount,
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
        console.log(e);
      }
    });
  }

  async componentDidMount() {
    try {
      const column = [
        {
          title: "code",
          field: "code",
          render: (rowData) => (
            <a
              style={{ maxWidth: 50 }}
              target="_blank"
              href={`/editReparation/${rowData._id}`}
            >
              {rowData.code.toUpperCase()}
            </a>
          ),
          cellStyle: { maxWidth: 50, width: 50, textAlign: "center" },
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("reparation.panne")}</div>}
            </Translation>
          ),
          field: "Panne",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("reparation.status")}</div>}
            </Translation>
          ),
          field: "etat",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("reparation.customerPrice")}</div>}
            </Translation>
          ),
          field: "prix",
          cellStyle: { maxWidth: 50, width: 50, textAlign: "center" },
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("reparation.supplierPrice")}</div>}
            </Translation>
          ),
          field: "prixPiece",
          hidden: true,
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("reparation.panneDetails")}</div>}
            </Translation>
          ),
          field: "detailsPanne",
          hidden: true,
        },
        {
          title: (
            <Translation>
              {(t) => (
                <div>{t("reparation.financialInformation.advancePayment")}</div>
              )}
            </Translation>
          ),
          field: "avance",
          hidden: true,
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("reparation.depositCenter")}</div>}
            </Translation>
          ),
          field: "centreDepot",
          hidden: true,
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("reparation.seviceCenter")}</div>}
            </Translation>
          ),
          field: "centreService",
          hidden: true,
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("reparation.recoveryCenter")}</div>}
            </Translation>
          ),
          field: "centreRecuperation",
          hidden: true,
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("reparation.repairInformation.estimated")}</div>}
            </Translation>
          ),
          field: "estimatedTimeReparation",
          hidden: true,
        },
        {
          title: (
            <Translation>
              {(t) => (
                <div>{t("reparation.repairInformation.estimatedDelivry")}</div>
              )}
            </Translation>
          ),
          field: "estimatedTimeLivraison",
          hidden: true,
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("reparation.repairer")}</div>}
            </Translation>
          ),
          field: "repairer",
          render: (rowData) => (
            <div style={{ display: "flex" }}>
              <div style={{ margin: 5 }}>
                <p>
                  {rowData.repairer.fname} {rowData.repairer.lname}
                </p>
                <p>
                  <a href={`mailto:${rowData.repairer.email}`}>
                    {rowData.repairer.email}
                  </a>
                </p>
                <p>{rowData.repairer.phone}</p>
              </div>
            </div>
          ),
        },
        {
          title: "client",
          field: "owner",
          render: (rowData) => (
            <div style={{ display: "flex" }}>
              <div style={{ margin: 5 }}>
                <p>
                  {rowData.owner != null ? rowData.owner.fname : null}{" "}
                  {rowData.owner ? rowData.owner.lname : null}
                </p>
                <p>
                  <a
                    href={`mailto:${
                      rowData.owner ? rowData.owner.email : null
                    }`}
                  >
                    {rowData.owner ? rowData.owner.email : null}
                  </a>
                </p>
                <p>{rowData.owner ? rowData.owner.phone : null}</p>
              </div>
            </div>
          ),
        },
        {
          title: "Remarque",
          field: "remarque",
          render: (rowData) => this.remarquesModal(rowData),
        },
        { title: "Date Dépot", field: "created_at", type: "date" },
      ];

      this.setState({
        columns: column,
      });
    } catch (e) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar(   <Translation>
          {(t) => <div>{t("stock.edit.error")}</div>}
        </Translation>,{
          variant: "error",
        });
      }
    }
  }
  remarquesPage(rowData) {
    return <TabsRemarques reparation={rowData} />;
  }
  remarquesModal(rowData) {
    return (
      <SimpleModal
        badgeContent={
          rowData.remarqueAcquisition.length +
          rowData.remarqueClient.length +
          rowData.remarqueEquipe.length +
          rowData.remarqueSatisfaction.length +
          rowData.remarqueSuivi.length +
          rowData.remarqueTrustit.length
        }
        showReparations={this.remarquesPage(rowData)}
      />
    );
  }
  async delete(id) {
    try {
      const url = env.reparations.remove(id);
      await this.request.delete(url);
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
  setStateOnDelete(data) {
    this.setState({
      ...this.state,
      data,
    });
  }
  async exportsReparation(event, rowData) {
    try {
      const result = await this.request.new(
        env.reparations.exports,
        rowData,
        false
      );
      console.log(result);
      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
      const url = result.data.url;
      window.open(`${env.staticFiles}${url}`, "_blank");
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
  async restoreReparations(event, rowData) {
    try {
      const result = await this.request.new(
        env.reparations.restore,
        rowData,
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
      this.props.history.push("/reparation");
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
    const actions = [
      (rowData) => ({
        icon: "save_alt",
        tooltip: "Export Data",
        onClick: this.exportsReparation,
      }),
      (rowData) => ({
        icon: "restore",
        tooltip: "Restore Reparations",
        onClick: this.restoreReparations,
      }),
    ];
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={<FormHeader returnRoute="/reparation" title="Archive" />}
        content={
          <Table
            title="Reparations"
            columns={this.state.columns}
            data={this.fetchData.bind(this)}
            routeEdit="/editReparation"
            delete={this.delete}
            setStateOnDelete={this.setStateOnDelete}
            showMore="/detailsReparation"
            state={this.state}
            actions={actions}
            pageSize={30}
            exportButton={false}
          />
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(ArchiveReparation))
  )
);
