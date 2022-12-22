import React, { Component } from "react";
import Request from "../../utils/Request";
import Table from "../sharedComponent/Table";
import { Button } from "@material-ui/core";
import { withSnackbar } from "notistack";
import { saveAs } from "file-saver";
import env from "../../static";
import swal from "sweetalert";

import { withRouter } from "react-router-dom";
import axios from "axios";

import Box from "@material-ui/core/Box";
import { withTranslation, Translation } from "react-i18next";
import Modal from "@material-ui/core/Modal";
import ComponentToPrint from "./ComponentToPrint";
import Print from "@material-ui/icons/Print";
import moment from "moment";
import decode from "jwt-decode";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 50,
  p: 4,
};

class DileveryTable extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "Code",
          field: "code",
          render: (rowData) => (
            <a href={`/editReparation/${rowData._id}`}>
              {rowData.code.toUpperCase()}
            </a>
          ),
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("reparation.device")}</div>}
            </Translation>
          ),
          field: "category",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("reparation.customer")}</div>}
            </Translation>
          ),
          field: "owner",
          render: (rowData) => (
            <div style={{ display: "flex" }}>
              <div style={{ margin: 5 }}>
                <p>
                  {rowData.fname} {rowData.lname}
                </p>
                <p>
                  <a href={`mailto:${rowData.email}`}>{rowData.email}</a>
                </p>
                <p>{rowData.phone}</p>
              </div>
            </div>
          ),
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("reparation.repairer")}</div>}
            </Translation>
          ),
          field: "repairer",
          render: (rowData) =>
            rowData.repairer ? (
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
            ) : (
              <p>-</p>
            ),
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("reparation.depositCenter")}</div>}
            </Translation>
          ),
          field: "centreDepot",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("reparation.destination")}</div>}
            </Translation>
          ),
          field: "destination",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("reparation.recoveryCenter")}</div>}
            </Translation>
          ),
          field: "centreRecuperation",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("reparation.toPrint")}</div>}
            </Translation>
          ),
          field: "imprimer",
        },
      ],
      data: [],
      selctedRowlength: 0,
      tableRef: React.createRef(),
      open: false,
      item: null,
      planning: "",
    };
    this.delete = this.delete.bind(this);
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
    this.generatePdf = this.generatePdf.bind(this);
    this.exportsDelivery = this.exportsDelivery.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.addToPlanning = this.addToPlanning.bind(this);
    this.addPlanningEvent = this.addPlanningEvent.bind(this);
    this.createEtatSortie = this.createEtatSortie.bind(this);
  }
  handleOpen(element) {
    this.setState({
      open: true,
      item: element,
    });
  }
  handleClose() {
    this.setState({
      open: false,
    });
  }
  async componentDidMount() {}

  fetchData(query) {
    return new Promise(async (resolve) => {
      let url = env.deliveries.list + "?";
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
          let centreDepotValue = "";
          if (element.centreDepot) {
            centreDepotValue = element.centreDepot.name;
          } else {
            centreDepotValue = (
              <Translation>
                {(t) => <div>{t("reparation.noDepositCenter")}</div>}
              </Translation>
            );
          }
          let centreServiceValue = "";
          if (element.centreService) {
            centreServiceValue = element.centreService.name;
          } else {
            centreServiceValue = (
              <Translation>
                {(t) => <div>{t("reparation.noSeviceCenter")}</div>}
              </Translation>
            );
          }
          let centreRecuperationValue = "";
          if (element.centreRecuperation) {
            centreRecuperationValue = element.centreRecuperation.name;
          } else {
            centreRecuperationValue = (
              <Translation>
                {(t) => <div>{t("reparation.noSeviceCenter")}</div>}
              </Translation>
            );
          }
          let centreDestinationValue = "";
          if (element.centreDestination) {
            centreDestinationValue = element.centreDestination.name;
          } else {
            centreDestinationValue = (
              <Translation>
                {(t) => <div>{t("reparation.noSeviceCenter")}</div>}
              </Translation>
            );
          }
          dataList.push({
            _id: element._id,
            code: element.code,
            owner: element.owner,
            category: element.category ? element.category.displayName : "",
            hawb: element.extraData.livraison.HAWB,
            cod: element.extraData.livraison.COD,
            etatLivraison: element.extraData.livraison.etat,
            remarqueLivraison: element.extraData.livraison.remarqueLivraison,
            etat: element.etat,
            prix: element.prix,
            prixPiece: element.prixPiece,
            avance: element.avance,
            detailsPanne: element.detailsPanne,
            couleurAppareil: element.couleurAppareil,
            centreDepot: centreDepotValue,
            centreService: centreServiceValue,
            destination: centreDestinationValue,
            centreRecuperation: centreRecuperationValue,
            numeroSerie: element.numeroSerie,
            repairer: element.repairer,
            extraData: element.extraData,
            planifier: element.planifier,
            imprimer: (
              <Button onClick={() => this.handleOpen(element)}>
                <Print />
              </Button>
            ),
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
            +e.message,
            {
              variant: "error",
            }
          );
        }
      }
    });
  }

  async generatePdf(e, rowData) {
    e.preventDefault();
    try {
      const url = env.deliveries.createPdf;
      const data = {
        name: rowData.client,
        code: rowData.code,
        avance: rowData.avance,
        category: rowData.category,
        gouvernorat: rowData.extraData.adress.gouvernorat,
        delegation: rowData.extraData.adress.delegation,
        localite: rowData.extraData.adress.localite,
        codePostal: rowData.extraData.adress.codePostal,
        indication: rowData.extraData.indication,
        HAWB: rowData.hawb,
        COD: rowData.cod,
        remarqueLivraison: rowData.remarqueLivraison,
        prix: rowData.prix,
      };

      await axios
        .post(url, data)
        .then(() =>
          axios.get(`${env.deliveries.fetchPdf(rowData.code)}`, {
            responseType: "blob",
          })
        )
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: "application/pdf" });
          saveAs(pdfBlob, `${rowData.code}.pdf`);
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
          +e.message,
          {
            variant: "error",
          }
        );
      }
    }
  }

  async delete(id) {
    try {
      const url = env.deliveries.remove(id);
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
          (
            <Translation>
              {(t) => <div>{t("stock.edit.error")}</div>}
            </Translation>
          ) + e.message,
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
  exportsDelivery(event, rowData) {
    this.request.new(env.deliveries.planning, rowData).then((response) => {
      if (response.error) {
        this.props.enqueueSnackbar(
          (
            <Translation>
              {(t) => <div>{t("stock.edit.error")}</div>}
            </Translation>
          ) + response.message,
          {
            variant: "error",
          }
        );
      } else {
        window.open(`${env.staticFiles}${response.data.url}`, "_blank");
      }
    });
  }
  createEtatSortie = async (etat) => {
    const urlEtat = env.EtatSortie.new;

    const res = await this.request.new(urlEtat, etat, false);
  };

  addToPlanning = async (event, rowData) => {
    swal({
      title: "êtes vous sûr?",
      text: "Vous ne pourrez pas revenir en arrière!!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((result) => {
      if (result) {
        this.addPlanningEvent(rowData);
      }
    });
  };

  addPlanningEvent = async (rowData) => {
    try {
      const user = decode(localStorage.getItem("id_token"));
      const date = new Date();
      const ref =
        "Planning" +
        "-" +
        date.getUTCDate() +
        "-" +
        date.getUTCMonth() +
        1 +
        "-" +
        date.getUTCFullYear();
      const planning = {
        reference: ref,
        dateLivraison: moment(new Date()),
        listSorties: [],
        delivredBy: null,
        createdBy: user.id,
      };

      rowData.forEach((row) => {
        const etat = {
          reparation: row._id,
          code: row.code,
          item: row.category == undefined ? row.detailsPanne : row.category,
          center_recuperation:
            row.etat == "Prêt pour Transfert"
              ? row.centreDepot
              : row.centreService,
          destination:
            row.etat == "Prêt pour Récupération" ||
            row.etat == "Prêt pour Livraison"
              ? row.centreRecuperation
              : row.centreService,
          phone: row.owner.phone,
          prix_piece: row.prixPiece,
          prix_client: row.prix,
          status_reparation: "",
          remarque_CS: "",
          remarque_livreur: "",
          status_livraison: "",
          departement: "",
          numeroSerie: "",
          owner: row.owner._id,
          refPlanning: ref,
        };

        // this.createEtatSortie(etat)
        planning.listSorties.push(etat);
      });

      const url = env.Plannings.new;
      const res = await this.request
        .new(url, planning, false)
        .then((p) => this.setState({ planning: p }))
        .catch((e) => {
          swal({
            title: "Erreur!",
            text: `Planning d'aujourd'hui déja créé`,
            icon: "warning",
            dangerMode: true,
          });
        });

      const title = ref;
      const baseUrl = "https://team.trustit.tn/";
      // const baseUrl = "http://localhost:3000/";
      const content =
        baseUrl + "detailsPlanning/" + this.state.planning?.data._id;
      const owner = user.id;
      const url1 = env.calendar.new;
      const data = {
        title: ref,
        content: content,
        start: moment(),
        end: moment(),
        owner: owner,
      };

      await this.request.new(url1, data, false);

      this.props.history.push({
        pathname: "/detailsPlanning/" + this.state.planning?.data._id,
        state: JSON.stringify(this.state.planning.data),
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const actions = [
      (rowData) => (
        {
          icon: "save_alt",
          tooltip: "Export Data",
          onClick: this.exportsDelivery,
        },
        {
          icon: "storage",
          tooltip: "Generate Planning",
          onClick: this.addToPlanning,
        }
      ),
    ];
    return (
      <div>
        <Table
          deleted={
            localStorage.getItem("AdminOrTeam") == "admin" ? true : false
          }
          title={this.props.t("reparation.reparation")}
          columns={this.state.columns}
          data={this.fetchData.bind(this)}
          routeEdit="/editDilevery"
          delete={this.delete}
          setStateOnDelete={this.setStateOnDelete}
          showMore="/detailsDilevery"
          state={this.state}
          actions={actions}
          pageSize={50}
          rowStyle={(rowData) =>
            rowData.planifier
              ? { background: "#00ff7526" }
              : { background: "#ff000024" }
          }
        />
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ComponentToPrint currentReparation={this.state.item} />
          </Box>
        </Modal>
      </div>
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(DileveryTable)));
