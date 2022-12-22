import React from "react";
import { reparations } from "../../static";
import swal from "sweetalert";
import { withTranslation, Translation, useTranslation } from "react-i18next";
function FraisTrustitComponent({ currentFraisTrustit, _id, locked,currency }) {
  const { t } = useTranslation();
  const [fraisTrustit, setFraisTrustit] = React.useState(currentFraisTrustit);
  const updateRep = async (e) => {
    e.preventDefault();
    let fraisTrustit = e.target.value;
    swal({
      title: t("stock.sure"),
      text: t("stock.warnning"),
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
          body: JSON.stringify({ fraisTrustit,etat:"R108T" }),
        }).then((updated) => {
          if (updated) {
            setFraisTrustit(fraisTrustit);
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
          type="number"
          defaultValue={fraisTrustit}
          onBlur={updateRep}
          className={
            "MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedStart MuiInputBase-inputTypeSearch MuiInput-inputTypeSearch"
          }
        />
      ) : (
        <span>
          {fraisTrustit == -1
            ? "Après diagnostic"
            : fraisTrustit == undefined
            ? `0 ${currency}`
            : `${fraisTrustit} ${currency}`}
        </span>
      )}
    </div>
  );
}

export default withTranslation()(FraisTrustitComponent);
