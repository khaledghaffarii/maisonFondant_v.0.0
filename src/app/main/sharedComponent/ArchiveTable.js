import React from "react";
import MaterialTable from "material-table";
import { withRouter } from "react-router-dom";
function ArchiveTable(props) {
  return (
    <MaterialTable
      title={props.title}
      columns={props.columns}
      data={props.data}
      options={{
        selection: true,
      }}
      actions={[
        (rowData) => ({
          icon: "edit",
          tooltip: "edit User",
          hidden: rowData.length >= 2,
          onClick: (event, rowData) => {
            // Do save operation
            props.history.push(props.routeEdit + "/" + rowData[0]._id);
          },
        }),
        {
          tooltip: "Restore",
          icon: "restore",
          onClick: (evt, oldData) => {
            //alert('You want to delete ' + data.length + ' rows')
            const data = [...props.data];
            oldData.forEach((element) => {
              data.splice(data.indexOf(element), 1);
              props.setStateOnDelete(data);
              
            });
          },
        },
      ]}
    />
  );
}

export default withRouter(ArchiveTable);
