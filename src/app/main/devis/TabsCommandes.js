import React from "react";
import Table from "../sharedComponent/Table";
import MaterialTable from "material-table";
import { Badge, Button } from "@material-ui/core";
import { Tabs } from "@yazanaabed/react-tabs";
import Formsy from "formsy-react";
import Request from "../../utils/Request";
import env from "../../static";
import { withTranslation, Translation } from "react-i18next";
function TabsCommandes(props) {
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
          title={`En attente - (${
            orders.filter((order) => order.status == "En Attente").length
          })`}
        >
          <MaterialTable
            title={"Orders"}
            style={{ width: "80vw" }}
            columns={[
              {
                title: "Nom et Prénom",
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
              { title: "Quantité", field: "quantity" },
            ]}
            data={orders.filter((order) => order.status == "En Attente")}
          />
        </Tabs.Tab>
        <Tabs.Tab
          id="tab2"
          title={`Accepté - (${
            orders.filter((order) => order.status == "Accepté").length
          })`}
        >
          <MaterialTable
            title={"Orders"}
            style={{ width: "80vw" }}
            columns={[
              {
                title: "Nom et Prénom",
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
              { title: "Quantité", field: "quantity" },
            ]}
            data={orders.filter((order) => order.status == "Accepté")}
          />
        </Tabs.Tab>
        <Tabs.Tab
          id="tab3"
          title={`Rejetée - (${
            orders.filter((order) => order.status == "Annulé").length
          })`}
        >
          <MaterialTable
            title={"Orders"}
            style={{ width: "80vw" }}
            columns={[
              {
                title: "Nom et Prénom",
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
              { title: "Quantité", field: "quantity" },
            ]}
            data={orders.filter((order) => order.status == "Annulé")}
          />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}

export default withTranslation()(TabsCommandes);
