import React, { Component } from "react";
import Select from "react-select";
import { REP_STATES, REP_LABELS, reparations } from "../../static";
import swal from "sweetalert";
import { withTranslation, Translation, useTranslation } from "react-i18next";
function RepairerComponent({ rep, repairers, _id, locked }) {
  const { t } = useTranslation();
  const [repairer, setRepairer] = React.useState(rep);
  const updateRep = async (data) => {
    swal({
      title: t("stock.sure"),
      text: t("form.warnning"),
      icon: "warning",
      buttons: {
        cancel: {
          text: t("stock.cancel"),
          value: false,
          visible: true,
          className: "",
          closeModal: true,
        },
        confirm: {
          text: t("stock.confirm"),
          value: true,
          visible: true,
          className: "",
          closeModal: true,
        },
      },
      dangerMode: true,
    }).then((result) => {
      if (result) {
        fetch(reparations.update(_id), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("id_token"),
          },
          body: JSON.stringify({ repairer: data.value }),
        }).then((updated) => {
          if (updated) {
            setRepairer(data);
          }
        });
      }
    });
  };
  return (
    <div style={{ minWidth: 150, zIndex: 1000 }}>
      <Select
        isDisabled={locked}
        onChange={updateRep}
        options={repairers.map((rep) => {
          return {
            label: `${rep.fname} ${rep.lname}`,
            value: rep._id,
            fname: rep.fname,
            lname: rep.lname,
            _id: rep._id,
          };
        })}
        value={
          repairer
            ? {
                label: `${repairer.fname} ${repairer.lname}`,
                value: repairer._id,
              }
            : { label: "Aucune element" }
        }
      />
    </div>
  );
}

export default withTranslation()(RepairerComponent);
