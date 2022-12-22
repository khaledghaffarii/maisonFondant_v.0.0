import React, { Component } from "react";
import Select from "react-select";
import { REP_STATES, REP_LABELS, reparations,STATES_REPARATION } from "../../static";
import swal from "sweetalert";
import swal2 from "@sweetalert/with-react";

import { TextFieldFormsy } from "@fuse";
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {  Button,CardContent } from "@material-ui/core";
import Formsy from "formsy-react";
import { withTranslation, Translation, useTranslation } from "react-i18next";
const PartRequest= ({ id, etat, setSelectedState, newState }) => {

  const [partRequest, setPartRequest] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const updateState = () => {
    setLoading(true);
    fetch(reparations.update(id), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("id_token"),
      },
      body: JSON.stringify({ etat, partRequest }),
    }).then((updated) => {
        setLoading(false);
        swal2.close();
        if (updated) {
          setSelectedState(newState);
          window.location.reload();
        }
      })
      .catch((e) => {
        setLoading(false);
      });
  };
  return (
    
      <div className="flex flex-col justify-center w-f<ull">
     
       <textarea onChange={e=>{setPartRequest(e.target.value); setLoading(false);}} placeholder="Part request note*"
          rows="5" cols="33"
          style={{
            marginTop: 20,
            borderRadius: 5,
            
          }}
          />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          <Button
            variant="contained"
            //color="secondary"
            className="w-120 mx-auto mt-24"
            
            onClick={() => swal2.close()}
            style={{ marginRight: 10 }}
            
          >cancel
            {/*<Translation>{(t) => <div>{t("stock.cancel")}</div>}</Translation>*/}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{backgroundColor :"#FF0000"}}
            className="w-120 mx-auto mt-24"
            aria-label="Ajouter remarque"
            onClick={updateState}
            disabled={loading}
          >
            Save
          </Button>
        </div>
      </div>
  );
};

const CustomerNoteRepairRecovered= ({ id, etat, setSelectedState, newState }) => {

  const [customerNoteRepairRecovered, setCustomerNoteRepairRecovered] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const updateState = () => {
    setLoading(true);
    fetch(reparations.update(id), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("id_token"),
      },
      body: JSON.stringify({ etat, customerNoteRepairRecovered }),
    }).then((updated) => {
        setLoading(false);
        swal2.close();
        if (updated) {
          setSelectedState(newState);
          window.location.reload();
        }
      })
      .catch((e) => {
        setLoading(false);
      });
  };
  return (
    
      <div className="flex flex-col justify-center w-f<ull">
     
       <textarea onChange={e=>{setCustomerNoteRepairRecovered(e.target.value); setLoading(false);}} placeholder="Customer feedback*"
          rows="5" cols="33"
          style={{
            marginTop: 20,
            borderRadius: 5,
            
          }}
          />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          <Button
            variant="contained"
            //color="secondary"
            className="w-120 mx-auto mt-24"
            
            onClick={() => swal2.close()}
            style={{ marginRight: 10 }}
            
          >cancel
            {/*<Translation>{(t) => <div>{t("stock.cancel")}</div>}</Translation>*/}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{backgroundColor :"#FF0000"}}
            className="w-120 mx-auto mt-24"
            aria-label="Ajouter remarque"
            onClick={updateState}
            disabled={loading}
          >
            Save
          </Button>
        </div>
      </div>
  );
};


const DiagnostiqueTerminerTeam = ({ id, etat, setSelectedState, newState }) => {

  const [fraisTrustit, setFraisTrustit] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const updateState = () => {
    setLoading(true);
    fetch(reparations.update(id), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("id_token"),
      },
      body: JSON.stringify({ etat, fraisTrustit }),
    })
      .then((updated) => {
        setLoading(false);
        swal2.close();
        if (updated) {
          setSelectedState(newState);
          window.location.reload();
        }
      })
      .catch((e) => {
        setLoading(false);
      });
  };
  return (
    
      <div className="flex flex-col justify-center w-f<ull">
      <input type="number" placeholder="Frais Trustit*"
      onChange={e=>{setFraisTrustit(e.target.value); setLoading(false);}}
       style={{
        marginTop: 20,
        borderRadius: 5,
        height:35
      }}/>
     
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          <Button
            variant="contained"
            //color="secondary"
            className="w-120 mx-auto mt-24"
            
            onClick={() => swal2.close()}
            style={{ marginRight: 10 }}
            
          >cancel
            {/*<Translation>{(t) => <div>{t("stock.cancel")}</div>}</Translation>*/}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{backgroundColor :"#FF0000"}}
            className="w-120 mx-auto mt-24"
            aria-label="Ajouter remarque"
            onClick={updateState}
            disabled={loading}
          >
            Save
          </Button>
        </div>
      </div>
  );
};


