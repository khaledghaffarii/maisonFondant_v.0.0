import React, { Component } from "react";
import Request from "../../utils/Request";
import { withSnackbar } from "notistack";

import Table from "../sharedComponent/Table";
import { withRouter } from "react-router-dom";

import env from "../../static";
import BotuiqueState from "./BoutiqueState";
import { withTranslation, Translation } from "react-i18next";
class BoutiqueTable extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    const userType = localStorage.getItem("AdminOrTeam");
    this.state = {
      columns: [
        {
          title: (
            <Translation>
              {(t) => <div>{t("boutique.picture")}</div>}
            </Translation>
          ),
          field: "picture",
          render: (rowData) => (
            <img
            alt="brand"
            src={`${env.staticFiles}${rowData.picture}`}
            style={{ width: 50, borderRadius: "50%" }}
          />
          ),
        },
        {
          title: (
            <Translation>{(t) => <div>{t("boutique.name")}</div>}</Translation>
          ),
          field: "name",
          render: (rowData) => (
            <a href={`/editBoutique/${rowData._id}`}>{rowData.name}</a>
          ),
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
          title:"Address",
          render: (rowData) => 
          (rowData.country?.iso2=='SA'?rowData.regionSaoudia+" -> "+rowData.citySaoudia:rowData.country?.iso2=='TN'?rowData.gouvernorat+" -> "+rowData.delegation:"")
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("boutique.Etat_Boutique.title")}</div>}
            </Translation>
          ),
          field: "etat",
          render: (element) => (
            <BotuiqueState id={element._id} etat={element.etat}/>
          ),
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("boutique.speciality.title")}</div>}
            </Translation>
          ),
          field: "specialities",
        },        
        {
          title: (<Translation>
            {(t) => <div>{t("boutique.typeBoutique")}</div>}
          </Translation>
          ),
          field: "typeBoutique",
        },
        {

          title: (
          <Translation>
            {(t) => <div>{t("boutique.yearsExperience")}</div>}
          </Translation>
          ),

          field: "yearsExperience",
        },{title: ( 
            <Translation>
            {(t) => <div>{t("boutique.mobilite")}</div>}
          </Translation>
          ),field: "serviceType"
          ,
            },
        {
          title: (
            <Translation>{(t) => <div>{t("boutique.phone")}</div>}</Translation>
          ),
          field: "phone",
        },
        {
          title: (<Translation>{(t) => <div>{t("repairer.email")}</div>}</Translation>),
          field: "email",
        },
        {title: (<Translation>{(t) => <div>{t("boutique.companyId")}</div>}</Translation>
        ),
        field: "companyId",
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
      const userCountry = localStorage.getItem("country");
      const userType = localStorage.getItem("AdminOrTeam");
      let url = env.boutiques.list + "?";
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
      if(userType=="team"){
      url += "&country=" + userCountry;
    }
      try {
        const result = await this.request.getAll(url);
        let dataList = [];
        result.data.data.forEach((element) => {
          let specialities = [];
          element.specialities.forEach((elem) => {
            specialities.push(elem.name);
            specialities.push(" , ");
          });
          let specialitiesValue = "";
          if (element.specialities.length > 0) {
            specialitiesValue = specialities;
          } else {
            specialitiesValue = (
              <Translation>
                {(t) => <div>{t("boutique.speciality.noSpeciality")}</div>}
              </Translation>
            );
          }
          let typeBoutiques = [];
          element.typeBoutique.forEach((elem) => {
            typeBoutiques.push(elem);
            typeBoutiques.push(" , ");
          });
          let typeBoutiquesValue = "";
          if (element.typeBoutique.length > 0) {
            typeBoutiquesValue = typeBoutiques;
          } else {
            typeBoutiquesValue = (
              <Translation>
                {(t) => <div>{t("boutique.speciality.noSpeciality")}</div>}
              </Translation>
            );
          }
          let serviceTypes = [];
          element.serviceType.forEach((elem) => {
            serviceTypes.push(elem.nameEnglish);
            serviceTypes.push(" , ");
          });
          let serviceTypesValue = "";
          if (element.serviceType.length > 0) {
            serviceTypesValue = serviceTypes;
          } else {
            serviceTypesValue = (
              <Translation>
                {(t) => <div>{t("boutique.speciality.noSpeciality")}</div>}
              </Translation>
            );
          }
          ///brand/photo-identite-inconnu.png
          console.log("element.picture",element.picture)
          dataList.push({
            _id: element._id,
            picture: element.picture=="/boutiques/no-profile.png"?"/brand/photo-identite-inconnu.png":element.picture
            ,
            name: element.name,
            nameArabe: element.nameArabe,
            nameEnglish: element.nameEnglish,
            specialities: specialitiesValue,
            adress: element.adress,
            location: element.location.coordinates,
            phone: element.phone,
            etat: element.etat,
            email:element.email,
            yearsExperience:element.yearsExperience,
            serviceType:serviceTypesValue,
            companyId:element.companyId,
            typeBoutique:element.typeBoutique,
            country:element.country,
            regionSaoudia:element.regionSaoudia?.name_en?element.regionSaoudia?.name_en:"",
            citySaoudia:element.citySaoudia?.name_en?element.citySaoudia?.name_en:"",
            gouvernorat:element.gouvernorat?.name_fr?element.gouvernorat?.name_fr:"",
            delegation:element.delegation?.name_fr?element.delegation?.name_fr:"",

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
  async delete(id) {
    try {
      const url = env.boutiques.remove(id);
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
            {(t) => <div>{t("boutique.boutique")}</div>}
          </Translation>
        }
        columns={this.state.columns}
        data={this.fetchData.bind(this)}
        routeEdit="/editBoutique"
        delete={this.delete}
        setStateOnDelete={this.setStateOnDelete}
        showMore="/detailsBoutique"
        state={this.state}
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(BoutiqueTable)));
