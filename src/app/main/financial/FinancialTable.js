import React, { Component } from "react";
import Request from "../../utils/Request";
import Table from "../sharedComponent/Table";
import { withSnackbar } from "notistack";
import env from "../../static";
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import TraiterFilter from "../sharedComponent/TraiterFilter";
import StateComponent from "./StateComponent";
import RepairerComponent from "./RepairerComponent";
import PriceComponent from "./PriceComponent";
import PiecePriceComponent from "./PiecePriceComponent";
import PriceRepairerComponent from "./PriceRepairerComponent";
import FraisTrustitComponent from "./FraisTrustitComponent";
import SimpleModal from "../sharedComponent/SimpleModal";
import TabsRemarques from "./TabsRemarques";
import DateFilter from "../sharedComponent/DateFilter";
import CategoryFilter from "../sharedComponent/CategoryFilter";
import StateFilter from "../sharedComponent/StateFilter";
import { CircularProgress } from "@material-ui/core";
import { withTranslation, Translation } from "react-i18next";
class FinancialTable extends Component {
  request = new Request();
  async traiter(id) {
    try {
      const result = await this.request.update(
        env.reparations.update(id),
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
      column: [
        {
          id: 0,
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
          id: 1,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.category")}</div>}
            </Translation>
          ),
          field: "category",
          render: (rowData) => <span>{rowData.arb[0]?.name}</span>,
          filterComponent: (props) => (
            <CategoryFilter
              {...props}
              values={this.state.categories}
              allValue={"Tous les categories"}
              onChange={(category) =>
                this.fetchAppareils(category) &&
                this.fetchModels(category) &&
                this.setState({ category, appareil: null, model: null })
              }
              value={this.state.category}
            />
          ),
        },
        {
          id: 2,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.device")}</div>}
            </Translation>
          ),
          field: "appareil",
          render: (rowData) => (
            <span>{rowData.arb.length > 1 ? rowData.arb[1].name : "-"}</span>
          ),
          filterComponent: (props) => (
            <CategoryFilter
              {...props}
              values={this.state.appareils}
              allValue={"Tous les appareils"}
              onChange={(model) =>
                this.fetchModels(null, model) &&
                this.setState({ appareil: model, model: null })
              }
              value={this.state.appareil}
            />
          ),
        },
        {
          id: 3,
          title: "Model",
          field: "model",
          render: (rowData) => (
            <span>{rowData.arb.length > 2 ? rowData.arb[2].name : "-"}</span>
          ),
          filterComponent: (props) => (
            <CategoryFilter
              {...props}
              values={this.state.models}
              allValue={"Tous les models"}
              onChange={(model) => this.setState({ model })}
              value={this.state.model}
            />
          ),
        },
        { id: 4, title: "Panne", field: "Panne" },
        {
          id: 5,
          title: (
            <Translation>{(t) => <div>{t("devis.state")}</div>}</Translation>
          ),
          field: "etat",
          filterComponent: (props) => <StateFilter {...props} />,
        },
        {
          id: 6,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.repairPrice")}</div>}
            </Translation>
          ),
          field: "prixReparateur",
          cellStyle: { maxWidth: 50, width: 50, textAlign: "center" },
        },
        { id: 7, title: "Prix Fournisseur", field: "prixPiece" },
        {
          id: 8,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.fees")}</div>}
            </Translation>
          ),
          field: "fraisTrustit",
          cellStyle: { maxWidth: 50, width: 50, textAlign: "center" },
        },
        {
          id: 9,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.customerPrice")}</div>}
            </Translation>
          ),
          field: "prix",
        },
        {
          id: 10,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.panneDetails")}</div>}
            </Translation>
          ),
          field: "detailsPanne",
          hidden: true,
          hiddenByColumnsButton: true,
        },
        {
          id: 11,
          title: (
            <Translation>
              {(t) => (
                <div>{t("reparation.financialInformation.advancePayment")}</div>
              )}
            </Translation>
          ),
          field: "avance",
          hidden: true,
          hiddenByColumnsButton: true,
        },
        {
          id: 12,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.depositCenter")}</div>}
            </Translation>
          ),
          field: "centreDepot",
          hidden: true,
          hiddenByColumnsButton: true,
        },
        {
          id: 13,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.seviceCenter")}</div>}
            </Translation>
          ),
          field: "centreService",
          hidden: true,
          hiddenByColumnsButton: true,
        },
        {
          id: 14,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.recoveryCenter")}</div>}
            </Translation>
          ),
          field: "centreRecuperation",
          hidden: true,
          hiddenByColumnsButton: true,
        },
        {
          id: 15,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.repairInformation.estimated")}</div>}
            </Translation>
          ),
          field: "estimatedTimeReparation",
          hidden: true,
          hiddenByColumnsButton: true,
        },
        {
          id: 16,
          title: (
            <Translation>
              {(t) => (
                <div>{t("reparation.repairInformation.estimatedDelivry")}</div>
              )}
            </Translation>
          ),
          field: "estimatedTimeLivraison",
          hidden: true,
          hiddenByColumnsButton: true,
        },
        {
          id: 17,
          title: (
            <Translation>
              {(t) => <div>{t("repairer.repairer")}</div>}
            </Translation>
          ),
          field: "repairer",
        },
        {
          id: 18,
          title: (
            <Translation>
              {(t) => <div>{t("customer.customer")}</div>}
            </Translation>
          ),
          field: "owner",
          render: (rowData) => (
            <div style={{ display: "flex" }}>
              <div style={{ margin: 5 }}>
                <p>
                  {rowData.owner.fname} {rowData.owner.lname}
                </p>
                <p>
                  <a href={`mailto:${rowData.owner.email}`}>
                    {rowData.owner.email}
                  </a>
                </p>
                <p>{rowData.owner.phone}</p>
              </div>
            </div>
          ),
        },
        {
          id: 19,
          title: (
            <Translation>
              {(t) => <div>{t("customer.faceboock.notice")}</div>}
            </Translation>
          ),
          field: "remarque",
          render: (rowData) => this.remarquesModal(rowData),
        },
        {
          id: 20,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.deposiDate")}</div>}
            </Translation>
          ),
          field: "created_at",
          type: "date",
          filterComponent: (props) => <DateFilter {...props} />,
        },
        {
          id: 21,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.deliveryDate")}</div>}
            </Translation>
          ),
          field: "dateLivraison",
          type: "date",
          filterComponent: (props) => <DateFilter {...props} />,
        },
      ],
      data: [],
      selctedRowlength: 0,
      tableRef: React.createRef(),
    };
    this.delete = this.delete.bind(this);
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
    this.exportsReparation = this.exportsReparation.bind(this);
    this.remarquesModal = this.remarquesModal.bind(this);
    this.exportAllData = this.exportAllData.bind(this);
  }
  async fetchCategories() {
    const response = await this.request.getAll(env.categories.categories);
    this.setState({ categories: response.data });
  }
  async fetchModels(category = null, model = null) {
    const response = await this.request.getAll(
      `${env.categories.models}?${
        category ? "category=" + category + "&" : ""
      }${model ? "appareil=" + model : ""}`
    );
    this.setState({ models: response.data });
  }
  async fetchAppareils(category = null) {
    const response = await this.request.getAll(
      `${env.categories.appareil}?${category ? "parent=" + category + "&" : ""}`
    );
    this.setState({ appareils: response.data });
  }

  fetchData(query) {
    return new Promise(async (resolve, reject) => {
      let url = env.financials.list + "?";
      url += "page=" + (query.page + 1);
      url += "&count=" + query.pageSize;
      url += "&search=" + query.search;
      if (query.filters.length > 0) {
        query.filters.forEach((elem) => {
          url += `&filters[]=${elem.column.field},${elem.value}`;
        });
        const { model, appareil, category } = this.state;
        if (model || appareil || category) {
          if (model) {
            url += "&filters[]=model," + model;
          }
          if (appareil) {
            url += "&filters[]=appareil," + appareil;
          }
          if (category) {
            url += "&filters[]=category," + category;
          }
        }
      } else {
        const { model, appareil, category } = this.state;
        if (model || appareil || category) {
          if (model) {
            url += "&filters[]=model," + model;
          }
          if (appareil) {
            url += "&filters[]=appareil," + appareil;
          }
          if (category) {
            url += "&filters[]=category," + category;
          }
        } else {
          url += "&filters=";
        }
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
            etat: (
              <StateComponent
                key={element._id}
                locked={element.locked}
                etat={element.etat}
                _id={element._id}
              />
            ),
            etatLivraison: element.etat,
            etatLivraison: element.etat,
            prix: (
              <PriceComponent
                key={element._id}
                currentPrice={element.prix}
                locked={element.locked}
                _id={element._id}
              />
            ),
            prixPiece: (
              <PiecePriceComponent
                key={element._id}
                locked={element.locked}
                currentPrice={element.prixPiece}
                _id={element._id}
              />
            ),
            prixReparateur: (
              <PriceRepairerComponent
                key={element._id}
                currentPriceRepairer={element.priceRepairer}
                locked={element.locked}
                _id={element._id}
              />
            ),
            fraisTrustit: (
              <FraisTrustitComponent
                key={element._id}
                currentFraisTrustit={element.fraisTrustit}
                locked={element.locked}
                _id={element._id}
              />
            ),
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
            repairer: (
              <RepairerComponent
                locked={element.locked && false}
                key={element._id}
                rep={element.repairer}
                repairers={this.state.repairers || []}
                _id={element._id}
              />
            ),
            owner: element.owner
              ? element.owner
              : { fname: "None Spécifié", lname: "", email: "" },
            remarqueAcquisition: element.remarqueAcquisition,
            remarqueClient: element.remarqueClient,
            remarqueEquipe: element.remarqueEquipe,
            remarqueSatisfaction: element.remarqueSatisfaction,
            remarqueSuivi: element.remarqueSuivi,
            remarqueTrustit: element.remarqueTrustit,
            created_at: element.created_at,
            dateLivraison: element.dateLivraison,
            arb: element.arb,
            locked: element.locked,
            traiter: element.traiter,
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
          this.props.enqueueSnackbar(
            <Translation>
              {(t) => <div>{t("stock.edit.error")}</div>}
            </Translation>,
            {
              variant: "error",
            }
          );
        }
        console.log(e);
      }
    });
  }

  async componentDidMount() {
    try {
      const column = [
        {
          id: 0,
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
          id: 1,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.category")}</div>}
            </Translation>
          ),
          field: "category",
          render: (rowData) => <span>{rowData.arb[0]?.name}</span>,
          filterComponent: (props) => (
            <CategoryFilter
              {...props}
              values={this.state.categories}
              allValue={"Tous les categories"}
              onChange={(category) =>
                this.fetchAppareils(category) &&
                this.fetchModels(category) &&
                this.setState({ category, appareil: null, model: null })
              }
              value={this.state.category}
            />
          ),
        },
        {
          id: 2,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.device")}</div>}
            </Translation>
          ),
          field: "appareil",
          render: (rowData) => (
            <span>{rowData.arb.length > 1 ? rowData.arb[1].name : "-"}</span>
          ),
          filterComponent: (props) => (
            <CategoryFilter
              {...props}
              values={this.state.appareils}
              allValue={"Tous les appareils"}
              onChange={(model) =>
                this.fetchModels(null, model) &&
                this.setState({ appareil: model, model: null })
              }
              value={this.state.appareil}
            />
          ),
        },
        {
          id: 3,
          title: "Model",
          field: "model",
          render: (rowData) => (
            <span>{rowData.arb.length > 2 ? rowData.arb[2].name : "-"}</span>
          ),
          filterComponent: (props) => (
            <CategoryFilter
              {...props}
              values={this.state.models}
              allValue={"Tous les models"}
              onChange={(model) => this.setState({ model })}
              value={this.state.model}
            />
          ),
        },
        { id: 4, title: "Panne", field: "Panne" },
        {
          id: 5,
          title: (
            <Translation>{(t) => <div>{t("devis.state")}</div>}</Translation>
          ),
          field: "etat",
          filterComponent: (props) => <StateFilter {...props} />,
        },
        {
          id: 6,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.repairPrice")}</div>}
            </Translation>
          ),
          field: "prixReparateur",
          cellStyle: { maxWidth: 50, width: 50, textAlign: "center" },
        },
        {
          id: 7,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.supplierPrice")}</div>}
            </Translation>
          ),
          field: "prixPiece",
        },
        {
          id: 8,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.fees")}</div>}
            </Translation>
          ),
          field: "fraisTrustit",
          cellStyle: { maxWidth: 50, width: 50, textAlign: "center" },
        },
        {
          id: 9,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.customerPrice")}</div>}
            </Translation>
          ),
          field: "prix",
        },
        {
          id: 10,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.panneDetails")}</div>}
            </Translation>
          ),
          field: "detailsPanne",
          hidden: true,
          hiddenByColumnsButton: true,
        },
        {
          id: 11,
          title: (
            <Translation>
              {(t) => (
                <div>{t("reparation.financialInformation.advancePayment")}</div>
              )}
            </Translation>
          ),
          field: "avance",
          hidden: true,
          hiddenByColumnsButton: true,
        },
        {
          id: 12,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.depositCenter")}</div>}
            </Translation>
          ),
          field: "centreDepot",
          hidden: true,
          hiddenByColumnsButton: true,
        },
        {
          id: 13,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.seviceCenter")}</div>}
            </Translation>
          ),
          field: "centreService",
          hidden: true,
          hiddenByColumnsButton: true,
        },
        {
          id: 14,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.recoveryCenter")}</div>}
            </Translation>
          ),
          field: "centreRecuperation",
          hidden: true,
          hiddenByColumnsButton: true,
        },
        {
          id: 15,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.repairInformation.estimated")}</div>}
            </Translation>
          ),
          field: "estimatedTimeReparation",
          hidden: true,
          hiddenByColumnsButton: true,
        },
        {
          id: 16,
          title: (
            <Translation>
              {(t) => (
                <div>{t("reparation.repairInformation.estimatedDelivry")}</div>
              )}
            </Translation>
          ),
          field: "estimatedTimeLivraison",
          hidden: true,
          hiddenByColumnsButton: true,
        },
        {
          id: 16,
          title: (
            <Translation>
              {(t) => <div>{t("repairer.repairer")}</div>}
            </Translation>
          ),
          field: "repairer",
        },
        {
          id: 17,
          title: (
            <Translation>
              {(t) => <div>{t("customer.customer")}</div>}
            </Translation>
          ),
          field: "owner",
          render: (rowData) => (
            <div style={{ display: "flex" }}>
              <div style={{ margin: 5 }}>
                <p>
                  {rowData.owner.fname} {rowData.owner.lname}
                </p>
                <p>
                  <a href={`mailto:${rowData.owner.email}`}>
                    {rowData.owner.email}
                  </a>
                </p>
                <p>{rowData.owner.phone}</p>
              </div>
            </div>
          ),
        },
        {
          id: 18,
          title: (
            <Translation>
              {(t) => <div>{t("customer.faceboock.notice")}</div>}
            </Translation>
          ),
          field: "remarque",
          render: (rowData) => this.remarquesModal(rowData),
        },
        {
          id: 19,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.deposiDate")}</div>}
            </Translation>
          ),
          field: "created_at",
          type: "date",
          filterComponent: (props) => <DateFilter {...props} />,
        },
        {
          id: 20,
          title: (
            <Translation>
              {(t) => <div>{t("reparation.deliveryDate")}</div>}
            </Translation>
          ),
          field: "dateLivraison",
          type: "date",
          filterComponent: (props) => <DateFilter {...props} />,
        },
        {
          id: 21,
          title: "Actions",
          render: (rowData) => (
            <div>
              {rowData.traiter ? (
                <div />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.traiter.bind(this, rowData._id)}
                >
                  <Translation>
                    {(t) => (
                      <div>
                        {t(
                          "customer.faceboock.reparationInformation.status.treated"
                        )}
                      </div>
                    )}
                  </Translation>
                  ,
                </Button>
              )}
            </div>
          ),
          filterComponent: TraiterFilter,
        },
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

  async fetchRepairers() {
    const response = await this.request.getAll(env.repairers.all);
    this.setState({ repairers: response.data });
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
      const visibleColumns = this.state.tableRef.current.state.columns
        .filter((p) => !p.hidden)
        .map((p) => p.field);
      const data = rowData.map((d) => {
        return {
          ...d,
          etat: d.etat?.props?.etat || null,
          prix: d.prix?.props?.currentPrice || null,
          prixPiece: d.prixPiece?.props?.currentPrice || null,
          fraisTrustit: d.fraisTrustit?.props?.currentPrice || null,
          priceRepairer: d.priceRepairer?.props?.currentPrice || null,
          repairer: d.repairer?.props?.rep || null,
        };
      });
      const body = { data, columns: visibleColumns };
      const result = await this.request.new(
        env.reparations.exports,
        body,
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
  async exportAllData() {
    try {
      this.setState({ loading: true });
      let uri = env.reparations.exportAll + "?";
      let filterStrings = this.state.tableRef.current.dataManager.columns.map(
        (column) => {
          if (column.tableData && column.tableData.filterValue) {
            return `filters[]=${column.field},${column.tableData.filterValue}`;
          }
          return undefined;
        }
      );
      let filter = filterStrings.filter((value) => value);
      uri = uri + filter.join("&");

      const result = await this.request.new(uri, {}, false);
      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
      const url = result.data.url;
      this.setState({ loading: false });

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
    this.setState({ loading: false });
  }

  render() {
    const actions = [
      (rowData) => ({
        icon: "save_alt",
        tooltip: "Export Data",
        onClick: this.exportsReparation,
      }),
      {
        icon: "storage",
        isFreeAction: true,
        tooltip: "Export Filtered Data",
        onClick: this.exportAllData,
      },
    ];

    return this.state.loading ? (
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
        <h1>
          <Translation>
            {(t) => <div>{t("reparation.exporting")}</div>}
          </Translation>
          .
        </h1>
      </div>
    ) : (
      <Table
        deleted={localStorage.getItem("AdminOrTeam") == "admin" ? true : false}
        title="Financials"
        columns={this.state.columns}
        data={this.fetchData.bind(this)}
        routeEdit="/editFinancial"
        delete={this.delete}
        setStateOnDelete={this.setStateOnDelete}
        showMore="/detailsFinancial"
        state={this.state}
        rowStyle={(rowData) =>
          rowData.traiter
            ? { background: "#00FF0024" }
            : { background: "#ff000024" }
        }
        actions={actions}
        pageSize={50}
        exportButton={false}
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(FinancialTable)));
