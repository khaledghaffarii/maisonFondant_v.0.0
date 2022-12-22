import React, { Component } from 'react'
import Select from 'react-select';
import {  EtatSortie } from '../../../static';
import swal from 'sweetalert';


function CentreRecuperation({currentCentreRecuperation, _id, locked}) {
    const [centreRecuperation, setCentreRecuperation] = React.useState(currentCentreRecuperation);
    const updateRep = async (e) => {
        e.preventDefault();
       let centreRecuperation = e.target.value;
       swal({
            title: 'êtes vous sûr?',
            text: "Vous ne pourrez pas revenir en arrière!!",
            icon: 'warning',
            buttons: true,
            dangerMode: true,
          }).then((result) => {

            if (result) {
                
                fetch(EtatSortie.update(_id), {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('id_token')
                    },
                    body: JSON.stringify({ center_recuperation: centreRecuperation })
                })
                    .then(updated => {
                        if (updated) {
                            setCentreRecuperation(centreRecuperation);
                            setEdit(false);
                        }
                    });
           

        }else {
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
                }} type="text" defaultValue={centreRecuperation} onBlur={updateRep} className={"MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedStart MuiInputBase-inputTypeSearch MuiInput-inputTypeSearch"}/>
                :
                <span>{centreRecuperation}</span>
            }
        </div>
    )
}

export default CentreRecuperation
