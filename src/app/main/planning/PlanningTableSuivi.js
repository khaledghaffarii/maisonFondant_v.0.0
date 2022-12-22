import React, { Component } from "react";
import Request from "../../utils/Request";
import Table from "../sharedComponent/Table";
import { withRouter } from "react-router-dom";
import env from "../../static";
import { withSnackbar } from "notistack";
import LivreurComponentSuivi from "./LivreurComponentSuivi";
import { withTranslation, Translation } from "react-i18next";
class PlanningTableSuivi extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: (
            <Translation>
              {(t) => <div>{t("plannings.reference")}</div>}
            </Translation>
          ),
          field: "reference",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("plannings.delevryMan")}</div>}
            </Translation>
          ),
          field: "delevredBy",
        },
      ],
      livreurs: [],
      data: [],
      selctedRowlength: 0,
      tableRef: React.createRef(),
    };
    this.fetchLivreurs();
  }
  async fetchLivreurs() {
    const response = await this.request.getAll(env.teamMembers.all);
    this.setState({ livreurs: response.data });
  }

  fetchData(query) {
    return new Promise(async (resolve, reject) => {
      let url = env.Plannings.list + "?";
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
      let dataList = [];
      const result = await this.request.getAll(url);

      result.data.data.forEach((element) => {
        dataList.push({
          _id: element._id,
          reference: element.reference,
          delevredBy: (
            <LivreurComponentSuivi
              locked={element.locked}
              key={element._id}
              liv={element.delivredBy}
              livreurs={this.state.livreurs || []}
              _id={element._id}
            />
          ),

          created_at: element.created_at,
          dateLivraison: element.dateLivraison,

          locked: element.locked,
          // 'imprimer': <Button onClick={() => this.handleOpen(element)}><Print /></Button>
        });
      });

      resolve({
        data: dataList,
        page: Number(result.data.page) - 1,
        totalCount: result.data.totalCount,
      });
    });
  }

  async componentDidMount() {}

  render() {
    return (
      <Table
        deleted={localStorage.getItem("AdminOrTeam") == "admin" ? true : false}
        title={
          <Translation>
            {(t) => <div>{t("plannings.folowSchedule")}</div>}
          </Translation>
        }
        columns={this.state.columns}
        data={this.fetchData.bind(this)}
        showMore="/PlanningSuivi"
        state={this.state}
        // refresh = {this.refresh.bind(this)}
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(PlanningTableSuivi)));
