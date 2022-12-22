import React from "react";
import Table from "../sharedComponent/Table";
import MaterialTable from "material-table";
import { Badge, Button } from "@material-ui/core";
import { Tabs } from "@yazanaabed/react-tabs";
import Formsy from "formsy-react";
import Request from "../../utils/Request";
import env from "../../static";
import { withTranslation, useTranslation, Translation } from "react-i18next";
function TabsCommandes(props) {
  const { t } = useTranslation();
  const [orders, setOrders] = React.useState(props.orders || []);
  const request = new Request();
  const rejectOrder = async (id) => {
    const data = await request.update(env.stock.reject_order, { id });
    if (data.error) {
      return alert(data.message);
    }
    return setOrders(
      orders.map((order) =>
        order._id === id ? { ...order, traiter: true, status: "Annulé" } : order
      )
    );
  };
  const acceptOrder = async (id) => {
    const data = await request.update(env.stock.accept_order, { id });
    if (data.error) {
      return alert(data.message);
    }
    return setOrders(
      orders.map((order) =>
        order._id === id
          ? { ...order, traiter: true, status: "Accepté" }
          : order
      )
    );
  };
  return (
    <div>
      <Tabs
        activeTab={{
          id: "tab1",
        }}
      >
        <Tabs.Tab
          id="tab1"
          title={` ${props.t("stock.Pending")}- ${
            orders.filter((order) => order.status == "En Attente").length
          }`}
        >
          <MaterialTable
            title={props.t("commandes.orders")}
            style={{ width: "80vw" }}
            columns={[
              {
                title: (
                  <Translation>
                    {(t) => <div>{t("stock.fullName")}</div>}
                  </Translation>
                ),
                field: "",
                render: (rowData) => (
                  <p>
                    {rowData.orderBy.fname} {rowData.orderBy.lname}
                  </p>
                ),
              },
              {
                title: "Contact",
                field: "",
                render: (rowData) => (
                  <p>
                    {rowData.orderBy.email} / {rowData.orderBy.phone}
                  </p>
                ),
              },
              {
                title: (
                  <Translation>
                    {(t) => <div>{t("stock.quantity")}</div>}
                  </Translation>
                ),
                field: "quantity",
              },
            ]}
            data={orders.filter((order) => order.status == "En Attente")}
          />
        </Tabs.Tab>
        <Tabs.Tab
          id="tab2"
          title={`${props.t("stock.accepted")}- (${
            orders.filter((order) => order.status == "Accepté").length
          })`}
        >
          <MaterialTable
            title={"Orders"}
            style={{ width: "80vw" }}
            columns={[
              {
                title: (
                  <Translation>
                    {(t) => <div>{t("stock.fullName")}</div>}
                  </Translation>
                ),
                field: "",
                render: (rowData) => (
                  <p>
                    {rowData.orderBy.fname} {rowData.orderBy.lname}
                  </p>
                ),
              },
              {
                title: "Contact",
                field: "",
                render: (rowData) => (
                  <p>
                    {rowData.orderBy.email} / {rowData.orderBy.phone}
                  </p>
                ),
              },
              {
                title: (
                  <Translation>
                    {(t) => <div>{t("stock.quantity")}</div>}
                  </Translation>
                ),
                field: "quantity",
              },
            ]}
            data={orders.filter((order) => order.status == "Accepté")}
          />
        </Tabs.Tab>
        <Tabs.Tab
          id="tab3"
          title={`${props.t("stock.rejected")}- (${
            orders.filter((order) => order.status == "Annulé").length
          })`}
        >
          <MaterialTable
            title={"Orders"}
            style={{ width: "80vw" }}
            columns={[
              {
                title: (
                  <Translation>
                    {(t) => <div>{t("stock.fullName")}</div>}
                  </Translation>
                ),
                field: "",
                render: (rowData) => (
                  <p>
                    {rowData.orderBy.fname} {rowData.orderBy.lname}
                  </p>
                ),
              },
              {
                title: "Contact",
                field: "",
                render: (rowData) => (
                  <p>
                    {rowData.orderBy.email} / {rowData.orderBy.phone}
                  </p>
                ),
              },
              {
                title: (
                  <Translation>
                    {(t) => <div>{t("stock.quantity")}</div>}
                  </Translation>
                ),
                field: "quantity",
              },
            ]}
            data={orders.filter((order) => order.status == "Annulé")}
          />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}

export default withTranslation()(TabsCommandes);
