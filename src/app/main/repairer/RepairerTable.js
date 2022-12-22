import React, { Component } from "react";
import Request from "../../utils/Request";
import Table from "../sharedComponent/Table";
import { Button } from "@material-ui/core";
import { withSnackbar } from "notistack";

import SimpleModal from "../sharedComponent/SimpleModal";
import Reparations from "./Repartaions";
import env from "../../static";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";

import swal2 from "@sweetalert/with-react";
class RepairerTable extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    const userType = localStorage.getItem("AdminOrTeam");
    this.state = {
      columns: [
        {
          title: (
            <Translation>
              {(t) => <div>{t("repairer.firstName")}</div>}
            </Translation>
          ),
          field: "fname",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("repairer.lastName")}</div>}
            </Translation>
          ),
          field: "lname",
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
          title: (
            "Id repairer"
          ),
          field: "hawiya",
        },
        {
          title: (
            <Translation>{(t) => <div>{t("repairer.email")}</div>}</Translation>
          ),
          field: "email",
        },
        {
          title: (
            <Translation>{(t) => <div>{t("repairer.phone")}</div>}</Translation>
          ),
          field: "phone",
        },
        {
          title:"Address",
          render: (rowData) => 
          (rowData.country?.iso2=='SA'?rowData.regionSaoudia+" -> "+rowData.citySaoudia:rowData.country?.iso2=='TN'?rowData.gouvernorat+" -> "+rowData.delegation:"")
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("repairer.boutique")}</div>}
            </Translation>
          ),
          field: "boutique",
          render: (rowData) => (
            <a target="_blank" href={`/editBoutique/${rowData.boutiqueData?._id}`}>{rowData.boutique}</a>
          ),
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("repairer.status")}</div>}
            </Translation>
          ),
          field: "etat",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("repairer.reparation")}</div>}
            </Translation>
          ),
          field: "showReparations",
          render: (rowData) => this.reparations(rowData),
        },
        {title:"Enable",render:(rowData)=>rowData.etat=='vérifié'?"":<Button
        variant="contained"
        color="primary"
        className="w-2 mx-auto mt-16"
        onClick={() => {
          this.anableRepairer(rowData._id,rowData.boutiqueData);
        }}
      >Detail</Button>},
      ],
      data: [],
      open: false,
      selctedRowlength: 0,
      tableRef: React.createRef(),
    };
    this.delete = this.delete.bind(this);
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
    this.tableReparations = this.tableReparations.bind(this);
  }
  anableRepairer=(id,boutique)=>{
    let typeBoutiques = [];
    boutique?.typeBoutique?.forEach((elem) => {
      typeBoutiques.push(elem);
      typeBoutiques.push(" , ");
    });
    let specialities = [];
    boutique?.specialities?.forEach((elem) => {
      specialities.push(elem.name);
      specialities.push(" , ");
    });
    let serviceTypes = [];
    boutique?.serviceType?.forEach((elem) => {
            serviceTypes.push(elem.nameEnglish);
            serviceTypes.push(" , ");
          });
    swal2({
      title: "Are you sure you want to validate this repairer?",
      content:<table border="0" cellspacing="0" cellpadding="0">
      <tr valign="top">
        <th align="left"><b>Shop name: </b> {boutique.name } </th>
      </tr>
      <tr valign="top">
      <th align="left"><b>Shop email: </b> {boutique.email } </th>
      </tr>
      <tr valign="left">  
        <th align="left"><b>Shop phone: </b> {boutique.phone}</th>
      </tr>
      <tr valign="top">
      <th align="left"><b>Company id: </b> {boutique.companyId } </th>
      </tr>
      <tr valign="top">
      <th align="left"><b>Shop type: </b> {typeBoutiques} </th>
      </tr>
      <tr valign="top">
      <th align="left"><b>Years of experience: </b> {boutique.yearsExperience} </th>
      </tr>
      <tr valign="top">
      <th align="left"><b>Specialities: </b> {specialities} </th>
      </tr>
      <tr valign="top">
      <th align="left"><b>Service types: </b> {serviceTypes} </th>
      </tr>
      <tr valign="top">
      <th align="left"><b>Country: </b> {boutique.country?.countryName} </th>
      </tr>
      <tr valign="top">
      <th align="left"><b>Adresse: </b> {boutique.country?.iso2=="SA"?boutique.regionSaoudia?.name_en+" -> "+boutique.citySaoudia?.name_en:boutique.country?.iso2=="TN"?boutique.gouvernorat?.name_fr+" -> "+boutique.delegation?.name_fr:""} </th>
      </tr>
    </table>,
      buttons: true,
      dangerMode: true,
    }).then((result) => {
      if (result) {
        
          fetch(env.repairers.activate(id), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("id_token"),
            },
          }).then((updated) => {
              
            
      this.state.tableRef.current.onQueryChange();
          });
        
      
    }});
  }
  fetchData(query) {
    return new Promise(async (resolve, reject) => {
      let url = env.repairers.list + "?";
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
      const userCountry = localStorage.getItem("country");
      const userType = localStorage.getItem("AdminOrTeam");
      if(userType=="team"){
        url += "&country=" + userCountry;
      }
      try {
        //<th align="left"><b>Adresse: </b> {boutique.country?.iso2=="SA"?boutique.regionSaoudia?.name_en+" -> "+boutique.citySaoudia?.name_en:boutique.country?.iso2=="TN"?boutique.gouvernorat?.name_fr+" -> "+boutique.delegation?.name_fr:""} </th>
      
        const result = await this.request.getAll(url);
       
        let dataList = [];
        result.data.data.forEach((element) => {
          //console.log("country:element.country",element);
          dataList.push({
            _id: element._id,
            fname: element.fname,
            lname: element.lname,
            email: element.email,
            phone: element.phone,
            boutique: element.boutique?.name,
            boutiqueData:element?.boutique,
            etat: element.etat,
            hawiya:element.hawiya,
            country:element.country,
            regionSaoudia:element.regionSaoudia?.name_en?element.regionSaoudia?.name_en:"",
            citySaoudia:element.citySaoudia?.name_en?element.citySaoudia?.name_en:"",
            gouvernorat:element.gouvernorat?.name_fr?element.gouvernorat?.name_fr:"",
            delegation:element.delegation?.name_fr?element.delegation?.name_fr:"",
          });
        });
        this.setState({
          data: dataList,
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
        console.log(e);
      }
    });
  }

  async requestVerify(url, data) {
    try {
      await this.request.new(url, data, false);
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
  async verifyBoutique(rowData) {
    const dataServer = {
      id: rowData._id,
    };
    if (this.state.data[rowData.tableData.id].verified) {
      const url = env.repairers.unVerify;
      this.requestVerify(url, dataServer);
      let data = this.state.data;
      data[rowData.tableData.id].verified =
        !data[rowData.tableData.id].verified;
      this.setState({
        data: data,
      });
    } else {
      const url = env.repairers.verify;
      this.requestVerify(url, dataServer);
      let data = this.state.data;
      data[rowData.tableData.id].verified =
        !data[rowData.tableData.id].verified;
      this.setState({
        data: data,
      });
    }
  }

  async boutique(rowData) {
    return (
      <Button
        variant="contained"
        color="primary"
        className="w-224 mx-auto mt-16"
        onClick={() => {
          this.verifyBoutique(rowData);
        }}
      >
        {this.state.data[rowData.tableData.id].verified
          ? "verifie"
          : "nonVerifie"}
      </Button>
    );
  }
  tableReparations(rowData) {
    return <Reparations id={rowData._id} />;
  }
  reparations(rowData) {
    return <SimpleModal showReparations={this.tableReparations(rowData)} />;
  }
  async componentDidMount() {}

  async delete(id) {
    try {
      const url = env.repairers.remove(id);
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

  render() {
    return (
      <Table
        deleted={localStorage.getItem("AdminOrTeam") == "admin" ? true : false}
        title={
          <Translation>
            {(t) => <div>{t("repairer.repairer")}</div>}
          </Translation>
        }
        columns={this.state.columns}
        data={this.fetchData.bind(this)}
        routeEdit="/editRepairer"
        delete={this.delete}
        setStateOnDelete={this.setStateOnDelete}
        showMore="/detailsRepairer"
        state={this.state}
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(RepairerTable)));
