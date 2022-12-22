import React, { Component } from "react";
import Request from "../../utils/Request";
import { withSnackbar } from "notistack";
import Table from "../sharedComponent/Table";
import env from "../../static";
import { withRouter } from "react-router-dom";
import StateComponent from "./StateComponent";
import Historique from "./TabsHistorique";
import Departement from "./Departement";
import RepairerComponent from "./RepairerComponent";
import FraisTrustitComponent from "./FraisTrustitComponent";
import Retour from "./Retour";
import DateDepot from "./DateDepot";
import DateLivraison from "./DateLivraison";
import PriceRepairerComponent from "./PriceRepairerComponent";
import PriceComponent from "./PriceComponent";
import PiecePriceComponent from "./PiecePriceComponent";
import SimpleModal from "../sharedComponent/SimpleModal";
import TabsRemarques from "./TabsRemarques";
import DateFilter from "../sharedComponent/DateFilter";
import CategoryFilter from "../sharedComponent/CategoryFilter";
import StateFilter from "../sharedComponent/StateFilter";
import { CircularProgress } from "@material-ui/core";
import ClientInfo from "./ClinetInfo";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import ComponentToPrint from "./ComponentToPrint";
import StickerToPrint from "./StickerToPrint";
import Print from "@material-ui/icons/Print";
import PrintTwoTone from "@material-ui/icons/PrintTwoTone";
import TabsHistorique from "./TabsHistorique";
import { withTranslation, Translation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  overflowY: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 50,
  p: 4,
};

