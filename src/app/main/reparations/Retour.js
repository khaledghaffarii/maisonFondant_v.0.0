import React, { Component } from "react";
import Select from "react-select";
import { REP_RETOUR, reparations } from "../../static";
import swal from "sweetalert";
import { withTranslation, Translation, useTranslation } from "react-i18next";
function Retour({ _id, retourValue, locked }) {
  const { t } = useTranslation();
  let labelRetourValue = retourValue == true ? "true" : "false";
  const [retour, setRetour] = React.useState({
    value: retourValue,
    label: labelRetourValue,
  });
  let i = 0;
  const suggestionsRetour = Object.keys(REP_RETOUR).map((key) => {
    i++;
    return {
      key: i,
      value: REP_RETOUR[key],
      label: REP_RETOUR[key],
    };
  });
  const update = (newState) => {
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
          body: JSON.stringify({ retour: newState.value }),
        }).then((updated) => {
          if (updated) {
            setRetour(newState);
          }
        });
      }
    });
  };
  return (
    <div style={{ minWidth: 175 }}>
      <Select
        isDisabled={locked}
        options={suggestionsRetour}
        value={retour}
        onChange={update}
      />
    </div>
  );
}

export default withTranslation()(Retour);
