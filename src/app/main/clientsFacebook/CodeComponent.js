import React, { Component } from "react";
import Select from "react-select";
import { REP_STATES, REP_LABELS, clientFacebook } from "../../static";
import swal from "sweetalert";
import { withTranslation, Translation, useTranslation } from "react-i18next";

function CodeComponent({ currentCode, _id, locked }) {
    const { t } = useTranslation();
  const [newCode, setNewCode] = React.useState(currentCode);
  const updateRep = async (e) => {
    e.preventDefault();
    let code = e.target.value;
    swal({
      title:  t("stock.sure"),
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
        fetch(clientFacebook.update(_id), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("id_token"),
          },
          body: JSON.stringify({ code }),
        }).then((updated) => {
          if (updated) {
            setNewCode(code);
            setEdit(false);
          }
        });
      } else {
        setEdit(false);
      }
    });
  };
  const ref = React.createRef(null);

  React.useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  }, [ref]);
  const [edit, setEdit] = React.useState(false);
  return (
    <div onClick={() => setEdit(true && !locked)}>
      {edit ? (
        <input
          ref={ref}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateRep(e);
            }
          }}
          type="text"
          defaultValue={newCode}
          onBlur={updateRep}
          className={
            "MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedStart MuiInputBase-inputTypeSearch MuiInput-inputTypeSearch"
          }
        />
      ) : (
        <span>{newCode}</span>
      )}
    </div>
  );
}

export default withTranslation()(CodeComponent);