class ReparationTable extends Component {
  request = new Request();
  token = localStorage.getItem("id_token");
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: [],
      selctedRowlength: 0,
      tableRef: React.createRef(),
      loading: false,
      repairers: [],
      repairersTN:[],
      repairersSA:[],
      categories: [],
      category: null,
      appareils: [],
      appareil: null,
      models: [],
      model: null,
      TAT: 0,
      open: false,
      openSticker: false,
    };
    this.fetchRepairers();
    this.fetchCategories();
    this.fetchAppareils();
    this.fetchModels();
    this.delete = this.delete.bind(this);
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
    this.exportsReparation = this.exportsReparation.bind(this);
    this.remarquesModal = this.remarquesModal.bind(this);
    this.historiqueModal = this.historiqueModal.bind(this);
    this.exportAllData = this.exportAllData.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpenSticker = this.handleOpenSticker.bind(this);
    this.handleCloseSticker = this.handleCloseSticker.bind(this);
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

  handleOpen(element) {
    this.setState({
      open: true,
      item: element,
      etat: element.etat,
    });
  }
  handleClose() {
    this.setState({
      open: false,
    });
  }
  handleOpenSticker(element) {
    this.setState({
      openSticker: true,
      item: element,
      etat: element.etat,
    });
  }
  handleCloseSticker() {
    this.setState({
      openSticker: false,
    });
  }

  calculTAT = (data) => {
    if (
      data.dateLivraison &&
      (data.etat == "Récupéré par le Client" ||
        data.etat == "Réparation Refusée" ||
        data.etat == "Refusée payé" ||
        data.etat == "Irréparable" ||
        data.etat == "Irréparable payée" ||
        data.etat == "SAV Récupéré" ||
        data.etat == "Réparé")
    ) {
      let date_1 = new Date(data.dateLivraison);
      let date_2 = data.dateDepot
        ? new Date(data.dateDepot)
        : new Date(data.created_at);
      let difference = date_1.getTime() - date_2.getTime();
      let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

      return TotalDays;
    } else if (data.dateDepot) {
      let date_1 = new Date();
      let date_2 = new Date(data.dateDepot);
      let difference = date_1.getTime() - date_2.getTime();
      let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

      return TotalDays;
    }
  };
  fetchData(query) {
    return new Promise(async (resolve, reject) => {
      
    const urlCountry = env.country.all;
    const Countrys = await this.request.getAll(urlCountry);
    //repairersData
    await Countrys.data.map(async(obj)=>{
      const url= env.repairers.allByCountry+ "?country="+obj._id;
      const r = await this.request.getAll(url);
      
      if(obj.iso2=='TN'){
        this.setState({ repairersTN: r.data });
      }
      if(obj.iso2=='SA'){
        this.setState({ repairersSA: r.data });
      }
    })
  
      let url = env.reparations.list + "?";
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
        const AdminOrTeam = localStorage.getItem("AdminOrTeam");
        if(AdminOrTeam=="team"){
        const userCountry = localStorage.getItem("country");
        url += "&country=" + userCountry;
      }
        const response = await this.request.getAll(url);
        console.log("result response",response)
        page = Number(response.data.page) - 1;

        totalCount = response.data.totalCount;
        response.data.data.forEach((element) => {
         // console.log("element ReparationProduct",element.ReparationProduct);
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
                levelEtat={element.levelEtat}
                _id={element._id}
              />
            ),
            retour: (
              <Retour
                key={element._id}
                locked={element.locked}
                retourValue={element.retour}
                _id={element._id}
              />
            ),
            etatLivraison: element.etat,
            ReparationProduct:element.ReparationProduct,
            Color:element.Color,
            prix: (
              <PriceComponent
                key={element._id}
                currentPrice={element.prix}
                locked={element.locked}
                currency={element.country?.currency?.abreviationEnglish}

                _id={element._id}
              />
            ),
            prixPiece: (
              <PiecePriceComponent
                key={element._id}
                locked={element.locked}
                currentPrice={element.prixPiece}
                _id={element._id}
                currency={element.country?.currency?.abreviationEnglish}
              />
            ),
            prixReparateur: (
              <PriceRepairerComponent
                key={element._id}
                currentPriceRepairer={element.priceRepairer}
                locked={element.locked}
                _id={element._id}
                currency={element.country?.currency?.abreviationEnglish}
              />
            ),
            fraisTrustit: (
              <FraisTrustitComponent
                key={element._id}
                currentFraisTrustit={element.fraisTrustit}
                locked={element.locked}
                _id={element._id}
                currency={element.country?.currency?.abreviationEnglish}
              />
            ),
            Departement: (
              <Departement
                key={element._id}
                locked={element.locked}
                etat={element.departement}
                _id={element._id}
              />
            ),
            noteDiagnostique:element.noteDiagnostique,
            partRequest:element.partRequest,
            avance: element.avance,
            country:element.country,
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
            customerNoteRepairRecovered:element.customerNoteRepairRecovered,
            repairer: (
              <RepairerComponent
                locked={element.locked}
                key={element._id}
                rep={element.repairer}
                repairers={element.country?.iso3=="TUN"?this.state.repairersTN:element.country?.iso3=="SAU"?this.state.repairersSA:this.state.repairers}
                _id={element._id}
              />
            ),
            owner: <ClientInfo key={element._id} owner={element.owner} />,
            remarqueAcquisition: element.remarqueAcquisition,
            remarqueClient: element.remarqueClient,
            remarqueEquipe: element.remarqueEquipe,
            remarqueSatisfaction: element.remarqueSatisfaction,
            remarqueSuivi: element.remarqueSuivi,
            remarqueTrustit: element.remarqueTrustit,
            created_at: element.created_at,
            recupHome:element.recupHome,
            typeDepot:element.typeDepot,
            Color:element.Color,
            datedepot: (
              <DateDepot
                key={element._id}
                enqueueSnackbar={this.props.enqueueSnackbar}
                date={element.dateDepot}
                dateLivraison={element.dateLivraison}
                locked={element.locked}
                _id={element._id}
              />
            ),
            dateLivraison: (
              <DateLivraison
                key={element._id}
                enqueueSnackbar={this.props.enqueueSnackbar}
                dateDepot={element.dateDepot}
                date={element.dateLivraison}
                locked={element.locked}
                _id={element._id}
              />
            ),
            arb: element.arb,
            locked: element.locked,
            historique: element.historique,
            TAT:
              this.calculTAT(element) != undefined
                ? this.calculTAT(element) + " jour(s)"
                : "0 jour",
            imprimer: (
              <>
                <Button onClick={() => this.handleOpen(element)}>
                  <Print />
                </Button>
                <Button onClick={() => this.handleOpenSticker(element)}>
                  <PrintTwoTone />
                </Button>
              </>
            ),
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
        //console.log(e)
      }
    });
  }
  async fetchRepairers() {
    const AdminOrTeam = localStorage.getItem("AdminOrTeam");
    if(AdminOrTeam=="team"){
    const userCountry = localStorage.getItem("country");
    const url= env.repairers.allByCountry+ "?country="+userCountry;
      const r = await this.request.getAll(url);
      this.setState({ repairers: r.data });
  }else{
    const response = await this.request.getAll(env.repairers.all);
    this.setState({ repairers: response.data });
    
   } // console.log("repairersD",repairersD)
    
    
    
    //console.log("repairersD ee",this.state.repairersData);
   
  }
  

  remarquesPage(rowData) {
    return <TabsRemarques reparation={rowData} locked={rowData.locked} />;
  }
  remarquesModal(rowData, remarque) {
    return (
      <SimpleModal
        remarque={remarque}
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
  historiquePage(rowData) {
    return <TabsHistorique reparation={rowData} locked={rowData.locked} />;
  }
  historiqueModal(rowData, historique) {
    return (
      <SimpleModal
        historique={historique}
        showReparations={this.historiquePage(rowData)}
      />
    );
  }
  async delete(id) {
    try {
      const url = env.reparations.remove(id);
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
          owner: d.owner?.props?.owner || null,
        };
      });
      const body = { data, columns: visibleColumns };
      const result = await this.request.new(
        env.reparations.exports,
        body,
        false
      );
      this.props.enqueueSnackbar("Operation reussi avec succes", {
        variant: "success",
      });
      const url = result.data.url;
      window.open(`${env.staticFiles}${url}`, "_blank");
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
      this.props.enqueueSnackbar("Operation reussi avec succes", {
        variant: "success",
      });
      const url = result.data.url;
      this.setState({ loading: false });

      window.open(`${env.staticFiles}${url}`, "_blank");
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
    const userType = localStorage.getItem("AdminOrTeam");
    const columns = [
      {
        id: 0,
        title: "Code",
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
      userType == "admin"
        ? {
            title: (
              <Translation>
                {(t) => <div>{t("coutry.country")}</div>}
              </Translation>
            ),
            render: (rowData) => <span>{rowData.country?.iso3}</span>,
          }
        : {},
      {
        id: 1,
        title: "Brand",
        field: "category",
        render: (rowData) => <span>{rowData.arb[0]?rowData.arb[0]?.name:rowData.ReparationProduct?.brand?.name}</span>,
        
      },
      {
        id: 2,
        title: "Appareil",
        field: "appareil",
        render: (rowData) => (
          <span>{rowData.arb[1]?rowData.arb[1]?.name:rowData.ReparationProduct?.device?.nameEnglish}</span>
        ),
      },  {
        id: 3,
        title: "Model",
        field: "model",
        render: (rowData) => (
          <span>{rowData.arb[2]?rowData.arb[2]?.name:rowData.ReparationProduct?.model?.name}</span>
        ),
      },
      {
        id: 3,
        title: "Model",
        field: "model",
        render: (rowData) => (
          <span>{rowData.arb[2]?rowData.arb[2]?.name:rowData.ReparationProduct?.model?.name}</span>
        ),
      },{
        id: 3,
        title: "Color appareil",
        field: "Color",
        render: (rowData) => (
          <span> <div
            style={{
              backgroundColor: `${rowData.Color?.codeColor}`,
              borderRadius: "50%",
              display: "inline-block",
              height: 13,
              width: 13,
            }}
          /> {rowData.Color?.nameColorEnglish}</span>
        ),
      },
      { id: 4, title: "Panne",
      render: (rowData) => <span>{rowData.arb[0]?rowData.arb[0]?.name:rowData.ReparationProduct?.typeReparation?.name}</span>,
      },
      {
        id: 5,
        title: "Etat",
        field: "etat",
        filterComponent: (props) => <StateFilter {...props} />,
      },
      {
        id: 6,
        title: "Date Création",
        field: "created_at",
        type: "date",
        filterComponent: (props) => <DateFilter {...props} />,
      },
      {
        id:7,
        title: "Temps de réparation/Jours",
        field: "estimatedTimeReparation"},
      { id:8,
          title: "Note diagnostique",
          field: "noteDiagnostique"}, 
      { id:8,
        title: "Part request",
        field: "partRequest"
      },
            
      { id:8,
        title: "Customer feedback",
        field: "customerNoteRepairRecovered"
      },{
        id: 7,
        title: "Main Œuvre",
        field: "prixReparateur",
        cellStyle: { maxWidth: 50, width: 50, textAlign: "center" },
      },
      { id: 8, title: "Prix Fournisseur", field: "prixPiece" },
      {
        id: 9,
        title: "Frais Trustit",
        field: "fraisTrustit",
        cellStyle: { maxWidth: 50, width: 50, textAlign: "center" },
      },
      { id: 10, title: "Prix Client", field: "prix" },
      { id: 11, title: "Departement", field: "Departement" },
      { id: 12, title: "Details panne", field: "detailsPanne" },
      {
        id: 13,
        title: "Avance",
        field: "avance",
        hidden: true,
        hiddenByColumnsButton: true,
      },
      { id: 14, title: "Centre Depot", field: "centreDepot", render: (rowData) => (
        <span>{rowData.typeDepot=="c1"?"Récupération à Domicile":rowData.typeDepot=="c2"?"Réparation à Domicile":rowData.typeDepot=="c3"?rowData.centreDepot:rowData.centreDepot}</span>
      ) },
      { id: 14, title: "Adresse Exacte", field: "recupHome" },    
      { id: 15, title: "CentreService", field: "centreService" },
      { id: 16, title: "Centre Recuperation", field: "centreRecuperation" },
     
      {
        id: 18,
        title: "Estimated time livraison",
        field: "estimatedTimeLivraison",
        hidden: true,
        hiddenByColumnsButton: true,
      },
      { id: 19, title: "Repairer", field: "repairer" },
      { id: 20, title: "client", field: "owner" },
      {
        id: 21,
        title: "Remarque",
        field: "remarque",
        render: (rowData) => this.remarquesModal(rowData, rowData._id),
      },
      {
        id: 22,
        title: "Date Dépot",
        field: "datedepot",
        type: "date",
        filterComponent: (props) => <DateFilter {...props} />,
      },
      {
        id: 23,
        title: "Date Livraison",
        field: "dateLivraison",
        type: "date",
        filterComponent: (props) => <DateFilter {...props} />,
      },
      {
        id: 24,
        title: "Historique",
        field: "historique",
        render: (rowData) => this.historiqueModal(rowData, rowData._id),
      },
      { id: 25, title: "Retour", field: "retour" },
      { id: 26, title: "TAT", field: "TAT" },

      //{ id: 20, title: 'Verrouillée', field: 'locked', type: 'text'}
      { title: "Imprimer", field: "imprimer" },
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
        <h1>Exporting...</h1>
      </div>
    ) : (
      <>
        <Table
          deleted={
            localStorage.getItem("AdminOrTeam") == "admin" ? true : false
          }
          title="Reparations"
          columns={columns}
          data={this.fetchData.bind(this)}
          routeEdit="/editReparation"
          delete={this.delete}
          setStateOnDelete={this.setStateOnDelete}
          showMore="/detailsReparation"
          state={this.state}
          actions={actions}
          pageSize={50}
          exportButton={false}
        />
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box >
            <ComponentToPrint currentReparation={this.state.item} />
          </Box>
        </Modal>
        <Modal
          open={this.state.openSticker}
          onClose={this.handleCloseSticker}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box >
            <StickerToPrint currentReparation={this.state.item} />
          </Box>
        </Modal>
      </>
    );
  }
}
export default withSnackbar(withRouter(ReparationTable));
