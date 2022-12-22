import React, { Component } from "react";
import Request from "../../utils/Request";
import Table from "../sharedComponent/Table";
import { withSnackbar } from "notistack";
import PrixTrustitComponent from "./PrixTrustitComponent";
import Publier from "./Publier";
import { withRouter } from "react-router-dom";
import env from "../../static";
import TabsCommandes from "./TabsCommandes";
import SimpleModal from "../sharedComponent/SimpleModal";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import moment from "moment";
import { withTranslation, Translation } from "react-i18next";
const ImageSlider = ({ pictures }) => {
  const [openLightBox, setOpenLightBox] = React.useState(false);
  const [photoIndex, setPhotoIndex] = React.useState(0);
  const images = (pictures || []).map(
    (img) => `https://statics.trustit.tn/${img}`
  );
  return (
    <div>
      <img
        src={`https://statics.trustit.tn/${
          pictures.length > 0 ? pictures[0] : "assets/images/no-image.png"
        }`}
        style={{
          height: 75,
          width: 75,
          border: "1px solid #1C1A1F30",
          cursor: "pointer",
        }}
        onClick={() => setOpenLightBox(true)}
      />
      {openLightBox ? (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setOpenLightBox(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      ) : (
        <></>
      )}
    </div>
  );
};
class StockTable extends Component {
  request = new Request();

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: (
            <Translation>{(t) => <div>{t("stock.image")}</div>}</Translation>
          ),
          field: "image",
          render: this.imageSlider.bind(this),
        },
        {
          title: (
            <Translation>{(t) => <div>{t("stock.product")}</div>}</Translation>
          ),
          field: "name",
          render: (rowData) => (
            <a href={`/stock/edit/${rowData._id}`}>{rowData.name}</a>
          ),
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("stock.creationDate")}</div>}
            </Translation>
          ),
          render: (rowData) => moment(rowData.created_at).format("YYYY-MM-DD"),
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("stock.supplierPrice")}</div>}
            </Translation>
          ),
          field: "price",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("stock.advicedPrice")}</div>}
            </Translation>
          ),
          field: "priceForClient",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("stock.trustItPrice")}</div>}
            </Translation>
          ),
          render: (rowData) => (
            <PrixTrustitComponent
              key={rowData._id}
              currentPrice={rowData.prixTrustit}
              locked={rowData.locked}
              _id={rowData._id}
            />
          ),
        },
        {
          title: (
            <Translation>{(t) => <div>{t("stock.quantity")}</div>}</Translation>
          ),
          field: "quantity",
        },
        {
          title: (
            <Translation>{(t) => <div>{t("stock.supplier")}</div>}</Translation>
          ),
          field: "postedBy",
          render: (rowData) => (
            <div style={{ display: "flex" }}>
              {/* <div style={{ margin: 5 }}>
                <p>
                  {rowData.postedBy.fname} {rowData.postedBy.lname}
                </p>
                <p>
                  <a href={`mailto:${rowData.postedBy.email}`}>
                    {rowData.postedBy.email}
                  </a>
                </p>
                <p>{rowData.postedBy.phone}</p>
              </div> */}
            </div>
          ),
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("stock.orderList")}</div>}
            </Translation>
          ),
          field: "commandes",
          render: this.commandesModal.bind(this, this),
        },
        {
          title: (
            <Translation>{(t) => <div>{t("stock.publish")}</div>}</Translation>
          ),
          render: (rowData) => (
            <Publier
              key={rowData._id}
              publierValue={rowData.publier}
              locked={rowData.locked}
              _id={rowData._id}
            />
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
  imageSlider(rowData) {
    return <ImageSlider pictures={rowData.pictures} />;
  }
  commandesModal(rowData, list) {
    return (
      <SimpleModal
        list={list._id}
        badgeContent={
          (rowData.orders || []).length > 0
            ? rowData.orders.filter(
                (order) =>
                  order.status ==
                  (
                    <Translation>
                      {(t) => <div>{t("stock.pending")}</div>}
                    </Translation>
                  )
              ).length
            : 0
        }
        showReparations={<TabsCommandes orders={rowData.orders} />}
      />
    );
  }
  fetchData(query) {
    return new Promise(async (resolve, reject) => {
      let url = env.stock.list + "?";
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

  async delete(id) {
    try {
      const url = env.stock.remove(id);
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
        title="Stock"
        columns={this.state.columns}
        data={this.fetchData}
        routeEdit="/stock/edit"
        delete={this.delete}
        setStateOnDelete={this.setStateOnDelete}
        showMore="/stock/info"
        state={this.state}
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(StockTable)));
