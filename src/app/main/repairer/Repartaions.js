import React, { Component } from "react";
import Request from "../../utils/Request";
import Table from "../sharedComponent/Table";
import env from "../../static";
import { withSnackbar } from "notistack";
import { withTranslation, Translation } from "react-i18next";
import { withRouter } from "react-router-dom";

class ReparationTable extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: (
            <Translation>
              {(t) => <div>{t("category.category")}</div>}
            </Translation>
          ),
          field: "category",
        },
        {
          title: (
            <Translation>{(t) => <div>{t("widger2.status")}</div>}</Translation>
          ),
          field: "etat",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("commandes.price")}</div>}
            </Translation>
          ),
          field: "prix",
        },
        {
          title: (
            <Translation>
              {(t) => (
                <div>{t("reparation.deviceInformation.DeviceColor")}</div>
              )}
            </Translation>
          ),
          field: "couleurAppareil",
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
              {(t) => <div>{t("reparation.recoveryCenter")}</div>}
            </Translation>
          ),
          field: "centreRecuperation",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("reparation.repairer")}</div>}
            </Translation>
          ),
          field: "repairer",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("reparation.customer")}</div>}
            </Translation>
          ),
          field: "client",
        },
      ],
      data: [],
      selctedRowlength: 0,
      tableRef: React.createRef(),
    };
    this.delete = this.delete.bind(this);
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
  }

  async componentDidMount() {
    try {
      const url = env.repairers.reparations(this.props.id);
      const response = await this.request.getAll(url);
      let data = [];
      response.data.forEach((element) => {
        let categoryValue = "";
        if (element.category !== null) {
          categoryValue = element.category.name;
        } else {
          categoryValue = (
            <Translation>
              {(t) => <div>{t("reparation.noCategory")}</div>}
            </Translation>
          );
        }

        let centreDepotValue = "";
        if (element.centreDepot !== null) {
          centreDepotValue = element.centreDepot.name;
        } else {
          centreDepotValue = (
            <Translation>
              {(t) => <div>{t("reparation.noDepositCenter")}</div>}
            </Translation>
          );
        }
        let centreServiceValue = "";
        if (element.centreService !== null) {
          centreServiceValue = element.centreService.name;
        } else {
          centreServiceValue = (
            <Translation>
              {(t) => <div>{t("reparation.noSeviceCenter")}</div>}
            </Translation>
          );
        }
        let centreRecuperationValue = "";
        if (element.centreRecuperation !== null) {
          centreRecuperationValue = element.centreRecuperation.name;
        } else {
          centreRecuperationValue = (
            <Translation>
              {(t) => <div>{t("reparation.noSeviceCenter")}</div>}
            </Translation>
          );
        }

        let repairerValue = "";
        if (element.repairer !== null) {
          repairerValue = element.repairer.fname;
        } else {
          repairerValue = (
            <Translation>
              {(t) => <div>{t("reparation.noRepairer")}</div>}
            </Translation>
          );
        }
        let clientValue = "";
        if (element.owner !== null) {
          clientValue = element.owner.fname;
        } else {
          clientValue = (
            <Translation>
              {(t) => <div>{t("reparation.noCustomer")}</div>}
            </Translation>
          );
        }
        data.push({
          _id: element._id,
          category: categoryValue,
          etat: element.etat,
          prix: element.prix,
          prixPiece: element.prixPiece,
          avance: element.avance,
          detailsPanne: element.detailsPanne,
          couleurAppareil: element.couleurAppareil,
          centreDepot: centreDepotValue,
          centreService: centreServiceValue,
          centreRecuperation: centreRecuperationValue,
          numeroSerie: element.numeroSerie,
          repairer: repairerValue,
          client: clientValue,
        });
      });
      this.setState({
        data: data,
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
  async delete(id) {
    try {
      const url = env.reparations.remove(id);
      await this.request.delete(url);
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

  render() {
    return (
      <Table
        title={this.props.t("reparation.reparation")}
        columns={this.state.columns}
        data={this.state.data}
        state={this.state}
        routeEdit="/editReparation"
        delete={this.delete}
        setStateOnDelete={this.setStateOnDelete}
        showMore="/detailsReparation"
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(ReparationTable)));
