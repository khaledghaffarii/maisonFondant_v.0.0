import React, { Component } from 'react'
import Select from 'react-select';
import {REP_STATES, REP_LABELS, clientFacebook} from '../../static';
import swal from 'sweetalert';


function RemarqueComponent({currentRemarque, _id, locked}) {
    const [newRemarque, setNewRemarque] = React.useState(currentRemarque);
    const updateRep = async (e) => {
        e.preventDefault();
       let remarque = e.target.value;
       swal({
            title: 'êtes vous sûr?',
            text: "Vous ne pourrez pas revenir en arrière!!",
            icon: 'warning',
            buttons: true,
            dangerMode: true,
          }).then((result) => {
            if (result) {
              fetch(clientFacebook.update(_id), {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'x-auth-token': localStorage.getItem('id_token')
                  },
                  body: JSON.stringify({remarque})
              })
                .then(updated => {
                    if (updated) {
                        setNewRemarque(remarque);
                        setEdit(false);
                    }
                });
            } else {
                setEdit(false);
            }
          });
    }
    const ref = React.createRef(null);

    React.useEffect(() => {
        if (ref && ref.current) {
            ref.current.focus();
        }
    }, [ref])
    const [edit, setEdit] = React.useState(false);
    return (
        <div onClick={() => setEdit(true && !locked)}>
            {edit ? 
                <input ref={ref} onKeyDown={e => {
                    if (e.key === 'Enter') {
                        updateRep(e);
                    }
                }} type="text" defaultValue={newRemarque} onBlur={updateRep} className={"MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedStart MuiInputBase-inputTypeSearch MuiInput-inputTypeSearch"}/>
                :
                <span>{newRemarque}</span>
            }
        </div>
    )
}

export default RemarqueComponent