const DiagnostiqueTerminer = ({ id, etat, setSelectedState, newState }) => {

  const [priceRepairer, setRepairerPrice] = React.useState();
  const [estimatedTimeReparation, setEstimatedTimeReparation] = React.useState();
  const [noteDiagnostique, setNoteDiagnostique] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const updateState = () => {
    setLoading(true);
    fetch(reparations.update(id), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("id_token"),
      },
      body: JSON.stringify({ etat, priceRepairer,estimatedTimeReparation,noteDiagnostique }),
    })
      .then((updated) => {
        setLoading(false);
        swal2.close();
        if (updated) {
          setSelectedState(newState);
          window.location.reload();
        }
      })
      .catch((e) => {
        setLoading(false);
      });
  };
  return (
    
      <div className="flex flex-col justify-center w-f<ull">
      <input type="number" placeholder="Repairer price*"
      onChange={e=>{setRepairerPrice(e.target.value); setLoading(false);}}
       style={{
        marginTop: 20,
        borderRadius: 5,
        height:35
      }}/>
      <select style={{
        marginTop: 20,
        borderRadius: 5,
        height:40
      }} onChange={e=>{setEstimatedTimeReparation(e.target.value)}}
      >
    <option>Repair time estimate</option>    
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
    <option value="11">11</option>
    <option value="12">12</option>
    <option value="13">13</option>
    <option value="14">14</option>
    <option value="15+">15+</option>
</select>
      <textarea onChange={e=>setNoteDiagnostique(e.target.value)} placeholder="Diagnostic note"
          rows="5" cols="33"
          style={{
            marginTop: 20,
            borderRadius: 5,
            
          }}
          />
     
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          <Button
            variant="contained"
            //color="secondary"
            className="w-120 mx-auto mt-24"
            
            onClick={() => swal2.close()}
            style={{ marginRight: 10 }}
            
          >cancel
            {/*<Translation>{(t) => <div>{t("stock.cancel")}</div>}</Translation>*/}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{backgroundColor :"#FF0000"}}
            className="w-120 mx-auto mt-24"
            aria-label="Ajouter remarque"
            onClick={updateState}
            disabled={loading}
          >
            Save
          </Button>
        </div>
      </div>
  );
};
function StateComponent({ _id, etat, locked,levelEtat }) {
  const { t } = useTranslation();
  const [selectedState, setSelectedState] = React.useState({
    value: STATES_REPARATION[etat]?STATES_REPARATION[etat]?.VALUE:etat,
    label: STATES_REPARATION[etat]?STATES_REPARATION[etat]?.LABEL_FR:etat,
  });
  const [dateLivraison, setDateLivraison] = React.useState(new Date());

  let i = 0;
  let testDisabled=false;
  let [niveauEtat, setNiveauEtat] = React.useState(levelEtat);
  
  const [suggestionsEtat, setSuggestionsEtat] = React.useState(Object.keys(STATES_REPARATION).map((key) => {
    i++;
    let Disabled=false;
    if(testDisabled){
      Disabled=true;
    }
   
    if(STATES_REPARATION[key].VALUE=="R102"||STATES_REPARATION[key].VALUE=="R103"){
      Disabled=false;
    }
    if(levelEtat=="R100"){
      if(STATES_REPARATION[key].VALUE=="R101"){
        Disabled=false;
      }
    } 
    if(levelEtat=="R101"){
      if(STATES_REPARATION[key].VALUE=="R104"){
        Disabled=false;
      }
    }
    if(levelEtat=="R104"){
      if(STATES_REPARATION[key].VALUE=="R105"){
        Disabled=false;
      }
    }
    if(levelEtat=="R105"||levelEtat=="R106"||levelEtat=="R107"){
      if(STATES_REPARATION[key].VALUE=="R106"||STATES_REPARATION[key].VALUE=="R107"||STATES_REPARATION[key].VALUE=="R108"){
        Disabled=false;
      }
    }
    if(levelEtat=="R108"){
      if(STATES_REPARATION[key].VALUE=="R108T"){
        Disabled=false;
      }
    }
    if(levelEtat=="R108T"||levelEtat=="R109"){
      if(STATES_REPARATION[key].VALUE=="R109"||STATES_REPARATION[key].VALUE=="R110"){
        Disabled=false;
      }
    }
    if(levelEtat=="R110"){
      if(STATES_REPARATION[key].VALUE=="R111"){
        Disabled=false;
      }
    }
    if(levelEtat=="R111"){
      if(STATES_REPARATION[key].VALUE=="R112"){
        Disabled=false;
      }
    }
    if(levelEtat=="R112"){
      if(STATES_REPARATION[key].VALUE=="R113"){
        Disabled=false;
      }
    }
    if(levelEtat=="R113"){
      if(STATES_REPARATION[key].VALUE=="R114"){
        Disabled=false;
      }
    }
    if(levelEtat=="R114"){
      if(STATES_REPARATION[key].VALUE=="R115"||STATES_REPARATION[key].VALUE=="R116"){
        Disabled=false;
      }
    }
    if(levelEtat==STATES_REPARATION[key].VALUE){
      testDisabled=true

    }
    if(STATES_REPARATION[key].VALUE=="R104"){
      Disabled=true;
    }
    return {
      key: i,
      value: STATES_REPARATION[key].VALUE,
      label: STATES_REPARATION[key].LABEL_FR,
      isDisabled: Disabled
    };
  })
  )
  React.useEffect(() => {
  
  }, [dateLivraison]);
  const update = (newState) => {
    
    if (newState.value == "R108") {
      swal2({
        text: t("print.textWarning"),
        content: (
          <DiagnostiqueTerminer
            id={_id}
            etat={newState.value}
            setSelectedState={setSelectedState}
            newState={newState}
          />
        ),
        buttons: {},
      });
    }else if (newState.value == "R108T") {
      swal2({
        text: t("print.textWarningT"),
        content: (
          <DiagnostiqueTerminerTeam
            id={_id}
            etat={newState.value}
            setSelectedState={setSelectedState}
            newState={newState}
          />
        ),
        buttons: {},
      });
    }else if (newState.value == "R107") {
      swal2({
        text: t("print.textWarningT"),
        content: (
          <PartRequest
            id={_id}
            etat={newState.value}
            setSelectedState={setSelectedState}
            newState={newState}
          />
        ),
        buttons: {},
      });
    }else if (newState.value == "R114") {
      swal2({
        text: t("print.textWarningT"),
        content: (
          <CustomerNoteRepairRecovered
            id={_id}
            etat={newState.value}
            setSelectedState={setSelectedState}
            newState={newState}
          />
        ),
        buttons: {},
      });
    }
    else{
    swal({
      title: t("stock.sure"),
      text: t("form.warnning"),
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((result) => {
      if (result) {
        
          fetch(reparations.update(_id), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("id_token"),
            },
            body: JSON.stringify({ etat: newState.value }),
          }).then((updated) => {
            if (updated) {
              if((newState.value!="R102")&&(newState.value!="R103")){
                setNiveauEtat(newState.value);
                niveauEtat=newState.value;
              }
              setSelectedState(newState);
               testDisabled=false;
  
              setSuggestionsEtat(Object.keys(STATES_REPARATION).map((key) => {
                i++;
                let Disabled=false;
                if(testDisabled){
                  Disabled=true;
                }
               
                if(STATES_REPARATION[key].VALUE=="R102"||STATES_REPARATION[key].VALUE=="R103"){
                  Disabled=false;
                }
                if(niveauEtat=="R100"){
                  if(STATES_REPARATION[key].VALUE=="R101"){
                    Disabled=false;
                  }
                } 
                if(niveauEtat=="R101"){
                  if(STATES_REPARATION[key].VALUE=="R104"){
                    Disabled=false;
                  }
                }
                if(niveauEtat=="R104"){
                  if(STATES_REPARATION[key].VALUE=="R105"){
                    Disabled=false;
                  }
                }
                if(niveauEtat=="R105"||niveauEtat=="R106"||niveauEtat=="R107"){
                  if(STATES_REPARATION[key].VALUE=="R106"||STATES_REPARATION[key].VALUE=="R107"||STATES_REPARATION[key].VALUE=="R108"){
                    Disabled=false;
                  }
                }
                
                if(niveauEtat=="R108"){
                  if(STATES_REPARATION[key].VALUE=="R108T"){
                    Disabled=false;
                  }
                }
                if(niveauEtat=="R108T"||niveauEtat=="R109"){
                  if(STATES_REPARATION[key].VALUE=="R109"||STATES_REPARATION[key].VALUE=="R110"){
                    Disabled=false;
                  }
                }
                if(niveauEtat=="R110"){
                  if(STATES_REPARATION[key].VALUE=="R111"){
                    Disabled=false;
                  }
                }
                if(niveauEtat=="R111"){
                  if(STATES_REPARATION[key].VALUE=="R112"){
                    Disabled=false;
                  }
                }
                if(niveauEtat=="R112"){
                  if(STATES_REPARATION[key].VALUE=="R113"){
                    Disabled=false;
                  }
                }
                if(niveauEtat=="R113"){
                  if(STATES_REPARATION[key].VALUE=="R114"){
                    Disabled=false;
                  }
                }
                if(niveauEtat=="R114"){
                  if(STATES_REPARATION[key].VALUE=="R115"||STATES_REPARATION[key].VALUE=="R116"){
                    Disabled=false;
                  }
                }
                if(niveauEtat==STATES_REPARATION[key].VALUE){
                  testDisabled=true
                  }
                  if(STATES_REPARATION[key].VALUE=="R104"){
                    Disabled=true;
                  }
                return {
                  key: i,
                  value: STATES_REPARATION[key].VALUE,
                  label: STATES_REPARATION[key].LABEL_FR,
                  isDisabled: Disabled
                };
              }));
              
            }
          });
        }
      
    });}
  };
  return (
    <div style={{ minWidth: 175 }}>
      <Select
        isDisabled={locked}
        options={suggestionsEtat}
        value={selectedState}
        onChange={update}
      />
    </div>
  );
}

export default withTranslation()(StateComponent);